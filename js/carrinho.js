/* =============================================
   CARRINHO — Central do Tênis GYN
   ============================================= */

const Carrinho = (() => {
  const STORAGE_KEY = 'cdt_carrinho';

  function getItens() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function salvar(itens) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(itens));
    atualizarBadges();
  }

  function adicionar(produtoId, tamanho, quantidade = 1) {
    const itens = getItens();
    const produto = getProduto(produtoId);
    if (!produto) return;

    const chave = `${produtoId}-${tamanho}`;
    const existente = itens.find(i => i.chave === chave);

    if (existente) {
      existente.quantidade += quantidade;
    } else {
      itens.push({
        chave,
        produtoId,
        tamanho,
        quantidade,
        nome: produto.nome,
        marca: produto.marca,
        preco: calcularPrecoFinal(produto),
        cor: produto.cor,
        tag: produto.tag
      });
    }

    salvar(itens);
    animarBadge();
  }

  function remover(chave) {
    const itens = getItens().filter(i => i.chave !== chave);
    salvar(itens);
  }

  function atualizarQuantidade(chave, delta) {
    const itens = getItens();
    const item = itens.find(i => i.chave === chave);
    if (!item) return;
    item.quantidade = Math.max(1, item.quantidade + delta);
    salvar(itens);
  }

  function limpar() {
    salvar([]);
  }

  function totalItens() {
    return getItens().reduce((acc, i) => acc + i.quantidade, 0);
  }

  function subtotal() {
    return getItens().reduce((acc, i) => acc + i.preco * i.quantidade, 0);
  }

  function atualizarBadges() {
    const total = totalItens();
    document.querySelectorAll('.cart-badge').forEach(el => {
      el.textContent = total;
      el.style.display = total > 0 ? 'flex' : 'none';
    });
  }

  function animarBadge() {
    document.querySelectorAll('.cart-badge').forEach(el => {
      el.classList.remove('bounce');
      void el.offsetWidth;
      el.classList.add('bounce');
      setTimeout(() => el.classList.remove('bounce'), 400);
    });
  }

  function init() {
    atualizarBadges();
  }

  return { getItens, adicionar, remover, atualizarQuantidade, limpar, totalItens, subtotal, init };
})();
