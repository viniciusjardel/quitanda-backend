const http = require('http');

const server = http.createServer((req, res) => {
    // ===== HEADERS CORS =====
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Responder a requisições OPTIONS
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    
    if (req.url === '/api/health') {
        res.end(JSON.stringify({ status: 'online', message: 'Backend OK!' }));
    } else if (req.url === '/api/gerar-pix' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const { pixKey, amount } = data;
                
                // Gerar um código PIX simples (chave PIX com valor)
                // Formato simplificado: 00020126... (padrão PIX)
                // Para simplicidade, retornar chave + identificação
                const pixCode = `00020126360014br.gov.bcb.pix0136${pixKey}520400005303986540${String(amount).padStart(10, '0')}5802BR5913QUITANDA6009Jaboatao62410503***63047D3C`;
                
                res.end(JSON.stringify({
                    success: true,
                    pixCode: pixCode,
                    pixKey: pixKey,
                    amount: amount,
                    message: 'OK'
                }));
            } catch(e) {
                res.end(JSON.stringify({
                    success: false,
                    error: e.message
                }));
            }
        });
    } else {
        res.end(JSON.stringify({ message: 'Quitanda Backend' }));
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Backend rodando na porta ${PORT}`);
});

