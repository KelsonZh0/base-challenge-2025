// ------------------ INICIALIZAÇÃO --------------------
const form = document.getElementById("form-pre-atendimento");
const botaoEnviar = document.getElementById("botao-enviar");
const inputs = form.querySelectorAll("input[required]");
const cpfInput = document.getElementById("cpf");
const telInput = document.getElementById("telefone");
const radioGroups = [
  "sexualidade",
  "dificuldade_celular",
  "dificuldade_leitura",
  "tem_auxilio"
];

// ------------------ MÁSCARA CPF --------------------
cpfInput.addEventListener("input", () => {
  let value = cpfInput.value.replace(/\D/g, "");
  if (value.length > 11) value = value.slice(0, 11);
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  cpfInput.value = value;
});

// ------------------ MÁSCARA TELEFONE --------------------
telInput.addEventListener("input", () => {
  let value = telInput.value.replace(/\D/g, "");
  if (value.length > 11) value = value.slice(0, 11);
  if (value.length <= 10) {
    value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  } else {
    value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  }
  telInput.value = value;
});

// ------------------ VALIDAÇÃO EM TEMPO REAL (inclui CPF) --------------------
form.addEventListener("input", () => {
  let valido = true;

  inputs.forEach(input => {
    if (!input.checkValidity()) {
      valido = false;
    }
  });

  const email = document.getElementById("email").value;
  const confirmar = document.getElementById("confirmar-email").value;
  const confirmarInput = document.getElementById("confirmar-email");

  if (email !== confirmar) {
    valido = false;
    confirmarInput.setCustomValidity("Os e-mails não coincidem");
  } else {
    confirmarInput.setCustomValidity("");
  }

  // Verifica se há pelo menos uma opção marcada em cada grupo de rádio
  radioGroups.forEach(name => {
    const radios = form.querySelectorAll(`input[name="${name}"]`);
    const container = radios[0]?.closest(".radio-group");
    const checked = Array.from(radios).some(r => r.checked);
    if (container) {
      container.classList.toggle("invalid", !checked);
      container.classList.toggle("valid", checked);
    }
    if (!checked) valido = false;
  });

  // Valida CPF enquanto o usuário digita
// Valida CPF enquanto o usuário digita
const cpfValido = validarCPF(cpfInput.value.replace(/\D/g, ""));
if (cpfValido) {
  cpfInput.classList.add("valid");
  cpfInput.classList.remove("invalid");
} else {
  cpfInput.classList.add("invalid");
  cpfInput.classList.remove("valid");
}
if (!cpfValido) valido = false;

  botaoEnviar.disabled = !valido;
});

// ------------------ VALIDAÇÃO CPF REAL --------------------
function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
  let dig1 = 11 - (soma % 11);
  if (dig1 >= 10) dig1 = 0;
  if (dig1 != cpf[9]) return false;
  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
  let dig2 = 11 - (soma % 11);
  if (dig2 >= 10) dig2 = 0;
  return dig2 == cpf[10];
}

// ------------------ VALIDAÇÃO FINAL E REDIRECIONAMENTO --------------------
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const confirmar = document.getElementById("confirmar-email").value;
  const nome = document.getElementById("nome").value;
  const cpf = document.getElementById("cpf").value;

  if (!validarCPF(cpf)) {
    alert("CPF inválido.");
    return;
  }

  if (email !== confirmar) {
    alert("Os e-mails não coincidem.");
    return;
  }

  localStorage.setItem("nomeUsuario", nome);
  window.location.href = "index.html";
});
