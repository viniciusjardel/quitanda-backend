const express = require('express');
const cors = require('cors');
const axios = require('axios');

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

        // Usar API pública para gerar QR Code válido
        try {
            const qrResponse = await axios.get(`https://api.qrserver.com/api/render/qr-code?size=300x300&data=${encodeURIComponent(pixKey)}`);
            
            console.log(`✅ PIX Gerado | ID: ${orderId} | Valor: R$ ${amount} | Chave: ${pixKey}`);

            res.json({
                success: true,
                pixCode: pixKey,
                pixKey: pixKey,
                amount: amount,
                merchant: 'Quitanda Villa Natal',
                qrUrl: `https://api.qrserver.com/api/render/qr-code?size=300x300&data=${encodeURIComponent(pixKey)}`,
                message: '✅ PIX gerado com sucesso!'
            });
        } catch (apiError) {
            console.warn('⚠️ API QR indisponível, retornando dados simples');
            
            res.json({
                success: true,
                pixCode: pixKey,
                pixKey: pixKey,
                amount: amount,
                merchant: 'Quitanda Villa Natal',
                message: '✅ Chave PIX retornada com sucesso!'
            });
        }

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
║   💚 Gerando PIX com sucesso!                        ║
╚════════════════════════════════════════════════════════╝
    `);
});

module.exports = app;
