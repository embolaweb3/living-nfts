## 🌐 Live Demo (NOT YET DEPLOYED, STILL IN DEVELOPMENT STAGE)


```markdown
# 🌱 LivingNFTs

**AI-Evolving Digital Collectibles on Zora Protocol**  
*NFTs that grow, adapt, and respond to the world around them*

[![Built with Zora SDK](https://img.shields.io/badge/powered_by-Zora_Protocol-blue)](https://docs.zora.co)


## ✨ Features

- **Dynamic Evolution**  
  NFTs change appearance based on:
  - Crypto market trends (ETH price)
  - Real-world weather data
  - Time-based triggers

- **AI-Powered Art**  
  Uses Stable Diffusion to generate unique evolved versions

- **On-Chain Provenance**  
  Full history of evolutions stored on Zora protocol

- **Collector Engagement**  
  Earn royalties when your evolved NFTs are traded

## 🛠 Tech Stack

| Layer               | Technology                          |
|---------------------|-------------------------------------|
| **Blockchain**      | Zora Protocol, ERC-1155             |
| **AI**              | Stable Diffusion, Replicate API     |
| **Frontend**        | Next.js, Tailwind CSS               |
| **Wallet**          | RainbowKit, Wagmi                   |
| **Storage**         | IPFS (via NFT.Storage)              |
| **Oracles**         | Chainlink (ETH price), WeatherAPI   |

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set environment variables**  
   Create `.env.local`:
   ```env
   NEXT_PUBLIC_ZORA_CONTRACT_ADDRESS=0xYourAddress
   REPLICATE_API_KEY=your_key
   WEATHERAPI_KEY=your_key
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

## 📖 Documentation

### Key Components

| File                | Purpose                                |
|---------------------|----------------------------------------|
| `/api/evolve.ts`    | Handles NFT evolution logic            |
| `lib/zora.ts`       | Zora SDK interactions                  |
| `components/NFTDisplay.tsx` | Animated evolution UI            |



## 🏆 Hackathon Highlights

- **Innovation**: First NFTs with real-time AI evolution
- **Zora Integration**: Full protocol SDK utilization
- **User Experience**: Seamless wallet-to-evolution flow


## 📜 License


---

**Made with ❤️ for the Zora Hackathon**  
[![Zora Logo](https://zora.co/favicon.ico)](https://zora.co)
```

