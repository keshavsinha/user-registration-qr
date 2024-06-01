document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Save user data to a JSON file
    const userData = { name, email };
    const fileName = name.replace(/\s+/g, '_') + '.json';

    fetch('user-data/' + fileName, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });

    // Generate QR code with a link to the user's data page
    const userDataUrl = window.location.origin + '/user-data/' + fileName;
    QRCode.toDataURL(userDataUrl, function(err, url) {
        if (err) console.error(err);
        const qrCodeImg = document.createElement('img');
        qrCodeImg.src = url;
        document.getElementById('qrcode').appendChild(qrCodeImg);
    });
});
