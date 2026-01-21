# 🚀 Backend PIX - Guia Completo

## 📋 O que foi criado:

1. **server.js** - Backend Node.js com Express
2. **package.json** - Dependências do projeto
3. **.gitignore** - Arquivos ignorados pelo Git

---

## 🔧 PASSO 1: Instalar Node.js

**Windows:**
1. Acesse: https://nodejs.org/
2. Baixe a versão **LTS (18.x ou superior)**
3. Execute o instalador e clique em "Next" até finalizar
4. Abra o **PowerShell** e verifique:
```powershell
node --version
npm --version
```

Deve mostrar versões como: v18.x.x e 9.x.x

---

## 🛠️ PASSO 2: Instalar Dependências Localmente

**No PowerShell, navegue até a pasta do projeto:**

```powershell
# Entrar na pasta do projeto
cd "c:\Users\jarde\OneDrive\Desktop\Projeto Quitanda Villa Natal - COM BACK SIMPLES"

# Instalar dependências
npm install
```

Isso criará a pasta `node_modules/` com todas as bibliotecas necessárias.

---

## ▶️ PASSO 3: Testar Localmente

**Execute o servidor:**

```powershell
npm start
```

Deverá aparecer:
```
╔════════════════════════════════════════════════════════╗
║   🌱 Quitanda Villa Natal - Backend PIX              ║
║   ✅ Servidor rodando em http://localhost:3000       ║
║   📍 Endpoint: POST /api/gerar-pix                   ║
║   💚 Gerando PIX com Brcode válido                   ║
╚════════════════════════════════════════════════════════╝
```

**Teste no navegador:**
- Abra: http://localhost:3000/api/health
- Deve aparecer: `{"status":"online",...}`

**Teste o gerenciamento de PIX:**
- Abra o site em http://localhost:3000
- Realize um pedido e selecione "PIX - QR Code"
- Deve gerar um QR Code válido! ✅

---

## ☁️ PASSO 4: Hospedagem Gratuita no Render.com

### 4.1 Criar conta no Render.com

1. Acesse: https://render.com/
2. Clique em **"Sign up"**
3. Use o GitHub ou e-mail
4. Confirme o e-mail

### 4.2 Fazer Upload para GitHub

**No PowerShell:**

```powershell
# Entrar na pasta
cd "c:\Users\jarde\OneDrive\Desktop\Projeto Quitanda Villa Natal - COM BACK SIMPLES"

# Inicializar Git
git init

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Quitanda Villa Natal - Backend PIX"

# Adicionar repositório remoto (use seu link do GitHub)
git remote add origin https://github.com/SEU_USUARIO/quitanda-backend.git

# Fazer push
git branch -M main
git push -u origin main
```

**Não tem Git instalado?**
- Baixe em: https://git-scm.com/download/win
- Instale e reinicie o PowerShell

### 4.3 Conectar Render.com com GitHub

1. No Render.com, clique em **"New +"**
2. Escolha **"Web Service"**
3. Clique em **"Connect a repository"**
4. Selecione seu repositório `quitanda-backend`
5. Preencha os dados:
   - **Name:** `quitanda-backend`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free (gratuito)

6. Clique em **"Create Web Service"**

Render.com fará o deploy automaticamente! Isso leva ~5-10 minutos.

### 4.4 Obter URL do Backend

Após o deploy, você receberá uma URL como:
```
https://quitanda-backend-xxxxx.onrender.com
```

---

## 🔌 PASSO 5: Conectar Frontend ao Backend na Nuvem

**Edite o arquivo `script-site.js` (linha ~1440):**

Altere:
```javascript
const backendUrl = window.location.origin.includes('localhost') 
    ? 'http://localhost:3000' 
    : window.location.origin;
```

Para:
```javascript
const backendUrl = 'https://quitanda-backend-xxxxx.onrender.com';
```

(Substitua `xxxxx` pela sua URL do Render)

---

## 📱 PASSO 6: Testar PIX Válido

1. Abra o site
2. Realize um pedido
3. Selecione **"PIX - QR Code"**
4. O QR Code será gerado pelo backend ✅
5. **Teste com seu app bancário:**
   - Abra seu banco (Bradesco, Itaú, etc)
   - Toque em "Ler QR Code"
   - Aponte para o QR gerado
   - **Deve reconhecer como PIX válido!** ✅

---

## 🆘 Solução de Problemas

### Erro: "npm: comando não encontrado"
→ Node.js não foi instalado corretamente. Reinstale e reinicie o PowerShell.

### Erro: "Falha ao conectar com o servidor"
→ Certifique-se de que `npm start` está rodando em outro PowerShell.

### QR Code continua inválido
→ Verifique se a chave PIX está correta: **81992659707**

### Render.com não inicia
→ Verifique se `package.json` e `server.js` estão corretos.

---

## 📊 Resumo da Arquitetura

```
Frontend (index.html + script-site.js)
         ↓ Fetch POST /api/gerar-pix
Backend (server.js no Render.com)
         ↓ Usa brcode-js para gerar PIX válido
         ↓ Retorna pixCode com CRC16 correto
Frontend ↓ Mostra QR Code válido ao usuário
```

---

## ✅ Checklist Final

- [ ] Node.js instalado
- [ ] Dependências instaladas (`npm install`)
- [ ] Backend rodando localmente (`npm start`)
- [ ] Repositório GitHub criado
- [ ] Render.com conectado ao GitHub
- [ ] URL do backend copiada
- [ ] Frontend atualizado com URL do Render
- [ ] QR Code testado com app bancário ✅

---

**Qualquer dúvida, abra o console do navegador (F12) e verifique os logs!** 🔍
