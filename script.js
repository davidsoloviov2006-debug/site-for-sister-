document.getElementById('year').textContent = new Date().getFullYear();

const nav = document.getElementById('nav');
document.getElementById('burger').addEventListener('click', () => nav.classList.toggle('open'));
nav.addEventListener('click', e => { if (e.target.tagName === 'A') nav.classList.remove('open'); });

// Заявка уходит в WhatsApp. Замените номер на свой: код страны + номер, без + и нулей (например 972501234567).
const WHATSAPP = '972000000000';

document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(e.target);
  const text = `Заявка на массаж\nИмя: ${d.get('name')}\nТелефон: ${d.get('phone')}\nУслуга: ${d.get('service')}\nКомментарий: ${d.get('msg') || '-'}`;
  document.getElementById('ok').hidden = false;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank');
  e.target.reset();
});
