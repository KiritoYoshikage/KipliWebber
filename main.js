// ...existing code...
const uhOh = document.querySelectorAll(".uhOh");
const coolDiv = document.getElementById("cooldiv");
const buttons = document.querySelectorAll('.classic');
let currColor = getComputedStyle(document.body).backgroundColor;

//--- Main Functionality ---//

function openMenu() {
    const currentDisplay = getComputedStyle(coolDiv).display;
    coolDiv.style.display = (currentDisplay === "none") ? "block" : "none";
    if (currentDisplay === "none") {
        bgBtn.textContent = "Cool right?";
    } else {
        bgBtn.textContent = "Click Me!";
    }
}

uhOh.forEach(element => {
    element.addEventListener("click", (event) => {
        const uhOhBadone = event.currentTarget;
        const uhOhYouDidIt = getComputedStyle(uhOhBadone).backgroundColor;
        document.body.style.backgroundColor = uhOhYouDidIt;
        currColor = uhOhYouDidIt;

        woah123();
    });
});

//---misc Functionality for buttons---//

buttons.forEach(button => {
    const doesWhat = button.dataset.does;
    if (doesWhat === "bgBtn") {
        button.addEventListener("click", openMenu);
    }
});

function toComputedRgb(colorStr) {
    const el = document.createElement('div');
    el.style.color = colorStr;
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    const comp = getComputedStyle(el).color;
    document.body.removeChild(el);
    return comp;
}

function parseRgbString(rgbStr) {
    const m = rgbStr.match(/rgba?\s*\(\s*(\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\s*\)/i);
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

function woah123(){
    buttons.forEach(button => {
        button.style.backgroundColor = currColor;
        button.style.borderColor = darkenColor(currColor, 0.20);
    });
}

woah123();
