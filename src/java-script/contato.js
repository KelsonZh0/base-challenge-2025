document.addEventListener("DOMContentLoaded", () => {
  const contatos = document.querySelectorAll('.contato h3');

  contatos.forEach((el) => {
    el.addEventListener('click', () => {
      el.parentElement.classList.toggle('active');
    });
  });
});