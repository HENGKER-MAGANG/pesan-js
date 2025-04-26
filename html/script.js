document.getElementById('reportForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const message = document.getElementById('message').value;

    try {
        const response = await fetch('http://127.0.0.1:5501/api/laporan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        if (data.status === 'success') {
            alert(data.message);
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat mengirim laporan!');
    }
});