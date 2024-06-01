document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Generate QR code with a link to the user's data page
    const userDataUrl = window.location.origin + '/user-registration-qr/user-data/' + name.replace(/\s+/g, '_') + '.html';
    QRCode.toDataURL(userDataUrl, function(err, url) {
        if (err) console.error(err);
        const qrCodeImg = document.createElement('img');
        qrCodeImg.src = url;
        document.getElementById('qrcode').appendChild(qrCodeImg);
    });

    // Create user data HTML file (this part needs to be handled server-side in a real-world scenario)
    const userDataContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>User Data</title>
            <link rel="stylesheet" href="../style.css">
        </head>
        <body>
            <h1>User Information</h1>
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
        </body>
        </html>
    `;

    // Create a blob URL for the user data HTML file
    const blob = new Blob([userDataContent], { type: 'text/html' });
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = name.replace(/\s+/g, '_') + '.html';
    a.click();
});
