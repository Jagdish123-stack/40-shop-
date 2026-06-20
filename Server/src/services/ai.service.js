const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// AI Listing Optimizer
const optimizeListing = async (productData) => {
  const { name, description, category, price, unit } = productData;

  const prompt = `
You are a B2B marketplace product listing expert for Indian MSMEs.
Optimize this product listing for better visibility and sales.

Current listing:
- Name: ${name}
- Description: ${description}
- Category: ${category}
- Price: ₹${price}/${unit}

Return ONLY a valid JSON object with no extra text:
{
  "optimizedTitle": "SEO friendly title",
  "optimizedDescription": "Detailed buyer friendly description",
  "tags": ["tag1", "tag2", "tag3"],
  "hsnCode": "HSN code",
  "suggestedCategory": "category"
}
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  return JSON.parse(response.choices[0].message.content);
};

// Vernacular Search Assistant
const processSearchQuery = async (query, language = "hindi") => {
  const prompt = `
You are a B2B marketplace search assistant for Indian MSMEs.
Extract product search intent from this query in ${language}.

Query: "${query}"

Return ONLY a valid JSON object with no extra text:
{
  "keyword": "product name in English",
  "quantity": "quantity if mentioned or null",
  "unit": "unit if mentioned or null",
  "location": "city/state if mentioned or null",
  "budget": "budget if mentioned or null",
  "category": "one of: Textiles, FMCG, Agri, Pharma, Electronics, Machinery or null",
  "responseMessage": "friendly response in same language as query"
}
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  return JSON.parse(response.choices[0].message.content);
};

// Demand Prediction
const predictDemand = async (productName, category) => {
  const prompt = `
You are a B2B market analyst for Indian MSMEs.
Predict demand trends for this product.

Product: ${productName}
Category: ${category}
Current Month: ${new Date().toLocaleString("en-IN", { month: "long" })}

Return ONLY a valid JSON object with no extra text:
{
  "demandTrend": "increasing/decreasing/stable",
  "percentageChange": 25,
  "reason": "reason in simple English",
  "bestTimeToSell": "festival/season name",
  "priceRecommendation": "increase/decrease/maintain",
  "insight": "one line insight for vendor"
}
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  return JSON.parse(response.choices[0].message.content);
};

// Photo to Product Search
const identifyProductFromImage = async (base64Image, mimeType) => {
  const response = await groq.chat.completions.create({
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: {
              url: `data:${mimeType};base64,${base64Image}`,
            },
          },
          {
            type: "text",
            text: `You are a B2B product identification expert for Indian MSMEs.
Identify this product and return ONLY a valid JSON object:
{
  "productName": "product name in English",
  "category": "one of: Textiles, FMCG, Agri, Pharma, Electronics, Machinery",
  "description": "brief product description",
  "searchKeyword": "best keyword to search this product",
  "confidence": "high/medium/low"
}`,
          },
        ],
      },
    ],
    response_format: { type: "json_object" },
  });

  return JSON.parse(response.choices[0].message.content);
};

module.exports = {
  optimizeListing,
  processSearchQuery,
  predictDemand,
  identifyProductFromImage,
};