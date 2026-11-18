/* ====== PENGATURAN — EDIT DI SINI ====== */
const CONFIG = {
  nama: "Kaylaa",
  // Lagu latar. Ganti url dengan link audio mana pun (mp3 / ogg / wav / m4a).
  // Link harus langsung ke file audio-nya, bukan halaman YouTube/Spotify.
  musik: {
    url: "https://kappa.lol/ca8NFP",
    volume: 0.7,     // 0 (hening) sampai 1 (maksimal)
    mulaiDetik: 73,   // mulai dari detik ke berapa
    loop: true       // ulang terus
  },
  // Ganti link foto (jpg/png) di bawah ini dengan foto kalian.
  // Boleh tambah/kurangi jumlah fotonya.
  photos: [
    { src: "https://cdn-ichigo.web.id/uxH_l13u86.jpg", caption: "You 🧸" },
    { src: "https://cdn-ichigo.web.id/eBqMDpgQrq.jpg", caption: "You 🥰" },
    { src: "https://cdn-ichigo.web.id/hPHWkOQBO8.jpg", caption: "You 🌸" },
    { src: "https://cdn-ichigo.web.id/gidy4MSQDT.jpg", caption: "You 💖" }
  ],
  // Urutan: Stay Healthy, Stay Happy, Dream Big, Be Successful, Always Loved, Forever Us
  wishes: [
    "Selalu sehat, panjang umur, & dijauhkan dari segala hal buruk yaa sayang! 🌸",
    "Semoga hari-harimu selalu dipenuhi tawa dan kebahagiaan yang tak ada habisnya! 😊",
    "Apapun impian besar dan cita-citamu, semoga semuanya terwujud satu per satu dengan indah! 🌠",
    "Semoga kerja kerasmu selalu berbuah sukses, aku bangga banget sama kamu! 🏆",
    "Kamu selalu dicintai, hari ini, besok, dan selamanya. 💗",
    "Semoga kebersamaan kita selalu penuh kehangatan, kompromi, dan saling melengkapi selamanya! 💑"
  ],
  pesanAkhir: "Terima kasih sudah hadir di hidupku. Semoga semua doa dan harapanmu terkabul. I love you, always! 💌"
};
/* ======================================= */

const $ = (s, c = document) => c.querySelector(s), $$ = (s, c = document) => [...c.querySelectorAll(s)];
const next = el => el.closest('section').nextElementSibling?.scrollIntoView({ behavior: 'smooth' });
$$('[data-nama]').forEach(e => e.textContent = CONFIG.nama);
$('#fmsg').textContent = CONFIG.pesanAkhir;
$$('[data-next]').forEach(b => b.addEventListener('click', () => next(b)));

// hati melayang
const hb = $('#hearts');
setInterval(() => {
  const i = document.createElement('i'), d = 6 + Math.random() * 6;
  i.textContent = '♥'; i.style.left = Math.random() * 100 + '%';
  i.style.fontSize = 10 + Math.random() * 20 + 'px'; i.style.animationDuration = d + 's';
  hb.appendChild(i); setTimeout(() => i.remove(), d * 1000);
}, 450);

// dots navigasi
const secs = $$('section'), dots = $('#dots');
secs.forEach(() => dots.appendChild(document.createElement('b')));
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) [...dots.children].forEach((d, i) => d.classList.toggle('on', secs[i] === e.target));
}), { threshold: .6, root: $('#app') });
secs.forEach(s => io.observe(s));

// efek ledakan
function burst(x, y, set = ['💖', '✨', '⭐', '🌸', '💗'], n = 22) {
  for (let k = 0; k < n; k++) {
    const s = document.createElement('span'), a = Math.random() * 6.28, r = 60 + Math.random() * 130;
    s.textContent = set[k % set.length];
    s.style.cssText = `position:fixed;left:${x}px;top:${y}px;z-index:99;pointer-events:none;font-size:${12 + Math.random() * 14}px`;
    document.body.appendChild(s);
    s.animate([{ transform: 'translate(0,0) scale(1)', opacity: 1 },
      { transform: `translate(${Math.cos(a) * r}px,${Math.sin(a) * r + 70}px) scale(.3) rotate(240deg)`, opacity: 0 }],
      { duration: 1100 + Math.random() * 600, easing: 'cubic-bezier(.2,.8,.4,1)' }).onfinish = () => s.remove();
  }
}

// 1. amplop
const env = $('#env');
env.addEventListener('click', () => {
  if (env.classList.contains('open')) return;
  env.classList.add('open');
  $('#envHint').textContent = 'Terbuka! Tekan tombol di surat... ✨';
  const r = env.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + 70);
});

// 2. diary
const book = $('#book');
book.addEventListener('click', () => {
  $('.lock', book).textContent = '🔓'; book.classList.add('go');
  setTimeout(() => { book.style.display = 'none'; $('#page').classList.add('show'); $('#dBtn').classList.add('show'); }, 600);
});

// 3. polaroid (tarik & lempar)
const st = $('#stack');
let cards = CONFIG.photos.map(p => {
  const d = document.createElement('div'); d.className = 'pol';
  d.innerHTML = `<img src="${p.src}" alt="" onerror="this.style.opacity=.25"><span class="hand">${p.caption}</span>`;
  st.appendChild(d); return d;
});
const rot = i => ((i * 37) % 17) - 8;
function layout() {
  cards.forEach((c, i) => {
    c.style.zIndex = i;
    c.style.transform = i === cards.length - 1 ? `rotate(${rot(i) / 2}deg)`
      : `rotate(${rot(i)}deg) translate(${i % 2 ? 8 : -8}px,${(cards.length - 1 - i) * -2}px)`;
  });
}
layout();
let sx, sy, drag = null;
st.addEventListener('pointerdown', e => {
  const t = cards[cards.length - 1]; if (!t.contains(e.target)) return;
  drag = t; sx = e.clientX; sy = e.clientY; t.style.transition = 'none'; t.setPointerCapture(e.pointerId);
});
st.addEventListener('pointermove', e => {
  if (!drag) return; const dx = e.clientX - sx, dy = e.clientY - sy;
  drag.style.transform = `translate(${dx}px,${dy}px) rotate(${dx / 12}deg)`;
});
const endDrag = e => {
  if (!drag) return; const dx = e.clientX - sx, dy = e.clientY - sy, t = drag; drag = null; t.style.transition = '';
  if (Math.hypot(dx, dy) > 70) {
    t.style.transform = `translate(${dx * 3}px,${dy * 3}px) rotate(${dx / 5}deg)`; t.style.opacity = 0;
    setTimeout(() => {
      cards.unshift(cards.pop()); t.style.transition = 'none'; t.style.opacity = 1; layout();
      requestAnimationFrame(() => requestAnimationFrame(() => t.style.transition = ''));
    }, 350);
  } else layout();
};
st.addEventListener('pointerup', endDrag); st.addEventListener('pointercancel', endDrag);

// 4. potong kue
const tr = $('#track'), kn = $('#knife'), fl = $('#fill'), cut = $('#cut');
let cutting = false, done = false;
function setP(x) {
  const r = tr.getBoundingClientRect(), p = Math.min(1, Math.max(0, (x - r.left - 18) / (r.width - 36)));
  kn.style.left = `calc(${p * 100}% - ${p * 36}px)`; fl.style.width = p * 100 + '%'; cut.style.height = p * 100 + '%';
  if (p >= 1 && !done) {
    done = true; const c = $('.cake').getBoundingClientRect();
    burst(c.left + c.width / 2, c.top + 60, ['⭐', '✨', '🎉', '💖'], 40);
    $('#cakeSub').textContent = 'Yummy! Buat permohonan... 🕯️';
    setTimeout(() => next(tr), 2300);
  }
}
tr.addEventListener('pointerdown', e => { if (done) return; cutting = true; tr.setPointerCapture(e.pointerId); setP(e.clientX); });
tr.addEventListener('pointermove', e => { if (cutting && !done) setP(e.clientX); });
tr.addEventListener('pointerup', () => { cutting = false; if (!done) { kn.style.left = '0'; fl.style.width = '0'; cut.style.height = '0'; } });

// 5. floating wishes
const wb = $('#wbox'), wc = $('#wcard');
const names = ['Stay Healthy', 'Stay Happy', 'Dream Big', 'Be Successful', 'Always Loved', 'Forever Us'];
const pos = [[6, 8], [56, 6], [30, 38], [56, 46], [4, 66], [52, 78]];
names.forEach((t, i) => {
  const b = document.createElement('button'); b.className = 'bub'; b.textContent = t;
  b.style.left = pos[i][0] + '%'; b.style.top = pos[i][1] + '%'; b.style.animationDelay = -i * .7 + 's';
  b.addEventListener('click', () => {
    const r = b.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + 10, ['💗', '✨', '🌸'], 12);
    b.classList.add('pop'); setTimeout(() => b.remove(), 250);
    wc.innerHTML = `<div>✨ 💗 ✨</div><p>${CONFIG.wishes[i] || ''}</p>`; wc.classList.add('show');
  });
  wb.appendChild(b);
});

// 6. kado
const gift = $('#gift');
gift.addEventListener('click', () => {
  if (gift.classList.contains('open')) return; gift.classList.add('open');
  const r = gift.getBoundingClientRect(); burst(r.left + r.width / 2, r.top, ['🎉', '💖', '✨', '🎊', '⭐'], 40);
  setTimeout(() => $('#final').classList.add('show'), 900);
});
$('#close').addEventListener('click', () => $('#final').classList.remove('show'));

// ===== musik latar =====
const mBtn = $('#music'), lagu = new Audio();
lagu.src = CONFIG.musik.url; lagu.loop = CONFIG.musik.loop; lagu.volume = CONFIG.musik.volume; lagu.preload = 'auto';
if (CONFIG.musik.mulaiDetik) lagu.addEventListener('loadedmetadata', () => { lagu.currentTime = CONFIG.musik.mulaiDetik; }, { once: true });
let userPaused = false;
const setUI = on => { mBtn.classList.toggle('on', on); mBtn.classList.toggle('off', !on); };
const mainkan = () => lagu.play().then(() => { setUI(true); unlockEvents.forEach(ev => document.removeEventListener(ev, unlock)); }).catch(() => setUI(false));
// browser memblokir autoplay bersuara, jadi lagu dimulai otomatis di sentuhan/klik pertama
const unlockEvents = ['pointerdown', 'touchstart', 'keydown', 'click'];
function unlock() { if (!userPaused && lagu.paused) mainkan(); }
unlockEvents.forEach(ev => document.addEventListener(ev, unlock));
mainkan(); // coba langsung saat halaman dibuka
mBtn.addEventListener('click', e => {
  e.stopPropagation();
  if (lagu.paused) { userPaused = false; mainkan(); } else { userPaused = true; lagu.pause(); setUI(false); }
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) lagu.pause(); else if (!userPaused) mainkan();
});
lagu.addEventListener('error', () => { setUI(false); console.warn('Lagu gagal dimuat, cek CONFIG.musik.url'); });
