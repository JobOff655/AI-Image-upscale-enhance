let uploadedImage = null;

document.getElementById('chooseBtn').addEventListener('click', () => {
    document.getElementById('upload').click();
});

document.getElementById('upload').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                uploadedImage = img;
                drawImage(img);
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(file);
    }
});

function drawImage(img) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = img.width;
    canvas.height = img.height;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0);
}

document.getElementById('processBtn').addEventListener('click', () => {
    if (!uploadedImage) {
        alert('Please choose an image first.');
        return;
    }

    upscaleImage();
});

function upscaleImage() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const upscaleFactor = 2;
    const newWidth = uploadedImage.width * upscaleFactor;
    const newHeight = uploadedImage.height * upscaleFactor;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = newWidth;
    tempCanvas.height = newHeight;
    const tempCtx = tempCanvas.getContext('2d');

    tempCtx.imageSmoothingEnabled = true;
    tempCtx.imageSmoothingQuality = 'high';
    tempCtx.drawImage(uploadedImage, 0, 0, newWidth, newHeight);

    canvas.width = newWidth;
    canvas.height = newHeight;
    ctx.drawImage(tempCanvas, 0, 0);
}

document.getElementById('downloadBtn').addEventListener('click', () => {
    const canvas = document.getElementById('canvas');
    const link = document.createElement('a');
    link.download = 'upscaled-image.jpg';
    link.href = canvas.toDataURL('image/jpeg', 1.0);
    link.click();
});
// Enhance Button ka Logic
document.getElementById('enhanceBtn').addEventListener('click', function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Enhancement Filters: Contrast aur Sharpening barhana
    ctx.filter = 'contrast(1.2) brightness(1.05) saturate(1.1)';
    
    // Canvas par mojood image ko dobara redraw karna filters ke sath
    ctx.drawImage(canvas, 0, 0);
    
    // Filter wapas normal karna taakay agli baar double apply na ho
    ctx.filter = 'none';
    
    alert("Image Enhanced Successfully!");
});


