// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Use bodyParser to parse JSON

// Configure Twilio
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

app.use(express.static('../html'));
// Route for root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'html', 'index.html'));
});
app.get('/api', (req, res) => {
    res.status(200).send('<h1>Welcome To Pesan Anonim</h1>');
});

// Endpoint to receive reports
app.post('/api/laporan', async (req, res) => {


    try {
        const { message } = req.body;
        console.log(message);
            // Check if message is valid
            if (!message || !message.trim()) {
                return res.status(400).json({ status: 'error', message: 'Pesan tidak boleh kosong!' });
            }
        // Setup WhatsApp message
        const messageResponse = await twilioClient.messages.create({
            from: 'whatsapp:+14155238886', // Twilio Sandbox number
            to: `whatsapp:${process.env.MY_WHATSAPP_NUMBER}`, // Your WhatsApp number
            body: message
        });

        console.log('WhatsApp message sent: ', messageResponse.sid);
        res.json({ status: 'success', message: 'Laporan Anda telah diterima dan pesan WhatsApp telah dikirim!' });
    } catch (error) {
        console.error('Error occurred: ', error.message);
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});