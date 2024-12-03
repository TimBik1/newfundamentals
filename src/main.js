// import { serve } from "https://deno.land/std/http/server.ts";
// import "https://deno.land/x/dotenv/load.ts";

// const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
// console.log (OPENAI_API_KEY);
// const fetchGPTResponse = async (prompt) => {
//   if (!OPENAI_API_KEY) {
//     console.error("Missing OpenAI API Key");
//     return "Error: No API Key";
//   }

//   const response = await fetch("https://api.openai.com/v1/completions", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${OPENAI_API_KEY}`,
//     },
//     body: JSON.stringify({
//       model: "text-davinci-003",
//       prompt: prompt,
//       max_tokens: 100,
//     }),
//   });

//   const data = await response.json();
//   return data.choices[0].text.trim();
// };

// const handler = async (req) => {
//   const url = new URL(req.url);

//   if (url.pathname === "/") {
//     const file = await Deno.readTextFile("./public/index.html");
//     return new Response(file, { headers: { "Content-Type": "text/html" } });
//   } else if (url.pathname.startsWith("/public")) {
//     try {
//       const filePath = `.${url.pathname}`;
//       const file = await Deno.readFile(filePath);
//       const contentType = filePath.endsWith(".css")
//         ? "text/css"
//         : filePath.endsWith(".js")
//         ? "application/javascript"
//         : "text/plain";
//       return new Response(file, { headers: { "Content-Type": contentType } });
//     } catch (e) {
//       return new Response("File not found", { status: 404 });
//     }
//   }

//   if (url.pathname === "/api/generate-budget" && req.method === "POST") {
//     const body = await req.json();
//     const { university, background, income, expenses } = body;

//     const prompt = `
//       Create a monthly budget for a student:
//       - University: ${university}
//       - Parents' Profession: ${background}
//       - Monthly Income: ${income || "unknown"}
//       - Monthly Expenses: ${expenses || "unknown"}

//       Provide a breakdown for Rent, Food, Fun, and Savings.
//     `;

//     // Get GPT response
//     const budget = await fetchGPTResponse(prompt);

//     return new Response(JSON.stringify({ budget }), {
//       headers: { "Content-Type": "application/json" },
//     });
//   }

//   // Return 404 for unknown routes
//   return new Response("Not Found", { status: 404 });
// };

// console.log("Server running on http://localhost:8000");
// serve(handler, { port: 8000 });

  

// import { Application, Router } from "https://deno.land/x/oak@v12.5.0/mod.ts";
// import "https://deno.land/x/dotenv/load.ts";

// // Load the OpenAI API key from environment variables
// const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

// if (!OPENAI_API_KEY) {
//   console.error("OpenAI API Key not found. Please add it to your .env file.");
// }

// // Function to call OpenAI API and get a GPT response
// const fetchGPTResponse = async (prompt) => {
//   if (!OPENAI_API_KEY) {
//     console.error("Missing OpenAI API Key");
//     return "Error: No API Key";
//   }

//   try {
//     const response = await fetch("https://api.openai.com/v1/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${OPENAI_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: "text-davinci-003",
//         prompt: prompt,
//         max_tokens: 100,
//       }),
//     });

//     if (!response.ok) {
//       console.error("OpenAI API Error:", await response.text());
//       return "Error: Failed to fetch GPT response";
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

// // Create a router for handling routes
// const router = new Router();

// // Serve the main HTML page
// router.get("/", async (ctx) => {
//   try {
//     ctx.response.headers.set("Content-Type", "text/html");
//     ctx.response.body = await Deno.readTextFile("./public/index.html");
//   } catch (error) {
//     console.error("Error serving index.html:", error);
//     ctx.response.status = 500;
//     ctx.response.body = "Internal Server Error";
//   }
// });

// // Serve static files (CSS, JS, etc.)
// router.get("/public/:file", async (ctx) => {
//   const filePath = `./public/${ctx.params.file}`;
//   try {
//     const file = await Deno.readFile(filePath);
//     const ext = filePath.split(".").pop();
//     const contentType =
//       ext === "css" ? "text/css" :
//       ext === "js" ? "application/javascript" :
//       "text/plain";

//     ctx.response.headers.set("Content-Type", contentType);
//     ctx.response.body = file;
//   } catch (error) {
//     console.error(`Error serving file ${filePath}:`, error);
//     ctx.response.status = 404;
//     ctx.response.body = "File not found";
//   }
// });

// // Handle the budget generation API
// router.post("/api/generate-budget", async (ctx) => {
//   try {
//     const body = ctx.request.body({ type: "json" });
//     const { university, background, income, expenses } = await body.value;

//     console.log("Received data:", { university, background, income, expenses });

//     if (!university || !background) {
//       ctx.response.status = 400;
//       ctx.response.body = { error: "Missing required fields" };
//       console.error("Error: Missing required fields");
//       return;
//     }

//     const prompt = `
//       Create a monthly budget for a student:
//       - University: ${university}
//       - Parents' Profession: ${background}
//       - Monthly Income: ${income || "unknown"}
//       - Monthly Expenses: ${expenses || "unknown"}

//       Provide a breakdown for Rent, Food, Fun, and Savings.
//     `;

//     console.log("Generated Prompt:", prompt);

//     // Attempt to get response from OpenAI API
//     const budget = await fetchGPTResponse(prompt);
//     console.log("GPT Response:", budget);

//     if (budget.startsWith("Error:")) {
//       ctx.response.status = 500;
//       ctx.response.body = { error: budget };
//       console.error("GPT Error:", budget);
//       return;
//     }

//     ctx.response.headers.set("Content-Type", "application/json");
//     ctx.response.body = { budget };
//   } catch (error) {
//     console.error("Error in /api/generate-budget:", error);
//     ctx.response.status = 500;
//     ctx.response.body = { error: "Internal Server Error" };
//   }
// });


// // Create the application and add the router
// const app = new Application();
// app.use(router.routes());
// app.use(router.allowedMethods());

// // Start the server
// console.log("Server running on http://localhost:8000");
// await app.listen({ port: 8000 });











// src/main.js

// Import the `load` function from the dotenv module
import { load } from "https://deno.land/std@0.200.0/dotenv/mod.ts";

// Load environment variables from the `.env` file
const env = await load();

// Optionally set the loaded environment variables into Deno.env
for (const [key, value] of Object.entries(env)) {
  Deno.env.set(key, value);
}

// Now import other modules that may use environment variables
import { Application } from "https://deno.land/x/oak@v12.5.0/mod.ts";
import router from "./routes.js";

// Create and configure the Oak application
const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

// Start the server
console.log("Server running on http://localhost:8000");
await app.listen({ port: 8000 });





