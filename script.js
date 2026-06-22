// Telegram Web App API Başlatma
const tg = window.Telegram.WebApp;
tg.expand(); // Ekranı tam boyuta genişlet

// Sayaç Değişkenleri
let currentIron = 37.66;
const ironPerHour = 333.00;
const ironPerSecond = ironPerHour / 3600; // Saniyede biriken miktar

// DOM Elementleri
const ironCounterEl = document.getElementById('iron-counter');
const forgeBtn = document.getElementById('forge-click-btn');

// 1. Otomatik Pasif Kazım Döngüsü (Her saniye güncellenir)
setInterval(() => {
    currentIron += ironPerSecond;
    ironCounterEl.innerText = currentIron.toFixed(2);
}, 1000);

// 2. Tıklama Fonksiyonu (Merkez çekice tıklandığında ekstra demir kazanma)
forgeBtn.addEventListener('click', (e) => {
    // Tıklama başına 1.00 demir ekle (İsteğe göre çarpanlarla çarpılabilir)
    currentIron += 1.00;
    ironCounterEl.innerText = currentIron.toFixed(2);

    // Telegram Haptic Feedback (Telefona hafif tıklama titreşimi verir)
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('light');
    }
});

// Menü Butonları Değişim Efekti
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        document.querySelector('.nav-item.active').classList.remove('active');
        item.classList.add('active');
    });
});

