// ==========================================
// 1. TON CONNECT BAŞLATMA
// ==========================================
// NOT: manifestUrl kısmındaki adresi kendi GitHub Pages canlı url'iniz ile değiştirin!
const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: 'https://ozgur.github.io/tonconnect-manifest.json', 
    buttonRootId: 'ton-connect-button-root'
});

// ==========================================
// 2. SAYFA DEĞİŞTİRME MANTIĞI (NAVBAR)
// ==========================================
function switchPage(pageId) {
    // Tüm sayfaları gizle
    const pages = document.querySelectorAll('.page-section');
    pages.forEach(page => page.classList.add('hidden'));

    // İstenen sayfayı göster
    document.getElementById(pageId).classList.remove('hidden');

    // Aktif navbar buton stilini güncelle
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    // Tıklanan sayfaya göre ilgili butona active klası ekle
    if (pageId === 'savas-page') navItems[0].classList.add('active');
    if (pageId === 'pazar-page') navItems[1].classList.add('active');
    if (pageId === 'wallet-page') navItems[2].classList.add('active');
}

// ==========================================
// 3. TON AĞINDA USDT İLE SATIN ALMA
// ==========================================
async function buyWithUSDT(amount) {
    if (!tonConnectUI.connected) {
        alert("Lütfen önce sağ üstten TON Cüzdanınızı bağlayın!");
        return;
    }

    // TON ağındaki resmi USDT (Jetton) Kontrat Adresi
    const usdtContractAddress = "EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs"; 
    
    // Projenizin ödemeleri toplayacağı ana cüzdan adresi (Kendi adresinizi yazın)
    const merchantAddress = "YOUR_TON_WALLET_ADDRESS_HERE"; 

    // USDT TON ağında 6 ondalık basamak kullanır (1 USDT = 1.000.000 microUSDT)
    const amountInMicroUSDT = amount * 1000000;

    alert(`${amount} USDT değerinde satın alım işlemi cüzdanınıza gönderiliyor...`);

    // Basit bir transfer işlemi payload yapısı (BOC oluşturulması gerekir)
    const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 300, // 5 dakika geçerli
        messages: [
            {
                address: merchantAddress,
                amount: "50000000", // Gas ve işlem ücreti için gönderilen min TON miktarı (0.05 TON)
                // Gerçek entegrasyonda Jetton transfer payload'u buraya BOC formatında eklenmelidir.
            }
        ]
    };

    try {
        await tonConnectUI.sendTransaction(transaction);
        alert("Tebrikler! Satın alma işlemi başarıyla onaylandı.");
    } catch (error) {
        console.error("Transfer hatası:", error);
        alert("İşlem iptal edildi veya cüzdan hatası oluştu.");
    }
}

// ==========================================
// 4. CÜZDAN YATIRMA VE ÇEKME İŞLEMLERİ
// ==========================================
function depositUSDT() {
    alert("USDT Yatırma adresi yakında burada listelenecektir.");
}

function withdrawUSDT() {
    const withdrawableSpan = document.getElementById('withdrawable-balance');
    const currentBalance = parseFloat(withdrawableSpan.innerText);

    // Kural: Minimum çekim 1 USDT
    if (currentBalance < 1.0) {
        alert("Hata: Çekilebilir bakiyeniz en az 1.00 USDT olmalıdır!");
        return;
    }

    // Çekim onay senaryosu
    const confirmWithdraw = confirm(`${currentBalance} USDT çekmek istediğinize emin misiniz?`);
    if (confirmWithdraw) {
        // Çekim geçmişine yeni kayıt ekle
        const historyList = document.getElementById('withdrawal-history');
        const now = new Date();
        const dateStr = `${now.getDate().toString().padStart(2,'0')}.${(now.getMonth()+1).toString().padStart(2,'0')}.${now.getFullYear()} ${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
        
        const li = document.createElement('li');
        li.innerHTML = `<span class="hist-date">${dateStr}</span><span class="hist-amount status-success">-${currentBalance.toFixed(2)} USDT</span>`;
        historyList.insertBefore(li, historyList.firstChild);

        // Bakiyeyi sıfırla/güncelle
        withdrawableSpan.innerText = "0.00";
        alert("Çekim talebiniz işleme alınmıştır. En kısa sürede cüzdanınıza transfer edilecektir.");
    }
}
