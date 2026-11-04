document.getElementById('year').textContent = new Date().getFullYear();

const nav = document.getElementById('nav');
document.getElementById('burger').addEventListener('click', () => nav.classList.toggle('open'));
nav.addEventListener('click', e => { if (e.target.tagName === 'A') nav.classList.remove('open'); });

// Заявка уходит в Telegram. Замените username на свой (без @).
const TELEGRAM_USER = 'username';

document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(e.target);
  const text = `Заявка на массаж\nИмя: ${d.get('name')}\nТелефон: ${d.get('phone')}\nУслуга: ${d.get('service')}\nКомментарий: ${d.get('msg') || '-'}`;
  document.getElementById('ok').hidden = false;
  window.open(`https://t.me/${TELEGRAM_USER}?text=${encodeURIComponent(text)}`, '_blank');
  e.target.reset();
});
