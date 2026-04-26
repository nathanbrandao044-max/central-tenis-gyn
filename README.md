# Central do Tênis GYN

> O seu tênis, no coração de Goiânia.

Site de e-commerce multimarcas para a **Central do Tênis GYN**, loja localizada em Goiânia, Goiás.

## Estrutura de arquivos

```
central-tenis/
├── index.html        → Home com hero, carrossel, mais vendidos, novidades
├── produtos.html     → Listagem com filtros e paginação
├── produto.html      → Página de detalhe do produto
├── carrinho.html     → Carrinho de compras
├── css/
│   ├── reset.css     → Reset CSS universal
│   ├── variables.css → Variáveis CSS customizadas
│   └── style.css     → Estilos completos
├── js/
│   ├── dados.js      → Array com 20 produtos mockados + helpers
│   ├── carrinho.js   → Lógica do carrinho (localStorage)
│   └── main.js       → Animações, renderização e interações
└── README.md
```

## Como usar

Abra o arquivo `index.html` diretamente no navegador. O site funciona 100% offline (apenas Google Fonts requer internet).

## Stack

- HTML5 semântico
- CSS3 com variáveis customizadas (sem framework)
- JavaScript vanilla (sem dependências)
- localStorage para persistência do carrinho

## Funcionalidades

- Header sticky com blur ao rolar
- Carrossel infinito de marcas
- Grid de produtos com cards animados (hover lift + sombra laranja)
- Filtros por marca, categoria e tamanho
- Ordenação (relevância, preço, lançamentos)
- Paginação simples
- Página de detalhe com galeria, seletor de tamanhos e abas
- Carrinho com controle de quantidade e cálculo de frete (UI)
- Animações fade + slide-up via IntersectionObserver
- Responsivo mobile-first

## Paleta de cores

| Variável | Cor | Uso |
|---|---|---|
| `--preto` | `#0A0A0A` | Fundo escuro, textos |
| `--laranja` | `#FF4D00` | Acento principal, CTAs |
| `--fundo` | `#F2F2F2` | Fundo das páginas |
| `--branco` | `#FFFFFF` | Texto claro, cards |

## Tipografia

- **Títulos:** Bebas Neue (Google Fonts)
- **Corpo:** DM Sans (Google Fonts)
