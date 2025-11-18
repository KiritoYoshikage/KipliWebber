// ...existing code...
const uhOh = document.querySelectorAll(".uhOh");
const coolDiv = document.getElementById("cooldiv");
const buttons = document.querySelectorAll(".classic");
const gameBtns = document.querySelectorAll(".game");
let currColor = getComputedStyle(document.body).backgroundColor;

//--- Main Functionality ---//
function openMenu() {
  const currentDisplay = getComputedStyle(coolDiv).display;
  coolDiv.style.display = currentDisplay === "none" ? "block" : "none";
}

uhOh.forEach((element) => {
  element.addEventListener("click", (event) => {
    const uhOhBadone = event.currentTarget;
    const uhOhYouDidIt = getComputedStyle(uhOhBadone).backgroundColor;
    document.body.style.backgroundColor = uhOhYouDidIt;
    currColor = uhOhYouDidIt;

    woah123();
  });
});

//---misc Functionality for buttons---//

buttons.forEach((button) => {
  const doesWhat = button.dataset.does;
  button.addEventListener("click", (event) => {
    if (doesWhat === "bgBtn") {
      if (button.textContent === "cool right?") {
        button.textContent = "Click Me!";
      } else if (button.textContent === "Click Me!") {
        button.textContent = "cool right?";
      }
      openMenu();
    }
  });
});
//---for game button idk---//
gameBtns.forEach((button) => {
  const doesWhat = button.dataset.does;
  button.style.backgroundSize = "cover";
  button.style.backgroundRepeat = "no-repeat";
  button.style.backgroundPosition = "center";
  button.style.borderWidth = "4px";

  if (doesWhat === "revolvingAround") {
    button.style.backgroundImage = "url('revAro.png')";
  } else {
    button.style.backgroundImage = "url('lateron.png')";
  }

  button.addEventListener("click", (event) => {
    if (doesWhat === "revolvingAround") {
      window.open("https://kiritoyoshikage.github.io/revolvingaround/");
    } else {
      window.open("https://www.youtube.com/watch?v=xvFZjo5PgG0");
    }
  });

  button.addEventListener("mouseover", (event) => {
    button.style.cursor = "pointer";
    button.style.width = "455px";
    button.style.height = "305px";
  });

  button.addEventListener("mouseout", (event) => {
    button.style.width = "450px";
    button.style.height = "300px";
  });
});

function toComputedRgb(colorStr) {
  const el = document.createElement("div");
  el.style.color = colorStr;
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  const comp = getComputedStyle(el).color;
  document.body.removeChild(el);
  return comp;
}

function parseRgbString(rgbStr) {
  const m = rgbStr.match(
    /rgba?\s*\(\s*(\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\s*\)/i
  );
  if (!m) return null;
  return { r: +m[1], g: +m[2], b: +m[3], a: m[4] ? +m[4] : 1 };
}

function darkenColor(colorStr, amount = 0.15) {
  const comp = toComputedRgb(colorStr);
  const c = parseRgbString(comp);
  if (!c) return colorStr;
  const factor = Math.max(0, 1 - amount);
  const r = Math.round(c.r * factor);
  const g = Math.round(c.g * factor);
  const b = Math.round(c.b * factor);
  return `rgb(${r}, ${g}, ${b})`;
}

function woah123() {
  buttons.forEach((button) => {
    button.style.backgroundColor = currColor;
    button.style.borderColor = darkenColor(currColor, 0.2);
  });
}

woah123();
