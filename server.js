const express = require('express');
const AWS = require('aws-sdk');
const app = express();
const PORT = 3000;

const docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

app.use(express.static('/usr/share/nginx/html'));

app.get('/api/jogos', async (req, res) => {
    try {
        const data = await docClient.scan({ TableName: 'KickStream-Jogos' }).promise();
        res.json(data.Items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => console.log('Servidor rodando na porta 3000'));