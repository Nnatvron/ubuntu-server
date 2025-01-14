// Constants and DOM element selections
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => bar.classList.toggle('active'));
});

// Page Navigation dengan perbaikan AOS untuk mobile
const navItems = document.querySelectorAll('.nav-links a');
const pages = document.querySelectorAll('.page');

navItems.forEach(item => {
    item.addEventListener('click', async (e) => {
        e.preventDefault();
        const pageId = item.getAttribute('data-page');
        
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

// Newsletter Form Handling (tidak berubah)
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        if (email) {
            alert('Terima kasih telah berlangganan newsletter kami!');
            newsletterForm.reset();
        }
    });
}

// Smooth Scrolling (tidak berubah)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Inisialisasi AOS dengan konfigurasi yang dioptimalkan untuk mobile
document.addEventListener('DOMContentLoaded', function() {
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
});

// Refresh AOS saat window di-resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        AOS.refresh();
    }, 250);
});
