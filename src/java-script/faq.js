document.addEventListener("DOMContentLoaded", () => {
  const faqs = document.querySelectorAll('.faq h3');

  faqs.forEach((el) => {
    el.addEventListener('click', () => {
      el.parentElement.classList.toggle('active');
    });
  });
});