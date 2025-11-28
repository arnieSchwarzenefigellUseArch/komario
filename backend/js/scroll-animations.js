// Анимация появления элементов при скролле
document.addEventListener('DOMContentLoaded', function() {
    // Создаем observer для отслеживания элементов
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Добавляем стили для анимации
    const style = document.createElement('style');
    style.textContent = `
        .animate-element {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .animate-element.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .animate-element.delay-1 { transition-delay: 0.1s; }
        .animate-element.delay-2 { transition-delay: 0.2s; }
        .animate-element.delay-3 { transition-delay: 0.3s; }
    `;
    document.head.appendChild(style);

    // Находим все элементы для анимации
    const elementsToAnimate = document.querySelectorAll('h1, h2, h3, p, .cheese-fact');
    
    // Добавляем класс и задержки
    elementsToAnimate.forEach((element, index) => {
        element.classList.add('animate-element');
        if (index % 3 === 1) element.classList.add('delay-1');
        if (index % 3 === 2) element.classList.add('delay-2');
        
        // Наблюдаем за элементом
        observer.observe(element);
    });
});