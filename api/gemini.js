<script>
  // ❗ คีย์นี้อย่าแชร์ต่อสาธารณะ
  const GEMINI_API_KEY = "AIzaSyAowYeljkYcnn7yvr_6WPg5P73cd_M3ylM";
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

  const chat = document.getElementById("chat");
  const input = document.getElementById("userInput");

  function appendMessage(text, sender) {
    const div = document.createElement("div");
    div.className = sender; // 'user' หรือ 'bot'
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
  }

  async function sendMessage() {
    const msg = input.value.trim();
    if (!msg) return;

    appendMessage(msg, "user");
    input.value = "";
    const thinkingEl = document.createElement("div");
    thinkingEl.className = "bot";
    thinkingEl.textContent = "กำลังคิดคำตอบ...";
    chat.appendChild(thinkingEl);
    chat.scrollTop = chat.scrollHeight;

    try {
      const resp = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: msg }] }]
        })
      });

      // แปลงผลลัพธ์ก่อน
      const data = await resp.json();

      // ถ้ามี error จาก API ให้โชว์ข้อความชัด ๆ
      if (!resp.ok) {
        const detail = data?.error?.message || `${resp.status} ${resp.statusText}`;
        thinkingEl.remove();
        appendMessage("ขออภัย เกิดข้อผิดพลาด: " + detail, "bot");
        console.error("Gemini error:", data);
        return;
      }

      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "ขออภัย ระบบยังไม่พบคำตอบ";
      thinkingEl.remove();
      appendMessage(reply, "bot");
    } catch (e) {
      thinkingEl.remove();
      appendMessage("ขออภัย เกิดข้อผิดพลาดในการเชื่อมต่อ", "bot");
      console.error(e);
    }
  }

  // ข้อความต้อนรับ
  window.onload = () => {
    appendMessage("👋 สวัสดีค่ะ ฉันคือ AI Chatbot สำหรับให้ความรู้เรื่องคนไร้บ้านในไทย พิมพ์คำถามเข้ามาได้เลยค่ะ", "bot");
  };
</script>
