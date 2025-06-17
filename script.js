const dropZone = document.getElementById('drop-zone');
const resizeBtn = document.getElementById('resize-btn');
let selectedFile = null;

function logUsage(event) {
    console.log(`[Usage] ${event} at ${new Date().toISOString()}`);
}

dropZone.addEventListener('dragover', e => {
    e.preventDefault();
    dropZone.classList.add('hover');
});
dropZone.addEventListener('dragleave', e => {
    e.preventDefault();
    dropZone.classList.remove('hover');
});
dropZone.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.classList.remove('hover');
    handleFile(e.dataTransfer.files[0]);
});
dropZone.addEventListener('click', () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = e => handleFile(e.target.files[0]);
    fileInput.click();
});

function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
    }
    selectedFile = file;
    dropZone.textContent = `Selected: ${file.name}`;
    logUsage('File Selected');
}

resizeBtn.addEventListener('click', () => {
    if (!selectedFile) return alert('No file selected.');
    const width = parseInt(document.getElementById('width').value);
    if (!width || width <= 0) return alert('Enter a valid width.');

    resizeImage(selectedFile, width);
    logUsage('Resize Triggered');
});

function resizeImage(file, newWidth) {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = e => {
        img.src = e.target.result;
        img.onload = () => {
            const scale = newWidth / img.width;
            const canvas = document.createElement('canvas');
            canvas.width = newWidth;
            canvas.height = img.height * scale;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            canvas.toBlob(blob => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `resized-${file.name}`;
                link.textContent = 'Download resized image';
                document.getElementById('output').innerHTML = '';
                document.getElementById('output').appendChild(link);

                const preview = document.createElement('img');
                preview.src = url;
                document.getElementById('output').appendChild(preview);

                logUsage(`File Resized: ${file.name} → ${newWidth}px`);
            }, file.type);
        };
    };
    reader.onerror = () => alert('Error reading file.');
    reader.readAsDataURL(file);
}
