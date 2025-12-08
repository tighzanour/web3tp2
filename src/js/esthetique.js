// CECI N'EST PAS TOTALEMENT MON CODE, J'AI FAIT QUELQUES MODIFICATIONS SEULEMENT

//____________

// fond d'écran style matrix
const canvas = document.getElementById("matrix-bg");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const characters = "0123456789アイウエオカキクケコサシスセソタチツテトナニヌネノ";

const columnCount = Math.floor(canvas.width / 20);
const lines = Array.from({ length: columnCount }, () => {
  const size = Math.random() * 1.5 + 0.5;
  return {
    y: Math.random() * canvas.height,
    speed: 0.2 + Math.random() * 0.3,
    size: size,
    line: Array.from({ length: Math.floor(Math.random() * 7 + 4) }, () => characters.charAt(Math.floor(Math.random() * characters.length))),
  };
});

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < lines.length; i++) {
    const f = lines[i];
    ctx.font = `${20 * f.size}px monospace`;
    for (let j = 0; j < f.line.length; j++) {
      const char = f.line[j];
      ctx.fillStyle = `rgba(255,0,0,${0.6 - j * 0.05})`;
      ctx.fillText(char, i * 20, f.y - j * 20 * f.size);
    }
    f.y += f.speed * f.size * 5;
    if (f.y - f.line.length * 20 * f.size > canvas.height) {
      f.y = -Math.random() * 200;
      f.line = Array.from({ length: Math.floor(Math.random() * 7 + 4) }, () => characters.charAt(Math.floor(Math.random() * characters.length)));
      f.size = Math.random() * 1.5 + 0.5;
      f.speed = 0.2 + Math.random() * 0.3;
    }
  }

  requestAnimationFrame(drawMatrix);
}

drawMatrix();
//____________

// module data
const dataModule = document.querySelector(".data");
const progressBar = dataModule.querySelector(".progress-bar");
const percentText = dataModule.querySelector(".percent");
const fileText = document.createElement("div");
fileText.style.fontSize = "14px";
fileText.style.marginTop = "5px";
fileText.style.fontFamily = "monospace";
dataModule.appendChild(fileText);

let progress = 0;

const barPadding = 10;

function setupRandomDownload() {
  progress = 0;
  progressBar.style.borderRadius = "0px";
  progressBar.style.backgroundColor = "red";
  progressBar.style.height = "20px";
  progressBar.style.width = `0px`;
  progressBar.style.position = "relative";
  progressBar.style.left = `${barPadding}px`;
  fileText.textContent = randomFileName();
}

const maxBarWidth = dataModule.clientWidth - 2 * barPadding;

const matrixChars = "abcdefgABCDEFGアイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789_VON";

function randomFileName() {
  const len = Math.floor(Math.random() * 8 + 4);
  let name = "";
  for (let i = 0; i < len; i++) {
    name += matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
  }
  return name + ".bin";
}

function updateProgress() {
  progress += 0.002 + Math.random() * 0.002;
  if (progress >= 1) {
    setupRandomDownload();
  }
  progressBar.style.width = `${Math.floor(progress * maxBarWidth)}px`;
  percentText.textContent = `${Math.floor(progress * 100)}%`;
  if (Math.floor(progress * 100) % 10 === 0) {
    fileText.textContent = randomFileName();
  }
  requestAnimationFrame(updateProgress);
}

setupRandomDownload();
updateProgress();

//__________

// module crypto
const cryptoDiv = document.querySelector(".crypto");

const txContainer = document.createElement("div");
txContainer.classList.add("transactions-container");
cryptoDiv.appendChild(txContainer);

const cryptoSymbols = ["BTC", "ETH", "SOL", "ADA", "DOGE"];
let cryptoTransactions = [];

function addCryptoTransaction() {
  const symbol = cryptoSymbols[Math.floor(Math.random() * cryptoSymbols.length)];
  const amount = (Math.random() * 1000).toFixed(2);
  const gain = Math.random() < 0.7;
  cryptoTransactions.push({ symbol, amount, gain });

  if (cryptoTransactions.length > 6) cryptoTransactions.shift();

  renderCryptoTransactions();
}

function renderCryptoTransactions() {
  txContainer.innerHTML = "暗号資産";
  cryptoTransactions.forEach((tx) => {
    const txSpan = document.createElement("span");
    txSpan.textContent = `${tx.symbol}: ${tx.gain ? "+" : "-"}${tx.amount}`;
    txSpan.style.color = tx.gain ? "white" : "red";
    txContainer.appendChild(txSpan);
  });
}

// boucle rapide
setInterval(addCryptoTransaction, 100);

const balanceEl = document.getElementById("balance");

let balance = 100;

function updateBalance() {
  const up = Math.random() < 0.8;
  const variation = Math.floor(Math.random() * 145000) + 5000;

  balance += up ? variation : -variation;
  if (balance < 0) balance = 0;

  balanceEl.textContent = `$${balance.toLocaleString()}`;
}
setInterval(updateBalance, 50);

// lignes rouges
const linkCanvas = document.getElementById("links");
const lctx = linkCanvas.getContext("2d");

function resizeLinks() {
  linkCanvas.width = window.innerWidth;
  linkCanvas.height = window.innerHeight;
}
resizeLinks();
window.addEventListener("resize", resizeLinks);
const moduleSelectors = [".crypto", ".balance", ".graph", ".map", ".data", ".visualizer"];

function getCenterRect(el) {
  const r = el.getBoundingClientRect();
  return {
    x: r.left + r.width / 2,
    y: r.top + r.height / 2,
  };
}

function drawModuleLinks() {
  lctx.clearRect(0, 0, linkCanvas.width, linkCanvas.height);
  lctx.strokeStyle = "rgba(255,0,0,0.7)";
  lctx.lineWidth = 1;

  const modules = moduleSelectors.map((sel) => document.querySelector(sel)).filter((el) => el !== null);

  lctx.beginPath();

  for (let i = 0; i < modules.length - 1; i++) {
    const a = getCenterRect(modules[i]);
    const b = getCenterRect(modules[i + 1]);

    lctx.moveTo(a.x, a.y);
    lctx.lineTo(b.x, b.y);
  }

  lctx.stroke();
}

function animateLinks() {
  drawModuleLinks();
  requestAnimationFrame(animateLinks);
}
animateLinks();

// curseur
const cursor = document.getElementById("cursor");

let mouseX = 0;
let mouseY = 0;

let cursorX = 0;
let cursorY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// smooth
function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.06;
  cursorY += (mouseY - cursorY) * 0.06;

  cursor.style.left = cursorX + "px";
  cursor.style.top = cursorY + "px";

  requestAnimationFrame(animateCursor);
}

animateCursor();
