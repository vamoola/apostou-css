// Injeção automática de CSS com recarga inteligente
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
                    document.body.appendChild(style); // Mudando de head para body para maior prioridade
                    
                    console.log('🔄 CSS atualizado automaticamente');
                }
            })
            .catch(() => {
                console.error('❌ Erro ao carregar CSS');
            });
    };

    
    // Executar imediatamente
    injectCSS();
    
    // Recarregar a cada 5 segundos
    cssInterval = setInterval(injectCSS, 5000);
    
    console.log('🚀 Auto-reload inteligente ativado! CSS será atualizado apenas quando houver mudanças');
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