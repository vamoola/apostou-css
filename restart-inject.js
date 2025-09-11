// Para reiniciar o auto-inject, cole isso no console:

// 1. Primeiro para a instância anterior
if (typeof stopAutoInject === 'function') {
    stopAutoInject();
}

// 2. Limpa variáveis antigas
if (typeof cssInterval !== 'undefined') {
    clearInterval(cssInterval);
}

// 3. Remove CSS atual se existir
const existingStyle = document.getElementById('apostou-neon-theme');
if (existingStyle) {
    existingStyle.remove();
}

// 4. Reinicia o auto-inject
let cssInterval;
let currentCssHash = '';

const autoInjectCSS = () => {
    // Parar instância anterior se existir
    if (cssInterval) {
        clearInterval(cssInterval);
        cssInterval = null;
        console.log('🔄 Parando instância anterior...');
    }
    
    const injectCSS = () => {
        // Carregar CSS do servidor local com timestamp para evitar cache
        fetch(`http://localhost:8080/theme.css?t=${Date.now()}`)
            .then(response => response.text())
            .then(css => {
                // Criar hash simples do CSS para detectar mudanças
                const cssHash = css.length + css.charCodeAt(0) + css.charCodeAt(css.length - 1);
                
                // Só aplicar se o CSS mudou
                if (cssHash !== currentCssHash) {
                    currentCssHash = cssHash;
                    
                    // Remover CSS anterior se existir
                    const existingStyle = document.getElementById('apostou-neon-theme');
                    if (existingStyle) {
                        existingStyle.remove();
                    }

                    // Criar e aplicar novo elemento style
                    const style = document.createElement('style');
                    style.id = 'apostou-neon-theme';
                    style.textContent = css;
                    document.head.appendChild(style);
                    
                    console.log('✅ CSS atualizado automaticamente');
                }
            })
            .catch((error) => {
                console.error('❌ Erro ao carregar CSS:', error);
            });
    };

    // Executar imediatamente
    injectCSS();
    
    // Recarregar a cada 5 segundos
    cssInterval = setInterval(injectCSS, 5000);
    
    console.log('🚀 Auto-reload REINICIADO! CSS será atualizado apenas quando houver mudanças');
    console.log('Para parar: stopAutoInject()');
};

const stopAutoInject = () => {
    if (cssInterval) {
        clearInterval(cssInterval);
        cssInterval = null;
        console.log('⏹️ Auto-reload parado');
    }
};

// Iniciar auto-reload
autoInjectCSS();