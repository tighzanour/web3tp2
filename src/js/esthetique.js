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
