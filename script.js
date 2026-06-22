document.addEventListener('DOMContentLoaded', () => {
    // Oyun Değişkenleri
    let ironCount = 41.05; 
    let energy = 100;
    const maxEnergy = 100;
    const miningSpeedPerHour = 333.00;
    const miningSpeedPerSecond = miningSpeedPerHour / 3600;

    // DOM Elemanları
    const ironCounterEl = document.getElementById('iron-counter');
    const energyTextEl = document.getElementById('energy-text');
    const forgeBtn = document.getElementById('forge-click-btn');

    // Ekranı Güncelleyen Fonksiyon
    function updateUI() {
        if (ironCounterEl) ironCounterEl.textContent = ironCount.toFixed(2);
        if (energyTextEl) energyTextEl.textContent = `${energy}/${maxEnergy}`;
    }

    // Madencilik: Demir Sayacını Otomatik Artırma (Her saniye)
    setInterval(() => {
        ironCount += miningSpeedPerSecond;
        updateUI();
    }, 1000);

    // Enerji Yenileme: Her 3 saniyede 1 enerji kazanır
    setInterval(() => {
        if (energy < maxEnergy) {
            energy++;
            updateUI();
        }
    }, 3000);

    // Çekiç Tıklama Sistemi
    if (forgeBtn) {
        forgeBtn.addEventListener('click', () => {
            if (energy > 0) {
                energy -= 1; // Enerji düşer
                ironCount += 1.00; // Tıklama başına +1 Demir verir
                updateUI();

                // Tıklama Görsel Efekti
                forgeBtn.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    forgeBtn.style.transform = 'scale(1)';
                }, 100);
            } else {
                // Telegram içi uyarı penceresi
                if (window.Telegram && window.Telegram.WebApp) {
                    window.Telegram.WebApp.showAlert('Enerjiniz bitti! Yenilenmesini bekleyin.');
                }
            }
        });
    }

    // İlk Açılışta Ekranı Doldur
    updateUI();
});
