# 🧪 TESTE DE VALIDAÇÃO - Backend PIX

## ✅ Após fazer o deploy no Render.com, teste isto:

---

## 📋 TESTE 1: Servidor Online (1 minuto)

**Abra no navegador:**
```
https://quitanda-backend-xxxxx.onrender.com/api/health
```

**Deve retornar:**
```json
{
  "status": "online",
  "timestamp": "2026-01-20T...",
  "message": "✅ Servidor Quitanda Villa Natal está online!"
}
```

✅ **Se aparecer:** Servidor funcionando! Prossiga para teste 2.
❌ **Se der erro:** Aguarde 2 minutos (Render.com demora para acordar).

---

## 🎯 TESTE 2: Gerar PIX (5 minutos)

**Abra o Console do Navegador (F12)** e execute:

```javascript
// Testar geração de PIX
const backendUrl = 'https://quitanda-backend-xxxxx.onrender.com';

fetch(backendUrl + '/api/gerar-pix', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        pixKey: '81992659707',
        amount: 50.00,
        orderId: 'TEST-123'
    })
})
.then(res => res.json())
.then(data => {
    console.log('✅ Resposta do Backend:');
    console.log(data);
    
    if(data.success && data.pixCode) {
        console.log('✅ PIX VÁLIDO GERADO!');
        console.log('Código (Copia e Cola):', data.pixCode);
    }
})
.catch(err => console.error('❌ Erro:', err));
```

**Deve aparecer no console:**
```
✅ Resposta do Backend:
{
  success: true,
  pixCode: "00020126360014br.gov.bcb.brcode...",
  pixKey: "81992659707",
  amount: 50,
  merchant: "Quitanda Villa Natal"
}
✅ PIX VÁLIDO GERADO!
```

✅ **Se aparecer:** Backend gerando PIX válido! Próximo teste.
❌ **Se der erro:** Verifique se a URL está correta em `script-site.js`.

---

## 📱 TESTE 3: QR Code no Site (10 minutos)

1. **Abra o site** em http://localhost:3000 (ou onde estiver hospedado)
2. **Realize um pedido** com pelo menos um produto
3. **Clique em "Finalizar Compra"**
4. **Selecione "PIX - QR Code"**
5. **Verifique:**
   - ✅ QR Code apareceu?
   - ✅ Modal mostra chave PIX: `81992659707`?
   - ✅ Mostra valor do pedido?
   - ✅ Botão "Copiar" funciona?

---

## 📲 TESTE 4: QR Code Válido no App Bancário (5 minutos)

**Teste com seu app bancário:**

1. **Abra o app do seu banco** (Bradesco, Itaú, Nubank, Safra, etc)
2. **Procure por:**
   - "Transferência PIX" ou
   - "Ler QR Code" ou
   - "Ler código QR"
3. **Aponte a câmera para o QR Code** gerado no site
4. **Deve reconhecer como:**
   - ✅ PIX válido
   - ✅ Chave: 81992659707
   - ✅ Beneficiário: Quitanda Villa Natal
   - ✅ Valor: R$ [valor do pedido]

✅ **Se reconhecer tudo:** PIX 100% funcional! Sucesso!
❌ **Se não reconhecer:** Verifique se backend está gerando código válido (Teste 2).

---

## 📊 Resumo de Testes

| Teste | O que valida | Resultado |
|-------|-------------|-----------|
| 1️⃣ Health Check | Servidor online | ✅ ou ❌ |
| 2️⃣ Gerar PIX | Backend funciona | ✅ ou ❌ |
| 3️⃣ QR no Site | Frontend conectado | ✅ ou ❌ |
| 4️⃣ App Bancário | PIX válido | ✅ ou ❌ |

---

## 🆘 Se Algum Teste Falhar

### Teste 1 falha?
- ❌ Aguarde 2 minutos (Render dormindo)
- ❌ Verifique se o Deploy terminou (status "Live ✓")
- ❌ Recrie o Web Service no Render

### Teste 2 falha?
- ❌ Verifique se `server.js` está correto
- ❌ Verifique console do Render (logs)
- ❌ Reinstale dependências: `npm install`

### Teste 3 falha?
- ❌ Verifique URL em `script-site.js` (linha ~1450)
- ❌ Verifique console do navegador (F12)
- ❌ Pode ser CORS - verifique logs do backend

### Teste 4 falha?
- ❌ QR Code foi gerado? (Teste 3)
- ❌ Tente com outro app bancário
- ❌ Verifique se PIX está correto: `81992659707`

---

## 📞 Próximos Passos

✅ **Tudo funciona?**
→ Parabéns! Sistema de PIX 100% operacional!

❌ **Algo não funciona?**
→ Vem cá que resolvemos!

---

**Boa sorte! 🚀💚**
