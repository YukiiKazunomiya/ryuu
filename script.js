// --- CONFIG & DATA ---
const dbStruktur = {
    'kapus': { nama: 'dr. Faisal, M.Kes', tugas: 'Memimpin, mengawasi, dan mengendalikan kegiatan Puskesmas.' },
    'tu': { nama: 'Budi Santoso, SKM', tugas: 'Mengelola kepegawaian, keuangan, dan surat menyurat.' },
    'keuangan': { nama: 'Dewi Sartika, SE', tugas: 'Mengelola anggaran operasional dan BOK.' },
    'umum': { nama: 'Joko Susilo', tugas: 'Mengelola inventaris barang dan kebersihan.' },
    'ukm': { nama: 'Rina Marlina, Amd.Keb', tugas: 'Koordinator Promkes, Kesling, dan Gizi.' },
    'ukp': { nama: 'dr. Herman', tugas: 'Koordinator pelayanan medis perorangan.' },
    'poli': { nama: 'Tim Dokter Umum', tugas: 'Melayani pasien umum.' },
    'ugd': { nama: 'Tim Jaga', tugas: 'Penanganan kegawatdaruratan 24 jam.' }
};

const dbPegawai = [
    { nama: "dr. Faisal", jabatan: "Ka. Puskesmas", status: "PNS" },
    { nama: "Siti Aminah", jabatan: "Bidan Koord", status: "PNS" },
    { nama: "Rahmat H.", jabatan: "Perawat", status: "PPPK" },
    { nama: "Cut Meutia", jabatan: "Apoteker", status: "Kontrak" },
    { nama: "Teuku Umar", jabatan: "Security", status: "Honorer" }
];

// --- NAVIGASI HALAMAN ---
function navigate(pageId) {
    // 1. Sembunyikan semua halaman
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // 2. Tampilkan halaman tujuan
    const target = document.getElementById(pageId);
    if(target) target.classList.add('active');

    // 3. Update Navbar Active State
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    // Cari menu yang cocok (simple logic)
    const navItems = document.querySelectorAll('.nav-item');
    if(pageId === 'home') navItems[0].classList.add('active');
    if(pageId === 'pemeriksaan') navItems[1].classList.add('active');
    if(pageId === 'struktur') navItems[2].classList.add('active');
    if(pageId === 'pengaduan') navItems[3].classList.add('active');
    if(pageId === 'pegawai') navItems[4].classList.add('active');

    // 4. Tutup Menu Mobile (jika terbuka)
    document.getElementById('navMenu').classList.remove('active');

    // 5. Scroll ke atas
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// Toggle Hamburger Menu
function toggleMenu() {
    document.getElementById('navMenu').classList.toggle('active');
}

// --- INTERAKSI FORM ---
function handleForm(e, msg) {
    e.preventDefault();
    // Di sini nanti bisa dikonek ke Database beneran
    alert("✅ BERHASIL!\n" + msg);
    e.target.reset();
}

// --- MODAL STRUKTUR ---
function openModal(kode) {
    const data = dbStruktur[kode];
    if(data) {
        document.getElementById('m-jabatan').innerText = kode.toUpperCase();
        document.getElementById('m-nama').innerText = data.nama;
        document.getElementById('m-tugas').innerText = data.tugas;
        
        const modal = document.getElementById('infoModal');
        modal.style.display = "flex"; // Flex biar center
    } else {
        alert("Data detail belum diinput.");
    }
}

function closeModal() {
    document.getElementById('infoModal').style.display = "none";
}

// Tutup modal kalau klik area gelap
window.onclick = function(e) {
    const modal = document.getElementById('infoModal');
    if (e.target == modal) {
        modal.style.display = "none";
    }
}

// --- LOGIN & PEGAWAI SYSTEM ---
function handleLogin(e) {
    e.preventDefault();
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;

    if(u === 'admin' && p === '123') {
        document.getElementById('login-view').style.display = 'none';
        document.getElementById('dashboard-view').style.display = 'block';
        renderPegawai();
    } else {
        alert("⛔ Akses Ditolak! Username/Password salah.");
    }
}

function doLogout() {
    document.getElementById('dashboard-view').style.display = 'none';
    document.getElementById('login-view').style.display = 'flex';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

function renderPegawai() {
    const tbody = document.querySelector('#tabel-pegawai tbody');
    tbody.innerHTML = '';
    
    dbPegawai.forEach(p => {
        // Tentukan warna badge status
        let badgeClass = '#d1fae5'; // hijau muda
        let textClass = '#065f46'; // hijau tua
        if(p.status === 'Honorer') { badgeClass = '#fee2e2'; textClass = '#991b1b'; }
        if(p.status === 'Kontrak') { badgeClass = '#ffedd5'; textClass = '#9a3412'; }

        const row = `
        <tr>
            <td><strong>${p.nama}</strong></td>
            <td>${p.jabatan}</td>
            <td><span style="background:${badgeClass}; color:${textClass}; padding:3px 8px; border-radius:10px; font-size:0.8rem; font-weight:bold;">${p.status}</span></td>
            <td><button class="btn btn-sm btn-primary" onclick="alert('Edit data ${p.nama}?')"><i class="fas fa-edit"></i></button></td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

// --- HOTLINE BUTTON ---
function toggleHotline() {
    const opts = document.getElementById('hotlineOptions');
    if(opts.style.display === 'flex') {
        opts.style.display = 'none';
    } else {
        opts.style.display = 'flex';
    }
}

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", function() {
    // Pastikan start di halaman home
    navigate('home');
});
