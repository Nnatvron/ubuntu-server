// Constants and DOM element selections
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const pages = document.querySelectorAll('.page');

// Fungsi untuk mengatur link aktif
function setActiveLink(pageId) {
    navItems.forEach(navItem => {
        if (navItem.getAttribute('data-page') === pageId) {
            navItem.classList.add('active');
        } else {
            navItem.classList.remove('active');
        }
    });
}

// Set link aktif pertama kali
document.addEventListener('DOMContentLoaded', () => {
    // Cari halaman yang aktif
    const activePage = document.querySelector('.page.active');
    if (activePage) {
        const activePageId = activePage.id;
        setActiveLink(activePageId);
    }
});

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => bar.classList.toggle('active'));
});

// Page Navigation dengan penanganan link aktif
navItems.forEach(item => {
    item.addEventListener('click', async (e) => {
        e.preventDefault();
        const pageId = item.getAttribute('data-page');
        
        // Set link aktif
        setActiveLink(pageId);
        
        // Hapus kelas active dari semua halaman
        pages.forEach(page => {
            page.classList.remove('active');
            // Reset AOS untuk semua elemen
            const aosElements = page.querySelectorAll('[data-aos]');
            aosElements.forEach(el => {
                el.classList.remove('aos-animate');
            });
        });

        // Tambah kelas active ke halaman yang dipilih
        const targetPage = document.getElementById(pageId);
        targetPage.classList.add('active');
        
        // Tunggu sebentar untuk transisi halaman
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Reinisialisasi AOS untuk halaman baru
        AOS.refreshHard();
        
        // Tutup menu mobile jika terbuka
        navLinks.classList.remove('active');
    });
});

// Kode newsletter dan smooth scrolling tetap sama...

// Inisialisasi AOS
AOS.init({
    once: false,
    mirror: false,
    offset: 30,
    delay: 50,
    duration: 1500,
    easing: 'ease-in-out',
    anchorPlacement: 'top-bottom',
    startEvent: 'DOMContentLoaded',
    useClassNames: true,
    disableMutationObserver: false,
    throttleDelay: 99,
});
