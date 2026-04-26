/* =============================================
   MAIN JS v2 — Central do Tênis GYN
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  Carrinho.init();
  initHeader();
  initScrollAnimations();
  initMobileMenu();
  initSearch();

  const page = document.body.dataset.page;
  if (page === 'home') initHome();
  if (page === 'produtos') initProdutos();
  if (page === 'produto') initProduto();
  if (page === 'carrinho') initCarrinhoPage();
});

/* ---- HEADER ---- */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;
  const update = () => header.classList.toggle('scrolled', window.scrollY > 60);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

/* ---- MOBILE MENU ---- */
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* ---- BUSCA ---- */
function initSearch() {
  const btn = document.querySelector('.btn-busca');
  const form = document.querySelector('.search-form');
  if (!btn || !form) return;
  btn.addEventListener('click', () => {
    form.classList.toggle('open');
    if (form.classList.contains('open')) form.querySelector('input').focus();
  });
  form.addEventListener('submit', e => {
    e.preventDefault();
    const q = form.querySelector('input').value.trim();
    if (q) window.location.href = 'produtos.html?q=' + encodeURIComponent(q);
  });
}

/* ---- SCROLL ANIMATIONS ---- */
function initScrollAnimations() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.animate').forEach(el => obs.observe(el));
}

/* ---- HOME ---- */
function initHome() {
  renderMaisVendidos();
  renderNovidades();
  initCategorias();
}

function renderMaisVendidos() {
  const grid = document.getElementById('grid-mais-vendidos');
  if (!grid) return;
  grid.innerHTML = produtos.slice(0, 8).map(p => cardProduto(p)).join('');
  bindAddCart(grid);
  initScrollAnimations();
}

function renderNovidades() {
  const grid = document.getElementById('grid-novidades');
  if (!grid) return;
  grid.innerHTML = getNovidades().slice(0, 6).map(p => cardProduto(p, true)).join('');
  bindAddCart(grid);
  initScrollAnimations();
}

function initCategorias() {
  document.querySelectorAll('.categoria-card').forEach(card => {
    card.addEventListener('click', () => {
      const cat = card.dataset.categoria;
      const gen = card.dataset.genero;
      if (cat) window.location.href = 'produtos.html?categoria=' + cat;
      if (gen) window.location.href = 'produtos.html?genero=' + gen;
    });
    card.addEventListener('keydown', e => { if (e.key === 'Enter') card.click(); });
  });
}

/* ---- PRODUTOS ---- */
function initProdutos() {
  const params = new URLSearchParams(window.location.search);
  const estado = {
    marca: params.getAll('marca'),
    categoria: params.get('categoria') ? [params.get('categoria')] : [],
    genero: params.get('genero') ? [params.get('genero')] : [],
    tamanho: [],
    ordem: 'relevancia',
    busca: params.get('q') || '',
    pagina: 1,
    porPagina: 12
  };

  // Atualiza título da página de acordo com filtro ativo
  if (estado.genero.length) {
    const labels = { masculino: 'Masculino', feminino: 'Feminino', infantil: 'Infantil' };
    const el = document.querySelector('.page-header-titulo');
    if (el) el.textContent = labels[estado.genero[0]] || 'Todos os Tênis';
  }

  inicializarFiltros(estado);
  renderProdutos(estado);

  document.getElementById('select-ordem')?.addEventListener('change', e => {
    estado.ordem = e.target.value; estado.pagina = 1; renderProdutos(estado);
  });
}

function inicializarFiltros(estado) {
  const containerMarcas = document.getElementById('filtro-marcas');
  if (containerMarcas) {
    containerMarcas.innerHTML = marcas.map(m =>
      '<label class="filtro-check"><input type="checkbox" value="' + m + '"' + (estado.marca.includes(m) ? ' checked' : '') + '><span>' + m + '</span></label>'
    ).join('');
    containerMarcas.querySelectorAll('input').forEach(cb => {
      cb.addEventListener('change', () => {
        estado.marca = [...containerMarcas.querySelectorAll('input:checked')].map(i => i.value);
        estado.pagina = 1; renderProdutos(estado);
      });
    });
  }

  const containerCat = document.getElementById('filtro-categorias');
  if (containerCat) {
    const cats = { casual: 'Casual', corrida: 'Corrida', lancamentos: 'Lançamentos' };
    containerCat.innerHTML = Object.entries(cats).map(([v, l]) =>
      '<label class="filtro-check"><input type="checkbox" value="' + v + '"' + (estado.categoria.includes(v) ? ' checked' : '') + '><span>' + l + '</span></label>'
    ).join('');
    containerCat.querySelectorAll('input').forEach(cb => {
      cb.addEventListener('change', () => {
        estado.categoria = [...containerCat.querySelectorAll('input:checked')].map(i => i.value);
        estado.pagina = 1; renderProdutos(estado);
      });
    });
  }

  const containerGen = document.getElementById('filtro-generos');
  if (containerGen) {
    const gens = { masculino: 'Masculino', feminino: 'Feminino', infantil: 'Infantil' };
    containerGen.innerHTML = Object.entries(gens).map(([v, l]) =>
      '<label class="filtro-check"><input type="checkbox" value="' + v + '"' + (estado.genero.includes(v) ? ' checked' : '') + '><span>' + l + '</span></label>'
    ).join('');
    containerGen.querySelectorAll('input').forEach(cb => {
      cb.addEventListener('change', () => {
        estado.genero = [...containerGen.querySelectorAll('input:checked')].map(i => i.value);
        estado.pagina = 1; renderProdutos(estado);
      });
    });
  }

  const containerTam = document.getElementById('filtro-tamanhos');
  if (containerTam) {
    containerTam.innerHTML = tamanhosList.map(t =>
      '<button class="btn-tamanho-filtro" data-tam="' + t + '">' + t + '</button>'
    ).join('');
    containerTam.querySelectorAll('.btn-tamanho-filtro').forEach(btn => {
      btn.addEventListener('click', () => {
        const t = parseInt(btn.dataset.tam);
        btn.classList.toggle('ativo');
        if (estado.tamanho.includes(t)) estado.tamanho = estado.tamanho.filter(x => x !== t);
        else estado.tamanho.push(t);
        estado.pagina = 1; renderProdutos(estado);
      });
    });
  }

  if (estado.busca) {
    const inp = document.getElementById('input-busca-produtos');
    if (inp) inp.value = estado.busca;
  }

  document.getElementById('input-busca-produtos')?.addEventListener('input', e => {
    estado.busca = e.target.value; estado.pagina = 1; renderProdutos(estado);
  });

  document.getElementById('btn-limpar-filtros')?.addEventListener('click', () => {
    estado.marca = []; estado.categoria = []; estado.genero = []; estado.tamanho = []; estado.busca = ''; estado.pagina = 1;
    containerMarcas?.querySelectorAll('input').forEach(i => i.checked = false);
    containerCat?.querySelectorAll('input').forEach(i => i.checked = false);
    containerGen?.querySelectorAll('input').forEach(i => i.checked = false);
    containerTam?.querySelectorAll('.btn-tamanho-filtro').forEach(b => b.classList.remove('ativo'));
    const inp = document.getElementById('input-busca-produtos');
    if (inp) inp.value = '';
    renderProdutos(estado);
  });
}

function filtrarProdutos(estado) {
  let lista = [...produtos];
  if (estado.busca) { const q = estado.busca.toLowerCase(); lista = lista.filter(p => p.nome.toLowerCase().includes(q) || p.marca.toLowerCase().includes(q)); }
  if (estado.marca.length) lista = lista.filter(p => estado.marca.includes(p.marca));
  if (estado.categoria.length) lista = lista.filter(p => estado.categoria.includes(p.categoria));
  if (estado.genero.length) lista = lista.filter(p => estado.genero.includes(p.genero));
  if (estado.tamanho.length) lista = lista.filter(p => estado.tamanho.every(t => p.tamanhos.includes(t)));
  if (estado.ordem === 'menor') lista.sort((a,b) => calcularPrecoFinal(a) - calcularPrecoFinal(b));
  if (estado.ordem === 'maior') lista.sort((a,b) => calcularPrecoFinal(b) - calcularPrecoFinal(a));
  if (estado.ordem === 'novidades') lista.sort((a,b) => b.novo - a.novo);
  return lista;
}

function renderProdutos(estado) {
  const lista = filtrarProdutos(estado);
  const total = lista.length;
  const pagina = lista.slice((estado.pagina - 1) * estado.porPagina, estado.pagina * estado.porPagina);
  const grid = document.getElementById('grid-produtos');
  const info = document.getElementById('total-produtos');
  if (info) info.textContent = total + ' produto' + (total !== 1 ? 's' : '') + ' encontrado' + (total !== 1 ? 's' : '');
  if (!grid) return;
  if (!pagina.length) {
    grid.innerHTML = '<div class="empty-state"><p>Nenhum produto encontrado.</p><button onclick="document.getElementById('btn-limpar-filtros').click()">Limpar filtros</button></div>';
    const pag = document.getElementById('paginacao');
    if (pag) pag.innerHTML = '';
    return;
  }
  grid.innerHTML = pagina.map(p => cardProduto(p)).join('');
  bindAddCart(grid);
  initScrollAnimations();
  renderPaginacao(total, estado);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderPaginacao(total, estado) {
  const pag = document.getElementById('paginacao');
  if (!pag) return;
  const totalPags = Math.ceil(total / estado.porPagina);
  if (totalPags <= 1) { pag.innerHTML = ''; return; }
  let html = '';
  if (estado.pagina > 1) html += '<button class="btn-pag" data-p="' + (estado.pagina - 1) + '">&#8592;</button>';
  for (let i = 1; i <= totalPags; i++) html += '<button class="btn-pag ' + (i === estado.pagina ? 'ativo' : '') + '" data-p="' + i + '">' + i + '</button>';
  if (estado.pagina < totalPags) html += '<button class="btn-pag" data-p="' + (estado.pagina + 1) + '">&#8594;</button>';
  pag.innerHTML = html;
  pag.querySelectorAll('.btn-pag').forEach(btn => {
    btn.addEventListener('click', () => { estado.pagina = parseInt(btn.dataset.p); renderProdutos(estado); });
  });
}

/* ---- PRODUTO ---- */
function initProduto() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id')) || 1;
  const produto = getProduto(id);
  if (!produto) { window.location.href = 'produtos.html'; return; }
  renderDetalhe(produto);
  renderRelacionados(produto);
}

function renderDetalhe(p) {
  document.title = p.nome + ' — Central do Tênis GYN';
  const preco = calcularPrecoFinal(p);
  const pix = calcularPrecoPix(p);

  const galeria = document.getElementById('galeria-principal');
  if (galeria) galeria.innerHTML = '<div class="img-placeholder grande" style="background:' + gradiente(p.cor) + '"><span class="placeholder-tag">' + p.tag + '</span></div>';

  const thumbs = document.getElementById('galeria-thumbs');
  if (thumbs) {
    const cores = [p.cor, ajustarCor(p.cor, 30), ajustarCor(p.cor, -30), '#E5E5E5'];
    thumbs.innerHTML = cores.map((c, i) => '<div class="thumb ' + (i === 0 ? 'ativo' : '') + '" style="background:' + gradiente(c) + '" data-cor="' + c + '"></div>').join('');
    thumbs.querySelectorAll('.thumb').forEach(t => {
      t.addEventListener('click', () => {
        thumbs.querySelectorAll('.thumb').forEach(x => x.classList.remove('ativo'));
        t.classList.add('ativo');
        galeria.querySelector('.img-placeholder').style.background = gradiente(t.dataset.cor);
      });
    });
  }

  document.getElementById('produto-nome-breadcrumb').textContent = p.nome;
  document.getElementById('produto-marca').textContent = p.marca;
  document.getElementById('produto-nome').textContent = p.nome;
  document.getElementById('produto-avaliacao').innerHTML = '⭐⭐⭐⭐⭐ <span>(47 avaliações)</span>';

  if (p.desconto > 0) document.getElementById('produto-preco-original').innerHTML = '<s>' + formatarPreco(p.preco) + '</s> <span class="badge-desconto">-' + p.desconto + '%</span>';
  document.getElementById('produto-preco').textContent = formatarPreco(preco);
  document.getElementById('produto-parcelas').textContent = '12x de ' + formatarPreco(preco / 12) + ' sem juros';
  document.getElementById('produto-pix').textContent = formatarPreco(pix) + ' no Pix (-10%)';

  const gridTam = document.getElementById('grid-tamanhos');
  if (gridTam) {
    gridTam.innerHTML = p.tamanhos.map(t => {
      const esg = p.esgotados.includes(t);
      return '<button class="btn-tamanho ' + (esg ? 'esgotado' : '') + '" data-tam="' + t + '" ' + (esg ? 'disabled' : '') + '>' + t + '</button>';
    }).join('');
    gridTam.querySelectorAll('.btn-tamanho:not([disabled])').forEach(btn => {
      btn.addEventListener('click', () => {
        gridTam.querySelectorAll('.btn-tamanho').forEach(b => b.classList.remove('selecionado'));
        btn.classList.add('selecionado');
      });
    });
  }

  document.getElementById('tab-descricao-content').innerHTML = '<p>' + p.descricao + '</p>';
  document.getElementById('tab-specs-content').innerHTML = Object.entries(p.especificacoes).map(([k,v]) => '<div class="spec-row"><dt>' + k.charAt(0).toUpperCase() + k.slice(1) + '</dt><dd>' + v + '</dd></div>').join('');

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('ativo'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('ativo'));
      btn.classList.add('ativo');
      document.getElementById(btn.dataset.tab).classList.add('ativo');
    });
  });

  document.getElementById('btn-add-cart-detalhe')?.addEventListener('click', () => {
    const tam = document.querySelector('.btn-tamanho.selecionado')?.dataset.tam;
    if (!tam) { mostrarToast('Selecione um tamanho!'); return; }
    Carrinho.adicionar(p.id, parseInt(tam));
    mostrarToast('✓ Adicionado ao carrinho!');
  });

  document.getElementById('btn-comprar-agora')?.addEventListener('click', () => {
    const tam = document.querySelector('.btn-tamanho.selecionado')?.dataset.tam;
    if (!tam) { mostrarToast('Selecione um tamanho!'); return; }
    Carrinho.adicionar(p.id, parseInt(tam));
    window.location.href = 'carrinho.html';
  });
}

function renderRelacionados(p) {
  const grid = document.getElementById('grid-relacionados');
  if (!grid) return;
  const lista = produtos.filter(x => x.id !== p.id && (x.marca === p.marca || x.categoria === p.categoria || x.genero === p.genero)).slice(0, 4);
  grid.innerHTML = lista.map(x => cardProduto(x)).join('');
  bindAddCart(grid);
  initScrollAnimations();
}

/* ---- CARRINHO PAGE ---- */
function initCarrinhoPage() {
  if (Carrinho.totalItens() === 0) { Carrinho.adicionar(1, 42, 1); Carrinho.adicionar(13, 37, 1); }
  renderCarrinhoTabela();

  document.getElementById('btn-calcular-frete')?.addEventListener('click', () => {
    const cep = document.getElementById('input-cep')?.value.replace(/\D/g,'');
    if (cep.length === 8) document.getElementById('frete-resultado').textContent = 'Frete: R$ 19,90 (5–7 dias úteis)';
  });

  document.getElementById('input-cep')?.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g,'');
    if (v.length > 5) v = v.slice(0,5) + '-' + v.slice(5,8);
    e.target.value = v;
  });
}

function renderCarrinhoTabela() {
  const itens = Carrinho.getItens();
  const tbody = document.getElementById('carrinho-tbody');
  const empty = document.getElementById('carrinho-empty');
  const wrapper = document.getElementById('carrinho-wrapper');

  if (!itens.length) {
    if (wrapper) wrapper.style.display = 'none';
    if (empty) empty.style.display = 'flex';
    return;
  }
  if (wrapper) wrapper.style.display = 'grid';
  if (empty) empty.style.display = 'none';

  if (tbody) {
    tbody.innerHTML = itens.map(item => '<tr data-chave="' + item.chave + '"><td class="td-produto"><div class="cart-img" style="background:' + gradiente(item.cor) + '"></div><div><strong>' + item.nome + '</strong><small>' + item.marca + '</small><small>Tam. ' + item.tamanho + '</small></div></td><td class="td-qtd"><div class="qtd-ctrl"><button class="btn-qtd" data-action="menos" data-chave="' + item.chave + '">−</button><span>' + item.quantidade + '</span><button class="btn-qtd" data-action="mais" data-chave="' + item.chave + '">+</button></div></td><td class="td-preco">' + formatarPreco(item.preco * item.quantidade) + '</td><td class="td-rm"><button class="btn-remover" data-chave="' + item.chave + '" title="Remover">✕</button></td></tr>').join('');

    tbody.querySelectorAll('.btn-qtd').forEach(btn => {
      btn.addEventListener('click', () => { Carrinho.atualizarQuantidade(btn.dataset.chave, btn.dataset.action === 'mais' ? 1 : -1); renderCarrinhoTabela(); });
    });
    tbody.querySelectorAll('.btn-remover').forEach(btn => {
      btn.addEventListener('click', () => { Carrinho.remover(btn.dataset.chave); renderCarrinhoTabela(); });
    });
  }

  const sub = Carrinho.subtotal();
  const elSub = document.getElementById('resumo-subtotal');
  const elTot = document.getElementById('resumo-total');
  if (elSub) elSub.textContent = formatarPreco(sub);
  if (elTot) elTot.textContent = formatarPreco(sub);
}

/* ---- UTILS ---- */
function bindAddCart(container) {
  container.querySelectorAll('.btn-add-cart').forEach(btn => btn.addEventListener('click', handleAddCart));
}

function handleAddCart(e) {
  const id = parseInt(e.currentTarget.dataset.id);
  const produto = getProduto(id);
  if (!produto) return;
  Carrinho.adicionar(id, produto.tamanhos[0]);
  mostrarToast('✓ ' + produto.nome + ' adicionado!');
}

function cardProduto(p, forcarNovo = false) {
  const preco = calcularPrecoFinal(p);
  const temDesc = p.desconto > 0;
  const genLabels = { masculino:'MASC', feminino:'FEM', infantil:'KIDS' };
  const genClass = { masculino:'badge-masc', feminino:'badge-fem', infantil:'badge-kids' };
  const tagClass = p.tag === 'OFERTA' || p.tag === 'TOP DE LINHA' ? 'card-tag card-tag-orange' : (p.novo || forcarNovo) ? 'card-tag card-tag-green' : 'card-tag';
  return '<article class="product-card animate" role="article"><a href="produto.html?id=' + p.id + '" class="card-img-link"><div class="card-img" style="background:' + gradiente(p.cor) + '"><span class="' + tagClass + '">' + p.tag + '</span><span class="card-genero-badge ' + genClass[p.genero] + '">' + genLabels[p.genero] + '</span><div class="card-img-emoji">👟</div><div class="card-quick-add"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> VER PRODUTO</div></div></a><div class="card-body"><span class="card-marca">' + p.marca + '</span><a href="produto.html?id=' + p.id + '"><h3 class="card-nome">' + p.nome + '</h3></a><div class="card-preco">' + (temDesc ? '<s class="preco-riscado">' + formatarPreco(p.preco) + '</s>' : '') + '<span class="preco-atual">' + formatarPreco(preco) + '</span></div><span class="card-parcelas">12x de ' + formatarPreco(preco/12) + '</span><button class="btn-add-cart" data-id="' + p.id + '">+ Adicionar</button></div></article>';
}

function gradiente(cor) {
  return 'linear-gradient(135deg, ' + cor + '99 0%, ' + cor + '55 50%, ' + cor + '22 100%)';
}

function ajustarCor(hex, valor) {
  const num = parseInt(hex.replace('#',''), 16);
  const r = Math.max(0,Math.min(255,(num >> 16)+valor));
  const g = Math.max(0,Math.min(255,((num >> 8) & 0xff)+valor));
  const b = Math.max(0,Math.min(255,(num & 0xff)+valor));
  return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}

function mostrarToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) { toast = document.createElement('div'); toast.id = 'toast'; document.body.appendChild(toast); }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('show'), 2500);
}
