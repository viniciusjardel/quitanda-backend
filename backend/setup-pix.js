// ===== CONFIGURAÇÃO AUTOMÁTICA DE PIX =====
// Este arquivo configura sua chave PIX automaticamente

console.log('%c🔧 Setup PIX iniciado...', 'color: blue; font-weight: bold; font-size: 14px;');

// Sua chave PIX
const SEU_TELEFONE_PIX = '81992659707';

// Tentar carregar settings existentes
let settings = {};
try {
    const stored = localStorage.getItem('hortifruti_settings');
    if (stored) {
        settings = JSON.parse(stored);
    }
} catch (e) {
    console.warn('Erro ao carregar settings existentes');
}

// Configurar chave PIX
settings.pixKey = SEU_TELEFONE_PIX;

// Salvar de volta
try {
    localStorage.setItem('hortifruti_settings', JSON.stringify(settings));
    console.log('%c✅ Chave PIX configurada com sucesso!', 'color: green; font-weight: bold; font-size: 14px;');
    console.log('%cChave: ' + SEU_TELEFONE_PIX, 'color: green; font-size: 12px;');
    console.log('%c📱 Agora use o site normalmente!', 'color: green; font-weight: bold; font-size: 12px;');
} catch (e) {
    console.error('%c❌ Erro ao salvar chave PIX:', 'color: red; font-weight: bold;', e);
}
