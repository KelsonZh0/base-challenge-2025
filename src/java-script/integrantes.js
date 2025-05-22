

let indiceAtual = 0;
const cartoes = document.querySelectorAll('.cartao-integrante');
const botaoProximo = document.getElementById('btn-proximo');

function mostrarCartao(indice) {
  cartoes.forEach(cartao => cartao.classList.remove('ativo'));
  cartoes[indice].classList.add('ativo');
}

function proximoCartao() {
  indiceAtual = (indiceAtual + 1) % cartoes.length;
  mostrarCartao(indiceAtual);
}

// Iniciar com o primeiro cartão visível
mostrarCartao(indiceAtual);

setInterval(proximoCartao, 10000);

// Alternar manualmente com botão
botaoProximo.addEventListener('click', proximoCartao);
