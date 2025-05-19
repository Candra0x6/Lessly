"use client"

import { useState } from "react"
import { ArrowRight, Check, Menu, X } from "lucide-react"

export default function PreviewContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                SampleSite
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              {["Home", "Features", "Pricing", "About", "Contact"].map((item) => (
                <a key={item} href="#" className="text-gray-700 hover:text-blue-500 px-3 py-2 text-sm font-medium">
                  {item}
                </a>
              ))}
            </nav>
            <div className="hidden md:flex items-center space-x-4">
              <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50">
                Log in
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                Sign up
              </button>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-500 hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {["Home", "Features", "Pricing", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-50"
                >
                  {item}
                </a>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    U
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">User</div>
                  <div className="text-sm font-medium text-gray-500">user@example.com</div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <a
                  href="#"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-50"
                >
                  Log in
                </a>
                <a
                  href="#"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-50"
                >
                  Sign up
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Beautiful websites</span>
                <span className="block text-blue-600">for your business</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Create stunning, responsive websites with our easy-to-use platform. No coding required.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-3 justify-center lg:justify-start">
                  <button className="px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5 inline" />
                  </button>
                  <button className="px-6 py-3 text-base font-medium text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                  <img src="/placeholder.svg?height=400&width=600" alt="Dashboard preview" className="w-full" />
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                    <button className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-600 text-white">
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Features that make you productive</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Everything you need to create amazing websites
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Drag & Drop Editor",
                description: "Build your website visually with our intuitive drag and drop interface.",
                icon: "🎨",
              },
              {
                title: "Responsive Design",
                description: "All websites automatically adapt to any screen size or device.",
                icon: "📱",
              },
              {
                title: "SEO Optimized",
                description: "Built-in tools to help your website rank higher in search engines.",
                icon: "🔍",
              },
              {
                title: "Fast Loading",
                description: "Optimized code ensures your website loads quickly for visitors.",
                icon: "⚡",
              },
              {
                title: "Custom Domains",
                description: "Connect your own domain name to your website with one click.",
                icon: "🌐",
              },
              {
                title: "Analytics",
                description: "Track visitor behavior and website performance with built-in analytics.",
                icon: "📊",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-base text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Trusted by thousands of users</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              See what our customers are saying about our platform
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                quote:
                  "This platform has completely transformed how I create websites. It's so easy to use and the results are amazing!",
                author: "Sarah Johnson",
                role: "Marketing Director",
                avatar: "/placeholder.svg?height=100&width=100",
              },
              {
                quote:
                  "I was able to create a professional website for my business in just a few hours. The templates are beautiful and customizable.",
                author: "Michael Chen",
                role: "Small Business Owner",
                avatar: "/placeholder.svg?height=100&width=100",
              },
              {
                quote:
                  "As someone with no coding experience, I never thought I could create my own website. This platform made it possible and enjoyable!",
                author: "Emily Rodriguez",
                role: "Freelance Photographer",
                avatar: "/placeholder.svg?height=100&width=100",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.author}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Simple, transparent pricing</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">Choose the plan that's right for you</p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Basic",
                price: "$9",
                description: "Perfect for personal websites and small projects",
                features: ["1 website", "Custom domain", "5GB storage", "Basic templates", "Community support"],
                cta: "Get Started",
                popular: false,
              },
              {
                name: "Pro",
                price: "$19",
                description: "Great for businesses and professional portfolios",
                features: [
                  "5 websites",
                  "Custom domains",
                  "20GB storage",
                  "Premium templates",
                  "Priority support",
                  "Advanced analytics",
                ],
                cta: "Get Started",
                popular: true,
              },
              {
                name: "Enterprise",
                price: "$49",
                description: "For large businesses with advanced needs",
                features: [
                  "Unlimited websites",
                  "Custom domains",
                  "100GB storage",
                  "All templates",
                  "24/7 support",
                  "Advanced analytics",
                  "Team collaboration",
                ],
                cta: "Contact Sales",
                popular: false,
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-md overflow-hidden ${
                  plan.popular ? "ring-2 ring-blue-500 relative" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 transform translate-x-2 -translate-y-2 rotate-45">
                    Popular
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                    <span className="ml-1 text-xl font-medium text-gray-500">/month</span>
                  </div>
                  <p className="mt-5 text-gray-500">{plan.description}</p>
                </div>
                <div className="px-6 pt-6 pb-8">
                  <h4 className="text-sm font-medium text-gray-900 tracking-wide uppercase">What's included</h4>
                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex">
                        <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                        <span className="ml-3 text-base text-gray-500">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <button
                      className={`w-full px-4 py-2 text-base font-medium rounded-md ${
                        plan.popular
                          ? "text-white bg-blue-600 hover:bg-blue-700"
                          : "text-blue-600 bg-white border border-blue-600 hover:bg-blue-50"
                      }`}
                    >
                      {plan.cta}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-blue-200">Create your website today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <button className="px-5 py-3 text-base font-medium text-blue-600 bg-white hover:bg-gray-50 rounded-md">
                Get started
              </button>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <button className="px-5 py-3 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-md">
                Learn more
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8 xl:col-span-1">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                SampleSite
              </span>
              <p className="text-gray-500 text-base">Making website creation simple and accessible for everyone.</p>
              <div className="flex space-x-6">
                {["facebook", "twitter", "instagram", "github", "youtube"].map((social) => (
                  <a key={social} href="#" className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">{social}</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Solutions</h3>
                  <ul className="mt-4 space-y-4">
                    {["Marketing", "Analytics", "Commerce", "Insights"].map((item) => (
                      <li key={item}>
                        <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
                  <ul className="mt-4 space-y-4">
                    {["Pricing", "Documentation", "Guides", "API Status"].map((item) => (
                      <li key={item}>
                        <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
                  <ul className="mt-4 space-y-4">
                    {["About", "Blog", "Jobs", "Press", "Partners"].map((item) => (
                      <li key={item}>
                        <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
                  <ul className="mt-4 space-y-4">
                    {["Claim", "Privacy", "Terms"].map((item) => (
                      <li key={item}>
                        <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 pt-8">
            <p className="text-base text-gray-400 xl:text-center">&copy; 2023 SampleSite, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
