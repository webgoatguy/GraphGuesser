const elt = document.getElementById("calculator");

const calculator = Desmos.GraphingCalculator(elt, {
  expressions: true,
  settingsMenu: false,
  zoomButtons: false,
  expressionsCollapsed: true
});

// Example: draw a function
calculator.setExpression({
  id: "f",
  latex: "f(x)=\\sin(x)"
}); 