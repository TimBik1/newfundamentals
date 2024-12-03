// import { Router } from "https://deno.land/x/oak@v12.5.0/mod.ts";
// import { fetchGPTResponse } from "./fetchGPT.js";

// const router = new Router();

// router.get("/", async (ctx) => {
//     try {
//       ctx.response.headers.set("Content-Type", "text/html");
//       ctx.response.body = await Deno.readTextFile("./public/index.html");
//     } catch (error) {
//       console.error("Error serving index.html:", error);
//       ctx.response.status = 500;
//       ctx.response.body = "Internal Server Error";
//     }
//   });   

// // Handle the budget generation API
// router.post("/api/generate-budget", async (ctx) => {
//   console.log("Received request at /api/generate-budget");
//   try {
//     const body = ctx.request.body({ type: "json" });
//     const {
//       university,
//       yearOfStudy,
//       livingSituation,
//       background,
//       income,
//       expenses,
//       financialKnowledge,
//       lifestylePreferences,
//       parentalSupport
//     } = await body.value;

//     console.log("Received Data:", { university, yearOfStudy, livingSituation, background, income, expenses, financialKnowledge, lifestylePreferences, parentalSupport });

//     if (!university || !background) {
//       ctx.response.status = 400;
//       ctx.response.body = { error: "Missing required fields" };
//       console.error("Error: Missing required fields");
//       return;
//     }

//     const prompt = `
//     You are a financial advisor helping a college student create a monthly budget. The student has provided the following information:
//     - University: ${university}
//     - Year of Study: ${yearOfStudy}
//     - Living Situation: ${livingSituation}
//     - Monthly Income Sources: ${income}
//     - Monthly Expenses (if known): ${expenses || "unknown"}
//     - Financial Knowledge Level: ${financialKnowledge}
//     - Lifestyle Preferences: ${lifestylePreferences}
//     - Parental Support: ${parentalSupport}

//     Based on this information, please generate a detailed monthly budget that includes categories like Rent, Food, Transportation, Fun, and Savings. Include advice for how they can improve their spending habits to save money.
//     `;

//     console.log("Generated Prompt:", prompt);

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

// export default router;











// routes.js
import { Router, send } from "https://deno.land/x/oak@v12.5.0/mod.ts";
import { fetchGPTResponse } from "./fetchGPT.js";

const router = new Router();

// Serve index.html at the root path
router.get("/", async (ctx) => {
  try {
    ctx.response.headers.set("Content-Type", "text/html");
    ctx.response.body = await Deno.readTextFile("./public/index.html");
  } catch (error) {
    console.error("Error serving index.html:", error);
    ctx.response.status = 500;
    ctx.response.body = "Internal Server Error";
  }
});

// Serve static files from /public/*
router.get("/public/:path+", async (ctx) => {
  try {
    const path = ctx.params.path;
    await send(ctx, path, {
      root: `${Deno.cwd()}/public`,
      index: "index.html",
    });
  } catch (error) {
    console.error("Error serving static file:", error);
    ctx.response.status = 404;
    ctx.response.body = "File Not Found";
  }
});

// routes.js (Add more console logs)
router.post("/api/generate-budget", async (ctx) => {
  console.log("Received request at /api/generate-budget");
  try {
    const body = ctx.request.body({ type: "json" });
    const {
      university,
      yearOfStudy,
      livingSituation,
      background,
      income,
      expenses,
      financialKnowledge,
      lifestylePreferences,
      parentalSupport
    } = await body.value;

    console.log("Received Data:", { university, yearOfStudy, livingSituation, background, income, expenses, financialKnowledge, lifestylePreferences, parentalSupport });

    if (!university || !background) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Missing required fields" };
      console.error("Error: Missing required fields");
      return;
    }

    const prompt = `
    You are a financial advisor helping a college student create a monthly budget. The student has provided the following information:
    - University: ${university}
    - Year of Study: ${yearOfStudy}
    - Living Situation: ${livingSituation}
    - Monthly Income Sources: ${income}
    - Monthly Expenses (if known): ${expenses || "unknown"}
    - Financial Knowledge Level: ${financialKnowledge}
    - Lifestyle Preferences: ${lifestylePreferences}
    - Parental Support: ${parentalSupport}

    Based on this information, please generate a detailed monthly budget that includes categories like Rent, Food, Transportation, Fun, and Savings. Include advice for how they can improve their spending habits to save money.
    `;

    console.log("Generated Prompt:", prompt);

    const budget = await fetchGPTResponse(prompt);
    console.log("GPT Response:", budget);

    if (budget.startsWith("Error:")) {
      ctx.response.status = 500;
      ctx.response.body = { error: budget };
      console.error("GPT Error:", budget);
      return;
    }

    ctx.response.headers.set("Content-Type", "application/json");
    ctx.response.body = { budget };
  } catch (error) {
    console.error("Error in /api/generate-budget:", error);
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal Server Error" };
  }
});

export default router;
