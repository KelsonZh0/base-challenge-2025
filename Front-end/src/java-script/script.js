const cards = document.querySelectorAll('.cartao-integrante');
const botao = document.getElementById('btn-proximo');
let indiceAtual = 0;

function mostrarCard(indice) {
  cards.forEach((card, i) => {
    card.classList.toggle('ativo', i === indice);
  });
}

botao.addEventListener('click', () => {
  indiceAtual = (indiceAtual + 1) % cards.length;
  mostrarCard(indiceAtual);
});

mostrarCard(indiceAtual); // inicia com o primeiro card