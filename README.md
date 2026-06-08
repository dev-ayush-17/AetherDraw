# 🎟️ Aether Draw (Blockchain Raffle DApp)

A full-stack, decentralized, and transparent Smart Lottery application. This project combines a secure Solidity smart contract backend with a modern, high-fidelity Web3 frontend architecture. Users can enter open raffle pools with verifiably fair mechanics, ensuring absolute trust and automation without centralized intermediaries.

---

## 🚀 Features

* **🎲 Fully Decentralized Engine:** Core lottery logic execution managed entirely via secure Ethereum smart contracts.
* **🔐 Tamper-Proof Selection:** Cryptographically secure, un-riggable winner selection logic.
* **💸 Crypto-Native Entry System:** Seamless entry processing through standard EVM transaction flows.
* **🧾 Automated Prize Distribution:** Immediate, programmatic routing of the jackpot pool to the drawn winner's wallet.
* **🖥️ High-Fidelity Interface:** Modern user layout built with Next.js, TypeScript, and fully compiled Tailwind CSS.
* **📊 Real-Time Event Tracking:** Instant UI updates monitoring raffle statuses, entry ticket states, and live pools.

---

## 🏗️ Tech Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend Framework** | Next.js (React), TypeScript |
| **Styling Architecture** | Tailwind CSS, Lucide Icons |
| **Smart Contracts** | Solidity, Hardhat Environment |
| **Blockchain Client Utilities** | Wagmi, Viem |
| **Wallet Onboarding** | RainbowKit, Injected Providers (MetaMask) |

---

## 🧠 How It Works

1. **Wallet Integration:** Users securely authenticate using their preferred Web3 wallet via RainbowKit.
2. **Ticket Procurement:** Entrants submit a transaction to the smart contract matching the defined ticket price.
3. **Immutable Entry Registry:** Tickets are processed and securely registered on-chain via contract events.
4. **Drawing Mechanics:** Once fulfillment conditions are satisfied, a secure winner selection routine is executed.
5. **Settlement Layer:** The smart contract automatically transfers the accrued jackpot directly to the selected wallet address.

---

## 📁 Repository Structure

```text
Smart_Lottery/
├── contracts/          # Solidity Smart Contracts (Hardhat workspace)
├── scripts/            # Deployment and automation scripts
├── test/               # Smart contract test suites
├── frontend/           # Next.js client application
│   ├── app/            # App router layout and page components
│   ├── components/     # Reusable UI elements (Navbar, Footer, Buttons)
│   └── public/         # Static assets and favicons
└── README.md           # Documentation

## ⚙️ Installation & Setup

### 1. Clone the Repository
Clone the codebase to your local machine:
```bash
git clone [https://github.com/YOUR_USERNAME/Smart_Lottery.git](https://github.com/YOUR_USERNAME/Smart_Lottery.git)
cd Smart_Lottery
2. Smart Contract Protocol (Backend Setup)
Navigate into the root directory to compile your contract development artifacts and prepare them for deployment:

Bash
# Install hardhat dependencies (if needed)
npm install

# Compile development artifacts
npx hardhat compile

# Deploy logic parameters to target local or test network
npx hardhat run scripts/deploy.js --network <network-name>

3. Frontend Dashboard Setup
Navigate into the frontend folder, install the Next.js dependencies, and spin up the local development server:

Bash
cd frontend
npm install
npm run dev
The client dashboard will instantiate natively at: http://localhost:3000

4. Environment Configuration
Create a .env file in your root backend directory and a .env.local inside your frontend directory to safely secure your network configurations:

# Backend Hardhat Keys (.env)
RPC_URL=your_rpc_node_url
PRIVATE_KEY=your_wallet_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key

# Frontend Configurations (.env.local)
NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address
```

---

## 📸 UI Overview
**Raffle Control Dashboard:** Main view displaying active lottery pools, current participants, and ticket entry counts.

**Web3 Onboarding Hub:** Secure wallet connection portal displaying network parameters and active account details.

**Live Telemetry:** Event listeners rendering live transaction status updates directly from contract blocks.

**Historical Outcomes:** Dedicated presentation module showcasing chronological winning drawings and metrics.

---

## 🧠 How It Works
**Wallet Integration:** Users securely authenticate using their preferred Web3 wallet via RainbowKit.

**Ticket Procurement:** Entrants submit a transaction to the smart contract matching the defined ticket price.

**Immutable Entry Registry:** Tickets are processed and securely registered on-chain via contract events.

**Drawing Mechanics:** Once fulfillment conditions are satisfied, a secure winner selection routine is executed using verifiable randomness.

**Settlement Layer:** The smart contract automatically transfers the accrued jackpot directly to the selected wallet address.

---

## ⚠️ Disclaimer
This repository is configured primarily for educational and demonstration purposes. Do not deploy these un-audited contracts or interfaces directly to a production mainnet environment without exhaustive security review and formal protocol auditing.
