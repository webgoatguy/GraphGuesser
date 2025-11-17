// Find the calculator div
const elt = document.getElementById("calculator");

if (elt) {
  const calculator = Desmos.GraphingCalculator(elt, {
    expressions: true,
    settingsMenu: false,
    zoomButtons: false,
    expressionsCollapsed: true
  });

  // Example function for now
  calculator.setExpression({
    id: "f",
    latex: "f(x)=\\sin(x)"
  });

  // TODO: later we’ll add:
  // - random function generator
  // - guess input
  // - reveal button, scoring, etc.
}
