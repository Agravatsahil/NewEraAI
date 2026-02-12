import fetch from "node-fetch";

async function testRoute() {
  try {
    const response = await fetch("http://localhost:8080/api/ai/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: "What is the capital of gujarat?"
      }),
    });

    const data = await response.json();
    console.log("Status:", response.status);
    console.log("Response:", data);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

testRoute();
