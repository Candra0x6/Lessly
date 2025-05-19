import { useEffect, useRef, useState } from "react";
import grapesjs from "grapesjs";
import type { Editor } from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import "./GrapesJSEditor.css"; // Import custom CSS
import gjsPresetWebpage from "grapesjs-preset-webpage";
import gjsBlocksBasic from "grapesjs-blocks-basic";
import gjsPresetNewsletter from "grapesjs-preset-newsletter";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useWebsiteStorage } from "@/hooks/useWebsiteStorage";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { ArrowBigDownDash, ArrowDown } from "lucide-react";

interface GrapesJSEditorProps {
  projectId?: string;
  mode?: "webpage" | "newsletter";
}

const customBlocks = (editor: Editor) => {
  const blockManager = editor.BlockManager;

  // Layout category blocks
  blockManager.add("section-heading", {
    label: "Section Heading",
    category: "Layout",
    content: `
      <section>
        <h2>Section Heading</h2>
        <p>Add your content here</p>
      </section>
    `,
  });

  blockManager.add("two-columns", {
    label: "Two Columns",
    category: "Layout",
    content: `
      <div style="display: flex; width: 100%;">
        <div style="flex: 1; padding: 10px;">Column 1</div>
        <div style="flex: 1; padding: 10px;">Column 2</div>
      </div>
    `,
  });

  blockManager.add("three-columns", {
    label: "Three Columns",
    category: "Layout",
    content: `
      <div style="display: flex; width: 100%;">
        <div style="flex: 1; padding: 10px;">Column 1</div>
        <div style="flex: 1; padding: 10px;">Column 2</div>
        <div style="flex: 1; padding: 10px;">Column 3</div>
      </div>
    `,
  });

  blockManager.add("hero-section", {
    label: "Hero Section",
    category: "Layout",
    content: `
      <section style="padding: 80px 20px; text-align: center; background-color: #f5f5f5;">
        <h1 style="font-size: 2.5rem; margin-bottom: 20px;">Your Headline Here</h1>
        <p style="font-size: 1.2rem; margin-bottom: 30px; max-width: 800px; margin-left: auto; margin-right: auto;">A descriptive subtitle that captures your audience's attention and explains your value proposition.</p>
        <div>
          <button style="padding: 12px 24px; background-color: #4338ca; color: white; border: none; border-radius: 4px; font-size: 1rem; margin-right: 10px; cursor: pointer;">Primary Action</button>
          <button style="padding: 12px 24px; background-color: transparent; color: #4338ca; border: 1px solid #4338ca; border-radius: 4px; font-size: 1rem; cursor: pointer;">Secondary Action</button>
        </div>
      </section>
    `,
  });

  // Typography category blocks
  blockManager.add("header", {
    label: "Header",
    category: "Typography",
    content: `<h1>Header</h1>`,
  });

  blockManager.add("paragraph", {
    label: "Paragraph",
    category: "Typography",
    content: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>`,
  });

  blockManager.add("blockquote", {
    label: "Blockquote",
    category: "Typography",
    content: `
      <blockquote style="border-left: 4px solid #e0e0e0; padding-left: 20px; color: #555; font-style: italic; margin: 20px 0;">
        <p>"This is a quotation that could come from a testimonial or a notable saying relevant to your content."</p>
        <footer>— Author Name, <cite>Source</cite></footer>
      </blockquote>
    `,
  });

  blockManager.add("text-with-icon", {
    label: "Text with Icon",
    category: "Typography",
    content: `
      <div style="display: flex; align-items: center; gap: 15px; margin: 20px 0;">
        <div style="font-size: 2rem; color: #4338ca;">✓</div>
        <div>
          <h3 style="margin: 0 0 5px 0;">Feature Headline</h3>
          <p style="margin: 0;">Description of this feature or benefit.</p>
        </div>
      </div>
    `,
  });

  // Media category blocks
  blockManager.add("image", {
    label: "Image",
    category: "Media",
    content: `<img src="https://via.placeholder.com/350x150" alt="Placeholder Image" style="max-width: 100%; height: auto;" />`,
  });

  blockManager.add("video", {
    label: "Video",
    category: "Media",
    content: `
      <div style="width: 100%; aspect-ratio: 16/9;">
        <video controls width="100%">
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
    `,
  });

  blockManager.add("image-gallery", {
    label: "Image Gallery",
    category: "Media",
    content: `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); grid-gap: 15px; margin: 20px 0;">
        <img src="https://via.placeholder.com/300x200" alt="Gallery image 1" style="width: 100%; height: auto; object-fit: cover;">
        <img src="https://via.placeholder.com/300x200" alt="Gallery image 2" style="width: 100%; height: auto; object-fit: cover;">
        <img src="https://via.placeholder.com/300x200" alt="Gallery image 3" style="width: 100%; height: auto; object-fit: cover;">
        <img src="https://via.placeholder.com/300x200" alt="Gallery image 4" style="width: 100%; height: auto; object-fit: cover;">
      </div>
    `,
  });

  // Components category blocks
  blockManager.add("card", {
    label: "Card",
    category: "Components",
    content: `
      <div style="border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 300px; margin: 15px 0;">
        <img src="https://via.placeholder.com/300x200" style="width: 100%; height: auto; display: block;">
        <div style="padding: 20px;">
          <h3 style="margin-top: 0; margin-bottom: 10px;">Card Title</h3>
          <p style="margin-top: 0; margin-bottom: 15px; color: #666;">A brief description of the card content goes here.</p>
          <a href="#" style="display: inline-block; padding: 8px 16px; background-color: #4338ca; color: white; text-decoration: none; border-radius: 4px;">Read More</a>
        </div>
      </div>
    `,
  });

  blockManager.add("testimonial", {
    label: "Testimonial",
    category: "Components",
    content: `
      <div style="padding: 25px; border-radius: 8px; box-shadow: 0 2px 15px rgba(0,0,0,0.08); margin: 20px 0; max-width: 500px;">
        <p style="font-style: italic; color: #555; margin-top: 0;">"I've been using this product for months now, and it has completely transformed my workflow. Highly recommended for anyone in the industry!"</p>
        <div style="display: flex; align-items: center; margin-top: 20px;">
          <img src="https://via.placeholder.com/60x60" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover; margin-right: 15px;">
          <div>
            <p style="margin: 0; font-weight: bold;">Jane Smith</p>
            <p style="margin: 0; color: #777; font-size: 0.9em;">CEO, Example Company</p>
          </div>
        </div>
      </div>
    `,
  });

  blockManager.add("pricing-table", {
    label: "Pricing Table",
    category: "Components",
    content: `
      <div style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; margin: 40px 0;">
        <div style="flex: 1; min-width: 250px; max-width: 350px; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); border: 1px solid #eee;">
          <div style="background-color: #f8f8f8; padding: 20px; text-align: center; border-bottom: 1px solid #eee;">
            <h3 style="margin: 0; font-size: 1.5rem;">Basic</h3>
          </div>
          <div style="padding: 20px; text-align: center;">
            <div style="font-size: 2.5rem; font-weight: bold; margin: 20px 0;">$19<span style="font-size: 1rem; color: #666; font-weight: normal;">/month</span></div>
            <ul style="list-style: none; padding: 0; text-align: left; margin-bottom: 30px;">
              <li style="padding: 8px 0; border-bottom: 1px solid #eee;">✓ Feature one</li>
              <li style="padding: 8px 0; border-bottom: 1px solid #eee;">✓ Feature two</li>
              <li style="padding: 8px 0; border-bottom: 1px solid #eee;">✓ Feature three</li>
            </ul>
            <a href="#" style="display: inline-block; padding: 12px 30px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">Get Started</a>
          </div>
        </div>
        <div style="flex: 1; min-width: 250px; max-width: 350px; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.15); border: 2px solid #4338ca; position: relative;">
          <div style="position: absolute; top: 0; right: 0; background-color: #4338ca; color: white; padding: 5px 10px; font-size: 0.8rem; font-weight: bold;">POPULAR</div>
          <div style="background-color: #f8f8f8; padding: 20px; text-align: center; border-bottom: 1px solid #eee;">
            <h3 style="margin: 0; font-size: 1.5rem;">Pro</h3>
          </div>
          <div style="padding: 20px; text-align: center;">
            <div style="font-size: 2.5rem; font-weight: bold; margin: 20px 0;">$49<span style="font-size: 1rem; color: #666; font-weight: normal;">/month</span></div>
            <ul style="list-style: none; padding: 0; text-align: left; margin-bottom: 30px;">
              <li style="padding: 8px 0; border-bottom: 1px solid #eee;">✓ All Basic features</li>
              <li style="padding: 8px 0; border-bottom: 1px solid #eee;">✓ Pro feature one</li>
              <li style="padding: 8px 0; border-bottom: 1px solid #eee;">✓ Pro feature two</li>
              <li style="padding: 8px 0; border-bottom: 1px solid #eee;">✓ Pro feature three</li>
            </ul>
            <a href="#" style="display: inline-block; padding: 12px 30px; background-color: #4338ca; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">Get Started</a>
          </div>
        </div>
      </div>
    `,
  });

  blockManager.add("call-to-action", {
    label: "Call to Action",
    category: "Components",
    content: `
      <div style="text-align: center; padding: 60px 20px; background-color: #f5f7ff; border-radius: 8px; margin: 40px 0;">
        <h2 style="margin-top: 0; margin-bottom: 20px; font-size: 2rem;">Ready to Get Started?</h2>
        <p style="margin-bottom: 30px; max-width: 600px; margin-left: auto; margin-right: auto; color: #555;">Join thousands of satisfied customers who have already taken their business to the next level.</p>
        <a href="#" style="display: inline-block; padding: 14px 34px; background-color: #4338ca; color: white; text-decoration: none; border-radius: 4px; font-size: 1.1rem; font-weight: bold;">Sign Up Now</a>
        <p style="margin-top: 15px; font-size: 0.9rem; color: #777;">No credit card required. Free 14-day trial.</p>
      </div>
    `,
  });

  // Animations category blocks
  blockManager.add("fade-in-animation", {
    label: "Fade In Animation",
    category: "Animations",
    content: `
      <div data-gjs-type="default" data-aos="fade-in" style="padding: 30px; border: 1px dashed #ccc; animation: fadeIn 1s ease-in-out;">
        <h3 style="margin-top: 0;">Fade In Element</h3>
        <p>This element will fade in when the page loads. You can customize the animation duration and timing.</p>
      </div>
      <style>
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      </style>
    `,
  });

  blockManager.add("slide-in-animation", {
    label: "Slide In Animation",
    category: "Animations",
    content: `
      <div data-gjs-type="default" style="padding: 30px; border: 1px dashed #ccc; animation: slideIn 1s ease-in-out;">
        <h3 style="margin-top: 0;">Slide In Element</h3>
        <p>This element will slide in from the left when the page loads.</p>
      </div>
      <style>
        @keyframes slideIn {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      </style>
    `,
  });

  blockManager.add("pulse-animation", {
    label: "Pulse Animation",
    category: "Animations",
    content: `
      <div data-gjs-type="default" style="padding: 30px; border: 1px dashed #ccc; animation: pulse 2s infinite;">
        <h3 style="margin-top: 0;">Pulse Element</h3>
        <p>This element will pulse to draw attention.</p>
      </div>
      <style>
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      </style>
    `,
  });

  // Media Gallery category blocks
  blockManager.add("masonry-gallery", {
    label: "Masonry Gallery",
    category: "Media Gallery",
    content: `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); grid-auto-rows: minmax(100px, auto); gap: 15px; margin: 30px 0;">
        <div style="grid-row: span 2;"><img src="https://via.placeholder.com/400x600" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;"></div>
        <div><img src="https://via.placeholder.com/400x300" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;"></div>
        <div><img src="https://via.placeholder.com/400x300" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;"></div>
        <div style="grid-column: span 2;"><img src="https://via.placeholder.com/800x400" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;"></div>
        <div><img src="https://via.placeholder.com/400x300" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;"></div>
      </div>
    `,
  });

  blockManager.add("lightbox-gallery", {
    label: "Lightbox Gallery",
    category: "Media Gallery",
    content: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin: 30px 0;">
        <a href="#" class="lightbox-item" style="display: block; position: relative; overflow: hidden; border-radius: 8px;">
          <img src="https://via.placeholder.com/400x400" style="width: 100%; height: auto; transition: transform 0.3s ease;">
          <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.5); opacity: 0; display: flex; justify-content: center; align-items: center; color: white; font-size: 24px; transition: opacity 0.3s ease;">+</div>
        </a>
        <a href="#" class="lightbox-item" style="display: block; position: relative; overflow: hidden; border-radius: 8px;">
          <img src="https://via.placeholder.com/400x400" style="width: 100%; height: auto; transition: transform 0.3s ease;">
          <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.5); opacity: 0; display: flex; justify-content: center; align-items: center; color: white; font-size: 24px; transition: opacity 0.3s ease;">+</div>
        </a>
        <a href="#" class="lightbox-item" style="display: block; position: relative; overflow: hidden; border-radius: 8px;">
          <img src="https://via.placeholder.com/400x400" style="width: 100%; height: auto; transition: transform 0.3s ease;">
          <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.5); opacity: 0; display: flex; justify-content: center; align-items: center; color: white; font-size: 24px; transition: opacity 0.3s ease;">+</div>
        </a>
      </div>
      <style>
        .lightbox-item:hover img {
          transform: scale(1.05);
        }
        .lightbox-item:hover div {
          opacity: 1;
        }
      </style>
    `,
  });

  // Call to Action category blocks
  blockManager.add("cta-centered", {
    label: "Centered CTA",
    category: "Call to Action",
    content: `
      <div style="text-align: center; padding: 60px 20px; background-color: #f8fafc; margin: 30px 0; border-radius: 8px;">
        <h2 style="font-size: 2rem; margin-bottom: 20px; color: #1e293b;">Ready to Get Started?</h2>
        <p style="max-width: 600px; margin: 0 auto 30px; color: #64748b; font-size: 1.1rem;">Join thousands of satisfied customers who have transformed their online presence with our platform.</p>
        <a href="#" style="display: inline-block; background-color: #4338ca; color: white; padding: 12px 24px; border-radius: 6px; font-weight: 500; text-decoration: none; transition: background-color 0.3s;">Sign Up Now</a>
      </div>
    `,
  });

  blockManager.add("cta-split", {
    label: "Split CTA",
    category: "Call to Action",
    content: `
      <div style="display: flex; flex-wrap: wrap; border-radius: 8px; overflow: hidden; margin: 30px 0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <div style="flex: 1; min-width: 300px; padding: 40px; background-color: #4338ca;">
          <h2 style="color: white; font-size: 1.8rem; margin-bottom: 20px;">Take Your Business to the Next Level</h2>
          <p style="color: rgba(255,255,255,0.8); margin-bottom: 25px;">Our platform provides everything you need to establish a powerful online presence.</p>
          <div style="display: flex; gap: 15px;">
            <a href="#" style="display: inline-block; background-color: white; color: #4338ca; padding: 12px 24px; border-radius: 6px; font-weight: 500; text-decoration: none;">Get Started</a>
            <a href="#" style="display: inline-block; background-color: transparent; color: white; padding: 12px 24px; border-radius: 6px; font-weight: 500; text-decoration: none; border: 1px solid white;">Learn More</a>
          </div>
        </div>
        <div style="flex: 1; min-width: 300px; background: url('https://via.placeholder.com/600x400') center/cover; min-height: 300px;"></div>
      </div>
    `,
  });

  blockManager.add("cta-banner", {
    label: "CTA Banner",
    category: "Call to Action",
    content: `
      <div style="background-color: #0f172a; color: white; padding: 20px; display: flex; justify-content: space-between; align-items: center; border-radius: 8px; margin: 30px 0;">
        <div style="flex: 1;">
          <h3 style="margin: 0; font-size: 1.2rem;">Limited Time Offer: 30% Off All Plans</h3>
        </div>
        <a href="#" style="background-color: #4f46e5; color: white; padding: 8px 16px; border-radius: 4px; text-decoration: none; white-space: nowrap; margin-left: 20px;">Claim Offer</a>
      </div>
    `,
  });

  // E-commerce category blocks
  blockManager.add("product-card", {
    label: "Product Card",
    category: "E-commerce",
    content: `
      <div style="border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 280px; transition: transform 0.3s ease, box-shadow 0.3s ease; margin: 15px 0;">
        <div style="position: relative;">
          <img src="https://via.placeholder.com/280x320" style="width: 100%; height: auto; display: block;">
          <div style="position: absolute; top: 10px; right: 10px; background-color: #e53e3e; color: white; padding: 5px 10px; border-radius: 4px; font-size: 12px; font-weight: bold;">SALE</div>
          <div style="position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.7); display: flex; opacity: 0; transition: opacity 0.3s ease;">
            <button style="flex: 1; border: none; background: transparent; color: white; padding: 10px; cursor: pointer; font-weight: 500;">Quick View</button>
            <button style="flex: 1; border: none; background: transparent; color: white; padding: 10px; cursor: pointer; font-weight: 500; border-left: 1px solid rgba(255,255,255,0.2);">Add to Cart</button>
          </div>
        </div>
        <div style="padding: 15px;">
          <div style="color: #666; font-size: 0.8rem; margin-bottom: 5px;">Category Name</div>
          <h3 style="margin: 0 0 5px 0; font-size: 1rem;">Product Name</h3>
          <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 10px;">
            <div style="font-weight: bold;">$49.99 <span style="text-decoration: line-through; color: #888; font-weight: normal; margin-left: 5px;">$69.99</span></div>
            <div style="color: #f59e0b; font-size: 0.9rem;">★★★★☆</div>
          </div>
        </div>
      </div>
      <style>
        div:hover > div > div {
          opacity: 1;
        }
        div:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
      </style>
    `,
  });

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

const GrapesJSEditor = ({
  projectId,
  mode = "webpage",
}: GrapesJSEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<Editor | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { saveWebsiteContent, loadWebsiteContent } = useWebsiteStorage();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!editorRef.current) return;

    // Initialize GrapesJS
    const grapesJsEditor = grapesjs.init({
      container: editorRef.current,
      height: "calc(100vh - 5rem)",
      width: "auto",
      storageManager: { type: "none" },
      deviceManager: {
        devices: [
          { name: "Desktop", width: "" },
          { name: "Tablet", width: "768px" },
          { name: "Mobile", width: "320px" },
        ],
      },
      blockManager: {
        blocks: [], // Will be added via customBlocks function
      },
      panels: {
        defaults: [
          {
            id: "panel-devices",
            el: ".panel__devices",
            buttons: [
              {
                id: "device-desktop",
                label: "D",
                command: "set-device-desktop",
                active: true,
                togglable: false,
              },
              {
                id: "device-tablet",
                label: "T",
                command: "set-device-tablet",
                togglable: false,
              },
              {
                id: "device-mobile",
                label: "M",
                command: "set-device-mobile",
                togglable: false,
              },
            ],
          },
        ],
      },
      plugins: [
        mode === "webpage" ? gjsPresetWebpage : gjsPresetNewsletter,
        gjsBlocksBasic,
      ],
      pluginsOpts: {
        [mode === "webpage" ? "gjsPresetWebpage" : "gjsPresetNewsletter"]: {},
        gjsBlocksBasic: {},
      },
      canvas: {
        styles: [
          "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css",
        ],
        scripts: [
          "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js",
        ],
      },
    });

    // Set custom commands for devices
    grapesJsEditor.Commands.add("set-device-desktop", {
      run: (editor) => editor.setDevice("Desktop"),
    });

    grapesJsEditor.Commands.add("set-device-tablet", {
      run: (editor) => editor.setDevice("Tablet"),
    });

    grapesJsEditor.Commands.add("set-device-mobile", {
      run: (editor) => editor.setDevice("Mobile"),
    });

    // Add custom blocks and templates
    customBlocks(grapesJsEditor);
    loadTemplates(grapesJsEditor);

    setEditor(grapesJsEditor);
    setIsLoading(false);

    // Load content if projectId is provided
    if (projectId) {
      loadProjectData(projectId, grapesJsEditor);
    }

    return () => {
      grapesJsEditor.destroy();
    };
  }, [projectId, mode]);

  const loadProjectData = async (id: string, editorInstance: Editor) => {
    setIsLoading(true);
    try {
      const content = await loadWebsiteContent(id);
      if (content) {
        editorInstance.setComponents(content.html || "");
        editorInstance.setStyle(content.css || "");

        if (content.js) {
          // Handle JS if needed
        }

        toast({
          title: "Project loaded successfully",
          description: "Your project has been loaded into the editor",
        });
      }
    } catch (error) {
      console.error("Error loading project data:", error);
      toast({
        title: "Error loading project",
        description: "Could not load project data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveProject = async () => {
    if (!editor || !projectId) return;

    setIsLoading(true);
    try {
      const html = editor.getHtml();
      const css = editor.getCss();
      const js = editor.getJs();

      await saveWebsiteContent(projectId, {
        html,
        css,
        js,
        assets: [], // Handle assets if needed
      });

      toast({
        title: "Project saved successfully",
        description: "Your changes have been saved",
      });
    } catch (error) {
      console.error("Error saving project:", error);
      toast({
        title: "Error saving project",
        description: "Could not save your changes",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handlePreview = () => {
    if (!projectId) return;

    // Save the current project and navigate to preview
    saveProject().then(() => {
      navigate(`/preview/${projectId}`);
    });
  };

  const applyTemplate = (templateName: string) => {
    if (editor) {
      editor.runCommand("load-template", { template: templateName });
      toast({
        title: "Template applied",
        description: `The ${templateName} template has been applied to your project`,
      });
    }
  };

  return (
    <div className="editor-container flex flex-col h-screen">
      <div className="editor-toolbar flex items-center justify-between p-4 bg-card border-b">
        <div className="flex items-center space-x-2">
          <Button onClick={handleBack} variant="outline" size="sm">
            Back
          </Button>
          <h2 className="text-xl font-semibold">Website Builder</h2>
        </div>

        <div className="panel__devices"></div>

        <div className="flex items-center space-x-2">
          <Button onClick={saveProject} disabled={isLoading} size="sm">
            {isLoading ? "Saving..." : "Save"}
          </Button>
          <Button onClick={handlePreview} variant="outline" size="sm">
            Preview
          </Button>
          <Select onValueChange={(value) => applyTemplate(value)}>
            <SelectTrigger className="bg-primary py-2 px-5  text-white rounded-md text-sm">
              <span className="flex items-center">
                <span className="text-sm font-medium text-white">
                  Templates
                </span>
                <ArrowDown className="ml-2 text-sm w-4" />
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="portfolio">Portfolio</SelectItem>
              <SelectItem value="landing">Landing Page</SelectItem>
              <SelectItem value="blog">Blog</SelectItem>
              <SelectItem value="ecommerce">E-commerce</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="editor-main flex flex-1 bg-background">
        <div className="editor-canvas flex-1">
          <div ref={editorRef} className="h-full" />
        </div>
      </div>
    </div>
  );
};

export default GrapesJSEditor;
