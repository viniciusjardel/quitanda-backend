// ===== EXEMPLO DE INTEGRAÇÃO COM BACKEND (Opcional)
// Este arquivo mostra como integrar com um backend real para processar pagamentos
// Use isso quando quiser ir para produção

/*
NOTA: Isto é APENAS um exemplo. O sistema atual funciona 100% sem backend.
Use este guia apenas se quiser integração mais robusta com servidor.

OPÇÕES DE BACKEND:
1. Node.js + Express (recomendado)
2. Python + Flask
3. PHP + Laravel
4. C# + ASP.NET
5. Qualquer outro framework
*/

// ============================================================
// EXEMPLO 1: BACKEND COM NODE.JS + EXPRESS
// ============================================================

/*
INSTALAÇÃO:
$ npm install express axios dotenv @mercadopago/sdk


ARQUIVO: server.js

const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

// Chave de acesso do Mercado Pago
const ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN;

// ROTA: Criar preferência de pagamento
app.post('/api/create-preference', async (req, res) => {
    try {
        const { items, email, phone } = req.body;

        const preference = {
            items: items.map(item => ({
                id: item.id,
                title: item.name,
                quantity: item.quantity,
                unit_price: item.price
            })),
            payer: {
                email: email,
                phone: { area_code: '55', number: phone }
            },
            back_urls: {
                success: 'https://seu-site.com/sucesso',
                failure: 'https://seu-site.com/erro',
                pending: 'https://seu-site.com/pendente'
            },
            auto_return: 'approved'
        };

        const response = await axios.post(
            'https://api.mercadopago.com/checkout/preferences',
            preference,
            {
                headers: {
                    'Authorization': `Bearer ${ACCESS_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        res.json({
            preferenceId: response.data.id,
            initPoint: response.data.init_point
        });

    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ error: 'Erro ao criar preferência' });
    }
});

// ROTA: Receber notificações de pagamento (Webhook)
app.post('/api/webhook/payment', (req, res) => {
    // Mercado Pago envia notificações de pagamento aqui
    const { type, data } = req.body;

    if (type === 'payment') {
        // Atualizar status do pedido no banco de dados
        console.log('Pagamento recebido:', data.id);
        // Salvar no BD, enviar email, etc.
    }

    res.status(200).send('OK');
});

// ROTA: Processar pagamento com token do cartão
app.post('/api/process-payment', async (req, res) => {
    try {
        const { token, amount, installments, email } = req.body;

        const payment = {
            transaction_amount: amount,
            token: token,
            description: 'Compra Hortifruti Vila Natal',
            installments: installments,
            payment_method_id: 'credit_card',
            payer: {
                email: email
            }
        };

        const response = await axios.post(
            'https://api.mercadopago.com/v1/payments',
            payment,
            {
                headers: {
                    'Authorization': `Bearer ${ACCESS_TOKEN}`,
                    'Content-Type': 'application/json',
                    'X-Idempotency-Key': Date.now()
                }
            }
        );

        res.json({
            success: true,
            paymentId: response.data.id,
            status: response.data.status
        });

    } catch (error) {
        console.error('Erro ao processar pagamento:', error.response?.data);
        res.status(400).json({ 
            error: error.response?.data?.message || 'Erro ao processar'
        });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

ARQUIVO: .env

MERCADO_PAGO_ACCESS_TOKEN=YOUR_ACCESS_TOKEN_HERE
PORT=3000

*/

// ============================================================
// EXEMPLO 2: INTEGRAÇÃO COM PYTHON + FLASK
// ============================================================

/*
INSTALAÇÃO:
$ pip install flask requests python-dotenv


ARQUIVO: app.py

from flask import Flask, request, jsonify
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

ACCESS_TOKEN = os.getenv('MERCADO_PAGO_ACCESS_TOKEN')
BASE_URL = 'https://api.mercadopago.com'

@app.route('/api/create-preference', methods=['POST'])
def create_preference():
    try:
        data = request.json
        items = data.get('items', [])
        email = data.get('email')
        phone = data.get('phone')

        preference = {
            'items': [
                {
                    'id': item['id'],
                    'title': item['name'],
                    'quantity': item['quantity'],
                    'unit_price': item['price']
                }
                for item in items
            ],
            'payer': {
                'email': email,
                'phone': {'area_code': '55', 'number': phone}
            },
            'back_urls': {
                'success': 'https://seu-site.com/sucesso',
                'failure': 'https://seu-site.com/erro'
            }
        }

        headers = {
            'Authorization': f'Bearer {ACCESS_TOKEN}',
            'Content-Type': 'application/json'
        }

        response = requests.post(
            f'{BASE_URL}/checkout/preferences',
            json=preference,
            headers=headers
        )

        return jsonify({
            'preference_id': response.json()['id'],
            'init_point': response.json()['init_point']
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/process-payment', methods=['POST'])
def process_payment():
    try:
        data = request.json

        payment = {
            'transaction_amount': data['amount'],
            'token': data['token'],
            'description': 'Compra Hortifruti',
            'installments': data.get('installments', 1),
            'payment_method_id': 'credit_card',
            'payer': {'email': data['email']}
        }

        headers = {
            'Authorization': f'Bearer {ACCESS_TOKEN}',
            'Content-Type': 'application/json'
        }

        response = requests.post(
            f'{BASE_URL}/v1/payments',
            json=payment,
            headers=headers
        )

        return jsonify({
            'success': True,
            'payment_id': response.json()['id'],
            'status': response.json()['status']
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=3000)

ARQUIVO: .env

MERCADO_PAGO_ACCESS_TOKEN=YOUR_ACCESS_TOKEN_HERE

*/

// ============================================================
// EXEMPLO 3: MODIFICAR SCRIPT-SITE.JS PARA USAR BACKEND
// ============================================================

/*
// Adicione esta função ao script-site.js quando tiver backend:

window.processCardPaymentWithBackend = async function() {
    try {
        // Validar campos (mesmo código anterior)
        const holder = document.getElementById('cardHolder').value.trim();
        const number = document.getElementById('cardNumber').value.trim();
        const expiry = document.getElementById('cardExpiry').value.trim();
        const cvc = document.getElementById('cardCvc').value.trim();
        const email = document.getElementById('cardEmail').value.trim();

        if (!holder || !number || !expiry || !cvc || !email) {
            alert('⚠️ Por favor, preencha todos os campos!');
            return;
        }

        // Chamar backend para processar
        const response = await fetch('/api/process-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                cardNumber: number.replace(/\s/g, ''),
                cardHolder: holder,
                cardExpiresAt: expiry,
                securityCode: cvc,
                email: email,
                amount: window.checkoutTotal,
                items: window.cart
            })
        });

        const result = await response.json();

        if (result.success) {
            alert('✅ Pagamento aprovado!');
            window.sendPaymentToWhatsApp('card');
        } else {
            alert('❌ ' + result.error);
        }

    } catch (error) {
        console.error('Erro:', error);
        alert('❌ Erro ao processar pagamento');
    }
};
*/

// ============================================================
// EXEMPLO 4: WEBHOOK PARA CONFIRMAR PAGAMENTOS
// ============================================================

/*
COMO FUNCIONA:

1. Cliente faz pagamento no seu site
2. Mercado Pago processa
3. Mercado Pago envia notificação para seu backend (/api/webhook/payment)
4. Backend salva no banco de dados
5. Backend envia email ao cliente
6. Backend atualiza status do pedido

WEBHOOK JAVASCRIPT (backend recebe isso):

{
  "action": "payment.created",
  "data": {
    "id": 12345678,
    "amount": 150.00,
    "currency_id": "BRL",
    "status": "approved",
    "status_detail": "accredited",
    "payer": {
      "email": "cliente@email.com"
    },
    "external_reference": "pedido_123"
  }
}

PROCESSAR NO SEU BACKEND:

if (data.status === 'approved') {
    // Pedido aprovado - enviar confirmação
    enviarEmailConfirmacao(data.payer.email);
    atualizarPedidoBD(data.external_reference, 'CONFIRMADO');
} else if (data.status === 'pending') {
    // Pendente de confirmação
    atualizarPedidoBD(data.external_reference, 'PENDENTE');
} else if (data.status === 'rejected') {
    // Pagamento recusado
    atualizarPedidoBD(data.external_reference, 'RECUSADO');
}
*/

// ============================================================
// EXEMPLO 5: CONFIGURAR WEBHOOK NO MERCADO PAGO
// ============================================================

/*
1. Acesse: https://www.mercadopago.com.br/developers/panel
2. Vá para: Aplicaciones → Suas Aplicações
3. Clique em sua aplicação
4. Vá para: Configurações → Notificações
5. Adicione URL do Webhook: https://seu-site.com/api/webhook/payment
6. Selecione eventos: payment, plan
7. Pronto! Agora Mercado Pago enviará notificações


TESTAR WEBHOOK LOCALMENTE:

Use ngrok para expor seu servidor local:

$ npm install -g ngrok
$ ngrok http 3000

Isso vai gerar uma URL tipo:
https://abc123.ngrok.io

Use essa URL no Mercado Pago!
*/

// ============================================================
// EXEMPLO 6: BANCO DE DADOS PARA ARMAZENAR PEDIDOS
// ============================================================

/*
SCHEMA SQL:

CREATE TABLE pedidos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    numero_pedido VARCHAR(50) UNIQUE,
    cliente_email VARCHAR(100),
    cliente_telefone VARCHAR(20),
    cliente_endereco VARCHAR(255),
    total DECIMAL(10, 2),
    taxa_entrega DECIMAL(10, 2),
    tipo_entrega ENUM('local', 'delivery'),
    metodo_pagamento VARCHAR(50),
    status_pagamento ENUM('pendente', 'confirmado', 'recusado'),
    status_pedido ENUM('novo', 'preparando', 'entregando', 'entregue'),
    itens JSON,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE itens_pedido (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pedido_id INT,
    produto_id VARCHAR(50),
    produto_nome VARCHAR(100),
    quantidade INT,
    preco_unitario DECIMAL(10, 2),
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
);

CREATE TABLE payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pedido_id INT,
    mercado_pago_id VARCHAR(50),
    status VARCHAR(50),
    amount DECIMAL(10, 2),
    metodo VARCHAR(50),
    resposta JSON,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
);
*/

// ============================================================
// SEGURANÇA COM BACKEND
// ============================================================

/*
RECOMENDAÇÕES:

1. VALIDAR NO BACKEND
   - Nunca confie apenas no frontend
   - Valide todos os dados novamente

2. USAR HTTPS APENAS
   - Nunca transmita dados de cartão em HTTP
   - SSL/TLS é obrigatório

3. NÃO ARMAZENAR DADOS SENSÍVEIS
   - Nunca salve número de cartão completo
   - Use apenas tokens do Mercado Pago

4. RATE LIMITING
   - Limitar requisições por IP
   - Prevenir brute force

5. AUTENTICAÇÃO
   - Verificar tokens do cliente
   - Usar JWT se necessário

6. LOGS E MONITORAMENTO
   - Registrar todas as transações
   - Alertar sobre atividades suspeitas
*/

console.log('Este é um arquivo de EXEMPLO apenas.');
console.log('O sistema atual funciona 100% sem backend.');
console.log('Use este arquivo como referência quando quiser ir para produção.');
