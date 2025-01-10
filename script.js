// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Animasi hamburger menu
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => bar.classList.toggle('active'));
});

// Page Navigation
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
        document.getElementById(pageId).classList.add('active');

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