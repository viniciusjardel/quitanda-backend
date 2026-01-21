# 🧪 CHECKLIST DE TESTES - SISTEMA DE PAGAMENTOS

## ✅ Pré-requisitos

- [ ] Computador/smartphone com navegador
- [ ] Arquivo `index.html` aberto
- [ ] Conexão com internet
- [ ] Console aberto (F12)

---

## 🎯 TESTE 1: PIX SIMPLES

### Configuração:
- [ ] Abra `admin.html`
- [ ] Vá para "⚙️ Configurações"
- [ ] Coloque uma chave PIX (pode ser qualquer texto para teste)
- [ ] Clique "Salvar"

### Teste:
- [ ] Abra `index.html`
- [ ] Clique em um produto
- [ ] Escolha quantidade
- [ ] Adicione ao carrinho
- [ ] Clique "🛒 Carrinho"
- [ ] Clique "Finalizar Pedido"
- [ ] Escolha "🏪 Retirar no Local"
- [ ] Clique "✅ Confirmar e Continuar"
- [ ] **Novo:** Selecione "💜 PIX"
- [ ] [ ] Apareça modal com chave PIX?
- [ ] [ ] Botão "📋 Copiar Chave PIX" funciona?
- [ ] [ ] Ao clicar "📱 Enviar Pedido pelo WhatsApp", abre conversa?
- [ ] [ ] Mensagem contém todos os itens?
- [ ] [ ] Carrinho se esvazia após envio?

**Status:** 
- [ ] ✅ PASSOU
- [ ] ❌ FALHOU

**Notas:** _________________________

---

## 🎯 TESTE 2: CARTÃO DE CRÉDITO

### Pré-requisito:
- [ ] Crie conta em mercadopago.com.br (livre)
- [ ] Copie sua "Public Key"
- [ ] Abra `mercado-pago-integration.js`
- [ ] Substitua `YOUR_PUBLIC_KEY_HERE` pela sua chave
- [ ] Salve o arquivo

### Teste:
- [ ] Abra `index.html`
- [ ] Adicione produto ao carrinho
- [ ] Clique "Finalizar Pedido"
- [ ] Escolha "🚗 Entrega (Delivery)"
- [ ] Preencha dados:
  - [ ] Nome: Seu Nome Completo
  - [ ] Telefone: 81999999999
  - [ ] Endereço: Rua Teste, 123
  - [ ] Bloco: A
  - [ ] Apartamento: 401
- [ ] Clique "✅ Confirmar e Continuar"
- [ ] **Novo:** Selecione "💳 Cartão de Crédito"
- [ ] [ ] Modal de cartão abre?
- [ ] [ ] Preview do cartão aparece?

### Teste de Validação:
- [ ] [ ] Digite no campo de nome: aparece no preview?
- [ ] [ ] Digite número cartão: formata automaticamente?
- [ ] [ ] Digite validade: formata como MM/AA?
- [ ] [ ] Use número incompleto e clique "Finalizar": erro?
- [ ] [ ] Deixe um campo vazio: erro?
- [ ] [ ] Use email inválido: erro?

### Teste com Cartão Real:
Use dados de teste do Mercado Pago:

| Campo | Valor |\n| Número | 4509953566233576 |\n| Titular | TESTE |\n| Validade | 02/25 |\n| CVV | 123 |\n| Email | seu@email.com |\n\n- [ ] [ ] Preencha todos os campos
- [ ] [ ] Clique "✅ Finalizar Pagamento"
- [ ] [ ] Apareça "Processando..."?
- [ ] [ ] Após processamento, vai para WhatsApp?
- [ ] [ ] Mensagem WhatsApp contém "CARTÃO DE CRÉDITO"?

**Status:** 
- [ ] ✅ PASSOU
- [ ] ❌ FALHOU

**Notas:** _________________________

---

## 🎯 TESTE 3: CARTÃO DE DÉBITO

- [ ] Use número: 5031433215406351
- [ ] Titular: TESTE
- [ ] Validade: 02/25
- [ ] CVV: 123
- [ ] Email: seu@email.com

Repita os mesmos testes do cartão de crédito

**Status:** 
- [ ] ✅ PASSOU
- [ ] ❌ FALHOU

---

## 🎯 TESTE 4: QR CODE PIX

### Teste:
- [ ] Adicione produto ao carrinho
- [ ] Finalize até "Método de Pagamento"
- [ ] Selecione "📱 QR Code PIX"
- [ ] [ ] Modal com QR Code abre?
- [ ] [ ] QR Code aparece com tamanho bom?
- [ ] [ ] Total exibido está correto?
- [ ] [ ] Botão "📋 Copiar Código PIX" funciona?
- [ ] [ ] Clique "Voltar" e volta para métodos?

**Status:** 
- [ ] ✅ PASSOU
- [ ] ❌ FALHOU

---

## 🎯 TESTE 5: MÚLTIPLOS PRODUTOS

- [ ] Adicione 3 produtos diferentes
- [ ] Aumente quantidade de um deles
- [ ] Vá para carrinho
- [ ] Finalize compra via PIX
- [ ] [ ] Todos os 3 produtos aparecem no WhatsApp?
- [ ] [ ] Quantidades estão corretas?
- [ ] [ ] Total calculado corretamente?

**Status:** 
- [ ] ✅ PASSOU
- [ ] ❌ FALHOU

---

## 🎯 TESTE 6: RESPONSIVIDADE MOBILE

Execute os testes 1-5 em:

### iPhone:
- [ ] [ ] Layout se adapta?
- [ ] [ ] Modais cabem na tela?
- [ ] [ ] Campos ficam acessíveis?
- [ ] [ ] Teclado virtual não quebra?

### Android:
- [ ] [ ] Layout se adapta?
- [ ] [ ] Modais cabem na tela?
- [ ] [ ] Campos ficam acessíveis?
- [ ] [ ] Teclado virtual não quebra?

**Status:** 
- [ ] ✅ PASSOU
- [ ] ❌ FALHOU

---

## 🎯 TESTE 7: FLUXO COM ERRO

### Teste Sem Preencher:
- [ ] Deixe nome vazio e clique "Finalizar"
- [ ] [ ] Erro aparece em português?
- [ ] [ ] Modal não fecha?

### Teste Número Cartão Inválido:
- [ ] Digite: 1234
- [ ] [ ] Não permite completar?

### Teste Email Inválido:
- [ ] Digite: testemail.com
- [ ] [ ] Erro ao finalizar?

**Status:** 
- [ ] ✅ PASSOU
- [ ] ❌ FALHOU

---

## 🎯 TESTE 8: SINCRONIZAÇÃO COM ADMIN

- [ ] Abra 2 abas: uma com `admin.html`, outra com `index.html`
- [ ] Na aba admin, adicione novo produto
- [ ] Clique "Salvar"
- [ ] Na aba do site, clique 🔄 (se houver) ou recarregue
- [ ] [ ] Novo produto aparece?

**Status:** 
- [ ] ✅ PASSOU
- [ ] ❌ FALHOU

---

## 🎯 TESTE 9: CONSOLE SEM ERROS

- [ ] Abra `index.html`
- [ ] Abra Console (F12)
- [ ] Clique em "Console"
- [ ] [ ] Nenhuma mensagem de erro em vermelho?
- [ ] [ ] Mensagens de sucesso em verde aparecem?

**Status:** 
- [ ] ✅ PASSOU
- [ ] ❌ FALHOU

---

## 🎯 TESTE 10: HISTÓRICO DE PAGAMENTOS

- [ ] Faça 2 pagamentos diferentes (PIX e Cartão)
- [ ] Abra Console
- [ ] Digite: `JSON.parse(localStorage.getItem('hortifruti_payments'))`
- [ ] [ ] Aparecem 2 registros?
- [ ] [ ] Cada registro tem id, timestamp, status?

**Status:** 
- [ ] ✅ PASSOU
- [ ] ❌ FALHOU

---

## 📊 RESUMO DOS TESTES

| # | Teste | Status | Prioridade |
|---|-------|--------|-----------|
| 1 | PIX Simples | ⬜ | 🔴 CRÍTICA |
| 2 | Cartão Crédito | ⬜ | 🔴 CRÍTICA |
| 3 | Cartão Débito | ⬜ | 🟡 ALTA |
| 4 | QR Code | ⬜ | 🟢 MÉDIA |
| 5 | Múltiplos Produtos | ⬜ | 🟡 ALTA |
| 6 | Mobile | ⬜ | 🟡 ALTA |
| 7 | Erros | ⬜ | 🟢 MÉDIA |
| 8 | Sincronização | ⬜ | 🟢 MÉDIA |
| 9 | Console | ⬜ | 🟢 MÉDIA |
| 10 | Histórico | ⬜ | 🟢 MÉDIA |

---

## 🐛 SE ALGO FALHAR

### Checklist de Debug:

1. **PIX não funciona:**
   - [ ] Chave PIX está configurada no admin?
   - [ ] Está vendo a chave no modal?
   - [ ] Clique em "Copiar" - funciona?

2. **Cartão não funciona:**
   - [ ] Public Key do Mercado Pago está correta?
   - [ ] Está em `mercado-pago-integration.js`?
   - [ ] Verifique no Console por erros

3. **QR Code não aparece:**
   - [ ] Arquivo `qrcode.min.js` está carregando?
   - [ ] Veja em Console: `window.QRCode` existe?

4. **Responsividade quebrada:**
   - [ ] Tailwind CSS está carregando?
   - [ ] Zoom do navegador está 100%?

5. **WhatsApp não abre:**
   - [ ] Clique simples no link?
   - [ ] Número de WhatsApp está correto?
   - [ ] Message está sendo encoding corretamente?

---

## 🆘 ERRO COMUM: "Cannot read property of undefined"

**Causa:** Um modal ou elemento não foi encontrado

**Solução:**
1. Abra Console (F12)
2. Copie a mensagem de erro
3. Procure essa linha no HTML/JS
4. Verifique o ID/nome do elemento

---

## ✨ APÓS PASSAR TODOS OS TESTES

- [ ] Documentar qualquer comportamento estranho
- [ ] Testar com usuários reais (amigos/família)
- [ ] Coletar feedback
- [ ] Fazer melhorias baseado no feedback
- [ ] Considerar integração com backend real
- [ ] Implementar webhook do Mercado Pago

---

## 📝 NOTAS FINAIS

**Data do Teste:** _______________

**Versão do Navegador:** _______________

**Problemas Encontrados:**

```
1. _________________________________
2. _________________________________
3. _________________________________
```

**Sugestões de Melhoria:**

```
1. _________________________________
2. _________________________________
3. _________________________________
```

---

**Testado por:** _______________

**Data:** _______________

**Resultado Final:** 
- [ ] ✅ PRONTO PARA PRODUÇÃO
- [ ] ⚠️ PRECISA AJUSTES
- [ ] ❌ NÃO ESTÁ PRONTO
