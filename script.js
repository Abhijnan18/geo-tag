document.getElementById('upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.getElementById('image');
            img.onload = function() {
                // Set the width of the #geotag div to match the width of the image
                const imgWidth = img.clientWidth;
                const geotag = document.getElementById('geotag');
                geotag.style.width = imgWidth + 'px';
            };
            img.src = e.target.result;
            img.classList.remove('hidden');
            img.classList.add('block');
        }
        reader.readAsDataURL(file);
    }
});

document.getElementById('update').addEventListener('click', function() {
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const country = document.getElementById('country').value;
    const address = document.getElementById('address').value;
    const datetime = document.getElementById('datetime').value;

    // Generate random latitude and longitude
    const latitude = (Math.random() * (12.99999 - 12.00000) + 12.00000).toFixed(5);
    const longitude = (Math.random() * (77.99999 - 77.00000) + 77.00000).toFixed(5);

    document.getElementById('line1').textContent = `${city}, ${state}, ${country}`;
    document.getElementById('line2').textContent = address;
    document.getElementById('line3').textContent = `Lat ${latitude}°`;
    document.getElementById('line4').textContent = `Long ${longitude}°`;
    document.getElementById('line5').textContent = new Date(datetime).toLocaleString();
});

document.getElementById('download').addEventListener('click', function() {
    const img = document.getElementById('image');
    const imgContainer = document.getElementById('image-container');

    // Calculate the actual dimensions of the image within the container
    const imgWidth = img.clientWidth;
    const imgHeight = img.clientHeight;
    const imgLeft = img.offsetLeft;
    const imgTop = img.offsetTop;

    html2canvas(imgContainer, {
        useCORS: true,
        width: imgWidth,
        height: imgHeight,
        x: imgLeft,
        y: imgTop
    }).then(function(canvas) {
        const link = document.createElement('a');
        link.download = 'geotagged_image.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
});
