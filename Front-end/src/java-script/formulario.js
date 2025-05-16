// ------------------ MÁSCARA CPF --------------------
// Seleciona o campo de CPF pelo ID
const cpfInput = document.getElementById("cpf");

// Adiciona um ouvinte de evento: toda vez que o conteúdo do campo muda
cpfInput.addEventListener("input", () => {
  // Remove todos os caracteres que não são dígitos (letras, traços, pontos etc.)
  let value = cpfInput.value.replace(/\D/g, "");

  // Limita o valor a no máximo 11 dígitos (CPF)
  if (value.length > 11) value = value.slice(0, 11);

  // Aplica a máscara no formato 000.000.000-00
  value = value.replace(/(\d{3})(\d)/, "$1.$2");        // após 3 dígitos, adiciona ponto
  value = value.replace(/(\d{3})(\d)/, "$1.$2");        // novamente após mais 3 dígitos
  value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");  // coloca traço antes dos 2 últimos

  // Atualiza o campo com o valor formatado
  cpfInput.value = value;
});


// ------------------ MÁSCARA TELEFONE --------------------
// Seleciona o campo de telefone pelo ID
const telInput = document.getElementById("telefone");

// Evento que dispara quando o usuário digita no campo
telInput.addEventListener("input", () => {
  // Remove qualquer caractere que não seja número
  let value = telInput.value.replace(/\D/g, "");

  // Limita a 11 dígitos (DDD + 9 dígitos do número)
  if (value.length > 11) value = value.slice(0, 11);

  // Formata como telefone fixo: (11) 1234-5678
  if (value.length <= 10) {
    value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  } else {
    // Formata como celular: (11) 91234-5678
    value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  }

  // Atualiza o campo com o valor formatado
  telInput.value = value;
});


// ------------------ VALIDAÇÃO CPF REAL --------------------
// Ela valida matematicamente se o CPF é real, com base nos dígitos verificadores.
function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, ''); // remove tudo que não é número

  // Verifica se tem 11 dígitos e não são todos iguais (ex: 111.111.111-11)
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  // Calcula o primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
  let dig1 = 11 - (soma % 11);
  if (dig1 >= 10) dig1 = 0;
  if (dig1 != cpf[9]) return false;

  // Calcula o segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
  let dig2 = 11 - (soma % 11);
  if (dig2 >= 10) dig2 = 0;

  return dig2 == cpf[10]; // retorna true se os dois dígitos estão corretos
}


// ------------------ VERIFICAÇÃO FINAL E REDIRECIONAMENTO --------------------
// Seleciona o formulário e adiciona um ouvinte para o evento de envio
document.getElementById("form-pre-atendimento").addEventListener("submit", function (e) {
  // Pega os valores dos campos de e-mail e confirmação
  const email = document.getElementById("email").value;
  const confirmar = document.getElementById("confirmar-email").value;
  
  // Pega o nome digitado para mostrar depois na página de confirmação
  const nome = document.getElementById("nome").value;

    if (!validarCPF(cpf)) {
    alert("CPF inválido.");
    e.preventDefault();
    return;
  }

  // Se os e-mails forem diferentes, mostra alerta e impede envio
  if (email !== confirmar) {
    alert("Os e-mails não coincidem.");
    e.preventDefault(); // bloqueia o envio do formulário
    return;
  }

  // Armazena o nome do usuário no localStorage (memória do navegador)
  // Isso será usado na página index.html para mostrar a mensagem personalizada
  localStorage.setItem("nomeUsuario", nome);

  // Redireciona para a página index.html (onde a mensagem será mostrada)
  e.preventDefault(); // impede envio padrão do formulário
  window.location.href = "index.html";
});