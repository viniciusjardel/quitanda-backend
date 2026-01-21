const http = require('http');

// Função para calcular CRC16-CCITT (PIX)
function calculateCRC16(data) {
    let crc = 0xFFFF;
    for (let i = 0; i < data.length; i++) {
        crc ^= data.charCodeAt(i) << 8;
        for (let j = 0; j < 8; j++) {
            crc = (crc << 1) ^ ((crc & 0x8000) ? 0x1021 : 0);
        }
    }
    return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}

// Função para gerar PIX dinâmico válido
function generatePixCode(pixKey, amount) {
    const merchantName = 'QUITANDA';
    const merchantCity = 'JABOATAO';
    
    // EMV template
    const emvData = {
        '00': '01',                                   // Versão
        '26': {
            '00': '0br.gov.bcb.pix',
            '01': pixKey
        },
        '52': '0400',                                 // Merchant Category Code (compras)
        '53': '986',                                  // Currency BRL
        '54': String(amount).padStart(13, '0'),      // Valor
        '58': 'BR',                                   // País
        '59': merchantName.padStart(25, ' ').substring(0, 25),  // Nome comerciante
        '60': merchantCity.padStart(15, ' ').substring(0, 15),  // Cidade
        '62': {
            '05': '***'                               // TXN ID
        }
    };
    
    // Construir string para CRC
    let pixString = '000101';  // Template + versão
    pixString += '26' + '14' + '0br.gov.bcb.pix' + '01' + String(pixKey.length).padStart(2, '0') + pixKey;
    pixString += '5204' + emvData['52'];
    pixString += '53' + emvData['53'];
    pixString += '54' + String(amount).padStart(13, '0').padStart(2, '0');
    pixString += '5802' + emvData['58'];
    pixString += '59' + String(merchantName.length).padStart(2, '0') + merchantName;
    pixString += '60' + String(merchantCity.length).padStart(2, '0') + merchantCity;
    pixString += '62' + '06' + '05' + '***';
    
    // Calcular CRC
    const crc = calculateCRC16(pixString);
    
    return pixString + '6304' + crc;
}

const server = http.createServer((req, res) => {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
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
                
                const pixCode = generatePixCode(pixKey, amount);
                
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

