const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// ===== ENDPOINT PARA GERAR PIX =====
app.post('/api/gerar-pix', (req, res) => {
    try {
        const { pixKey, amount, orderId } = req.body;

        // Validar dados
        if (!pixKey || !amount) {
            return res.status(400).json({
                success: false,
                error: 'Faltam dados: pixKey e amount são obrigatórios'
            });
        }

        console.log(`✅ PIX | Valor: R$ ${amount} | Chave: ${pixKey}`);

        res.json({
            success: true,
            pixCode: pixKey,
            pixKey: pixKey,
            amount: amount,
            merchant: 'Quitanda Villa Natal',
            message: '✅ PIX gerado!'
        });

    } catch (error) {
        console.error('❌ Erro:', error.message);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// ===== HEALTH CHECK =====
app.get('/api/health', (req, res) => {
    res.json({ status: 'online', message: '✅ Backend online!' });
});

// ===== INICIAR SERVIDOR =====
app.listen(PORT, () => {
    console.log(`🌱 Quitanda Backend rodando na porta ${PORT}`);
});

module.exports = app;
