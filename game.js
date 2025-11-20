// level data
const LEVELS = {
  easy: [
    { name: "Bounce", latex: "f(x)=\\left|\\ln(x+1)\\right|" },
    { name: "Wobbly", latex: "f(x)=x^2+\\sin(2x)" },
    { name: "Jet", latex: "f(x)=\\ln\\left(\\left|2x\\right|\\right)" },
    { name: "Smooth", latex: "f(x)=x^3-4x" },
    { name: "Asymptote", latex: "f(x)=2^x-x" },
    { name: "Slide", latex: "f(x)=\\sin(2x)+x-\\pi" }
  ],
  medium: [
    { name: "Jittery", latex: "f(x)=\\frac{\\sin(x^2)}{x}" },
    { name: "Nonchalant", latex: "f(x)=\\frac{\\sin(x)}{x}+\\sqrt{x}+e^{-x}" },
    { name: "Vertical", latex: "f(x)=\\frac{\\sin(x)}{x^2}+x^2" },
    { name: "Ouch", latex: "f(x)=x+\\left|\\ln x\\right|-x^2" },
    { name: "Up Down", latex: "f(x)=e^x+e^{-x}-x^4" },
    { name: "Boring", latex: "f(x)=\\frac{e^x}{x}" },
    { name: "Double Bounce", latex: "f(x)=\\left| -\\left|e^x-1\\right|+1 \\right|" },
    { name: "Moire", latex: "f(x)=\\left| \\sin(x^2)\\sqrt{x} \\right|" },
    { name: "Familiar", latex: "f(x)=\\ln(x)+e^{-x}" }
  ],
  hard: [
    { name: "Diagonal", latex: "f(x)=\\left(1-x^3\\right)^{1/3}" },
    { name: "Bump", latex: "f(x)=x^(1-x)" },
    { name: "Checkmark", latex: "f(x)=(\\ln x)^2-e^{-x}" },
    { name: "Pits", latex: "f(x)=\\ln(\\sin x)" },
    { name: "Linear", latex: "f(x)=\\frac{\\sin(x)+\\sin(x^2)+\\sin(x^3)}{x}" },
    { name: "Quadratic", latex: "f(x)=e^{x^2}" },
    { name: "Up Up And Away", latex: "f(x)=x^{5/2}-e^x+x!" }
  ],
  impossible: [
    { name: "Ridiculousness", latex: "f(x)=\\sin(\\sqrt{x})^{\\sin(x)}" },
    { name: "Polite", latex: "f(x)=x!\\,e^{-x}\\ln(x)" },
    { name: "Impolite", latex: "f(x)=\\frac{\\sin(x^2)}{x}+x^2\\ln(x)" },
    { name: "Downright Rude", latex: "f(x)=x^{\\ln\\left(\\frac{1}{x}\\right)}+e^x+\\tan(x)" }
  ]
};

// desmos
const elt = document.getElementById("calculator");
let calculator = null;

function loadLevel(difficulty, index) {
  const levelList = LEVELS[difficulty];
  if (!levelList) return;

  const level = levelList[index];
  if (!level) return;

  calculator.setExpressions([]);

  calculator.setMathBounds({
    left: -10,
    right: 10,
    bottom: -10,
    top: 10
  });

  calculator.setExpression({
    id: "target",
    latex: level.latex,
    secret: true
  });

  console.log(`Loaded ${difficulty} level ${index}: ${level.latex}`);
}

function setupDifficultySelect(selectId, difficulty) {
  const select = document.getElementById(selectId);
  if (!select) return;

  select.addEventListener("change", () => {
    const value = select.value;
    if (value === "") return;

    const index = Number(value);
    loadLevel(difficulty, index);

    ["easy-select", "medium-select", "hard-select", "impossible-select"]
      .filter(id => id !== selectId)
      .forEach(id => {
        const other = document.getElementById(id);
        if (other) other.value = "";
      });
  });
}

if (elt) {
  calculator = Desmos.GraphingCalculator(elt, {
    expressions: true,
    expressionsCollapsed: false,
    settingsMenu: false,
    zoomButtons: false
  });

  setupDifficultySelect("easy-select", "easy");
  setupDifficultySelect("medium-select", "medium");
  setupDifficultySelect("hard-select", "hard");
  setupDifficultySelect("impossible-select", "impossible");

  loadLevel("easy", 0);
}
