// Универсальная навигация для всех страниц
document.addEventListener('DOMContentLoaded', function() {
    
    // Создаем нижнюю навигацию
    function createNavigation() {
        const footer = document.querySelector('footer');
        if (!footer) return;
        
        // Создаем нижнюю навигацию перед footer
        const bottomNav = document.createElement('div');
        bottomNav.className = 'bottom-nav';
        bottomNav.innerHTML = `
            <div class="container">
                <a href="/" data-page="home">Главная</a>
                <a href="/catalog" data-page="catalog">Каталог</a>
                <a href="/about" data-page="about">О нас</a>
            </div>
        `;
        
        footer.parentNode.insertBefore(bottomNav, footer);
    }
    
    // Определяем текущую страницу
    function getCurrentPage() {
        const path = window.location.pathname;
        if (path === '/') return 'home';
        if (path === '/catalog') return 'catalog';
        if (path === '/about') return 'about';
        return 'home';
    }
    
    // Устанавливаем активную ссылку
    function setActiveLink() {
        const currentPage = getCurrentPage();
        const links = document.querySelectorAll('.bottom-nav a');
        
        links.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === currentPage) {
                link.classList.add('active');
            }
        });
    }
    
    // Плавная навигация (SPA-style)
    function setupSmoothNavigation() {
        const links = document.querySelectorAll('.bottom-nav a');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const href = this.getAttribute('href');
                const currentPage = this.dataset.page;
                
                // Красивая анимация перехода
                const container = document.querySelector('.container');
                const bottomNav = document.querySelector('.bottom-nav');
                
                // Анимация скольжения влево
                if (container) {
                    container.style.transform = 'translateX(-100%)';
                    container.style.opacity = '0';
                    container.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
                }
                
                if (bottomNav) {
                    bottomNav.style.transform = 'translateY(50px)';
                    bottomNav.style.opacity = '0';
                    bottomNav.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                }
                
                // Переход на новую страницу
                setTimeout(() => {
                    window.location.href = href;
                }, 400);
                
                // Обновляем активную ссылку
                links.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // Анимация появления навигации
    function animateNavigation() {
        const bottomNav = document.querySelector('.bottom-nav');
        if (!bottomNav) return;
        
        bottomNav.style.opacity = '0';
        bottomNav.style.transform = 'translateY(20px)';
        bottomNav.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            bottomNav.style.opacity = '1';
            bottomNav.style.transform = 'translateY(0)';
        }, 800);
        
        // Мягкая анимация для каждой ссылки
        const links = bottomNav.querySelectorAll('a');
        links.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(10px)';
            link.style.transition = `opacity 0.4s ease ${index * 0.1 + 0.8}s, transform 0.4s ease ${index * 0.1 + 0.8}s`;
            
            setTimeout(() => {
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, 1000 + (index * 100));
        });
    }
    

    
    // Инициализация
    createNavigation();
    setActiveLink();
    setupSmoothNavigation();
    animateNavigation();
    

});