// document.getElementById("spending").addEventListener("change", function () {
//     const spendingDetails = document.getElementById("spendingDetails");
//     if (this.value === "yes") {
//       spendingDetails.style.display = "block";
//     } else {
//       spendingDetails.style.display = "none";
//     }
//   });
  
//   document.getElementById("questionnaireForm").addEventListener("submit", async function (e) {
//     e.preventDefault();
  
//     const university = document.getElementById("university").value;
//     const background = document.getElementById("background").value;
//     const spending = document.getElementById("spending").value;
//     const income = document.getElementById("income").value || "unknown";
//     const expenses = document.getElementById("expenses").value || "unknown";
  
//     const response = await fetch("/api/generate-budget", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ university, background, spending, income, expenses }),
//     });
  
//     const data = await response.json();
//     document.getElementById("budgetOutput").style.display = "block";
//     document.getElementById("budgetDetails").innerText = data.budget;
//   });





// document.getElementById("spending").addEventListener("change", function () {
//   const spendingDetails = document.getElementById("spendingDetails");
//   // Show spending details if the user selects "yes", hide otherwise
//   if (this.value === "yes") {
//     spendingDetails.style.display = "block";
//   } else {
//     spendingDetails.style.display = "none";
//   }
// });

// document.getElementById("questionnaireForm").addEventListener("submit", async function (e) {
//   e.preventDefault();

//   const university = document.getElementById("university").value.trim();
//   const background = document.getElementById("background").value.trim();
//   const income = document.getElementById("income").value.trim() || "unknown";
//   const expenses = document.getElementById("expenses").value.trim() || "unknown";

//   console.log("Sending data to API:", { university, background, income, expenses });

//   try {
//     const response = await fetch("/api/generate-budget", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ university, background, income, expenses }),
//     });

//     const data = await response.json();
//     console.log("API Response:", data);

//     // Handle server response errors
//     if (!response.ok) {
//       console.error("API Error:", data.error);
//       document.getElementById("budgetOutput").style.display = "block";
//       document.getElementById("budgetDetails").innerText = "Error: " + data.error;
//       return;
//     }

//     // Display the budget output
//     document.getElementById("budgetOutput").style.display = "block";
//     document.getElementById("budgetDetails").innerText = data.budget;
//   } catch (error) {
//     console.error("Error in script.js:", error);
//     document.getElementById("budgetOutput").style.display = "block";
//     document.getElementById("budgetDetails").innerText = "There was an error generating your budget. Please try again later.";
//   }
// });




// document.getElementById("spending").addEventListener("change", function () {
//   const spendingDetails = document.getElementById("spendingDetails");
//   // Show spending details if the user selects "yes", hide otherwise
//   if (this.value === "yes") {
//     spendingDetails.style.display = "block";
//   } else {
//     spendingDetails.style.display = "none";
//   }
// });

// document.getElementById("questionnaireForm").addEventListener("submit", async function (e) {
//   e.preventDefault();

//   // Collect form data
//   const university = document.getElementById("university").value.trim();
//   const yearOfStudy = document.getElementById("yearOfStudy").value.trim();
//   const livingSituation = document.querySelector('input[name="livingSituation"]:checked').value;
//   const background = document.getElementById("background").value.trim();
//   const income = document.getElementById("income").value.trim() || "unknown";
//   const expenses = document.getElementById("expenses").value.trim() || "unknown";
//   const financialKnowledge = document.querySelector('input[name="financialKnowledge"]:checked').value;
//   const lifestylePreferences = document.getElementById("lifestylePreferences").value.trim();
//   const parentalSupport = document.getElementById("parentalSupport").value.trim() || "unknown";

//   if (!university || !background) {
//     document.getElementById("budgetOutput").style.display = "block";
//     document.getElementById("budgetDetails").innerText = "Error: University and Background are required fields.";
//     return;
//   }

//   console.log("Sending data to API:", { university, yearOfStudy, livingSituation, background, income, expenses, financialKnowledge, lifestylePreferences, parentalSupport });

//   try {
//     const response = await fetch("/api/generate-budget", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         university,
//         yearOfStudy,
//         livingSituation,
//         background,
//         income,
//         expenses,
//         financialKnowledge,
//         lifestylePreferences,
//         parentalSupport,
//       }),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("API Error:", errorText);
//       document.getElementById("budgetOutput").style.display = "block";
//       document.getElementById("budgetDetails").innerText = `Error: ${response.status} - ${errorText}`;
//       return;
//     }

//     const data = await response.json();
//     console.log("API Response:", data);

//     document.getElementById("budgetOutput").style.display = "block";
//     document.getElementById("budgetDetails").innerText = data.budget;
//   } catch (error) {
//     console.error("Error in script.js:", error);
//     document.getElementById("budgetOutput").style.display = "block";
//     document.getElementById("budgetDetails").innerText = "There was an error generating your budget. Please try again later.";
//   }
// });











// public/script.js

console.log("script.js loaded successfully.");

document.getElementById("spending").addEventListener("change", function () {
  const spendingDetails = document.getElementById("spendingDetails");
  // Show spending details if the user selects "yes", hide otherwise
  if (this.value === "yes") {
    spendingDetails.style.display = "block";
  } else {
    spendingDetails.style.display = "none";
  }
});

document.getElementById("questionnaireForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  console.log("Form submission triggered.");

  // Collect form data
  const university = document.getElementById("university").value.trim();
  const yearOfStudy = document.getElementById("yearOfStudy").value.trim();
  const livingSituation = document.querySelector('input[name="livingSituation"]:checked').value;
  const background = document.getElementById("background").value.trim();
  const income = document.getElementById("income").value.trim() || "unknown";
  const expenses = document.getElementById("expenses").value.trim() || "unknown";
  const financialKnowledge = document.querySelector('input[name="financialKnowledge"]:checked').value;
  const lifestylePreferences = document.getElementById("lifestylePreferences").value.trim();
  const parentalSupport = document.getElementById("parentalSupport").value.trim() || "unknown";

  if (!university || !background) {
    console.error("Error: University and Background are required fields.");
    document.getElementById("budgetOutput").style.display = "block";
    document.getElementById("budgetDetails").innerText = "Error: University and Background are required fields.";
    return;
  }

  console.log("Sending data to API:", { university, yearOfStudy, livingSituation, background, income, expenses, financialKnowledge, lifestylePreferences, parentalSupport });

  try {
    const response = await fetch("/api/generate-budget", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        university,
        yearOfStudy,
        livingSituation,
        background,
        income,
        expenses,
        financialKnowledge,
        lifestylePreferences,
        parentalSupport,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      document.getElementById("budgetOutput").style.display = "block";
      document.getElementById("budgetDetails").innerText = `Error: ${response.status} - ${errorText}`;
      return;
    }

    const data = await response.json();
    console.log("API Response:", data);

    document.getElementById("budgetOutput").style.display = "block";
    document.getElementById("budgetDetails").innerText = data.budget;
  } catch (error) {
    console.error("Error in script.js:", error);
    document.getElementById("budgetOutput").style.display = "block";
    document.getElementById("budgetDetails").innerText = "There was an error generating your budget. Please try again later.";
  }
});
