// Function to include HTML files
async function includeHTML() {
  // Load head content
  const headElement = document.getElementById('head-content');
  if (headElement) {
    try {
      const response = await fetch('NewHead.html');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const html = await response.text();
      headElement.innerHTML = html;
      console.log('Head content loaded successfully');
    } catch (error) {
      console.error('Error loading head content:', error);
      // Add fallback content if head.html fails to load
      headElement.innerHTML = `
        <meta charset="utf-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <title>Infinite Proteins</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css" rel="stylesheet">
      `;
    }
  }
  
  // Load header
  const headerElement = document.getElementById('header-container');
  if (headerElement) {
    try {
      const response = await fetch('header.html');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const html = await response.text();
      headerElement.innerHTML = html;
      
      // Set active nav link based on current page
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      const navLinks = headerElement.querySelectorAll('.nav-item.nav-link');
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
          link.classList.add('active');
        }
      });
      
      // If we're on index.html or /, activate the Home link
      if (currentPage === '' || currentPage === 'index.html') {
        const homeLink = headerElement.querySelector('a[href="index.html"]');
        if (homeLink) homeLink.classList.add('active');
      }
      
      console.log('Header loaded successfully');
    } catch (error) {
      console.error('Error loading header:', error);
      headerElement.innerHTML = `
        <nav class="navbar navbar-expand-lg bg-white navbar-light sticky-top px-4 px-lg-5 py-lg-0">
          <a href="index.html" class="navbar-brand d-flex align-items-center">
            <h2 class="m-0 text-primary">Infinite Proteins</h2>
          </a>
          <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span class="navbar-toggler-icon"></span>
          </button>
        </nav>
      `;
    }
  }
  
  // Load footer
  const footerElement = document.getElementById('footer-container');
  if (footerElement) {
    try {
      const response = await fetch('footer.html');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const html = await response.text();
      footerElement.innerHTML = html;
      console.log('Footer loaded successfully');
    } catch (error) {
      console.error('Error loading footer:', error);
      footerElement.innerHTML = `
        <div class="container-fluid bg-dark text-light footer mt-5 pt-5">
          <div class="container">
            <div class="copyright">
              <div class="row">
                <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
                  &copy; <a class="border-bottom" href="#">Infinite Proteins</a>, All Right Reserved.
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }
  
  // Load required libraries
  await loadScripts();
  
  // Initialize scripts with a longer delay to ensure everything is loaded
  setTimeout(initializeScripts, 1000);
}

// Function to load necessary scripts
async function loadScripts() {
  console.log('Loading required scripts...');
  
  // Load jQuery first if needed
  await loadScript('https://code.jquery.com/jquery-3.6.0.min.js', 'jQuery');
  
  // Then load Bootstrap
  await loadScript('https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js', 'Bootstrap');
  
  // Then load Owl Carousel
  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js', 'Owl Carousel');
  
  // Load other scripts as needed
  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js', 'WOW');
  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jquery.isotope/3.0.6/isotope.pkgd.min.js', 'Isotope');
}

// Helper function to load a script
function loadScript(src, name) {
  return new Promise((resolve) => {
    // Check if script is already loaded
    if (name === 'jQuery' && window.jQuery) {
      console.log(`${name} already loaded`);
      resolve();
      return;
    }
    
    console.log(`Loading ${name}...`);
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    
    script.onload = () => {
      console.log(`${name} loaded successfully`);
      resolve();
    };
    
    script.onerror = () => {
      console.error(`Failed to load ${name}`);
      resolve(); // Resolve anyway to continue execution
    };
    
    document.head.appendChild(script);
  });
}

// Function to initialize scripts after content loading
function initializeScripts() {
  console.log('Initializing scripts...');
  
  // Check if jQuery is loaded
  if (typeof jQuery === 'undefined') {
    console.error('jQuery is not loaded, cannot initialize components');
    return;
  }
  
  // Using jQuery safely
  jQuery(function($) {
    console.log('jQuery ready, initializing components...');
    
    // Initialize spinner fadeout
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 500);
    
    // Initialize WOW animation if available
    if (typeof WOW !== 'undefined') {
      new WOW().init();
      console.log('WOW initialized');
    } else {
      console.log('WOW library not available');
    }
    
    // Focus on initializing Owl Carousel
    if ($.fn.owlCarousel) {
      console.log('Initializing Owl Carousel...');
      console.log('Carousel elements found:', $('.owl-carousel').length);
      
      // Initialize header carousel with specific options
      $('.header-carousel').owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: true,
        loop: true,
        nav: true,
        navText: [
          '<i class="bi bi-chevron-left"></i>',
          '<i class="bi bi-chevron-right"></i>'
        ]
      });
      
      // Initialize any other carousel
      $('.owl-carousel').not('.header-carousel').owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 30,
        dots: false,
        loop: true,
        nav: true,
        navText: [
          '<i class="bi bi-chevron-left"></i>',
          '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
          0: {
            items: 1
          },
          576: {
            items: 1
          },
          768: {
            items: 2
          },
          992: {
            items: 3
          }
        }
      });
      
      console.log('Owl Carousel initialized');
    } else {
      console.error('Owl Carousel plugin not found');
    }
    
    // Initialize portfolio filters if isotope is available
    if ($.fn.isotope) {
      var portfolioIsotope = $(".portfolio-container").isotope({
        itemSelector: ".portfolio-item",
        layoutMode: "fitRows"
      });
      
      $("#portfolio-flters li").on("click", function() {
        $("#portfolio-flters li").removeClass("active");
        $(this).addClass("active");
        
        portfolioIsotope.isotope({ filter: $(this).data("filter") });
      });
      console.log('Portfolio isotope initialized');
    }
    
    // Initialize back to top button
    $(window).scroll(function () {
      if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
      } else {
        $('.back-to-top').fadeOut('slow');
      }
    });
    
    $('.back-to-top').click(function () {
      $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
      return false;
    });
  });
}

window.addEventListener('scroll', function () {        
  const whatsappBtn = document.querySelector('.whatsapp-float');
  if (window.scrollY > 100) {    
      whatsappBtn.style.display = 'flex'; // show WhatsApp
  } else {      
      whatsappBtn.style.display = 'none'; // hide WhatsApp
  }
});

// Run the include function when DOM is fully loaded
document.addEventListener('DOMContentLoaded', includeHTML);
