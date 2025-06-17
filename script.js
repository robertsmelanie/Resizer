document.addEventListener("DOMContentLoaded", () => {
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
});











