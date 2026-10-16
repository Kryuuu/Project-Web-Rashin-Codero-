// ===================================================
// JAVASCRIPT CODERO ACADEMY — Interaktif & Ringkas
// ===================================================

// Database Artikel Berita
const beritaDB = {
    "1": {
        judul: "Juara 1 Lomba Robotik Nasional 2026",
        badge: "prestasi", kategori: "Prestasi",
        tanggal: "14 Oktober 2026", penulis: "Humas Codero", avatar: "HC",
        gambar: "assets/news-stem.jpg",
        isi: `<p>Tim robotik murid Codero Academy meraih medali emas di <strong>National Youth Robotics & AI Competition 2026</strong> di Jakarta Convention Center.</p>
        <p>Mereka merancang "EcoBot Scanner" — robot cerdas pemantau kualitas lingkungan dan pemilah sampah berbasis Computer Vision dan sensor IoT.</p>
        <p>Dewan juri mengapresiasi keakuratan sistem, efisiensi daya, serta presentasi komprehensif yang dibawakan langsung oleh siswa kelas 8.</p>`
    },
    "2": {
        judul: "Perpustakaan Digital Baru Resmi Dibuka",
        badge: "akademik", kategori: "Akademik",
        tanggal: "12 Oktober 2026", penulis: "Pustakawan", avatar: "PL",
        gambar: "assets/news-library.jpg",
        isi: `<p>SMP Codero Academy resmi meluncurkan <strong>Perpustakaan Digital Generasi Baru</strong> yang terintegrasi dengan portal akademik siswa.</p>
        <p>Lebih dari 5.000 judul e-book referensi sains, jurnal teknologi, dan modul coding interaktif kini bisa diakses dari mana saja secara gratis.</p>
        <p>Dilengkapi 20 unit workstation layar sentuh, area diskusi kedap suara, dan pojok baca santai yang nyaman.</p>`
    },
    "3": {
        judul: "Pekan Kreativitas dan Coding Bersama",
        badge: "kegiatan", kategori: "Kegiatan",
        tanggal: "10 Oktober 2026", penulis: "Pembina OSIS", avatar: "OS",
        gambar: "assets/news-coding.jpg",
        isi: `<p>Suasana semarak mewarnai <strong>Codero Hack-Week 2026</strong> yang berlangsung selama 3 hari penuh di kampus Codero Academy.</p>
        <p>Ratusan siswa dari berbagai tingkatan berkolaborasi membuat game edukasi 2D, website portofolio interaktif, dan animasi pemrograman.</p>
        <p>Acara ditutup dengan sesi demo day di mana murid mempresentasikan hasil karyanya di hadapan dewan guru dan rekan-rekan.</p>`
    }
};

// Inisialisasi
document.addEventListener("DOMContentLoaded", () => {
    initHeader();
    initMobileMenu();
    initFilter();
    initModal();
});

// 1. STICKY HEADER SHADOW + SCROLLSPY
function initHeader() {
    const h = document.getElementById("mainHeader");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {
        h.classList.toggle("scrolled", window.scrollY > 30);

        // Update active nav link berdasarkan posisi scroll
        let current = "";
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 120) {
                current = sec.getAttribute("id");
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
        });
    });
}

// 2. MOBILE MENU
function initMobileMenu() {
    const btn = document.getElementById("menuToggle");
    const drawer = document.getElementById("mobileDrawer");
    if (!btn || !drawer) return;

    btn.addEventListener("click", () => {
        drawer.classList.toggle("open");
        btn.classList.toggle("active");
    });

    drawer.querySelectorAll(".mobile-link").forEach(link => {
        link.addEventListener("click", () => {
            drawer.classList.remove("open");
            btn.classList.remove("active");
        });
    });
}

// 3. FILTER KATEGORI BERITA
function initFilter() {
    const pills = document.querySelectorAll(".filter-pill");
    const cards = document.querySelectorAll(".card");
    const empty = document.getElementById("emptyState");
    const resetBtn = document.getElementById("resetBtn");

    pills.forEach(pill => {
        pill.addEventListener("click", () => {
            pills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            const filter = pill.dataset.filter;
            let count = 0;

            cards.forEach(card => {
                const show = (filter === "all") || (card.dataset.kategori === filter);
                card.style.display = show ? "flex" : "none";
                if (show) count++;
            });

            if (empty) empty.style.display = count === 0 ? "block" : "none";
        });
    });

    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            pills.forEach(p => p.classList.remove("active"));
            pills[0]?.classList.add("active");
            cards.forEach(c => c.style.display = "flex");
            if (empty) empty.style.display = "none";
        });
    }
}

// 4. MODAL BACA BERITA
function initModal() {
    const modal = document.getElementById("newsModal");
    const body = document.getElementById("modalBody");
    const closeBtn = document.getElementById("modalClose");
    if (!modal || !body) return;

    // Tombol baca
    document.querySelectorAll(".read-btn").forEach(btn => {
        btn.addEventListener("click", () => openModal(btn.dataset.target));
    });

    // Tutup modal
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
}

function openModal(id) {
    const d = beritaDB[id];
    if (!d) return;
    const modal = document.getElementById("newsModal");
    const body = document.getElementById("modalBody");

    body.innerHTML = `
        <img src="${d.gambar}" alt="${d.judul}" class="modal-img">
        <div class="modal-wrap">
            <span class="badge ${d.badge}" style="position:static;margin-bottom:10px">${d.kategori}</span>
            <h2>${d.judul}</h2>
            <div class="modal-meta">
                <span class="avatar">${d.avatar}</span>
                <span><strong>${d.penulis}</strong> · 📅 ${d.tanggal}</span>
            </div>
            <div class="modal-text">${d.isi}</div>
        </div>`;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    const modal = document.getElementById("newsModal");
    if (!modal) return;
    modal.classList.remove("active");
    document.body.style.overflow = "";
}

// 5. TOAST NOTIFIKASI
function showToast(msg) {
    const box = document.getElementById("toastBox");
    if (!box) return;
    const t = document.createElement("div");
    t.className = "toast";
    t.textContent = msg;
    box.appendChild(t);
    setTimeout(() => {
        t.style.opacity = "0";
        t.style.transform = "translateY(12px)";
        t.style.transition = "all .3s ease";
        setTimeout(() => t.remove(), 300);
    }, 3500);
}

// 6. FORM KONTAK
function handleContact(e) {
    e.preventDefault();
    showToast("✅ Pesan Anda telah terkirim. Terima kasih!");
    e.target.reset();
}
