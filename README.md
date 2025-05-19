# Lessly - Web3 Website Builder

Lessly is a decentralized website building and hosting platform built on the Internet Computer Protocol (ICP). It allows users to create, manage, and publish websites with custom domains in a fully decentralized manner.

## Architecture

The platform is built using the Motoko programming language and is divided into four main canisters:

- **UserManagement**: Handles user registration, authentication, and subscription management
- **ProjectManagement**: Manages website projects and their versions
- **WebsiteStorage**: Stores and manages website assets (HTML, CSS, JS, images, etc.)
- **WebsiteRenderer**: Renders websites to visitors and handles HTTP requests

## Documentation

- [System Summary](docs/summary.md): Overview of the system architecture and components
- [Canister Flow](docs/canister_flow.md): Detailed explanation of the interactions between canisters

## Features

- User registration and authentication
- Project creation and management
- Version control for websites
- Chunked asset storage for large files
- Custom domain support
- Streaming of large assets
- Subscription tiers (free/premium)

## Getting Started

1. Make sure you have the DFINITY SDK (dfx) installed:
   ```
   sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
   ```

2. Start the local development environment:
   ```
   dfx start --background
   ```

3. Deploy the canisters:
   ```
   dfx deploy
   ```

4. Visit the local frontend:
   ```
   npm start
   ```

## Development

This project uses the Motoko programming language, which is specifically designed for the Internet Computer. The canisters follow the actor model and leverage orthogonal persistence for state management.

## License

This project is licensed under the MIT License - see the LICENSE file for details.