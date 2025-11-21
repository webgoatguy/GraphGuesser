const exportButton = document.getElementById("export-button");
const popup = document.getElementById("export-popup");
const exportCodeSpan = document.getElementById("export-code");
const exportCopyButton = document.getElementById("export-copy");
const exportCloseButton = document.getElementById("export-close");

exportCloseButton.addEventListener("click", e => {
    popup.classList.add("hidden");
});

exportCopyButton.addEventListener("click", e => {
    const code = exportCodeSpan.textContent;
    navigator.clipboard.writeText(code).then(() => {
        exportCopyButton.textContent = "copied!";
    }).catch(err => {
        exportCopyButton.textContent = "failed";
        console.error("Failed to copy text: ", err);
    }).finally(() => {
        setTimeout(() => {
            exportCopyButton.textContent = "copy";
        }, 2000);
    });
});

exportButton.addEventListener("click", e => {
    exportLevel();
});
// desmos
const elt = document.getElementById("calculator");
let calculator = null;

function encodeLevelData(data) {
  const bytes = new TextEncoder().encode(data);
  return "1" + btoa(String.fromCodePoint(...bytes.map(c => (c + bytes.length) % 256)));
}

function exportLevel() {
    const expressions = calculator.getExpressions();
    const target = expressions.find(e => e.id === "export");
    if (!target) {
        console.error("No expression with id 'export' found.");
        initialise();
        return;
    }
    const latex = target.latex;
    const encoded = encodeLevelData(latex);
    popupExport(encoded)
}

function popupExport(data) {
    popup.classList.remove("hidden");
    exportCodeSpan.textContent = data;
}

function initialise() {
  calculator.setExpression({
    id: "export",
    latex: "f\\left(x\\right)="
  });
}

if (elt) {
  calculator = Desmos.GraphingCalculator(elt, {
    expressions: true,
    expressionsCollapsed: false,
    settingsMenu: false,
    zoomButtons: false
  });
  initialise()
}
