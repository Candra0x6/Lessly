import React from "react";
import "./ecommerce-template.css";

export const EcommerceTemplate = () => {
  return (
    <div className="ecommerce-template">
      <header className="header">
        <div className="container">
          <div className="logo">ShopEase</div>
          <nav>
            <a href="#">Home</a>
            <a href="#">Shop</a>
            <a href="#">Categories</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </nav>
          <div className="header-actions">
            <a href="#" className="icon-button search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </a>
            <a href="#" className="icon-button user-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </a>
            <a href="#" className="icon-button cart-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              <span className="cart-badge">3</span>
            </a>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <h1>Summer Collection 2025</h1>
          <p>Discover our latest arrivals with up to 40% off on selected items. Limited time offer.</p>
          <button className="btn-primary">Shop Now</button>
        </div>
      </section>

      <section className="featured-categories">
        <div className="container">
          <h2>Shop by Category</h2>
          <div className="category-grid">
            <div className="category-card">
              <img src="https://via.placeholder.com/400x500" alt="Women's Clothing" />
              <div className="category-content">
                <h3>Women's Clothing</h3>
                <a href="#">Shop Now</a>
              </div>
            </div>
            <div className="category-card">
              <img src="https://via.placeholder.com/400x500" alt="Men's Clothing" />
              <div className="category-content">
                <h3>Men's Clothing</h3>
                <a href="#">Shop Now</a>
              </div>
            </div>
            <div className="category-card">
              <img src="https://via.placeholder.com/400x500" alt="Accessories" />
              <div className="category-content">
                <h3>Accessories</h3>
                <a href="#">Shop Now</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-products">
        <div className="container">
          <h2>Featured Products</h2>
          <div className="products-grid">
            <div className="product-card">
              <div className="product-image">
                <img src="https://via.placeholder.com/280x320" alt="Premium Cotton T-Shirt" />
                <div className="product-tag sale">SALE</div>
                <div className="product-actions">
                  <button>Quick View</button>
                  <button>Add to Cart</button>
                </div>
              </div>
              <div className="product-info">
                <div className="product-category">T-Shirts</div>
                <h3>Premium Cotton T-Shirt</h3>
                <div className="product-details">
                  <div className="product-price">
                    $29.99 <span className="price-old">$39.99</span>
                  </div>
                  <div className="product-rating">★★★★★</div>
                </div>
              </div>
            </div>

            <div className="product-card">
              <div className="product-image">
                <img src="https://via.placeholder.com/280x320" alt="Lightweight Jacket" />
                <div className="product-actions">
                  <button>Quick View</button>
                  <button>Add to Cart</button>
                </div>
              </div>
              <div className="product-info">
                <div className="product-category">Jackets</div>
                <h3>Lightweight Jacket</h3>
                <div className="product-details">
                  <div className="product-price">$89.99</div>
                  <div className="product-rating">★★★★☆</div>
                </div>
              </div>
            </div>

            <div className="product-card">
              <div className="product-image">
                <img src="https://via.placeholder.com/280x320" alt="Athletic Sneakers" />
                <div className="product-tag new">NEW</div>
                <div className="product-actions">
                  <button>Quick View</button>
                  <button>Add to Cart</button>
                </div>
              </div>
              <div className="product-info">
                <div className="product-category">Shoes</div>
                <h3>Athletic Sneakers</h3>
                <div className="product-details">
                  <div className="product-price">$79.99</div>
                  <div className="product-rating">★★★★★</div>
                </div>
              </div>
            </div>

            <div className="product-card">
              <div className="product-image">
                <img src="https://via.placeholder.com/280x320" alt="Leather Watch" />
                <div className="product-actions">
                  <button>Quick View</button>
                  <button>Add to Cart</button>
                </div>
              </div>
              <div className="product-info">
                <div className="product-category">Accessories</div>
                <h3>Leather Watch</h3>
                <div className="product-details">
                  <div className="product-price">$129.99</div>
                  <div className="product-rating">★★★★☆</div>
                </div>
              </div>
            </div>
          </div>
          <div className="view-all-wrapper">
            <button className="btn-outline">View All Products</button>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>Sign Up for 15% Off Your First Order</h2>
          <p>Subscribe to our newsletter to receive updates on new arrivals, special offers, and other discount information.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email address" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-column">
              <h3>ShopEase</h3>
              <p>We provide the best selection of fashion items that will make you look and feel your best.</p>
              <div className="social-icons">
                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>
              </div>
            </div>
            <div className="footer-column">
              <h3>Shop</h3>
              <ul>
                <li><a href="#">All Products</a></li>
                <li><a href="#">New Arrivals</a></li>
                <li><a href="#">Best Sellers</a></li>
                <li><a href="#">Sale Items</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Support</h3>
              <ul>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Shipping Policy</a></li>
                <li><a href="#">Returns & Exchanges</a></li>
                <li><a href="#">FAQs</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Contact</h3>
              <ul className="contact-info">
                <li>1234 Street Name, City</li>
                <li><a href="mailto:info@shopease.com">info@shopease.com</a></li>
                <li><a href="tel:+1234567890">(123) 456-7890</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 ShopEase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EcommerceTemplate;