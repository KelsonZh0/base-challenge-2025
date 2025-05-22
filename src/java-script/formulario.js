// ------------------ INICIALIZAÇÃO --------------------
const form = document.getElementById("form-pre-atendimento"); // Seleciona o formulário
const botaoEnviar = document.getElementById("botao-enviar");   // Seleciona o botão ENVIAR
  const botaoCancelar = document.getElementById("botao-cancelar"); // Seleciona o botão CANCELAR
const inputs = form.querySelectorAll("input[required]");       // Seleciona todos os inputs obrigatórios
const cpfInput = document.getElementById("cpf");               // Seleciona o campo de CPF
const telInput = document.getElementById("telefone");          // Seleciona o campo de telefone

// Lista dos nomes de grupos de radio para validação dinâmica
const radioGroups = [
  "sexualidade",
  "dificuldade_celular",
  "dificuldade_leitura",
  "tem_auxilio"
];


// ------------------ MÁSCARA CPF --------------------
cpfInput.addEventListener("input", () => {
  let value = cpfInput.value.replace(/\D/g, "");         // Remove tudo que não for número
  if (value.length > 11) value = value.slice(0, 11);     // Limita a 11 dígitos
  value = value.replace(/(\d{3})(\d)/, "$1.$2");          // Aplica ponto depois de 3 dígitos
  value = value.replace(/(\d{3})(\d)/, "$1.$2");          // Aplica segundo ponto
  value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");    // Aplica traço nos dois últimos
  cpfInput.value = value;                                // Atualiza o campo formatado
});

// ------------------ MÁSCARA TELEFONE --------------------
telInput.addEventListener("input", () => {
  let value = telInput.value.replace(/\D/g, "");        // Remove não dígitos
  if (value.length > 11) value = value.slice(0, 11);    // Limita a 11 dígitos
  if (value.length <= 10) {
    value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3"); // Fixo
  } else {
    value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3"); // Celular
  }
  telInput.value = value;
});


// ------------------ VALIDAÇÃO EM TEMPO REAL (inclui CPF) --------------------
form.addEventListener("input", () => {
  let valido = true; // Começa assumindo que está tudo válido

  // Verifica se todos os campos obrigatórios estão válidos
  inputs.forEach(input => {
    if (!input.checkValidity()) valido = false;
  });


  // Valida se há pelo menos um item marcado em cada grupo de rádio
  radioGroups.forEach(name => {
    const radios = form.querySelectorAll(`input[name="${name}"]`);
    const container = radios[0]?.closest(".radio-group");
    const checked = Array.from(radios).some(r => r.checked); // Algum está marcado?

    if (container) {
      container.classList.toggle("invalid", !checked); // Aplica classe visual
      container.classList.toggle("valid", checked);
    }
    if (!checked) valido = false; // Se nenhum estiver marcado, formulário não é válido
  });

  // Valida CPF em tempo real com valor já sem pontos e traços
const cpfValido = validarCPF(cpfInput.value.replace(/\D/g, ""));
const iconeCpf = document.getElementById("icone-cpf");

if (cpfValido) {
  cpfInput.classList.add("valid");
  cpfInput.classList.remove("invalid");
  iconeCpf.textContent = "✅";
  iconeCpf.style.color = "green";
} else {
  cpfInput.classList.add("invalid");
  cpfInput.classList.remove("valid");
  iconeCpf.textContent = "❌";
  iconeCpf.style.color = "red";
  valido = false;
}


  // Ativa ou desativa o botão com base na validade
  botaoEnviar.disabled = !valido;
});

// ------------------ VALIDAÇÃO CPF REAL --------------------
function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, ''); // Remove tudo que não é número

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false; // Inválido se todos os dígitos iguais

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
  let dig1 = 11 - (soma % 11);
  if (dig1 >= 10) dig1 = 0;
  if (dig1 != cpf[9]) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
  let dig2 = 11 - (soma % 11);
  if (dig2 >= 10) dig2 = 0;

  return dig2 == cpf[10]; // Retorna true se ambos os dígitos conferem
}

// ------------------ VALIDAÇÃO FINAL E REDIRECIONAMENTO --------------------
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Evita envio padrão

  const nome = document.getElementById("nome").value;
  const cpf = document.getElementById("cpf").value;

  if (!validarCPF(cpf)) {
    alert("CPF inválido."); // Alerta caso o CPF esteja incorreto
    return;
  }

  localStorage.setItem("nomeUsuario", nome); // Armazena o nome para usar depois
  window.location.href = "../paginaAuxilio/cadastro.html";       // Redireciona para página de confirmação
});

  botaoCancelar.addEventListener("click", () => {
  window.location.href = "../../index.html"; // ajuste o caminho conforme sua estrutura
});
