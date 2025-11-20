const elt = document.getElementById("calculator");

const calculator = Desmos.GraphingCalculator(elt, {
  expressions: true,
  settingsMenu: false,
  zoomButtons: false,
  expressionsCollapsed: true
});

//old stuff
calculator.setExpression({
  id: "f",
  latex: "f(x)=x"
}); 