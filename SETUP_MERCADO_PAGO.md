# 🔧 Setup Mercado Pago

## Passos para integração Mercado Pago

### 1️⃣ Criar conta no Mercado Pago
- Acesse: https://www.mercadopago.com.br
- Clique em "Criar conta"
- Faça login com seu CPF/Email

### 2️⃣ Obter as credenciais

#### Access Token (para o backend)
1. Entre no Painel de Controle: https://www.mercadopago.com.br/developers/panel
2. Vá para **"Credenciais"**
3. Copie o **Access Token** da seção "Token de Produção"
4. Salve em um local seguro

#### Public Key (para o frontend)
1. No mesmo local, copie a **Public Key** da seção "Producción"
2. Você precisará desta chave para o JavaScript frontend

### 3️⃣ Configurar no Render.com

1. Acesse seu app no Render: https://dashboard.render.com
2. Vá para **Settings → Environment**
3. Adicione uma variável:
   - **Key**: `MP_ACCESS_TOKEN`
   - **Value**: Cole seu Access Token
4. Clique "Save"
5. Sua app será reiniciada automaticamente

### 4️⃣ Testar localmente

Para testar no seu computador, crie um arquivo `.env` na raiz do projeto:

```
MP_ACCESS_TOKEN=sua_access_token_aqui
MP_PUBLIC_KEY=sua_public_key_aqui
```

Depois rode:
```bash
node server.js
```

### 5️⃣ Configurar URLs de retorno

No painel do Mercado Pago:
1. Vá para **Configurações**
2. Em **URLs de retorno**, configure:
   - **Sucesso**: `https://seu-dominio.com/sucesso`
   - **Erro**: `https://seu-dominio.com/erro`
   - **Pendente**: `https://seu-dominio.com/pendente`

⚠️ **Importante**: Você DEVE fazer isso manualmente no painel do MP!

### ✅ Pronto!

A integração está pronta. O checkout funcionará automáticamente quando o cliente clicar em "Pagar com Mercado Pago".

---

## 🆘 Troubleshooting

**Erro: "Invalid access token"**
- Verifique se o token está correto no Render
- Copie exatamente como está no painel do MP

**Erro: "Invalid public key"**
- Certifique-se de usar a Public Key (não o Access Token)

**Botão não aparece**
- Verifique se a Public Key está configurada
- Abra o console (F12) para ver erros JavaScript

---

## 📚 Documentação Oficial

- Mercado Pago: https://www.mercadopago.com.br/developers/pt/docs
- Checkout Pro: https://www.mercadopago.com.br/developers/pt/guides/checkout-pro/integration-configuration
