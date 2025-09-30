export function getItemStatus(expiryDate: string) {
    const currentDate = new Date();
    const expiry = new Date(expiryDate);
    const timeDiff = expiry.getTime() - currentDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysDiff < 0) {
        return {label: "Expired", color: "text-red-600"};
    } else if (daysDiff <= 30) {
        return {label: "Expiring Soon", color: "text-yellow-600"};
    } else {
        return {label: "Healthy", color: "text-green-600"};
    }
}