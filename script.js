document.addEventListener('DOMContentLoaded', function() {
    // إضافة تأثير ظهور العناصر عند التمرير
    const sections = document.querySelectorAll('section');
    const cards = document.querySelectorAll('.message-card');
    
    // إضافة فئة للتحكم بالظهور التدريجي للعناصر
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        section.style.transitionDelay = `${index * 0.2}s`;
    });
    
    // إظهار العناصر عند التمرير
    function checkScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.9) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    }
    
    // التحقق من موضع التمرير عند التحميل
    checkScroll();
    
    // التحقق من موضع التمرير عند التمرير
    window.addEventListener('scroll', checkScroll);
    
    // إضافة تأثير توهج للبطاقات عند التحويم عليها
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2), 0 0 15px rgba(212, 175, 55, 0.5)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
    
    // إضافة تأثير الكتابة للقصيدة
    const verses = document.querySelectorAll('.verses p');
    verses.forEach((verse, index) => {
        const originalText = verse.textContent;
        verse.textContent = '';
        verse.style.opacity = '0';
        verse.style.transform = 'translateY(20px)';
        verse.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // عند التمرير للقصيدة، نبدأ تأثير الكتابة
        document.querySelector('.poem-section').addEventListener('inview', function() {
            setTimeout(() => {
                verse.style.opacity = '1';
                verse.style.transform = 'translateY(0)';
                typeWriter(verse, originalText, 0);
            }, index * 1000);
        });
    });
    
    // تأثير الكتابة
    function typeWriter(element, text, index) {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            setTimeout(() => typeWriter(element, text, index + 1), 50);
        }
    }
    
    // إضافة مراقب للتحقق من ظهور العناصر في الشاشة
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.dispatchEvent(new Event('inview'));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // مراقبة قسم القصيدة
    observer.observe(document.querySelector('.poem-section'));
    
    // تحسين تصميم العلم السعودي
    const saudiFlag = document.querySelector('.saudi .flag');
    saudiFlag.innerHTML = `
        <div style="width:100%; height:100%; background-color:#245C36; position:relative;">
            <div style="position:absolute; width:100%; height:100%; display:flex; justify-content:center; align-items:center;">
                <div style="color:white; font-family:'Arial'; font-size:8px; font-weight:bold; text-align:center; line-height:1.3; padding:0 5px;">
                    لا إله إلا الله محمد رسول الله
                </div>
            </div>
            <div style="position:absolute; bottom:0; left:0; width:30px; height:20px; background-color:#245C36; display:flex; justify-content:center; align-items:center;">
                <div style="width:20px; height:20px; background-color:white; border-radius:50%; display:flex; justify-content:center; align-items:center;">
                    <div style="width:15px; height:15px; background-color:#245C36; border-radius:50%;"></div>
                </div>
            </div>
        </div>
    `;
    
    // تحسين تصميم العلم العماني
    const omanFlag = document.querySelector('.oman .flag');
    omanFlag.innerHTML = `
        <div style="width:100%; height:100%; position:relative; overflow:hidden;">
            <div style="position:absolute; top:0; left:0; width:33%; height:100%; background-color:#DB161B;"></div>
            <div style="position:absolute; top:0; left:33%; width:67%; height:100%; background:linear-gradient(to bottom, #DB161B 0%, #DB161B 33%, #FFFFFF 33%, #FFFFFF 66%, #008000 66%, #008000 100%);"></div>
            <div style="position:absolute; top:50%; left:10px; transform:translateY(-50%); width:15px; height:15px; border:2px solid white; border-radius:50%;"></div>
            <div style="position:absolute; top:50%; left:15px; transform:translateY(-50%); width:10px; height:10px; background-color:#DB161B; border-radius:50%;"></div>
            <div style="position:absolute; top:50%; left:20px; transform:translateY(-50%); width:5px; height:5px; background-color:white; border-radius:50%;"></div>
            <div style="position:absolute; top:50%; left:25px; transform:translateY(-50%); width:2px; height:2px; background-color:#DB161B; border-radius:50%;"></div>
        </div>
    `;
    
    // عرض التاريخ الهجري
    function updateHijriDate() {
        const hijriMonths = ['محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'];
        
        // هذا مثال بسيط، في الواقع تحتاج لاستخدام مكتبة مثل Hijri.js للحصول على التاريخ الهجري الدقيق
        const today = new Date();
        const hijriDate = new Intl.DateTimeFormat('ar-u-ca-islamic', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(today);
        
        document.getElementById('hijri-date').textContent = `تاريخ اليوم: ${hijriDate}`;
    }
    
    updateHijriDate();
    
    // إضافة تأثيرات إضافية للقلب
    const heart = document.querySelector('.heart-connector');
    setInterval(() => {
        heart.style.transform = `scale(${1 + Math.random() * 0.2})`;
        heart.style.opacity = 0.7 + Math.random() * 0.3;
    }, 1500);
});