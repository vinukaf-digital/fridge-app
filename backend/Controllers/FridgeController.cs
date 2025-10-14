using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.Json;

[ApiController]
[Route("api/[controller]")]
public class FridgeController : ControllerBase
{
    private readonly HttpClient _httpClient;
    private readonly string _externalApiUrl = "https://thefridge-api.karapincha.io";

    public FridgeController(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    // GET /api/fridge
    [HttpGet]
    public async Task<IActionResult> GetAllItems()
    {
        try
        {
            var response = await _httpClient.GetAsync($"{_externalApiUrl}/fridge");

            if (!response.IsSuccessStatusCode)
                return StatusCode((int)response.StatusCode, "Error fetching items from external API");

            var content = await response.Content.ReadAsStringAsync();
            return Ok(JsonDocument.Parse(content).RootElement);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    // GET /api/fridge/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetItemById(string id)
    {
        try
        {
            var response = await _httpClient.GetAsync($"{_externalApiUrl}/fridge/{id}");

            if (!response.IsSuccessStatusCode)
                return StatusCode((int)response.StatusCode, "Error fetching item from external API");

            var content = await response.Content.ReadAsStringAsync();
            return Ok(JsonDocument.Parse(content).RootElement);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    // POST /api/fridge
    [HttpPost]
    public async Task<IActionResult> AddItem([FromBody] object item)
    {
        try
        {
            var jsonContent = new StringContent(
                JsonSerializer.Serialize(item),
                Encoding.UTF8,
                "application/json"
            );

            var response = await _httpClient.PostAsync($"{_externalApiUrl}/fridge", jsonContent);

            if (!response.IsSuccessStatusCode)
                return StatusCode((int)response.StatusCode, "Error creating item in external API");

            var content = await response.Content.ReadAsStringAsync();
            return Ok(JsonDocument.Parse(content).RootElement);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    // PUT /api/fridge/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateItem(string id, [FromBody] object item)
    {
        try
        {
            var jsonContent = new StringContent(
                JsonSerializer.Serialize(item),
                Encoding.UTF8,
                "application/json"
            );

            var response = await _httpClient.PutAsync($"{_externalApiUrl}/fridge/{id}", jsonContent);

            if (!response.IsSuccessStatusCode)
                return StatusCode((int)response.StatusCode, "Error updating item in external API");

            var content = await response.Content.ReadAsStringAsync();
            return Ok(JsonDocument.Parse(content).RootElement);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    // DELETE /api/fridge/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteItem(string id)
    {
        try
        {
            var response = await _httpClient.DeleteAsync($"{_externalApiUrl}/fridge/{id}");

            if (!response.IsSuccessStatusCode)
                return StatusCode((int)response.StatusCode, "Error deleting item from external API");

            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}