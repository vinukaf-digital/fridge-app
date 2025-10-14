/**
 * Converts a date string to ISO format (YYYY-MM-DD)
 * Handles multiple formats: YYYY/MM/DD, DD/MM/YYYY, MM/DD/YYYY, YYYY-MM-DD
 */
export function toISODate(dateString: string): string {
  if (!dateString) return '';
  
  // If already in ISO format, return as-is
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString;
  }
  
  // Handle YYYY/MM/DD format
  if (/^\d{4}\/\d{2}\/\d{2}$/.test(dateString)) {
    return dateString.replace(/\//g, '-');
  }
  
  // Handle DD/MM/YYYY format (day is > 12, so it can't be a month)
  // e.g., "31/07/2023"
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
    const parts = dateString.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parts[2];
    
    // If day > 12, it's definitely DD/MM/YYYY
    if (day > 12) {
      return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    }
    
    // If month > 12, the format is DD/MM/YYYY
    if (month > 12) {
      return `${year}-${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}`;
    }
    
    // Ambiguous case (e.g., "01/02/2023") - assume MM/DD/YYYY (US format)
    return `${year}-${String(parts[0]).padStart(2, '0')}-${String(parts[1]).padStart(2, '0')}`;
  }
  
  // Fallback: try to parse and format
  const date = new Date(dateString);
  if (!isNaN(date.getTime())) {
    return date.toISOString().split('T')[0];
  }
  
  return dateString; // Return original if can't parse
}

/**
 * Converts ISO date to API format (YYYY/MM/DD)
 */
export function toAPIDate(isoDateString: string): string {
  if (!isoDateString) return '';
  
  // Convert YYYY-MM-DD to YYYY/MM/DD
  return isoDateString.replace(/-/g, '/');
}

/**
 * Converts API date format to ISO format
 */
export function fromAPIDate(apiDateString: string): string {
  return toISODate(apiDateString);
}

/**
 * Formats a date for display (human-readable)
 */
export function formatDateForDisplay(dateString: string): string {
  if (!dateString) return '';
  
  // First normalize to ISO format in case it comes in as API format
  const normalizedDate = toISODate(dateString);
  const date = new Date(normalizedDate + 'T00:00:00');
  
  if (isNaN(date.getTime())) {
    return dateString;
  }
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Gets the current date in ISO format
 */
export function getTodayISO(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Calculates days until expiry
 */
export function getDaysUntilExpiry(dateString: string): number {
  const normalizedDate = toISODate(dateString);
  const expiry = new Date(normalizedDate + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (isNaN(expiry.getTime())) {
    return 0;
  }
  
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}

/**
 * Gets expiry status based on date
 */
export function getExpiryStatus(dateString: string): {
  label: string;
  variant: 'fresh' | 'expiring' | 'expired';
} {
  const daysUntil = getDaysUntilExpiry(dateString);
  
  if (daysUntil < 0) {
    return { label: 'Expired', variant: 'expired' };
  } else if (daysUntil <= 3) {
    return { label: 'Expiring Soon', variant: 'expiring' };
  } else {
    return { label: 'Fresh', variant: 'fresh' };
  }
}