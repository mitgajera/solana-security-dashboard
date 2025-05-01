# Solana Security Dashboard

A real-time visualization platform for tracking and analyzing security incidents in the Solana ecosystem.

## Features

- **Real-time Transaction Monitoring**: Monitor Solana blockchain for suspicious transactions
- **Exploit Database**: Comprehensive history of past security incidents
- **Analytics**: Advanced data visualization of security metrics
- **Live Alerts**: Real-time security notifications

## Getting Started

### Prerequisites

- Node.js 18+ and npm/bun
- Supabase account for the database
- Helius API key for Solana RPC access

### Installation

1. Clone the repository
    ```bash
    git clone https://github.com/yourusername/solana-security-dashboard.git
    cd solana-security-dashboard
    ```

2. Install dependencies
    ```bash
    npm install
    # or
    bun install
    ```

3. Set up environment variables
    ```bash
    cp .env.example .env
    # Edit .env with your Supabase and Helius credentials
    ```

### Configuration

1. Create a Supabase project and set up the required tables
2. Obtain a Helius API key from [helius.xyz](https://helius.xyz)
3. Configure environment variables in your `.env` file

## Usage

1. Start the development server
    ```bash
    npm run dev
    # or
    bun run dev
    ```

2. Navigate to `http://localhost:3000` in your browser

## Deployment

1. Build the application
    ```bash
    npm run build
    # or
    bun run build
    ```

2. Deploy to your preferred hosting service (Vercel, Netlify, etc.)

## Architecture

The dashboard uses a modern stack:
- Frontend: React/Next.js
- Database: Supabase (PostgreSQL)
- Blockchain Data: Helius API
- Authentication: Supabase Auth

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

