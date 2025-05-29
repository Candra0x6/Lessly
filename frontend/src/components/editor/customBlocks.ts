import { Editor } from 'grapesjs';

/**
 * Adds custom blocks to the GrapesJS editor
 * @param editor The GrapesJS editor instance
 */
const customBlocks = (editor: Editor) => {
  const blockManager = editor.BlockManager;

  blockManager.add("product-grid", {
    label: "Product Grid",
    category: "E-commerce",
    content: `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 25px; margin: 30px 0;">
        <div style="border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); transition: transform 0.3s ease;">
          <img src="https://via.placeholder.com/280x320" style="width: 100%; height: auto; display: block;">
          <div style="padding: 15px;">
            <h3 style="margin: 0 0 5px 0; font-size: 1rem;">Product Name</h3>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 10px;">
              <div style="font-weight: bold;">$49.99</div>
              <div style="color: #f59e0b; font-size: 0.9rem;">★★★★☆</div>
            </div>
          </div>
        </div>
        <div style="border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); transition: transform 0.3s ease;">
          <img src="https://via.placeholder.com/280x320" style="width: 100%; height: auto; display: block;">
          <div style="padding: 15px;">
            <h3 style="margin: 0 0 5px 0; font-size: 1rem;">Product Name</h3>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 10px;">
              <div style="font-weight: bold;">$49.99</div>
              <div style="color: #f59e0b; font-size: 0.9rem;">★★★★☆</div>
            </div>
          </div>
        </div>
        <div style="border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); transition: transform 0.3s ease;">
          <img src="https://via.placeholder.com/280x320" style="width: 100%; height: auto; display: block;">
          <div style="padding: 15px;">
            <h3 style="margin: 0 0 5px 0; font-size: 1rem;">Product Name</h3>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 10px;">
              <div style="font-weight: bold;">$49.99</div>
              <div style="color: #f59e0b; font-size: 0.9rem;">★★★★☆</div>
            </div>
          </div>
        </div>
      </div>
      <style>
        div > div:hover {
          transform: translateY(-5px);
        }
      </style>
    `,
  });

  blockManager.add("shopping-cart", {
    label: "Shopping Cart",
    category: "E-commerce",
    content: `
      <div style="border-radius: 8px; border: 1px solid #eee; padding: 20px; max-width: 800px; margin: 20px 0;">
        <h2 style="margin-top: 0; margin-bottom: 20px; font-size: 1.5rem;">Your Shopping Cart (3 items)</h2>
        <div style="border-bottom: 1px solid #eee; padding-bottom: 15px; margin-bottom: 15px; display: flex; gap: 20px;">
          <img src="https://via.placeholder.com/80x80" style="width: 80px; height: 80px; object-fit: cover;">
          <div style="flex-grow: 1;">
            <h3 style="margin: 0; font-size: 1rem;">Product Name</h3>
            <p style="margin: 5px 0; color: #666; font-size: 0.9rem;">Size: Medium | Color: Blue</p>
            <div style="display: flex; align-items: center; gap: 10px;">
              <div>Qty:
                <select style="padding: 5px; border: 1px solid #ddd; border-radius: 4px;">
                  <option>1</option>
                  <option selected>2</option>
                  <option>3</option>
                </select>
              </div>
              <button style="background: none; border: none; color: #e53e3e; cursor: pointer; font-size: 0.9rem;">Remove</button>
            </div>
          </div>
          <div style="font-weight: bold;">$49.99</div>
        </div>
        <div style="border-bottom: 1px solid #eee; padding-bottom: 15px; margin-bottom: 15px; display: flex; gap: 20px;">
          <img src="https://via.placeholder.com/80x80" style="width: 80px; height: 80px; object-fit: cover;">
          <div style="flex-grow: 1;">
            <h3 style="margin: 0; font-size: 1rem;">Product Name</h3>
            <p style="margin: 5px 0; color: #666; font-size: 0.9rem;">Size: Large | Color: Black</p>
            <div style="display: flex; align-items: center; gap: 10px;">
              <div>Qty:
                <select style="padding: 5px; border: 1px solid #ddd; border-radius: 4px;">
                  <option selected>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>
              <button style="background: none; border: none; color: #e53e3e; cursor: pointer; font-size: 0.9rem;">Remove</button>
            </div>
          </div>
          <div style="font-weight: bold;">$29.99</div>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 15px 0; border-bottom: 1px solid #eee;">
          <div>Subtotal</div>
          <div style="font-weight: bold;">$129.97</div>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 15px 0; border-bottom: 1px solid #eee;">
          <div>Shipping</div>
          <div style="font-weight: bold;">$5.99</div>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 15px 0; margin-bottom: 20px;">
          <div style="font-size: 1.1rem; font-weight: bold;">Total</div>
          <div style="font-size: 1.1rem; font-weight: bold;">$135.96</div>
        </div>
        <button style="background-color: #4338ca; color: white; padding: 12px 24px; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; width: 100%;">Proceed to Checkout</button>
      </div>
    `,
  });

  // Forms category blocks
  blockManager.add("contact-form", {
    label: "Contact Form",
    category: "Forms",
    content: `
      <form style="max-width: 600px; margin: 30px 0; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="margin-top: 0; margin-bottom: 20px;">Contact Us</h2>
        <div style="margin-bottom: 20px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 500;">Name</label>
          <input type="text" placeholder="Your name" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
        </div>
        <div style="margin-bottom: 20px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 500;">Email</label>
          <input type="email" placeholder="Your email" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
        </div>
        <div style="margin-bottom: 20px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 500;">Subject</label>
          <input type="text" placeholder="Subject" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
        </div>
        <div style="margin-bottom: 20px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 500;">Message</label>
          <textarea placeholder="Your message" rows="5" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;"></textarea>
        </div>
        <button type="submit" style="background-color: #4338ca; color: white; padding: 12px 24px; border: none; border-radius: 4px; font-weight: 500; cursor: pointer;">Send Message</button>
      </form>
    `,
  });

  blockManager.add("newsletter-signup", {
    label: "Newsletter Signup",
    category: "Forms",
    content: `
      <div style="background-color: #f9fafb; padding: 30px; border-radius: 8px; text-align: center; max-width: 600px; margin: 30px 0;">
        <h3 style="margin-top: 0; margin-bottom: 10px; font-size: 1.5rem;">Subscribe to Our Newsletter</h3>
        <p style="margin-bottom: 20px; color: #4b5563;">Stay updated with our latest news and offers.</p>
        <form style="display: flex; max-width: 400px; margin: 0 auto;">
          <input type="email" placeholder="Your email address" style="flex-grow: 1; padding: 10px; border: 1px solid #ddd; border-radius: 4px 0 0 4px; border-right: none;">
          <button type="submit" style="background-color: #4338ca; color: white; padding: 10px 15px; border: 1px solid #4338ca; border-radius: 0 4px 4px 0; cursor: pointer;">Subscribe</button>
        </form>
        <p style="margin-top: 15px; font-size: 0.8rem; color: #6b7280;">We respect your privacy. Unsubscribe at any time.</p>
      </div>
    `,
  });

  blockManager.add("login-form", {
    label: "Login Form",
    category: "Forms",
    content: `
      <form style="max-width: 400px; margin: 30px 0; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="margin-top: 0; margin-bottom: 20px; text-align: center;">Log In</h2>
        <div style="margin-bottom: 20px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 500;">Email</label>
          <input type="email" placeholder="name@example.com" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
        </div>
        <div style="margin-bottom: 20px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 500;">Password</label>
          <input type="password" placeholder="••••••••" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <div>
            <input type="checkbox" id="remember">
            <label for="remember" style="font-size: 0.9rem;">Remember me</label>
          </div>
          <a href="#" style="font-size: 0.9rem; color: #4338ca;">Forgot password?</a>
        </div>
        <button type="submit" style="background-color: #4338ca; color: white; padding: 12px 24px; width: 100%; border: none; border-radius: 4px; font-weight: 500; cursor: pointer; margin-bottom: 15px;">Sign In</button>
        <p style="text-align: center; margin: 0; font-size: 0.9rem;">Don't have an account? <a href="#" style="color: #4338ca;">Sign up</a></p>
      </form>
    `,
  });
};

export default customBlocks;