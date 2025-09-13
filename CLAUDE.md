# Projeto CSS Neon para apostou.bet.br

## Resumo
Sistema para injetar CSS neon customizado no site apostou.bet.br via console do navegador Chrome.

## Estrutura dos Arquivos

### theme.css
Arquivo CSS completo com tema neon para o site de apostas:
- Variáveis CSS customizadas (--primary-neon, --secondary-neon, etc.)
- Efeitos neon com brilho e sombras
- Gradientes e animações
- Estilização completa de componentes (botões, cards, tabelas, forms)
- Scrollbar customizada

### inject-css.js
Script JavaScript para injeção do CSS via console:
- Remove CSS anterior se existir
- Carrega o CSS do servidor local (localhost:8000)
- Injeta o CSS na página atual
- Feedback de sucesso/erro no console

## Como Usar

1. **Iniciar servidor local com CORS:**
   ```bash
   python3 server.py
   ```
   (IMPORTANTE: Use server.py na porta 8080, não http.server, pois precisa dos headers CORS)

2. **Abrir o site:**
   - Acessar apostou.bet.br no Chrome

3. **Abrir console:**
   - F12 → Console
   - Habilitar "Allow pasting" se necessário

4. **Executar o código:**
   - Para injeção única: `inject-css.js`
   - Para auto-reload: `auto-inject.js` (atualiza a cada 5s)
   - Para identificar elementos: `element-picker-force.js`

## Comandos Úteis

### Iniciar servidor HTTP local:
```bash
python3 -m http.server 8000
```

### Verificar se servidor está rodando:
```bash
curl http://localhost:8000/theme.css
```

## Estrutura do Projeto
```
/home/akio/apostou-css/
├── theme.css                   # CSS neon completo
├── contact-form-override.css   # CSS override para remover bordas do contact form
├── inject-css.js               # Script de injeção (carrega theme.css + contact-form-override.css)
├── auto-inject.js              # Script com auto-reload a cada 5s
├── element-picker.js           # Element picker básico
├── element-picker-precise.js   # Element picker preciso (SHIFT para pai)
├── element-picker-force.js     # Element picker hierarquia completa (3 pais + target + 2 filhos)
├── server.py                   # Servidor HTTP com CORS habilitado
└── CLAUDE.md                   # Esta documentação
```

## Modificações Realizadas

### 🎨 Header (menu-top-bar)
- Altura: 72px
- Cor de fundo: #172448

### 🔘 Botão Register
- Removido glow/neon interno e externo
- Cor: #FF6300

### 🔓 Botão Login 
- Borda laranja (#FF6300)
- Sem fundo
- Fonte Poppins Bold

### 📦 app-generic-widgets-layout
- Padding: 10px

### 🎰 Container filtros casino
- Padding lateral: 8px

### 🔍 Botão de busca
- Fundo: #172448
- Altura: 37px
- Ícone: branco (#FFFFFF)
- Texto: #BBBDD4, Poppins Medium 14px

### 🟠 Botões Casino Filter
- **Botão Buscar (primeiro)**: Fundo #172448 (azul)
- **Botão Provedor (segundo/último)**: Fundo #FF6300 (laranja)
- Texto: branco, Poppins Bold 14px
- **IMPORTANTE**: Classes dinâmicas do Angular mudam (ng-tns-c*), usar seletores por posição

### 📱 Bottom Menu
- Fundo: #172448
- Sem borda neon superior
- Border-radius: 30px nos cantos superiores
- Texto: #BBBDD4, Poppins Semibold 12px

### 📝 Título 'Atalhos'
- Fonte: Poppins Bold 16px

### 🎠 Swiper Container
- Padding lateral: 6px (left/right)

### 🟠 Headers de Seção
- Header 'Top Jogos': padding 8px
- Títulos de eventos: fonte Poppins

### 🟠 Conteúdo Central
- Events area (div.events-area-min): margem lateral 50px
- Esconde coupon em telas < 1280px (@media query)

### 🟠 Menu Início - Item Ativo
- Removido efeitos neon (box-shadow, text-shadow, filter, animation)
- Borda inferior laranja chapada #FF6300 (2px) criada com pseudo-elemento
- Background transparente
- Posicionada internamente (bottom: 2px, laterais: 2px)

### 🟠 Mat Drawer Backdrop
- Background translúcido: rgba(0, 0, 0, 0.5)
- Removido efeitos neon

### 🟠 Bottom Navigation Container
- Borda superior azul #2D4484 (1px)

### 🟠 Casino Providers Dialog
- Gradiente vertical (180deg): #2E4182 → #0A0E1C

### 🟠 Sidebar Login
- Mesmo gradiente vertical: #2E4182 → #0A0E1C

### 🟠 Authentication Info Container
- Background transparente (herda gradiente do pai)
- Border-radius 5px nas bordas esquerdas
- Prefixos webkit/moz para compatibilidade

### 🟠 Login Container Mobile (App Download)
- Elemento escondido: display: none

### 🟠 Botão Entrar (sidebar) - Gradiente Laranja
- Gradiente horizontal: #F75703 → #FF9501 (90deg)
- Texto branco #EEEEF0, Poppins Bold
- Border-radius 8px, sem efeitos neon

### 🟠 Botão Registrar (sidebar) - Azul Escuro Chapado
- Background: #212A42 (azul escuro sólido)
- Texto branco #EEEEF0, Poppins Bold
- Border-radius 8px, sem efeitos neon

### 🟠 Inputs - Bordas Condicionais Laranjas
- Bordas laranjas 1px apenas quando preenchido (.filled-input)
- Container: bordas superior, esquerda, direita (#FF6300)
- Input interno: borda inferior (#FF6300)
- Campos vazios: sem bordas laranjas
- Background dos inputs: #0A0E1C (azul escuro)

### 🟠 Container Input - Espaçamento
- Margin-bottom: 8px no .st_input

### 🟠 Mensagem de Erro de Campo
- Cor: #FF9501 (laranja claro) para "Campo obrigatório"

### 🟠 Register User Container - Gradiente Azul
- Background: gradiente vertical #2E4182 → #0A0E1C
- Padding: 8px interno

### 🟠 Advertisement Container
- Border-radius: 10px com overflow hidden

### 🟠 Mobile Headers - Azul Claro
- Background: #2E4182 (azul claro)
- Margin vertical: 10px
- Padding vertical: 10px
- Texto e ícones: branco #FFFFFF, sem efeitos neon

### 🟠 Alertas - Transparentes com Bordas Coloridas
- Warning: background transparente, texto/borda #FF9501, 1px
- Error: background transparente (sem vermelho)

### 🟠 Botão Concluir Registro
- Background: #202844 (azul escuro) sólido
- Texto: #EEEEF0 (branco), Poppins Bold
- Sem efeitos neon (regras ultra-específicas para Material Design)
- Apenas dentro de #register-page__container

### 🟠 Checkbox Página de Registro - PROBLEMA RESOLVIDO
- **PROBLEMA**: Desalinhamento entre área clicável e elementos visuais
- Área clicável (input) ficava centralizada mas elementos visuais ficavam no canto superior direito
- **SOLUÇÃO**: Position absolute com centralização perfeita nos elementos visuais:
  - `.mdc-checkbox__background` (fundo do checkbox)
  - `.mdc-checkbox__ripple`, `.mat-mdc-checkbox-ripple`, `.mat-ripple` (animações click)
- **CSS**: `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);`
- Animações de click também centralizadas para funcionar corretamente

### 🟠 Olhinho (Ícone de Visibilidade) Campo de Senha - PROBLEMA RESOLVIDO
- **PROBLEMA**: Olhinho ficava desalinhado dependendo do estado do campo
  - Campo vazio (sem classe `.filled-input`): olhinho ficava muito baixo, fora do input
  - Campo preenchido (com classe `.filled-input`): olhinho ficava alinhado corretamente
- **SOLUÇÃO**: Posicionamento fixo diferente para campo vazio
  - Seletor `:not(.filled-input)` para pegar apenas campos vazios
  - Position absolute com `top: 12px` (valor fixo em pixels)
  - Removido `transform: translateY(-50%)` que causava conflito
  - Z-index: 10 para garantir visibilidade
- **CSS APLICADO**:
  ```css
  div.st_input:not(.filled-input) div.st_input__suffix {
      position: absolute !important;
      right: 12px !important;
      top: 12px !important;
      transform: none !important;
  }
  ```

### 🟠 Organização do CSS
- Todos os emojis padronizados como 🟠 (bola laranja)
- @media queries movidas para final do arquivo
- Backup criado antes da reorganização

## Solução de Problemas

- **Erro "Not allowed to load local resource"**: O navegador não pode acessar arquivos locais diretamente. Sempre usar servidor HTTP local.

- **Erro no fetch**: Verificar se o servidor Python está rodando na porta 8080.

- **Erro CORS**: Sempre usar `python3 server.py` (não `python3 -m http.server`) pois precisa dos headers CORS.

- **CSS não aplica**: Verificar se o CSS contém `!important` nas propriedades principais.

## Element Picker

### 🟠 element-picker-precise.js
- **Clique normal**: seleciona elemento exato
- **SHIFT + Clique**: seleciona elemento pai
- **Verde**: elemento atual
- **Roxo**: elemento pai (com SHIFT)
- Copia automaticamente seletores para clipboard

### 🟠 element-picker-force.js - HIERARQUIA COMPLETA
- **Click normal**: copia hierarquia completa + navega normalmente
- **CTRL+Click**: copia hierarquia completa + bloqueia navegação (debug)
- **Mostra na área de transferência**:
  - 3 elementos pais (do mais distante ao mais próximo)
  - Elemento target clicado
  - Até 2 filhos diretos
  - TODAS as classes (incluindo dinâmicas Angular)
  - Atributos _ngcontent-* do Angular
  - Seletores: básico, completo (com dinâmicos), genérico (sem dinâmicos)
  - Posição entre elementos irmãos

### 🟠 Contact Form - Remoção de Bordas
- **Problema**: Bordas teimosas nos campos de telefone e labels do contact form
- **Solução**: Criado arquivo `contact-form-override.css` com regras NUCLEARES
- **Arquivos modificados**:
  - `theme.css`: múltiplas regras para remover bordas
  - `contact-form-override.css`: override extremo com máxima prioridade
  - `inject-css.js`: modificado para carregar ambos os CSS em sequência
- **Seletores utilizados**:
  - Classes Angular dinâmicas: `ng-tns-c3463803563-*`
  - Classes estáticas: `st_select__field`, `st_contact_edit_outlined`
  - Atributos Angular: `[_ngcontent-bet-plus-web-c*]`
  - IDs específicos: `#access_data_form__contact_input`

### 🟠 Sidebar Mobile - Layout e Estilos
- **Login Sidebar**: 
  - Background: gradiente azul #2E4182 → #0A0E1C
  - Border-top-left-radius: 10px
  - Containers pais transparentes para evitar conflitos
- **Menu Sidebar**:
  - Background: azul escuro #0A0E1C
  - Border-right: 1px solid #2E4182 (só borda lateral direita)
  - Border-top-left-radius: 10px

### 🟠 Dialogs e Modais
- **Cancel Dialog**: 
  - Background: gradiente azul invertido #0A0E1C → #2E4182
  - Border-radius: 8px
  - Botão "Continuar": gradiente laranja igual ao botão Login
  - Botão "Cancelar": transparente
- **Register Dialog Banner**: Background azul claro #2E4182

### 🟠 Event Blocks e Components
- **Event Block Background**: azul escuro #0A0E1C
- **Event Block Header**: azul escuro #0A0E1C  
- **Menu Top Bar**: background #172448 (tanto normal quanto .transparentBg)

### 🟠 Consistência de Cores
- **Azul Escuro**: #0A0E1C (backgrounds principais)
- **Azul Claro**: #2E4182 (bordas e gradientes topo)
- **Azul Header**: #172448 (menu-top-bar)
- **Laranja**: #FF6300 (acentos e elementos ativos)

## ⚠️ IMPORTANTE - REGRAS DE DESENVOLVIMENTO

### 🚫 NUNCA FAZER:
- **NUNCA criar arquivos JavaScript** para resolver problemas de CSS
- **NUNCA usar JavaScript inline** para aplicar estilos
- **NUNCA criar scripts separados** como paint-input-red.js, remove-borders.js, etc.

### ✅ SEMPRE FAZER:
- **SEMPRE fazer mudanças APENAS no theme.css**
- **SEMPRE usar o auto-inject.js apenas para injetar CSS**
- **SEMPRE resolver problemas de estilo através de CSS**