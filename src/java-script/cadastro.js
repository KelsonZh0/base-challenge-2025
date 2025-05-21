// Função para controlar o carrossel de tutoriais
function iniciarCarrossel(botaoVoltarId, botaoProximoId, seletorCartoes) {
  const cartoes = document.querySelectorAll(seletorCartoes);
  let indiceAtual = 0;

  function mostrarCartao(indice) {
    cartoes.forEach((el, i) => {
      el.classList.toggle('ativo', i === indice);
    });
  }

  document.getElementById(botaoProximoId).addEventListener('click', () => {
    indiceAtual = (indiceAtual + 1) % cartoes.length;
    mostrarCartao(indiceAtual);
  });

  document.getElementById(botaoVoltarId).addEventListener('click', () => {
    indiceAtual = (indiceAtual - 1 + cartoes.length) % cartoes.length;
    mostrarCartao(indiceAtual);
  });

  mostrarCartao(indiceAtual); // Exibe o primeiro
}

// Iniciar carrossel do App
iniciarCarrossel(
  "btn-voltar-app",
  "btn-proximo-app",
  ".bloco-app .cartao-tutorial"
);

// Iniciar carrossel do Navegador
iniciarCarrossel(
  "btn-voltar-nav",
  "btn-proximo-nav",
  ".bloco-nav .cartao-tutorial"
);
