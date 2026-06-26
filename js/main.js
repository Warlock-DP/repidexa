document.addEventListener('DOMContentLoaded', () => {
  // 1. Header Scroll Effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileClose = document.querySelector('.mobile-close');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openMobileMenu() {
    mobileMenuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
  
  // Close menu when clicking on overlay background
  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', (e) => {
      if (e.target === mobileMenuOverlay) closeMobileMenu();
    });
  }

  // Close menu when clicking a link
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // 3. Scroll Reveal Animations (Replacing Framer Motion)
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // observer.unobserve(entry.target); // Uncomment if you want it to trigger only once
      }
    });
  }, {
    root: null,
    threshold: 0.15,
    rootMargin: "-50px"
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 4. Number Counter Animation (Replacing react-countup)
  const statsSection = document.querySelector('.statsSection');
  const statNumbers = document.querySelectorAll('.statNumber span[data-end]');
  let startedCounting = false;

  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !startedCounting) {
        startedCounting = true;
        
        statNumbers.forEach(stat => {
          const endValue = parseInt(stat.getAttribute('data-end'));
          const duration = 3000; // 3 seconds
          const fps = 60;
          const totalFrames = (duration / 1000) * fps;
          const increment = endValue / totalFrames;
          let currentVal = 0;
          
          const counter = setInterval(() => {
            currentVal += increment;
            if (currentVal >= endValue) {
              clearInterval(counter);
              stat.innerText = endValue;
            } else {
              stat.innerText = Math.floor(currentVal);
            }
          }, 1000 / fps);
        });
      }
    }, { threshold: 0.3 });
    
    statsObserver.observe(statsSection);
  }

  // 5. Initialize Vanilla-Tilt (if available)
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".serviceCard, .showcaseImageContainer"), {
      max: 5,
      speed: 400,
      glare: true,
      "max-glare": 0.1,
    });
  }

  // 6. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 7. WhatsApp Floating Widget
  const waWidget = document.createElement('a');
  waWidget.id = "waWidget";
  waWidget.href = "https://wa.me/919714255995?text=Hello%20Rapidexa,%20I%20would%20like%20to%20know%20more.";
  waWidget.target = "_blank";
  waWidget.innerHTML = `<img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style="width: 35px; height: 35px;" />`;
  waWidget.style.cssText = "position: fixed; bottom: 30px; right: 30px; background: #25D366; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 20px rgba(0,0,0,0.3); z-index: 9999; cursor: pointer; transition: transform 0.3s ease;";
  waWidget.onmouseover = () => waWidget.style.transform = "scale(1.1) translateY(-5px)";
  waWidget.onmouseout = () => waWidget.style.transform = "scale(1) translateY(0)";
  document.body.appendChild(waWidget);

  // 8. Quote Form to WhatsApp
  window.submitToWhatsApp = function(event) {
    event.preventDefault();
    const name = document.getElementById('waName').value;
    const company = document.getElementById('waCompany').value;
    const message = document.getElementById('waMessage').value;
    
    let waText = `Hello Rapidexa! I would like to request a quote.\n\n`;
    waText += `*Name:* ${name}\n`;
    if(company) waText += `*Company:* ${company}\n`;
    waText += `*Requirements:* ${message}\n`;
    
    const waUrl = `https://wa.me/919714255995?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, '_blank');
  };
});
