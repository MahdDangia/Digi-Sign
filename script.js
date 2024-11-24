const canvas = document.getElementById('signatureCanvas');
const ctx = canvas.getContext('2d');

let fileName ='signature.png';
document.getElementById('fileName').addEventListener('input', () => {
    fileName = document.getElementById('fileName').value;
});

let strokeColor = '#000000';
document.getElementById('clrSelection').addEventListener('input', () => {
    strokeColor = document.getElementById('clrSelection').value;
});

let lineWidth = '5'
document.getElementById('lineWidth').addEventListener('input', () => {
    lineWidth = document.getElementById('lineWidth').value;
});


let drawing = false;

canvas.addEventListener('mousedown', () => {
    drawing = true;
    ctx.beginPath();
});

canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.closePath();
});

canvas.addEventListener('mousemove', (event) => {
    if (!drawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'circle';
    ctx.strokeStyle = strokeColor;
    ctx.lineTo(x, y);
    ctx.stroke();
});

document.getElementById('clearButton').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawing = false;
});

document.getElementById('downloadButton').addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = fileName;
    link.click();
});
