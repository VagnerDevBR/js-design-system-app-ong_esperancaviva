// formValidation.js — validações e tratamento do formulário de cadastro
import { storage } from './storage.js';
import { showToast } from './templates.js';

export function initFormValidation() {
  const form = document.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', handleSubmit);

  // Validação dinâmica: formata o CPF enquanto o usuário digita
  const cpfInput = form.querySelector('#cpf');
  if (cpfInput) {
    cpfInput.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '');
      v = v.slice(0, 11);
      v = v.replace(/(\d{3})(\d)/, '$1.$2');
      v = v.replace(/(\d{3})(\d)/, '$1.$2');
      v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      e.target.value = v;
    });
  }
}

function handleSubmit(ev) {
  ev.preventDefault();
  const form = ev.target;
  const data = new FormData(form);
  const obj = Object.fromEntries(data.entries());

  const errors = validateFormData(obj);
  clearFieldErrors(form);

  if (errors.length) {
    errors.forEach(err => {
      const el = form.querySelector(`[name="${err.field}"]`);
      if (el) showFieldError(el, err.message);
    });
    const first = errors[0];
    if (first) {
      const firstEl = form.querySelector(`[name="${first.field}"]`);
      firstEl?.focus();
    }
    showToast('Corrija os campos indicados antes de enviar.', 'error');
    return;
  }

  // Se passou nas validações, salva o cadastro no localStorage
  const volunteers = storage.get('voluntarios', []);
  obj.id = Date.now();
  volunteers.push(obj);
  storage.set('voluntarios', volunteers);

  showToast('Cadastro enviado com sucesso!', 'success');
  form.reset();
}

// Valida os dados do formulário
function validateFormData(data) {
  const errors = [];

  const required = ['nome','email','cpf','telefone','nascimento','endereco','cep','cidade','estado'];
  required.forEach(f => {
    if (!data[f] || !String(data[f]).trim()) errors.push({ field: f, message: 'Campo obrigatório' });
  });

  // E-mail
  if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.push({ field: 'email', message: 'Email inválido' });
  }

  // CPF
  if (data.cpf && !isValidCPF(data.cpf)) {
    errors.push({ field: 'cpf', message: 'CPF inválido' });
  }

  // Telefone (BR)
  if (data.telefone && !/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(data.telefone)) {
    errors.push({ field: 'telefone', message: 'Telefone inválido. Formato: (XX) XXXXX-XXXX' });
  }

  // CEP
  if (data.cep && !/^\d{5}-\d{3}$/.test(data.cep)) {
    errors.push({ field: 'cep', message: 'CEP inválido. Formato: 00000-000' });
  }

  // Idade mínima
  if (data.nascimento) {
    const age = calculateAge(data.nascimento);
    if (age < 18) errors.push({ field: 'nascimento', message: 'É necessário ter 18 anos ou mais' });
  }

  // Estado (duas letras)
  if (data.estado && !/^[A-Za-z]{2}$/.test(data.estado)) {
    errors.push({ field: 'estado', message: 'Informe a sigla do estado (2 letras)' });
  }

  return errors;
}

// Exibe uma mensagem de erro abaixo do campo
function showFieldError(el, message) {
  el.setAttribute('aria-invalid', 'true');
  el.style.borderColor = '#e57373';

  let err = el.nextElementSibling;
  if (!err || !err.classList?.contains('field-error')) {
    err = document.createElement('div');
    err.className = 'field-error';
    err.style.color = '#e57373';
    err.style.fontSize = '0.9rem';
    err.style.marginTop = '6px';
    el.parentNode.insertBefore(err, el.nextSibling);
  }
  err.textContent = message;
}

// Remove mensagens de erro anteriores
function clearFieldErrors(form) {
  form.querySelectorAll('[aria-invalid="true"]').forEach(el => {
    el.removeAttribute('aria-invalid');
    el.style.borderColor = '';
  });
  form.querySelectorAll('.field-error').forEach(e => e.remove());
}

// Calcula idade a partir da data de nascimento
function calculateAge(dateString) {
  const today = new Date();
  const birth = new Date(dateString);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

// Validação de CPF (aceita formato 000.000.000-00 ou apenas números)
function isValidCPF(cpf) {
  if (!cpf) return false;
  const onlyNums = cpf.replace(/\D/g, '');
  if (onlyNums.length !== 11) return false;
  if (/^(\d)\1+$/.test(onlyNums)) return false;
  const digits = onlyNums.split('').map(d => parseInt(d, 10));

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += digits[i] * (10 - i);
  let rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== digits[9]) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += digits[i] * (11 - i);
  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  return rev === digits[10];
}
