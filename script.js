const upload = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const widthInput = document.getElementById("width");
const heightInput = document.getElementById("height");
// const widthInput = document.getElementById("widthInput");
// const heightInput = document.getElementById("heightInput");
const keepRatio = document.getElementById("keepRatio");
const resizeBtn = document.getElementById("resizeBtn");
const downloadLink = document.getElementById("downloadLink");

let originalImage = new Image();
let originalWidth, originalHeight;

upload.addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (evt) {
        originalImage.onload = () => {
            originalWidth = originalImage.width;
            originalHeight = originalImage.height;

            widthInput.value = originalWidth;
            heightInput.value = originalHeight;

            drawImage(originalWidth, originalHeight);
        };
        originalImage.src = evt.target.result;
    };
    reader.readAsDataURL(file);
});

function drawImage(w, h) {
    canvas.width = w;
    canvas.height = h;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(originalImage, 0, 0, w, h);
    downloadLink.href = canvas.toDataURL("image/png");
}

resizeBtn.addEventListener("click", () => {
    let width = parseInt(widthInput.value);
    let height = parseInt(heightInput.value);

    if (keepRatio.checked) {
        const aspectRatio = originalWidth / originalHeight;
        if (width && !height) {
            height = Math.round(width / aspectRatio);
            heightInput.value = height;
        } else if (!width && height) {
            width = Math.round(height * aspectRatio);
            widthInput.value = width;
        }
    }

    drawImage(width, height);
});














// let selectedFile = null;

// function logUsage(event) {
//     console.log(`[Usage] ${event} at ${new Date().toISOString()}`);
// }



// function handleFile(file) {
//     if (!file || !file.type.startsWith('image/')) {
//         alert('Please select an image file.');
//         return;
//     }
//     selectedFile = file;
//     dropZone.textContent = `Selected: ${file.name}`;
//     logUsage('File Selected');
// }

// resizeBtn.addEventListener('click', () => {
//     if (!selectedFile) return alert('No file selected.');
//     const width = parseInt(document.getElementById('width').value);
//     if (!width || width <= 0) return alert('Enter a valid width.');

//     resizeImage(selectedFile, width);
//     logUsage('Resize Triggered');
// });

// function resizeImage(file, newWidth) {
//     const img = new Image();
//     const reader = new FileReader();

//     reader.onload = e => {
//         img.src = e.target.result;
//         img.onload = () => {
//             const scale = newWidth / img.width;
//             const canvas = document.createElement('canvas');
//             canvas.width = newWidth;
//             canvas.height = img.height * scale;
//             const ctx = canvas.getContext('2d');
//             ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

//             canvas.toBlob(blob => {
//                 const url = URL.createObjectURL(blob);
//                 const link = document.createElement('a');
//                 link.href = url;
//                 link.download = `resized-${file.name}`;
//                 link.textContent = 'Download resized image';
//                 document.getElementById('output').innerHTML = '';
//                 document.getElementById('output').appendChild(link);

//                 const preview = document.createElement('img');
//                 preview.src = url;
//                 document.getElementById('output').appendChild(preview);

//                 logUsage(`File Resized: ${file.name} → ${newWidth}px`);
//             }, file.type);
//         };
//     };
//     reader.onerror = () => alert('Error reading file.');
//     reader.readAsDataURL(file);
// }
