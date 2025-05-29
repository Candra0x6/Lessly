# Lessly

<p align="center">
  <img src="frontend/src/assets/logo.svg" alt="Lessly Logo" width="200"/>
</p>

Lessly is a decentralized website builder platform running on the Internet Computer Protocol (ICP). It enables users to create, manage, and publish websites directly on the blockchain, offering true ownership, censorship resistance, and seamless deployment.

## 🌟 Features

### 📝 Project Management
- Create and manage multiple website projects
- Version control system for tracking changes
- Collaborative editing with team members
- Project templates to jumpstart development

### 🔐 User Management
- Secure authentication via Internet Identity
- Tiered subscription model (Free, Premium, Business)
- User profiles and permission management

### 💾 Website Storage
- Decentralized asset storage on the ICP blockchain
- Support for various asset types (HTML, CSS, JavaScript, images, fonts)
- Efficient chunking for large file storage
- Access control for collaborative projects

### 🚀 Publishing & Deployment
- One-click publishing to the Internet Computer
- Custom domain support
- Built-in analytics (Premium and Business tiers)
- Automatic versioning and rollback capabilities

### 🎨 Website Editor
- Visual drag-and-drop editor
- Code editor for advanced customization
- Real-time preview
- Responsive design tools

## 🏗️ Architecture

Lessly is built using a modular canister architecture on the Internet Computer:

- **User Canister**: Manages user authentication and subscription tiers
- **Project Management Canister**: Handles website projects and versioning
- **Website Storage Canister**: Stores and retrieves website assets
- **Frontend**: React-based UI with TypeScript and modern web technologies

## 🛠️ Getting Started

### Prerequisites

- [dfx](https://internetcomputer.org/docs/current/developer-docs/setup/install/) - The Internet Computer SDK
- [Node.js](https://nodejs.org/) (v16 or later)
- [mops](https://mops.one/) - Motoko Package Manager

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/lessly.git
   cd lessly
   ```

2. Install dependencies
   ```bash
   npm install
   mops install
   ```

3. Start the local Internet Computer replica
   ```bash
   dfx start --background
   ```

4. Deploy the canisters locally
   ```bash
   dfx deploy
   ```

5. Open the frontend
   ```bash
   npm run dev
   ```

### Deployment to ICP Mainnet

1. Ensure you have ICP tokens and a cycles wallet
   
2. Deploy to mainnet
   ```bash
   dfx deploy --network ic
   ```

## 💡 What We're Proud Of

- **True Decentralization**: Built entirely on the Internet Computer with no reliance on traditional cloud services
- **Performance**: Optimized asset storage and retrieval for fast website loading
- **Developer Experience**: Clean architecture with clear separation of concerns
- **User Experience**: Intuitive interface that makes Web3 accessible to everyone
- **Scalability**: Designed to handle everything from personal blogs to enterprise websites

## 📚 Documentation

For more detailed documentation, please refer to the `/docs` directory:

- [Product Requirements Document](docs/prd.md)
- [Technical Architecture](docs/technical_architecture.md)
- [Canister Architecture](canister_architecture.md)
- [Frontend Structure](docs/frontend_structure.md)
- [User Flow](docs/user_flow.md)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

Project Link: [https://github.com/yourusername/lessly](https://github.com/yourusername/lessly)

---

<p align="center">Built with ❤️ on the Internet Computer</p>