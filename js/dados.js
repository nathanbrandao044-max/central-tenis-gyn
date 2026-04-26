/* =============================================
   DADOS MOCKADOS — Central do Tênis GYN
   ============================================= */

const produtos = [
  {
    id: 1,
    nome: "Nike Air Max 270",
    marca: "Nike",
    categoria: "casual",
    preco: 599.90,
    desconto: 0,
    tamanhos: [38, 39, 40, 41, 42, 43],
    esgotados: [],
    cor: "#B0C4DE",
    corNome: "Azul Aço",
    tag: "MAIS VENDIDO",
    novo: false,
    descricao: "O Nike Air Max 270 oferece o maior Air Max de calcanhar já criado para uso diário, inspirado em ícones Air Max do passado. Design atraente com amortecimento excepcional para o dia a dia.",
    especificacoes: { solado: "Borracha", cabedal: "Mesh Engenheirado", forro: "Tecido sintético", palmilha: "EVA removível" }
  },
  {
    id: 2,
    nome: "Adidas Ultraboost 22",
    marca: "Adidas",
    categoria: "corrida",
    preco: 749.90,
    desconto: 10,
    tamanhos: [38, 39, 40, 41, 42, 43, 44],
    esgotados: [41],
    cor: "#1A1A2E",
    corNome: "Preto Noite",
    tag: "OFERTA",
    novo: false,
    descricao: "O Ultraboost 22 tem tudo que você precisa para correr. Tecnologia BOOST™ para retorno de energia incrível e cabedal Primeknit+ que se adapta ao seu pé.",
    especificacoes: { solado: "Continental™ Rubber", cabedal: "Primeknit+", forro: "Lycra", palmilha: "BOOST™" }
  },
  {
    id: 3,
    nome: "New Balance 574",
    marca: "New Balance",
    categoria: "casual",
    preco: 479.90,
    desconto: 0,
    tamanhos: [37, 38, 39, 40, 41, 42, 43],
    esgotados: [],
    cor: "#6B8E6B",
    corNome: "Verde Militar",
    tag: "CLÁSSICO",
    novo: false,
    descricao: "O 574 é um clássico que nunca sai de moda. Design icônico com tecnologia ENCAP que oferece suporte e amortecimento duradouros.",
    especificacoes: { solado: "Borracha", cabedal: "Camurça/Mesh", forro: "Tecido", palmilha: "ENCAP" }
  },
  {
    id: 4,
    nome: "Puma RS-X3",
    marca: "Puma",
    categoria: "casual",
    preco: 419.90,
    desconto: 15,
    tamanhos: [38, 39, 40, 41, 42, 43, 44],
    esgotados: [38],
    cor: "#FF6B6B",
    corNome: "Vermelho Coral",
    tag: "OFERTA",
    novo: true,
    descricao: "O RS-X3 reinventa o sistema RS Running da PUMA com uma silhueta volumosa e designs ousados. Perfeito para quem quer se destacar.",
    especificacoes: { solado: "Borracha RS", cabedal: "Mesh/Sintético", forro: "Tecido", palmilha: "RS Foam" }
  },
  {
    id: 5,
    nome: "Fila Disruptor II",
    marca: "Fila",
    categoria: "casual",
    preco: 359.90,
    desconto: 0,
    tamanhos: [37, 38, 39, 40, 41, 42],
    esgotados: [],
    cor: "#F5F5F5",
    corNome: "Branco",
    tag: "TENDÊNCIA",
    novo: false,
    descricao: "O Disruptor II é o tênis chunky mais icônico de todos os tempos. Visual bold que domina qualquer look urbano ou esportivo.",
    especificacoes: { solado: "EVA serrilhado", cabedal: "Couro sintético", forro: "Tecido", palmilha: "EVA" }
  },
  {
    id: 6,
    nome: "Vans Old Skool",
    marca: "Vans",
    categoria: "casual",
    preco: 329.90,
    desconto: 0,
    tamanhos: [37, 38, 39, 40, 41, 42, 43, 44],
    esgotados: [],
    cor: "#1C1C1C",
    corNome: "Preto/Branco",
    tag: "CLÁSSICO",
    novo: false,
    descricao: "O Old Skool é o tênis de skate mais icônico da Vans. Com a famosa faixa lateral Jazz Stripe e cabedal de suede e canvas duráveis.",
    especificacoes: { solado: "Borracha Waffle", cabedal: "Suede/Canvas", forro: "Tecido", palmilha: "Ortholite®" }
  },
  {
    id: 7,
    nome: "ASICS Gel-Nimbus 25",
    marca: "ASICS",
    categoria: "corrida",
    preco: 849.90,
    desconto: 0,
    tamanhos: [38, 39, 40, 41, 42, 43, 44],
    esgotados: [44],
    cor: "#4A90D9",
    corNome: "Azul Royal",
    tag: "PREMIUM",
    novo: true,
    descricao: "O Gel-Nimbus 25 oferece o máximo em amortecimento e conforto para corredores de longa distância. Tecnologia FF BLAST+ ECO para resposta energética sustentável.",
    especificacoes: { solado: "AHARPLUS™", cabedal: "Engineered Mesh", forro: "Tecido reciclado", palmilha: "FF BLAST+™ ECO" }
  },
  {
    id: 8,
    nome: "Mizuno Wave Rider 26",
    marca: "Mizuno",
    categoria: "corrida",
    preco: 699.90,
    desconto: 5,
    tamanhos: [38, 39, 40, 41, 42, 43],
    esgotados: [],
    cor: "#2ECC71",
    corNome: "Verde Neon",
    tag: "MAIS VENDIDO",
    novo: false,
    descricao: "O Wave Rider 26 combina a lendária tecnologia Wave com materiais sustentáveis. Ideal para treinos diários com máximo conforto e durabilidade.",
    especificacoes: { solado: "X10", cabedal: "Waveknit™", forro: "Coolmax®", palmilha: "U4ic™" }
  },
  {
    id: 9,
    nome: "Nike Air Force 1 '07",
    marca: "Nike",
    categoria: "casual",
    preco: 549.90,
    desconto: 0,
    tamanhos: [37, 38, 39, 40, 41, 42, 43, 44],
    esgotados: [],
    cor: "#FFFFFF",
    corNome: "Branco",
    tag: "ÍCONE",
    novo: false,
    descricao: "O Air Force 1 '07 é o lendário tênis de basquete que se tornou um ícone da cultura sneaker. Design limpo e intemporal que combina com tudo.",
    especificacoes: { solado: "Borracha", cabedal: "Couro", forro: "Espuma", palmilha: "Air-Sole" }
  },
  {
    id: 10,
    nome: "Adidas Stan Smith",
    marca: "Adidas",
    categoria: "casual",
    preco: 449.90,
    desconto: 0,
    tamanhos: [37, 38, 39, 40, 41, 42, 43],
    esgotados: [42],
    cor: "#E8F5E9",
    corNome: "Branco/Verde",
    tag: "CLÁSSICO",
    novo: false,
    descricao: "O Stan Smith é um dos tênis mais icônicos da história. Design minimalista em couro branco com detalhes verdes que nunca sai de moda.",
    especificacoes: { solado: "Borracha", cabedal: "Couro natural", forro: "Tecido", palmilha: "OrthoLite®" }
  },
  {
    id: 11,
    nome: "New Balance Fresh Foam X 1080v12",
    marca: "New Balance",
    categoria: "corrida",
    preco: 899.90,
    desconto: 0,
    tamanhos: [38, 39, 40, 41, 42, 43, 44],
    esgotados: [],
    cor: "#7B68EE",
    corNome: "Roxo",
    tag: "NOVO",
    novo: true,
    descricao: "O 1080v12 conta com a espuma Fresh Foam X mais macia já criada pela New Balance. Amortecimento plush para corredores que priorizam conforto.",
    especificacoes: { solado: "Blown Rubber", cabedal: "Hypoknit™", forro: "Ultra Heel", palmilha: "Fresh Foam X™" }
  },
  {
    id: 12,
    nome: "Puma Suede Classic XXI",
    marca: "Puma",
    categoria: "casual",
    preco: 349.90,
    desconto: 10,
    tamanhos: [37, 38, 39, 40, 41, 42, 43],
    esgotados: [],
    cor: "#8B4513",
    corNome: "Marrom Suede",
    tag: "OFERTA",
    novo: false,
    descricao: "O Suede Classic XXI é um ícone de mais de 50 anos. Cabedal de camurça premium e solado de borracha, um clássico que atravessa gerações.",
    especificacoes: { solado: "Borracha", cabedal: "Camurça", forro: "Tecido", palmilha: "EVA" }
  },
  {
    id: 13,
    nome: "Nike React Infinity Run FK 3",
    marca: "Nike",
    categoria: "corrida",
    preco: 679.90,
    desconto: 0,
    tamanhos: [38, 39, 40, 41, 42, 43, 44],
    esgotados: [39],
    cor: "#FF4D00",
    corNome: "Laranja",
    tag: "NOVO",
    novo: true,
    descricao: "Criado para ajudar a reduzir lesões, o React Infinity Run FK 3 tem espuma React macia e rocker geometry para uma passada natural e eficiente.",
    especificacoes: { solado: "Borracha", cabedal: "Flyknit", forro: "Espuma", palmilha: "React foam" }
  },
  {
    id: 14,
    nome: "Vans Authentic",
    marca: "Vans",
    categoria: "casual",
    preco: 279.90,
    desconto: 0,
    tamanhos: [37, 38, 39, 40, 41, 42, 43],
    esgotados: [],
    cor: "#DC143C",
    corNome: "Vermelho",
    tag: "BÁSICO",
    novo: false,
    descricao: "O Authentic foi o primeiro tênis da Vans, lançado em 1966. Lona, solado vulcanizado e tira de tela — simples, durável e eterno.",
    especificacoes: { solado: "Borracha Waffle Vulc", cabedal: "Canvas", forro: "Tecido", palmilha: "Ortholite®" }
  },
  {
    id: 15,
    nome: "ASICS Gel-Kayano 29",
    marca: "ASICS",
    categoria: "corrida",
    preco: 919.90,
    desconto: 0,
    tamanhos: [38, 39, 40, 41, 42, 43, 44],
    esgotados: [],
    cor: "#20B2AA",
    corNome: "Teal",
    tag: "PREMIUM",
    novo: true,
    descricao: "O Gel-Kayano 29 é o tênis de controle de movimento mais avançado da ASICS. Com tecnologia 4D GUIDANCE SYSTEM para suporte superior em longas distâncias.",
    especificacoes: { solado: "AHARPLUS™", cabedal: "Jacquard Mesh", forro: "Tecido reciclado", palmilha: "GEL™ + FF BLAST™" }
  },
  {
    id: 16,
    nome: "Adidas Samba OG",
    marca: "Adidas",
    categoria: "casual",
    preco: 529.90,
    desconto: 0,
    tamanhos: [37, 38, 39, 40, 41, 42, 43],
    esgotados: [40],
    cor: "#F5DEB3",
    corNome: "Trigo/Marrom",
    tag: "TENDÊNCIA",
    novo: true,
    descricao: "O Samba OG voltou com força total. Inspirado no futebol indoor dos anos 50, hoje é o queridinho da moda mundial com seu design inconfundível.",
    especificacoes: { solado: "Borracha Gum", cabedal: "Couro premium", forro: "Tecido", palmilha: "OrthoLite®" }
  },
  {
    id: 17,
    nome: "Mizuno Wave Sky 6",
    marca: "Mizuno",
    categoria: "corrida",
    preco: 779.90,
    desconto: 8,
    tamanhos: [38, 39, 40, 41, 42, 43, 44],
    esgotados: [],
    cor: "#9370DB",
    corNome: "Roxo/Cinza",
    tag: "OFERTA",
    novo: false,
    descricao: "O Wave Sky 6 oferece o máximo em amortecimento e cushioning. Ideal para treinos longos de quem prioriza conforto nos pés.",
    especificacoes: { solado: "Blown Rubber", cabedal: "Waveknit™ S2", forro: "Coolmax®", palmilha: "U4icX™" }
  },
  {
    id: 18,
    nome: "Nike Dunk Low",
    marca: "Nike",
    categoria: "lançamentos",
    preco: 649.90,
    desconto: 0,
    tamanhos: [37, 38, 39, 40, 41, 42, 43, 44],
    esgotados: [37, 38],
    cor: "#228B22",
    corNome: "Verde/Branco",
    tag: "LANÇAMENTO",
    novo: true,
    descricao: "O Dunk Low volta em colorway exclusivo. Design icônico do basquete universitário dos anos 80 com materiais premium e acabamento impecável.",
    especificacoes: { solado: "Borracha", cabedal: "Couro", forro: "Espuma", palmilha: "Foam" }
  },
  {
    id: 19,
    nome: "New Balance 530",
    marca: "New Balance",
    categoria: "casual",
    preco: 399.90,
    desconto: 0,
    tamanhos: [37, 38, 39, 40, 41, 42, 43],
    esgotados: [],
    cor: "#C0C0C0",
    corNome: "Prata/Branco",
    tag: "NOVO",
    novo: true,
    descricao: "O 530 é inspirado nos tênis de corrida técnica dos anos 90. Visual retro com tecnologia modern: cabedal em mesh com sobreposições em couro sintético.",
    especificacoes: { solado: "Borracha", cabedal: "Mesh/Couro sintético", forro: "Tecido", palmilha: "ABZORB®" }
  },
  {
    id: 20,
    nome: "Fila Ray Tracer",
    marca: "Fila",
    categoria: "lançamentos",
    preco: 389.90,
    desconto: 12,
    tamanhos: [38, 39, 40, 41, 42, 43],
    esgotados: [],
    cor: "#FFD700",
    corNome: "Amarelo/Preto",
    tag: "OFERTA",
    novo: true,
    descricao: "O Ray Tracer é a aposta da Fila nos sneakers volumosos de nova geração. Silhueta arrojada com amortecimento EVA ultra-leve e visual que chama atenção.",
    especificacoes: { solado: "EVA/Borracha", cabedal: "Mesh/Sintético", forro: "Tecido", palmilha: "EVA" }
  }
];

// Helpers
function getProduto(id) {
  return produtos.find(p => p.id === parseInt(id));
}

function getPorCategoria(cat) {
  return produtos.filter(p => p.categoria === cat);
}

function getPorMarca(marca) {
  return produtos.filter(p => p.marca.toLowerCase() === marca.toLowerCase());
}

function getNovidades() {
  return produtos.filter(p => p.novo);
}

function getMaisVendidos() {
  return produtos.filter(p => p.tag === "MAIS VENDIDO" || p.tag === "CLÁSSICO" || p.tag === "ÍCONE");
}

function calcularPrecoFinal(produto) {
  if (produto.desconto > 0) {
    return produto.preco * (1 - produto.desconto / 100);
  }
  return produto.preco;
}

function calcularPrecoPix(produto) {
  return calcularPrecoFinal(produto) * 0.9;
}

function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

const marcas = ["Nike", "Adidas", "New Balance", "Puma", "Fila", "Vans", "ASICS", "Mizuno"];
const categorias = ["casual", "corrida", "lançamentos"];
const tamanhosList = [37, 38, 39, 40, 41, 42, 43, 44];
