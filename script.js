// Constants and DOM element selections
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Animasi hamburger menu
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => bar.classList.toggle('active'));
});

// Page Navigation dengan perbaikan AOS
const navItems = document.querySelectorAll('.nav-links a');
const pages = document.querySelectorAll('.page');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = item.getAttribute('data-page');
        
        // Hapus kelas active dari semua halaman
        pages.forEach(page => {
            page.classList.remove('active');
        });

        // Tambah kelas active ke halaman yang dipilih
        const targetPage = document.getElementById(pageId);
        targetPage.classList.add('active');
        
        // Reset AOS animations
        const aosElements = targetPage.querySelectorAll('[data-aos]');
        aosElements.forEach(element => {
            element.classList.remove('aos-animate');
        });
        
        // Force reflow
        void targetPage.offsetWidth;
        
        // Re-initialize AOS for the new page
        setTimeout(() => {
            AOS.refresh();
            aosElements.forEach(element => {
                element.classList.add('aos-animate');
            });
        }, 10);

        // Tutup menu mobile jika terbuka
        navLinks.classList.remove('active');
    });
});

// Newsletter Form Handling
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

// Smooth Scrolling untuk semua link internal
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

// Inisialisasi AOS dengan konfigurasi yang lebih baik
AOS.init({
    once: false,
    mirror: true,
    offset: 50,
    duration: 1000,
    disable: 'mobile'
});

// Reinitialize AOS when switching pages
window.addEventListener('load', () => {
    AOS.refresh();
});
