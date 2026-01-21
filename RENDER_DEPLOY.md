# 🚀 DEPLOY RENDER.COM - GUIA RÁPIDO

## ⚡ PRÉ-REQUISITO: Instalar Git

1. Baixe em: https://git-scm.com/download/win
2. Execute e clique "Next" até finalizar
3. Reinicie o PowerShell

---

## 📤 PASSO 1: Upload para GitHub

### 1.1 Criar Conta GitHub (se não tiver)
- Acesse: https://github.com
- Clique "Sign up"
- Use e-mail e crie senha

### 1.2 Criar Novo Repositório
1. No GitHub, clique **"+"** → **"New repository"**
2. Nome: `quitanda-backend`
3. Descrição: `Backend PIX para Quitanda Villa Natal`
4. Marque: **"Public"**
5. Clique **"Create repository"**

### 1.3 Upload dos Arquivos (PowerShell)

**Abra PowerShell como ADMINISTRADOR e execute:**

```powershell
# Entrar na pasta do projeto
cd "c:\Users\jarde\OneDrive\Desktop\Projeto Quitanda Villa Natal - COM BACK SIMPLES"

# Inicializar Git
git init

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Quitanda Backend PIX"

# Configurar branch main
git branch -M main

# Adicionar remote (SUBSTITUA seu_usuario pelo seu usuário GitHub)
git remote add origin https://github.com/seu_usuario/quitanda-backend.git

# Fazer push para GitHub
git push -u origin main
```

**Quando pedir GitHub token:**
1. Abra: https://github.com/settings/tokens/new
2. Marque: `repo` e `workflow`
3. Clique "Generate token"
4. Copie o token gerado
5. Cole no PowerShell

✅ Arquivos enviados para GitHub!

---

## ☁️ PASSO 2: Deploy no Render.com

### 2.1 Criar Conta Render
1. Acesse: https://render.com/
2. Clique **"Sign up"**
3. Use GitHub para autenticar
4. Autorize o acesso

### 2.2 Criar Web Service

1. Dashboard Render → Clique **"New +"**
2. Escolha **"Web Service"**
3. Clique **"Connect a repository"**
4. Procure por `quitanda-backend` e clique **"Connect"**

### 2.3 Configurar Serviço

Preencha os campos:

| Campo | Valor |
|-------|-------|
| **Name** | `quitanda-backend` |
| **Environment** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | `Free` (gratuito) |

5. Clique **"Create Web Service"**

**Render fará o deploy automaticamente!** Isso leva ~5-10 minutos.

---

## 🔗 PASSO 3: Obter URL do Backend

Quando o deployment terminar (status "Live ✓"), você verá a URL:

```
https://quitanda-backend-xxxxx.onrender.com
```

**Copie essa URL!**

---

## 🔌 PASSO 4: Conectar Frontend ao Backend

**Abra o arquivo [script-site.js](script-site.js#L1450)** e encontre:

```javascript
const backendUrl = window.location.origin.includes('localhost') 
    ? 'http://localhost:3000' 
    : window.location.origin;
```

**Substitua por:**

```javascript
const backendUrl = 'https://quitanda-backend-xxxxx.onrender.com';
```

(Troque `xxxxx` pela sua URL do Render)

---

## ✅ PASSO 5: Testar PIX Válido

1. **Abra o site**
2. **Realize um pedido**
3. **Selecione "PIX - QR Code"**
4. **QR Code será gerado pelo backend** ✅
5. **Teste com seu app bancário:**
   - Abra seu banco (Bradesco, Itaú, Nubank, etc)
   - Clique "Transferência via PIX" → "Ler QR Code"
   - Aponte para o QR gerado
   - **Deve reconhecer como PIX válido!** ✅

---

## 🔄 PRÓXIMAS ATUALIZAÇÕES

Quando precisar fazer mudanças no backend:

```powershell
cd "c:\Users\jarde\OneDrive\Desktop\Projeto Quitanda Villa Natal - COM BACK SIMPLES"

# Fazer alterações nos arquivos

# Enviar para GitHub
git add .
git commit -m "Descrição da mudança"
git push

# Render.com fará deploy automaticamente!
```

---

## 🆘 TROUBLESHOOTING

### ❌ "Build failed"
→ Verifique se `package.json` e `server.js` estão corretos no repositório

### ❌ "QR Code inválido"
→ Certifique-se de que a URL no [script-site.js](script-site.js#L1450) está correta

### ❌ "Erro ao conectar"
→ Aguarde 2 minutos (Render.com demora para acordar após inatividade)

### ❌ "GitHub não reconhece token"
→ Crie um novo token em: https://github.com/settings/tokens/new

---

## 📊 Checklist Final

- [ ] Git instalado
- [ ] Repositório `quitanda-backend` criado no GitHub
- [ ] Arquivos enviados para GitHub (`git push`)
- [ ] Render.com conectado ao GitHub
- [ ] Deploy completo (status "Live ✓")
- [ ] URL do backend copiada
- [ ] [script-site.js](script-site.js#L1450) atualizado com URL
- [ ] QR Code testado e validado ✅

---

**🎉 Pronto! Backend PIX na nuvem, 100% funcional!**
