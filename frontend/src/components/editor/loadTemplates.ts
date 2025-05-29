import { Editor } from 'grapesjs';

/**
 * Adds pre-designed templates to the GrapesJS editor
 * @param editor The GrapesJS editor instance
 */
const loadTemplates = (editor: Editor) => {
  // Define pre-designed templates
  const templates = {
    portfolio: {
      html: `<div class="portfolio-container">
              <header class="portfolio-header">
                <h1>My Portfolio</h1>
                <nav>
                  <ul>
                    <li><a href="#about">About</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#contact">Contact</a></li>
                  </ul>
                </nav>
              </header>
              <section id="about" class="portfolio-section">
                <h2>About Me</h2>
                <p>Hello! I'm a professional with expertise in my field. I'm passionate about creating high-quality work.</p>
              </section>
              <section id="projects" class="portfolio-section">
                <h2>My Projects</h2>
                <div class="project-grid">
                  <div class="project">
                    <h3>Project 1</h3>
                    <p>Description of project 1</p>
                  </div>
                  <div class="project">
                    <h3>Project 2</h3>
                    <p>Description of project 2</p>
                  </div>
                </div>
              </section>
              <section id="contact" class="portfolio-section">
                <h2>Contact Me</h2>
                <p>Email: example@example.com</p>
              </section>
              <footer>
                <p>&copy; 2025 My Portfolio</p>
              </footer>
            </div>`,
      css: `
        .portfolio-container {
          font-family: Arial, sans-serif;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        .portfolio-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }
        .portfolio-header nav ul {
          display: flex;
          list-style: none;
          gap: 20px;
        }
        .portfolio-header nav a {
          text-decoration: none;
          color: #333;
        }
        .portfolio-section {
          margin-bottom: 60px;
        }
        .project-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        .project {
          border: 1px solid #ddd;
          padding: 20px;
          border-radius: 5px;
        }
        footer {
          text-align: center;
          margin-top: 60px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
        }
      `,
    },
    blog: {
      html: `<div class="blog-container">
              <header class="blog-header">
                <h1>My Blog</h1>
                <nav>
                  <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Articles</a></li>
                    <li><a href="#">About</a></li>
                  </ul>
                </nav>
              </header>
              <main>
                <article class="blog-post">
                  <h2>First Blog Post</h2>
                  <div class="post-meta">Posted on May 18, 2025 by Author</div>
                  <p>This is the content of my first blog post. It's a simple example of what a blog post might look like.</p>
                  <p>You can add more paragraphs, images, and other elements to make your blog post more interesting.</p>
                  <a href="#" class="read-more">Read More</a>
                </article>
                <article class="blog-post">
                  <h2>Second Blog Post</h2>
                  <div class="post-meta">Posted on May 17, 2025 by Author</div>
                  <p>This is another blog post example. In a real blog, you would have multiple posts like this.</p>
                  <a href="#" class="read-more">Read More</a>
                </article>
              </main>
              <aside class="sidebar">
                <div class="widget">
                  <h3>Recent Posts</h3>
                  <ul>
                    <li><a href="#">First Blog Post</a></li>
                    <li><a href="#">Second Blog Post</a></li>
                  </ul>
                </div>
                <div class="widget">
                  <h3>Categories</h3>
                  <ul>
                    <li><a href="#">Technology</a></li>
                    <li><a href="#">Lifestyle</a></li>
                    <li><a href="#">Travel</a></li>
                  </ul>
                </div>
              </aside>
              <footer class="blog-footer">
                <p>&copy; 2025 My Blog. All rights reserved.</p>
              </footer>
            </div>`,
      css: `
        .blog-container {
          font-family: Arial, sans-serif;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          display: grid;
          grid-template-columns: 7fr 3fr;
          gap: 30px;
        }
        .blog-header {
          grid-column: 1 / -1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }
        .blog-header nav ul {
          display: flex;
          list-style: none;
          gap: 20px;
        }
        .blog-header nav a {
          text-decoration: none;
          color: #333;
        }
        .blog-post {
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
        }
        .post-meta {
          color: #777;
          font-size: 0.9em;
          margin-bottom: 15px;
        }
        .read-more {
          display: inline-block;
          margin-top: 10px;
          color: #0066cc;
          text-decoration: none;
        }
        .sidebar {
          grid-column: 2;
          grid-row: 2;
        }
        .widget {
          margin-bottom: 30px;
          padding: 15px;
          background-color: #f9f9f9;
          border-radius: 5px;
        }
        .widget h3 {
          margin-top: 0;
          margin-bottom: 10px;
        }
        .widget ul {
          list-style: none;
          padding-left: 0;
        }
        .widget li {
          margin-bottom: 8px;
        }
        .widget a {
          text-decoration: none;
          color: #333;
        }
        .blog-footer {
          grid-column: 1 / -1;
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
        }
      `,
    },
    landing: {
      html: `<div class="landing-page">
              <header class="hero-section">
                <div class="container">
                  <nav class="navbar">
                    <div class="logo">Company</div>
                    <ul class="nav-links">
                      <li><a href="#features">Features</a></li>
                      <li><a href="#testimonials">Testimonials</a></li>
                      <li><a href="#pricing">Pricing</a></li>
                      <li><a href="#contact" class="cta-button">Contact Us</a></li>
                    </ul>
                  </nav>
                  <div class="hero-content">
                    <h1>Welcome to Our Amazing Product</h1>
                    <p>The all-in-one solution for your business needs. Save time, increase productivity, and grow your business.</p>
                    <div class="hero-buttons">
                      <a href="#" class="button primary">Get Started</a>
                      <a href="#" class="button secondary">Learn More</a>
                    </div>
                  </div>
                </div>
              </header>

              <section id="features" class="features-section">
                <div class="container">
                  <h2 class="section-title">Our Features</h2>
                  <div class="features-grid">
                    <div class="feature">
                      <div class="feature-icon">🚀</div>
                      <h3>Fast Performance</h3>
                      <p>Lightning fast loading times and smooth interactions for the best user experience.</p>
                    </div>
                    <div class="feature">
                      <div class="feature-icon">🔒</div>
                      <h3>Secure & Reliable</h3>
                      <p>Bank-level security to keep your data safe and reliable uptime you can count on.</p>
                    </div>
                    <div class="feature">
                      <div class="feature-icon">📊</div>
                      <h3>Analytics</h3>
                      <p>Comprehensive analytics to help you understand your performance and make better decisions.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="testimonials" class="testimonials-section">
                <div class="container">
                  <h2 class="section-title">What Our Customers Say</h2>
                  <div class="testimonials-container">
                    <div class="testimonial">
                      <p class="quote">"This product has completely transformed our business. Highly recommended!"</p>
                      <div class="author">- John Doe, CEO</div>
                    </div>
                    <div class="testimonial">
                      <p class="quote">"The best solution we've found after trying many others. Excellent support team!"</p>
                      <div class="author">- Jane Smith, CTO</div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="pricing" class="pricing-section">
                <div class="container">
                  <h2 class="section-title">Simple, Transparent Pricing</h2>
                  <div class="pricing-plans">
                    <div class="pricing-plan">
                      <h3>Starter</h3>
                      <div class="price">$19<span>/month</span></div>
                      <ul class="features-list">
                        <li>Basic Features</li>
                        <li>2 Users</li>
                        <li>5GB Storage</li>
                      </ul>
                      <a href="#" class="button secondary">Get Started</a>
                    </div>
                    <div class="pricing-plan popular">
                      <h3>Professional</h3>
                      <div class="price">$49<span>/month</span></div>
                      <ul class="features-list">
                        <li>All Starter Features</li>
                        <li>10 Users</li>
                        <li>50GB Storage</li>
                        <li>Priority Support</li>
                      </ul>
                      <a href="#" class="button primary">Get Started</a>
                    </div>
                    <div class="pricing-plan">
                      <h3>Enterprise</h3>
                      <div class="price">$99<span>/month</span></div>
                      <ul class="features-list">
                        <li>All Pro Features</li>
                        <li>Unlimited Users</li>
                        <li>500GB Storage</li>
                        <li>24/7 Support</li>
                      </ul>
                      <a href="#" class="button secondary">Get Started</a>
                    </div>
                  </div>
                </div>
              </section>

              <section id="contact" class="contact-section">
                <div class="container">
                  <h2 class="section-title">Contact Us</h2>
                  <p class="section-description">Have questions? Get in touch with our team.</p>
                  <form class="contact-form">
                    <div class="form-group">
                      <input type="text" placeholder="Name" required>
                    </div>
                    <div class="form-group">
                      <input type="email" placeholder="Email" required>
                    </div>
                    <div class="form-group">
                      <textarea placeholder="Message" rows="5" required></textarea>
                    </div>
                    <button type="submit" class="button primary">Send Message</button>
                  </form>
                </div>
              </section>

              <footer class="footer">
                <div class="container">
                  <div class="footer-content">
                    <div class="footer-logo">Company</div>
                    <div class="footer-links">
                      <div class="footer-column">
                        <h4>Product</h4>
                        <ul>
                          <li><a href="#">Features</a></li>
                          <li><a href="#">Pricing</a></li>
                          <li><a href="#">Documentation</a></li>
                        </ul>
                      </div>
                      <div class="footer-column">
                        <h4>Company</h4>
                        <ul>
                          <li><a href="#">About</a></li>
                          <li><a href="#">Blog</a></li>
                          <li><a href="#">Careers</a></li>
                        </ul>
                      </div>
                      <div class="footer-column">
                        <h4>Legal</h4>
                        <ul>
                          <li><a href="#">Privacy</a></li>
                          <li><a href="#">Terms</a></li>
                          <li><a href="#">Security</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="copyright">
                    &copy; 2025 Company. All rights reserved.
                  </div>
                </div>
              </footer>
            </div>`,
      css: `
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: #333;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        a {
          text-decoration: none;
          color: inherit;
        }

        ul {
          list-style: none;
        }

        .button {
          display: inline-block;
          padding: 12px 24px;
          border-radius: 5px;
          font-weight: bold;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .primary {
          background-color: #4F46E5;
          color: white;
        }

        .primary:hover {
          background-color: #4338CA;
        }

        .secondary {
          background-color: white;
          color: #4F46E5;
          border: 2px solid #4F46E5;
        }

        .secondary:hover {
          background-color: #EEF2FF;
        }

        /* Hero Section */
        .hero-section {
          background-color: #EEF2FF;
          padding: 100px 0;
          position: relative;
        }

        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #4F46E5;
        }

        .nav-links {
          display: flex;
          gap: 30px;
          align-items: center;
        }

        .hero-content {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
        }

        .hero-content h1 {
          font-size: 48px;
          margin-bottom: 20px;
          color: #1F2937;
        }

        .hero-content p {
          font-size: 18px;
          margin-bottom: 30px;
          color: #4B5563;
        }

        .hero-buttons {
          display: flex;
          gap: 15px;
          justify-content: center;
        }

        /* Features Section */
        .features-section {
          padding: 100px 0;
        }

        .section-title {
          text-align: center;
          font-size: 36px;
          margin-bottom: 60px;
          color: #1F2937;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .feature {
          text-align: center;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease;
        }

        .feature:hover {
          transform: translateY(-10px);
        }

        .feature-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }

        .feature h3 {
          font-size: 20px;
          margin-bottom: 15px;
          color: #1F2937;
        }

        /* Testimonials Section */
        .testimonials-section {
          padding: 100px 0;
          background-color: #F9FAFB;
        }

        .testimonials-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin-top: 50px;
        }

        .testimonial {
          background-color: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .quote {
          font-style: italic;
          font-size: 18px;
          margin-bottom: 20px;
          color: #4B5563;
        }

        .author {
          font-weight: bold;
          color: #1F2937;
        }

        /* Pricing Section */
        .pricing-section {
          padding: 100px 0;
        }

        .pricing-plans {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          margin-top: 50px;
        }

        .pricing-plan {
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          padding: 40px 30px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .pricing-plan.popular {
          transform: scale(1.05);
          border-color: #4F46E5;
          box-shadow: 0 10px 25px rgba(79, 70, 229, 0.15);
        }

        .pricing-plan h3 {
          font-size: 24px;
          margin-bottom: 15px;
        }

        .price {
          font-size: 48px;
          font-weight: bold;
          color: #1F2937;
          margin-bottom: 30px;
        }

        .price span {
          font-size: 18px;
          color: #6B7280;
          font-weight: normal;
        }

        .features-list {
          margin-bottom: 30px;
        }

        .features-list li {
          padding: 10px 0;
          border-bottom: 1px solid #E5E7EB;
        }

        /* Contact Section */
        .contact-section {
          padding: 100px 0;
          background-color: #F9FAFB;
        }

        .section-description {
          text-align: center;
          max-width: 600px;
          margin: 0 auto 50px;
          color: #6B7280;
        }

        .contact-form {
          max-width: 600px;
          margin: 0 auto;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 15px;
          border: 1px solid #E5E7EB;
          border-radius: 5px;
          font-size: 16px;
        }

        /* Footer */
        .footer {
          background-color: #1F2937;
          color: white;
          padding: 70px 0 30px;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .footer-logo {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .footer-links {
          display: flex;
          gap: 60px;
          flex-wrap: wrap;
        }

        .footer-column h4 {
          font-size: 18px;
          margin-bottom: 20px;
        }

        .footer-column ul li {
          margin-bottom: 10px;
        }

        .footer-column ul li a {
          color: #D1D5DB;
          transition: color 0.3s ease;
        }

        .footer-column ul li a:hover {
          color: white;
        }

        .copyright {
          padding-top: 30px;
          border-top: 1px solid #374151;
          text-align: center;
          color: #9CA3AF;
          font-size: 14px;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .navbar {
            flex-direction: column;
            gap: 20px;
          }

          .nav-links {
            flex-direction: column;
            gap: 15px;
          }

          .hero-content h1 {
            font-size: 36px;
          }

          .hero-buttons {
            flex-direction: column;
            gap: 10px;
          }

          .footer-content {
            flex-direction: column;
            gap: 30px;
          }
        }
      `,
    },
    ecommerce: {
      html: `<div class="ecommerce-template">
      <header class="header">
        <div class="container">
          <div class="logo">ShopEase</div>
          <nav>
            <a href="#">Home</a>
            <a href="#">Shop</a>
            <a href="#">Categories</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </nav>
          <div class="header-actions">
            <a href="#" class="icon-button search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </a>
            <a href="#" class="icon-button user-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </a>
            <a href="#" class="icon-button cart-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              <span class="cart-badge">3</span>
            </a>
          </div>
        </div>
      </header>

      <section class="hero">
        <div class="container">
          <h1>Summer Collection 2025</h1>
          <p>Discover our latest arrivals with up to 40% off on selected items. Limited time offer.</p>
          <button class="btn-primary">Shop Now</button>
        </div>
      </section>

      <section class="featured-categories">
        <div class="container">
          <h2>Shop by Category</h2>
          <div class="category-grid">
            <div class="category-card">
              <img src="https://via.placeholder.com/400x500" alt="Women's Clothing" />
              <div class="category-content">
                <h3>Women's Clothing</h3>
                <a href="#">Shop Now</a>
              </div>
            </div>
            <div class="category-card">
              <img src="https://via.placeholder.com/400x500" alt="Men's Clothing" />
              <div class="category-content">
                <h3>Men's Clothing</h3>
                <a href="#">Shop Now</a>
              </div>
            </div>
            <div class="category-card">
              <img src="https://via.placeholder.com/400x500" alt="Accessories" />
              <div class="category-content">
                <h3>Accessories</h3>
                <a href="#">Shop Now</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="featured-products">
        <div class="container">
          <h2>Featured Products</h2>
          <div class="products-grid">
            <div class="product-card">
              <div class="product-image">
                <img src="https://via.placeholder.com/280x320" alt="Premium Cotton T-Shirt" />
                <div class="product-tag sale">SALE</div>
                <div class="product-actions">
                  <button>Quick View</button>
                  <button>Add to Cart</button>
                </div>
              </div>
              <div class="product-info">
                <div class="product-category">T-Shirts</div>
                <h3>Premium Cotton T-Shirt</h3>
                <div class="product-details">
                  <div class="product-price">
                    $29.99 <span class="price-old">$39.99</span>
                  </div>
                  <div class="product-rating">★★★★★</div>
                </div>
              </div>
            </div>

            <div class="product-card">
              <div class="product-image">
                <img src="https://via.placeholder.com/280x320" alt="Lightweight Jacket" />
                <div class="product-actions">
                  <button>Quick View</button>
                  <button>Add to Cart</button>
                </div>
              </div>
              <div class="product-info">
                <div class="product-category">Jackets</div>
                <h3>Lightweight Jacket</h3>
                <div class="product-details">
                  <div class="product-price">$89.99</div>
                  <div class="product-rating">★★★★☆</div>
                </div>
              </div>
            </div>

            <div class="product-card">
              <div class="product-image">
                <img src="https://via.placeholder.com/280x320" alt="Athletic Sneakers" />
                <div class="product-tag new">NEW</div>
                <div class="product-actions">
                  <button>Quick View</button>
                  <button>Add to Cart</button>
                </div>
              </div>
              <div class="product-info">
                <div class="product-category">Shoes</div>
                <h3>Athletic Sneakers</h3>
                <div class="product-details">
                  <div class="product-price">$79.99</div>
                  <div class="product-rating">★★★★★</div>
                </div>
              </div>
            </div>

            <div class="product-card">
              <div class="product-image">
                <img src="https://via.placeholder.com/280x320" alt="Leather Watch" />
                <div class="product-actions">
                  <button>Quick View</button>
                  <button>Add to Cart</button>
                </div>
              </div>
              <div class="product-info">
                <div class="product-category">Accessories</div>
                <h3>Leather Watch</h3>
                <div class="product-details">
                  <div class="product-price">$129.99</div>
                  <div class="product-rating">★★★★☆</div>
                </div>
              </div>
            </div>
          </div>
          <div class="view-all-wrapper">
            <button class="btn-outline">View All Products</button>
          </div>
        </div>
      </section>

      <section class="cta">
        <div class="container">
          <h2>Sign Up for 15% Off Your First Order</h2>
          <p>Subscribe to our newsletter to receive updates on new arrivals, special offers, and other discount information.</p>
          <form class="newsletter-form">
            <input type="email" placeholder="Your email address" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>

      <footer>
        <div class="container">
          <div class="footer-grid">
            <div class="footer-column">
              <h3>ShopEase</h3>
              <p>We provide the best selection of fashion items that will make you look and feel your best.</p>
              <div class="social-icons">
                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>
              </div>
            </div>
            <div class="footer-column">
              <h3>Shop</h3>
              <ul>
                <li><a href="#">All Products</a></li>
                <li><a href="#">New Arrivals</a></li>
                <li><a href="#">Best Sellers</a></li>
                <li><a href="#">Sale Items</a></li>
              </ul>
            </div>
            <div class="footer-column">
              <h3>Support</h3>
              <ul>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Shipping Policy</a></li>
                <li><a href="#">Returns & Exchanges</a></li>
                <li><a href="#">FAQs</a></li>
              </ul>
            </div>
            <div class="footer-column">
              <h3>Contact</h3>
              <ul class="contact-info">
                <li>1234 Street Name, City</li>
                <li><a href="mailto:info@shopease.com">info@shopease.com</a></li>
                <li><a href="tel:+1234567890">(123) 456-7890</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <p>© 2025 ShopEase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>`,
      css: `
        /* E-commerce Template Styles */
        .ecommerce-template {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.5;
          color: #111827;
        }

        /* General Styles */
        .ecommerce-template * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .ecommerce-template .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Typography */
        .ecommerce-template h1 {
          font-size: 3rem;
          margin-bottom: 20px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
          font-weight: 800;
        }

        .ecommerce-template h2 {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 50px;
          position: relative;
          padding-bottom: 15px;
        }

        .ecommerce-template h2::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 3px;
          background-color: #4338ca;
        }

        /* Button Styles */
        .ecommerce-template .btn-primary {
          background-color: #4338ca;
          color: white;
          padding: 12px 30px;
          border: none;
          border-radius: 4px;
          font-weight: bold;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(67, 56, 202, 0.3);
        }

        .ecommerce-template .btn-primary:hover {
          background-color: #3730a3;
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(67, 56, 202, 0.4);
        }

        .ecommerce-template .btn-outline {
          background-color: transparent;
          color: #4338ca;
          padding: 12px 30px;
          border: 2px solid #4338ca;
          border-radius: 4px;
          font-weight: bold;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .ecommerce-template .btn-outline:hover {
          background-color: #4338ca;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(67, 56, 202, 0.2);
        }

        /* Header Styles */
        .ecommerce-template .header {
          background-color: white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .ecommerce-template .header .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 80px;
        }

        .ecommerce-template .logo {
          font-size: 24px;
          font-weight: bold;
          color: #4338ca;
          letter-spacing: -0.5px;
          position: relative;
        }

        .ecommerce-template .logo::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 20px;
          height: 2px;
          background-color: #4338ca;
        }

        .ecommerce-template nav {
          display: flex;
          gap: 30px;
        }

        .ecommerce-template nav a {
          text-decoration: none;
          color: #111827;
          font-weight: 500;
          transition: color 0.3s ease;
          position: relative;
        }

        .ecommerce-template nav a::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: #4338ca;
          transition: width 0.3s ease;
        }

        .ecommerce-template nav a:hover {
          color: #4338ca;
        }

        .ecommerce-template nav a:hover::after {
          width: 100%;
        }

        .ecommerce-template .header-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .ecommerce-template .icon-button {
          text-decoration: none;
          color: #111827;
          position: relative;
          transition: color 0.3s ease;
        }

        .ecommerce-template .icon-button:hover {
          color: #4338ca;
        }

        .ecommerce-template .cart-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: #e53e3e;
          color: white;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Hero Section */
        .ecommerce-template .hero {
          background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url('https://via.placeholder.com/1920x600');
          background-size: cover;
          background-position: center;
          height: 600px;
          display: flex;
          align-items: center;
          color: white;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .ecommerce-template .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(67, 56, 202, 0.3) 0%, rgba(0, 0, 0, 0) 100%);
        }

        .ecommerce-template .hero p {
          font-size: 1.2rem;
          margin-bottom: 30px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        /* Featured Categories */
        .ecommerce-template .featured-categories {
          padding: 80px 0;
          background-color: #f9fafb;
        }

        .ecommerce-template .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .ecommerce-template .category-card {
          position: relative;
          overflow: hidden;
          border-radius: 10px;
          height: 320px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          transition: transform 0.3s ease;
        }

        .ecommerce-template .category-card:hover {
          transform: translateY(-5px);
        }

        .ecommerce-template .category-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .ecommerce-template .category-card:hover img {
          transform: scale(1.05);
        }

        .ecommerce-template .category-content {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.1));
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 30px;
          color: white;
        }

        .ecommerce-template .category-content h3 {
          margin: 0 0 10px 0;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .ecommerce-template .category-content a {
          color: white;
          text-decoration: none;
          font-weight: 500;
          opacity: 0.9;
          transition: opacity 0.3s ease;
          display: inline-flex;
          align-items: center;
        }

        .ecommerce-template .category-content a::after {
          content: '→';
          margin-left: 5px;
          transition: transform 0.3s ease;
        }

        .ecommerce-template .category-content a:hover {
          opacity: 1;
        }

        .ecommerce-template .category-content a:hover::after {
          transform: translateX(5px);
        }

        /* Featured Products */
        .ecommerce-template .featured-products {
          padding: 80px 0;
        }

        .ecommerce-template .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 30px;
        }

        .ecommerce-template .product-card {
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          background-color: white;
        }

        .ecommerce-template .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }

        .ecommerce-template .product-image {
          position: relative;
          overflow: hidden;
        }

        .ecommerce-template .product-image img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.5s ease;
        }

        .ecommerce-template .product-card:hover .product-image img {
          transform: scale(1.05);
        }

        .ecommerce-template .product-tag {
          position: absolute;
          top: 10px;
          right: 10px;
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
          z-index: 1;
        }

        .ecommerce-template .product-tag.sale {
          background-color: #e53e3e;
          color: white;
        }

        .ecommerce-template .product-tag.new {
          background-color: #10b981;
          color: white;
        }

        .ecommerce-template .product-actions {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          opacity: 0;
          transition: opacity 0.3s ease, transform 0.3s ease;
          transform: translateY(10px);
        }

        .ecommerce-template .product-card:hover .product-actions {
          opacity: 1;
          transform: translateY(0);
        }

        .ecommerce-template .product-actions button {
          flex: 1;
          border: none;
          background: transparent;
          color: white;
          padding: 12px 10px;
          cursor: pointer;
          font-weight: 500;
          transition: background-color 0.3s ease;
        }

        .ecommerce-template .product-actions button:first-child {
          border-right: 1px solid rgba(255,255,255,0.2);
        }

        .ecommerce-template .product-actions button:hover {
          background-color: rgba(67, 56, 202, 0.8);
        }

        .ecommerce-template .product-info {
          padding: 15px;
        }

        .ecommerce-template .product-category {
          color: #666;
          font-size: 0.8rem;
          margin-bottom: 5px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .ecommerce-template .product-info h3 {
          margin: 0 0 5px 0;
          font-size: 1rem;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .ecommerce-template .product-card:hover .product-info h3 {
          color: #4338ca;
        }

        .ecommerce-template .product-details {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 10px;
        }

        .ecommerce-template .product-price {
          font-weight: bold;
        }

        .ecommerce-template .price-old {
          text-decoration: line-through;
          color: #888;
          font-weight: normal;
          margin-left: 5px;
        }

        .ecommerce-template .product-rating {
          color: #f59e0b;
          font-size: 0.9rem;
        }

        .ecommerce-template .view-all-wrapper {
          text-align: center;
          margin-top: 50px.
        }

        /* CTA Section */
        .ecommerce-template .cta {
          padding: 80px 0;
          background-color: #4338ca;
          background-image: linear-gradient(135deg, #4338ca 0%, #5b52e5 100%);
          color: white;
          text-align: center;
          border-radius: 0;
        }

        .ecommerce-template .cta h2 {
          font-size: 2rem;
          margin-bottom: 20px;
        }

        .ecommerce-template .cta h2::after {
          background-color: white;
        }

        .ecommerce-template .cta p {
          margin-bottom: 30px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          opacity: 0.9;
        }

        .ecommerce-template .newsletter-form {
          display: flex;
          max-width: 500px;
          margin: 0 auto;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          border-radius: 4px;
          overflow: hidden;
        }

        .ecommerce-template .newsletter-form input {
          flex-grow: 1;
          padding: 15px;
          border: none;
          border-radius: 4px 0 0 4px;
          font-size: 1rem;
          outline: none;
        }

        .ecommerce-template .newsletter-form button {
          background-color: white;
          color: #4338ca;
          padding: 15px 24px;
          border: none;
          border-radius: 0 4px 4px 0;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s ease;
          white-space: nowrap;
        }

        .ecommerce-template .newsletter-form button:hover {
          background-color: #f9fafb;
        }

        /* Footer */
        .ecommerce-template footer {
          background-color: #111827;
          color: white;
          padding: 60px 0 30px;
        }

        .ecommerce-template .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 30px;
          margin-bottom: 40px;
        }

        .ecommerce-template .footer-column h3 {
          font-size: 1.2rem;
          margin-bottom: 20px;
          position: relative;
          padding-bottom: 10px;
        }

        .ecommerce-template .footer-column h3::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 2px;
          background-color: #4338ca;
        }

        .ecommerce-template .footer-column p {
          color: #9ca3af;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .ecommerce-template .social-icons {
          display: flex;
          gap: 15px;
          margin-top: 20px;
        }

        .ecommerce-template .social-icons a {
          color: white;
          text-decoration: none;
          background-color: #374151;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .ecommerce-template .social-icons a:hover {
          background-color: #4338ca;
          transform: translateY(-3px);
        }

        .ecommerce-template ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .ecommerce-template footer ul li {
          margin-bottom: 10px;
        }

        .ecommerce-template footer ul li a {
          color: #9ca3af;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .ecommerce-template footer ul li a:hover {
          color: white;
        }

        .ecommerce-template .contact-info li {
          color: #9ca3af;
        }

        .ecommerce-template .footer-bottom {
          border-top: 1px solid #374151;
          padding-top: 30px;
          text-align: center;
        }

        .ecommerce-template .footer-bottom p {
          color: #9ca3af;
          margin: 0;
          font-size: 0.9rem;
        }

        /* Responsive Adjustments */
        @media (max-width: 992px) {
          .ecommerce-template .hero {
            height: 500px;
          }

          .ecommerce-template h1 {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .ecommerce-template .header .container {
            flex-wrap: wrap;
            height: auto;
            padding: 15px 20px;
          }

          .ecommerce-template nav {
            order: 3;
            width: 100%;
            justify-content: space-between;
            margin-top: 15px;
            gap: 10px;
          }

          .ecommerce-template .hero {
            height: 400px;
          }

          .ecommerce-template h1 {
            font-size: 2rem;
          }

          .ecommerce-template .featured-categories,
          .ecommerce-template .featured-products,
          .ecommerce-template .cta {
            padding: 60px 0;
          }

          .ecommerce-template .newsletter-form {
            flex-direction: column;
          }

          .ecommerce-template .newsletter-form input {
            border-radius: 4px 4px 0 0;
          }

          .ecommerce-template .newsletter-form button {
            border-radius: 0 0 4px 4px;
            padding: 12px;
          }
        }

        @media (max-width: 576px) {
          .ecommerce-template h1 {
            font-size: 1.8rem;
          }

          .ecommerce-template h2 {
            font-size: 1.5rem;
            margin-bottom: 30px;
          }

          .ecommerce-template .category-card {
            height: 250px;
          }

          .ecommerce-template .product-actions {
            flex-direction: column;
          }

          .ecommerce-template .product-actions button:first-child {
            border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.2);
          }
        }
      `,
    },
  };

  editor.Commands.add("load-template", {
    run: (editor, sender, options) => {
      // @ts-ignore
      const template = templates[options.template];
      if (template) {
        editor.setComponents(template.html);
        editor.setStyle(template.css);
        return true;
      }
      return false;
    },
  });
};

export default loadTemplates;