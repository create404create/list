document.getElementById("startBtn").addEventListener("click", startChecking);

async function startChecking() {
  const textarea = document.getElementById("numberList");
  const cleanList = document.getElementById("cleanList");
  const dncList = document.getElementById("dncList");
  const invalidList = document.getElementById("invalidList");
  const progressBar = document.getElementById("progressBar");

  cleanList.textContent = "";
  dncList.textContent = "";
  invalidList.textContent = "";

  const numbers = textarea.value.split("\n").map(n => n.trim()).filter(n => n);
  if (numbers.length === 0) return alert("Please enter at least one number!");

  for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];
    progressBar.style.width = `${((i + 1) / numbers.length) * 100}%`;

    try {
      const response = await fetch(`https://tcpa.api.uspeoplesearch.net/tcpa/v1?x=${num}`);
      const data = await response.json();

      // Classify result
      if (data.valid === false || data.error) {
        invalidList.textContent += `${num}\n`;
      } else if (data.dnc_national === true || data.dnc_state === true) {
        dncList.textContent += `${num}\n`;
      } else {
        cleanList.textContent += `${num}\n`;
      }
    } catch (err) {
      invalidList.textContent += `${num}\n`;
    }

    await new Promise(r => setTimeout(r, 500)); // slight delay for API rate limit
  }

  progressBar.style.width = "100%";
  alert("✅ Checking complete!");
}
