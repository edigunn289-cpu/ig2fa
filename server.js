const express = require('express');
const cors = require('cors');
const speakeasy = require('speakeasy');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/api/code', (req, res) => {

    const { secret } = req.body;

    if (!secret) {
        return res.json({
            error: 'Secret kosong'
        });
    }

    try {

        const token = speakeasy.totp({
            secret: secret,
            encoding: 'base32'
        });

        res.json({
            code: token
        });

    } catch (e) {

        res.json({
            error: 'Secret tidak valid'
        });

    }

});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});