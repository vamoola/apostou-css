// Comando para injetar o CSS no console do Chrome
// Cole este código no console do navegador (F12 > Console)

const injectCSS = () => {
    // Remover CSS anterior se existir
    const existingStyle = document.getElementById('apostou-neon-theme');
    const existingOverride = document.getElementById('contact-form-override');
    if (existingStyle) {
        existingStyle.remove();
    }
    if (existingOverride) {
        existingOverride.remove();
    }

    // Criar elementos style
    const style = document.createElement('style');
    style.id = 'apostou-neon-theme';
    
    const overrideStyle = document.createElement('style');
    overrideStyle.id = 'contact-form-override';
    
    // Carregar CSS principal
    fetch('http://localhost:8080/theme.css')
        .then(response => response.text())
        .then(css => {
            style.textContent = css;
            document.head.appendChild(style);
            console.log('✅ CSS Neon injetado com sucesso!');
            
            // Carregar CSS override
            return fetch('http://localhost:8080/contact-form-override.css');
        })
        .then(response => response.text())
        .then(overrideCss => {
            overrideStyle.textContent = overrideCss;
            document.head.appendChild(overrideStyle);
            console.log('✅ CSS Override para contact form injetado!');
        })
        .catch(() => {
            console.error('Erro: Execute "python3 server.py" no diretório do CSS');
        });
};

// Executar a injeção
injectCSS();