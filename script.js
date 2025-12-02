document.getElementById("startBtn").addEventListener("click", startChecking);

async function startChecking() {
  const numbers = document.getElementById("numberList").value
    .split("\n").map(n => n.trim()).filter(n => n);
  if (numbers.length === 0) { alert("Please enter at least one number!"); return; }

  const clean = document.getElementById("cleanList"),
        dnc = document.getElementById("dncList"),
        bad = document.getElementById("invalidList"),
        bar = document.getElementById("progressBar");

  clean.textContent = dnc.textContent = bad.textContent = "";

  for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];
    bar.style.width = ((i+1)/numbers.length*100) + "%";

    try {
      // Change this URL to your PHP/Node proxy hosted on Bluehost or Vercel/Render
      const response = await fetch(`https://YOUR-PROXY-DOMAIN/proxy.php?number=${encodeURIComponent(num)}`);
      const data = await response.json();

      if (!data || data.error || data.valid === false) {
        bad.textContent += num + "\n";
      } else if (data.dnc_national === true || data.dnc_state === true) {
        dnc.textContent += num + "\n";
      } else {
        clean.textContent += num + "\n";
      }
    } catch(e) {
      bad.textContent += num + "\n";
    }

    await new Promise(r => setTimeout(r, 500)); // API rate limit delay
  }
  bar.style.width = "100%";
  alert("✅ Checking complete!");
}
