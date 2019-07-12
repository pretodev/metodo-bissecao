const EPSILON = 0.01; // erro rate
const Parser = require('expr-eval').Parser;
const parser = new Parser();
const tableResult = document.getElementById('result');
const elResult = document.getElementById('final-result');

function addRow(index, a, b, c, fa, fb, fc) {
    const idxCol = document.createElement('TD');
    idxCol.innerText = (index + 1);
    const aCol = document.createElement('TD');
    aCol.className = 'number-col';
    aCol.innerText = a;
    const bCol = document.createElement('TD');
    bCol.className = 'number-col';
    bCol.innerText = b;
    const cCol = document.createElement('TD');
    cCol.className = 'number-col';
    cCol.innerText = c;
    const row = document.createElement('TR');
    row.appendChild(idxCol);
    row.appendChild(aCol);
    row.appendChild(bCol);
    row.appendChild(cCol);
    tableResult.appendChild(row);
}

function calculateInterations(a, b) {
    return Math.round((Math.log10(b - a) - Math.log10(EPSILON)) / Math.log10(2));
}

function bisection(expression, A, B) {

    tableResult.innerHTML = '';

    let a = parseFloat(A), b = parseFloat(B);
    const expr = parser.parse(expression);
    const isValid = expr.evaluate({ x: a }) * expr.evaluate({ x: b }) < 0
    if (!isValid) {
        return;
    }

    const countIterations = calculateInterations(a, b);

    let c = a;
    for(let i = 0; i < countIterations; i++) {
        console.log(a, b, c);
        c = (a + b) / 2;

        addRow(i, a, b, c);

        if (expr.evaluate({ x: c }) === 0) {
            break;
        }

        if ((expr.evaluate({ x: a }) * expr.evaluate({ x: c })) < 0) {
            b = c;
        } else {
            a = c;
        }
    }

    elResult.innerText = c;
}

document.getElementById('problem-inputs')
    .addEventListener('submit', (e) => {
        e.preventDefault();
        const func = e.target[1].value;
        const intervalA = e.target[2].value;
        const intervalB = e.target[3].value;
        bisection(func, intervalA, intervalB);
    })