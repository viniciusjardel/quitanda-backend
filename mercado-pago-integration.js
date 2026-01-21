// ===== INTEGRAÇÃO MERCADO PAGO =====
// Sistema de pagamento com Mercado Pago (sem backend necessário)

class MercadoPagoIntegration {
    constructor() {
        // Seu Public Key do Mercado Pago (substitua pelo seu)
        // Para testes, use: TEST-1234567890abc
        this.PUBLIC_KEY = 'YOUR_PUBLIC_KEY_HERE';
        
        // URLs dos servidores
        this.BASE_URL = window.location.origin;
        
        this.cardTokens = {};
        this.isInitialized = false;
    }

    // Inicializar Mercado Pago
    async init(publicKey) {
        if (this.isInitialized) return;
        
        this.PUBLIC_KEY = publicKey;
        
        try {
            // Carregar script do Mercado Pago
            await this.loadMercadoPagoScript();
            this.isInitialized = true;
            console.log('✅ Mercado Pago inicializado com sucesso');
            return true;
        } catch (error) {
            console.error('❌ Erro ao inicializar Mercado Pago:', error);
            return false;
        }
    }

    // Carregar script do Mercado Pago
    loadMercadoPagoScript() {
        return new Promise((resolve, reject) => {
            if (window.MercadoPago) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://sdk.mercadopago.com/js/v2';
            script.onload = () => {
                if (window.MercadoPago) {
                    resolve();
                } else {
                    reject(new Error('Mercado Pago SDK não carregou corretamente'));
                }
            };
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // Gerar token do cartão
    async generateCardToken(cardData) {
        try {
            if (!window.MercadoPago) {
                throw new Error('Mercado Pago não inicializado');
            }

            const mp = new window.MercadoPago(this.PUBLIC_KEY);
            
            const token = await mp.createCardToken({
                cardNumber: cardData.number.replace(/\s/g, ''),
                cardholderName: cardData.holder,
                cardholderEmail: cardData.email,
                securityCode: cardData.cvc,
                cardExpirationMonth: cardData.expMonth,
                cardExpirationYear: cardData.expYear
            });

            if (token.status === 200) {
                return token.data.id;
            } else {
                throw new Error('Erro ao gerar token: ' + token.status);
            }
        } catch (error) {
            console.error('❌ Erro ao gerar token:', error);
            throw error;
        }
    }

    // Criar preferência de pagamento (checkout)
    async createPaymentPreference(orderData) {
        try {
            // Aqui você criaria a preferência no Mercado Pago
            // Como não temos backend, vamos simular o processo
            
            const preference = {
                items: orderData.items.map(item => ({
                    id: item.id,
                    title: item.name,
                    quantity: item.quantity,
                    unit_price: item.price,
                    description: item.description || ''
                })),
                payer: {
                    name: orderData.customer.name,
                    email: orderData.customer.email,
                    phone: {
                        area_code: '55',
                        number: orderData.customer.phone.replace(/\D/g, '')
                    },
                    address: {
                        street_name: orderData.customer.address || '',
                        street_number: '0',
                        zip_code: '00000-000'
                    }
                },
                back_urls: {
                    success: this.BASE_URL + '?payment=success',
                    failure: this.BASE_URL + '?payment=failure',
                    pending: this.BASE_URL + '?payment=pending'
                },
                auto_return: 'approved',
                external_reference: this.generateOrderId()
            };

            return preference;
        } catch (error) {
            console.error('❌ Erro ao criar preferência:', error);
            throw error;
        }
    }

    // Gerar ID de pedido único
    generateOrderId() {
        return 'ORDER_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Validar dados do cartão
    validateCardData(cardData) {
        const errors = [];

        if (!cardData.number || cardData.number.length < 13) {
            errors.push('Número do cartão inválido');
        }

        if (!cardData.holder || cardData.holder.length < 3) {
            errors.push('Nome do titular inválido');
        }

        if (!cardData.expMonth || !cardData.expYear) {
            errors.push('Data de validade inválida');
        }

        if (!cardData.cvc || cardData.cvc.length < 3) {
            errors.push('Código de segurança inválido');
        }

        if (!cardData.email || !this.isValidEmail(cardData.email)) {
            errors.push('Email inválido');
        }

        return errors;
    }

    // Validar email
    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Formatar número do cartão
    formatCardNumber(value) {
        return value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }

    // Formatar data de validade
    formatExpireDate(value) {
        const numbers = value.replace(/\D/g, '');
        if (numbers.length >= 2) {
            return numbers.substring(0, 2) + '/' + numbers.substring(2, 4);
        }
        return numbers;
    }

    // Processar pagamento com cartão (simulado sem backend)
    async processCardPayment(cartData, cardData, customerData) {
        try {
            // Validar dados
            const errors = this.validateCardData(cardData);
            if (errors.length > 0) {
                throw new Error(errors.join(', '));
            }

            // Gerar token do cartão
            const token = await this.generateCardToken(cardData);

            // Criar preferência
            const preference = await this.createPaymentPreference({
                items: cartData,
                customer: customerData
            });

            // Salvar no localStorage para simulação
            const paymentData = {
                id: this.generateOrderId(),
                preference: preference,
                cardToken: token,
                timestamp: new Date().toISOString(),
                status: 'pending'
            };

            this.savePaymentRecord(paymentData);

            return {
                success: true,
                orderId: paymentData.id,
                message: 'Pagamento processado com sucesso!'
            };

        } catch (error) {
            console.error('❌ Erro ao processar pagamento:', error);
            throw error;
        }
    }

    // Salvar registro de pagamento
    savePaymentRecord(paymentData) {
        try {
            let payments = JSON.parse(localStorage.getItem('hortifruti_payments') || '[]');
            payments.push(paymentData);
            localStorage.setItem('hortifruti_payments', JSON.stringify(payments));
        } catch (error) {
            console.error('Erro ao salvar registro de pagamento:', error);
        }
    }

    // Recuperar histórico de pagamentos
    getPaymentHistory() {
        try {
            return JSON.parse(localStorage.getItem('hortifruti_payments') || '[]');
        } catch (error) {
            console.error('Erro ao recuperar histórico de pagamentos:', error);
            return [];
        }
    }
}

// Instância global
window.mercadoPagoIntegration = new MercadoPagoIntegration();
