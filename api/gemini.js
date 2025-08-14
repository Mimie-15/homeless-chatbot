<script>
  const GEMINI_API_KEY = "AIzaSyAowYeljkYcnn7yvr_6WPg5P73cd_M3ylM";
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

  async function sendMessage(message) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }]
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    return data.candidates[0].content.parts[0].text;
  }
</script>
