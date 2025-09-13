// Debug DIRETO na div específica
console.log('🔍 Debug DIRETO na div específica...');

// Tentar vários seletores para encontrar o elemento exato
const selectors = [
    'div.ng-tns-c3463803563-65.st_select__field[_ngcontent-bet-plus-web-c3463803563]',
    'div.st_select__field[_ngcontent-bet-plus-web-c3463803563]',
    'div.ng-tns-c3463803563-65.st_select__field',
    'div.st_select__field'
];

let targetElement = null;

selectors.forEach(selector => {
    const found = document.querySelector(selector);
    if (found && !targetElement) {
        targetElement = found;
        console.log(`✅ ENCONTRADO com seletor: ${selector}`);
    }
});

if (targetElement) {
    const computed = window.getComputedStyle(targetElement);
    
    console.log('🎯 ELEMENTO ALVO:');
    console.log('  Classes:', targetElement.className);
    console.log('  Atributos:', Array.from(targetElement.attributes).map(a => `${a.name}="${a.value}"`));
    
    console.log('\n📐 COMPUTED STYLES:');
    console.log('  Box-shadow:', computed.boxShadow);
    console.log('  Border-radius:', computed.borderRadius);
    console.log('  Border-top:', computed.borderTop);
    console.log('  Border-right:', computed.borderRight);
    console.log('  Border-bottom:', computed.borderBottom);
    console.log('  Border-left:', computed.borderLeft);
    
    // Verificar se nossas regras CSS estão sendo aplicadas
    const allRules = Array.from(document.styleSheets).flatMap(sheet => {
        try {
            return Array.from(sheet.cssRules || sheet.rules || []);
        } catch (e) {
            return [];
        }
    });
    
    const ourRules = allRules.filter(rule => rule.selectorText && rule.selectorText.includes('st_select__field'));
    console.log('\n📋 REGRAS CSS ENCONTRADAS:');
    ourRules.forEach(rule => {
        console.log('  Seletor:', rule.selectorText);
        console.log('  CSS:', rule.style.cssText);
    });
    
} else {
    console.log('❌ ELEMENTO NÃO ENCONTRADO');
}