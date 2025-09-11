// Element Picker Force Copy - SEMPRE copia algo para clipboard ao clicar
let isPickerActive = false;
let currentHighlighted = null;
let allowNavigation = true; // Permitir navegação por padrão

const copyToClipboardForce = (text) => {
    // Método 1: Navigator clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
            .then(() => console.log('✅ Copiado para clipboard!'))
            .catch(err => {
                console.log('⚠️ Método 1 falhou, tentando método 2...');
                copyFallback(text);
            });
    } else {
        copyFallback(text);
    }
};

const copyFallback = (text) => {
    // Método 2: Criar textarea temporária
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        console.log('✅ Copiado para clipboard (método alternativo)!');
    } catch (err) {
        console.error('❌ Falha ao copiar:', err);
        // Método 3: Mostrar prompt para copiar manualmente
        prompt('Copie manualmente (Ctrl+C):', text);
    }
    
    document.body.removeChild(textarea);
};

const getElementInfo = (element, level = 0) => {
    if (!element || element === document.body) return null;
    
    const indent = '  '.repeat(level);
    const tag = element.tagName.toLowerCase();
    
    let info = `${indent}${tag}`;
    
    // ID
    if (element.id) {
        info += `#${element.id}`;
    }
    
    // Classes (todas, incluindo dinâmicas)
    if (element.className) {
        const classes = element.className.split(' ').filter(c => c.trim());
        info += classes.map(c => `.${c}`).join('');
    }
    
    // Atributos Angular _ngcontent-*
    const ngContentAttrs = [];
    for (let attr of element.attributes) {
        if (attr.name.startsWith('_ngcontent-')) {
            ngContentAttrs.push(attr.name);
        }
    }
    if (ngContentAttrs.length > 0) {
        info += `[${ngContentAttrs.join('][')}]`;
    }
    
    // Texto curto se disponível
    const text = element.textContent?.trim();
    if (text && text.length > 0 && text.length < 30 && !text.includes('\n')) {
        info += ` "${text}"`;
    }
    
    return info;
};

const handleClick = (e) => {
    if (!isPickerActive) return;
    
    // Só bloquear navegação com CTRL pressionado
    if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
    }
    
    const targetElement = e.target;
    let info = `🎯 HIERARQUIA COMPLETA:\n\n`;
    
    // 3 PAIS (do mais distante para o mais próximo)
    const parents = [];
    let current = targetElement.parentElement;
    while (current && current !== document.body && parents.length < 3) {
        parents.push(current);
        current = current.parentElement;
    }
    
    // Mostrar pais (ordem reversa para mostrar do mais distante ao mais próximo)
    parents.reverse().forEach((parent, index) => {
        const parentInfo = getElementInfo(parent, index);
        if (parentInfo) {
            info += `👨‍👦 PAI ${parents.length - index}: ${parentInfo}\n`;
        }
    });
    
    // ELEMENTO TARGET
    const targetInfo = getElementInfo(targetElement, parents.length);
    if (targetInfo) {
        info += `🎯 TARGET: ${targetInfo}\n`;
    }
    
    // ATÉ 2 FILHOS (primeiros filhos diretos)
    const children = Array.from(targetElement.children).slice(0, 2);
    children.forEach((child, index) => {
        const childInfo = getElementInfo(child, parents.length + 1);
        if (childInfo) {
            info += `👶 FILHO ${index + 1}: ${childInfo}\n`;
        }
    });
    
    // SELETORES ÚTEIS PARA O TARGET
    info += `\n📋 SELETORES PARA TARGET:\n`;
    
    // Seletor básico
    let basicSelector = '';
    if (targetElement.id) {
        basicSelector = `#${targetElement.id}`;
    } else if (targetElement.className) {
        basicSelector = `.${targetElement.className.split(' ')[0]}`;
    } else {
        basicSelector = targetElement.tagName.toLowerCase();
    }
    info += `   BÁSICO: ${basicSelector}\n`;
    
    // Seletor com todas as classes
    if (targetElement.className) {
        const classes = targetElement.className.split(' ').filter(c => c.trim());
        const allClassesSelector = targetElement.tagName.toLowerCase() + classes.map(c => `.${c}`).join('');
        info += `   COMPLETO: ${allClassesSelector}\n`;
    }
    
    // Seletor genérico (sem dinâmicos)
    if (targetElement.className) {
        const staticClasses = targetElement.className.split(' ').filter(c => 
            c.trim() && 
            !c.includes('ng-') && 
            !c.match(/^c\d+/) && 
            !c.includes('tns-')
        );
        if (staticClasses.length > 0) {
            const genericSelector = targetElement.tagName.toLowerCase() + staticClasses.map(c => `.${c}`).join('');
            info += `   GENÉRICO: ${genericSelector}\n`;
        }
    }
    
    // Posição entre irmãos
    const siblings = Array.from(targetElement.parentElement?.children || []);
    const index = siblings.indexOf(targetElement);
    info += `   POSIÇÃO: ${index + 1}/${siblings.length}`;
    
    console.log('════════════════════════════════');
    console.log(info);
    console.log('════════════════════════════════');
    
    // FORÇAR cópia para clipboard
    copyToClipboardForce(info);
};

const highlightElement = (e) => {
    if (!isPickerActive) return;
    
    const element = e.target;
    
    if (currentHighlighted && currentHighlighted !== element) {
        currentHighlighted.style.outline = '';
        currentHighlighted.style.boxShadow = '';
    }
    
    currentHighlighted = element;
    element.style.outline = `2px solid #00ff00`;
    element.style.boxShadow = `inset 0 0 0 1px #00ff00`;
    
    // Mostrar prévia simples
    let preview = `🔍 ${element.tagName.toLowerCase()}`;
    if (element.id) preview += `#${element.id}`;
    else if (element.className) preview += `.${element.className.split(' ')[0]}`;
    
    console.log(preview);
};

const removeHighlight = () => {
    if (currentHighlighted) {
        currentHighlighted.style.outline = '';
        currentHighlighted.style.boxShadow = '';
        currentHighlighted = null;
    }
};

// Iniciar
const startPicker = () => {
    if (isPickerActive) return;
    
    isPickerActive = true;
    document.body.style.cursor = 'crosshair';
    
    console.log('🎯 Element Picker Hierarquia Completa Ativado!');
    console.log('📋 Click = copia hierarquia + navega normalmente');
    console.log('📋 CTRL+Click = copia hierarquia + bloqueia navegação');
    console.log('📋 Inclui todas as classes (dinâmicas e estáticas)');
    console.log('📋 Mostra atributos Angular _ngcontent-*');
    console.log('Para parar: stopPicker()');
    
    // Usar captura=true para pegar o evento ANTES de qualquer outro handler
    document.addEventListener('click', handleClick, true);
    document.addEventListener('mouseover', highlightElement, true);
    document.addEventListener('mouseout', removeHighlight, true);
};

const stopPicker = () => {
    if (!isPickerActive) return;
    
    isPickerActive = false;
    document.body.style.cursor = '';
    removeHighlight();
    
    document.removeEventListener('click', handleClick, true);
    document.removeEventListener('mouseover', highlightElement, true);
    document.removeEventListener('mouseout', removeHighlight, true);
    
    console.log('⏹️ Element Picker parado');
};

// Auto iniciar
startPicker();

// Exportar funções
window.startPicker = startPicker;
window.stopPicker = stopPicker;