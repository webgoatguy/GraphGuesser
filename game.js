// ----- LEVEL DATA -----
const LEVELS = {
  easy: [
    { name: "Easy 1", latex: "f(x)=\\sin(x)" },
    { name: "Easy 2", latex: "f(x)=x^2" },
    { name: "Easy 3", latex: "f(x)=\\cos(x)" }
  ],
  medium: [
    { name: "Medium 1", latex: "f(x)=x^3-2x" },
    { name: "Medium 2", latex: "f(x)=\\sin(x)+\\cos(x)" }
  ],
  hard: [
    { name: "Hard 1", latex: "f(x)=\\sin(2x)+0.5\\cos(3x)" },
    { name: "Hard 2", latex: "f(x)=x^3-x" }
  ],
  impossible: [
    { name: "Impossible 1", latex: "f(x)=\\sin(x^2)" }
  ]
};

// ----- DESMOS SETUP -----
const elt = document.getElementById("calculator");
let calculator = null;

function loadLevel(difficulty, index) {
  const levelList = LEVELS[difficulty];
  if (!levelList) return;

  const level = levelList[index];
  if (!level) return;

  // Clear existing expressions
  calculator.setExpressions([]);

  // Set a fixed viewport (you can tweak these numbers)
  calculator.setMathBounds({
    left: -10,
    right: 10,
    bottom: -10,
    top: 10
  });

  // Add the target function as a secret expression
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

    // Optional: clear other selects so only one is active
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

  // Hook up all four dropdowns
  setupDifficultySelect("easy-select", "easy");
  setupDifficultySelect("medium-select", "medium");
  setupDifficultySelect("hard-select", "hard");
  setupDifficultySelect("impossible-select", "impossible");

  // Optional: auto-load the first easy level when the page opens
  loadLevel("easy", 0);
}
