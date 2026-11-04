document.getElementById('year').textContent = new Date().getFullYear();

const nav = document.getElementById('nav');
document.getElementById('burger').addEventListener('click', () => nav.classList.toggle('open'));
nav.addEventListener('click', e => { if (e.target.tagName === 'A') nav.classList.remove('open'); });

// ---- Языки ----
let lang = 'he';

function setLang(l) {
  if (!I18N[l]) l = 'he';
  lang = l;
  const t = I18N[l];
  document.documentElement.lang = l;
  document.documentElement.dir = l === 'he' ? 'rtl' : 'ltr';
  document.title = t.title;
  document.querySelectorAll('[data-i18n]').forEach(el => { const v = t[el.dataset.i18n]; if (v) el.innerHTML = v; });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = t[el.dataset.i18nPh]; });
  document.querySelectorAll('[data-i18n-alt]').forEach(el => { el.alt = t[el.dataset.i18nAlt]; });
  document.querySelectorAll('#lang button').forEach(b => b.classList.toggle('active', b.dataset.lang === l));
  try { localStorage.setItem('lang', l); } catch (e) {}
}

document.getElementById('lang').addEventListener('click', e => {
  if (e.target.dataset.lang) setLang(e.target.dataset.lang);
});

// Язык можно задать ссылкой: ...?lang=ru или ?lang=en
let saved = new URLSearchParams(location.search).get('lang');
if (!saved) { try { saved = localStorage.getItem('lang'); } catch (e) {} }
setLang(saved || 'he');

// ---- Заявка в WhatsApp ----
// Замените номер на свой: код страны + номер без нуля и без + (например 972501234567).
const WHATSAPP = '972000000000';

document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const t = I18N[lang];
  const d = new FormData(e.target);
  const text = `${t.waMsg}\n${t.waName}: ${d.get('name')}\n${t.waPhone}: ${d.get('phone')}\n${t.waService}: ${d.get('service')}\n${t.waComment}: ${d.get('msg') || '-'}`;
  document.getElementById('ok').hidden = false;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank');
  e.target.reset();
});
