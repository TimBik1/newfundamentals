// const OPENAI_API_KEY = 

// export const fetchGPTResponse = async (prompt) => {
//   if (!OPENAI_API_KEY) {
//     console.error("Missing OpenAI API Key");
//     return "Error: No API Key";
//   }

//   try {
//     console.log("Sending Request to OpenAI API with prompt:", prompt);
//     const response = await fetch("https://api.openai.com/v1/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${OPENAI_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: "gpt-4-turbo", 
//         prompt: prompt,
//         max_tokens: 10000, 
//       }),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("OpenAI API Error:", errorText);
//       return `Error: Failed to fetch GPT response - ${response.status} - ${errorText}`;
//     }

//     const data = await response.json();
//     if (!data.choices || !data.choices.length) {
//       return "Error: GPT response is empty";
//     }

//     return data.choices[0].text.trim();
//   } catch (error) {
//     console.error("Error fetching GPT response:", error);
//     return "Error: Failed to fetch GPT response";
//   }
// };










// const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

// fetchGPT.js

export const fetchGPTResponse = async (prompt) => {
  const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

  if (!OPENAI_API_KEY) {
    console.error("Missing OpenAI API Key");
    return "Error: No API Key";
  } else {
    console.log("OpenAI API Key is loaded.");
  }

  try {
    console.log("Sending Request to OpenAI API with prompt:", prompt);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4-turbo", // Use the model you have access to
        messages: [
          { role: "system", content: "You are a helpful financial advisor." },
          { role: "user", content: prompt },
        ],
        max_tokens: 1000, // Adjust as needed within your token limits
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API Error:", errorText);
      return `Error: Failed to fetch GPT response - ${response.status} - ${errorText}`;
    }

    const data = await response.json();
    console.log("Full GPT Response Data:", data);

    if (!data.choices || data.choices.length === 0) {
      console.error("No choices in GPT response:", data);
      return "Error: GPT response is empty";
    }

    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error fetching GPT response:", error);
    return `Error: Failed to fetch GPT response - ${error.message}`;
  }
};


