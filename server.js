const express = require('express');
const cors = require('cors');
const { toDynamicBrcode } = require('brcode');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// ===== ENDPOINT PARA GERAR PIX COM QR CODE =====
app.post('/api/gerar-pix', async (req, res) => {
    try {
        const { pixKey, amount, orderId } = req.body;

        // Validar dados
        if (!pixKey || !amount) {
            return res.status(400).json({
                success: false,
                error: 'Faltam dados: pixKey e amount são obrigatórios'
            });
        }

        // Gerar BRCode dinâmico válido
        const pixCode = await toDynamicBrcode({
            merchantAccountInformation: {
                pixKey: pixKey,
            },
            merchantCategoryCode: '0000',
            transactionAmount: parseFloat(amount),
            merchantName: 'QUITANDA VILLA NATAL',
            merchantCity: 'Jaboatao dos Guararapes',
            transactionId: orderId || 'QUITANDA' + Date.now().toString().slice(-6),
        });

        console.log(`✅ PIX Gerado | ID: ${orderId} | Valor: R$ ${amount} | Chave: ${pixKey}`);

        res.json({
            success: true,
            pixCode: pixCode,
            pixKey: pixKey,
            amount: amount,
            merchant: 'Quitanda Villa Natal',
            message: '✅ PIX gerado com sucesso!'
        });

    } catch (error) {
        console.error('❌ Erro ao gerar PIX:', error.message);
        res.status(500).json({
            success: false,
            error: 'Erro ao gerar PIX: ' + error.message
        });
    }
});

// ===== ENDPOINT DE SAÚDE (VERIFICAR SE SERVIDOR ESTÁ ONLINE) =====
app.get('/api/health', (req, res) => {
    res.json({
        status: 'online',
        timestamp: new Date(),
        message: '✅ Servidor Quitanda Villa Natal está online!'
    });
});

// ===== SERVIR ARQUIVOS ESTÁTICOS (FRONTEND) =====
app.use(express.static(__dirname));

// ===== INICIAR SERVIDOR =====
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════╗
║   🌱 Quitanda Villa Natal - Backend PIX              ║
║   ✅ Servidor rodando em http://localhost:${PORT}   ║
║   📍 Endpoint: POST /api/gerar-pix                   ║
║   💚 Gerando PIX com Brcode válido                   ║
╚════════════════════════════════════════════════════════╝
    `);
});

module.exports = app;
