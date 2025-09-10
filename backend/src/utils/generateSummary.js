import fetch from "node-fetch";

export async function generateSummaryHuggingFace(text, length = "medium") {
  try {
    // Check if API key is available
    if (!process.env.HF_API_KEY) {
      console.error("HF_API_KEY not found in environment variables");
      return "Summary service not configured. Please set HF_API_KEY environment variable.";
    }

    // Check if text is available
    if (!text || text.trim().length === 0) {
      return "No text available for summarization.";
    }

    let min_length = 40;
    let max_length = 150;

    // adjust lengths based on dropdown choice
    if (length === "short") {
      min_length = 20;
      max_length = 60;
    } else if (length === "long") {
      min_length = 100;
      max_length = 250;
    }

    console.log(`Generating ${length} summary for text of length: ${text.length}`);

    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: text,
          parameters: {
            min_length,
            max_length,
            do_sample: false,
          },
        }),
      }
    );

    if (!response.ok) {
      console.error("Hugging Face API error:", response.status, response.statusText);
      return `API Error: ${response.status} - ${response.statusText}`;
    }

    const result = await response.json();
    
    if (Array.isArray(result) && result.length > 0 && result[0].summary_text) {
      return result[0].summary_text;
    } else if (result.error) {
      console.error("Hugging Face API returned error:", result.error);
      return `API Error: ${result.error}`;
    } else {
      console.error("Unexpected response format:", result);
      return "Summary not available due to unexpected response format.";
    }
  } catch (error) {
    console.error("Error in generateSummaryHuggingFace:", error);
    return `Error generating summary: ${error.message}`;
  }
}
