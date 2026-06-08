🎟️ Smart Lottery (Blockchain Raffle DApp)

A decentralized Smart Lottery application built with blockchain technology. Users can enter raffles, and winners are selected transparently using smart contract logic, ensuring fairness and trust without intermediaries.
🚀 Features
🎲 Decentralized lottery system powered by smart contracts
🔐 Transparent and tamper-proof winner selection
💸 Crypto-based entry system
🧾 Automatic prize distribution to winners
🖥️ Modern frontend built with Next.js + Tailwind CSS
⚡ Fast and responsive UI
📊 Real-time raffle status and entries tracking
🏗️ Tech Stack
Frontend -> Next.js (React) TypeScript Tailwind CSS
Blockchain -> Solidity Smart Contracts Ethereum / EVM-compatible network Hardhat
Other Tools -> Wagmi, Viem (for blockchain interaction) MetaMask, Rainbowkit(wallet integration)
⚙️ Installation & Setup
Clone the repository git clone cd Smart_Lottery
Install frontend dependencies cd frontend npm install
Run the frontend npm run dev
Frontend will be available at:
http://localhost:3000 🔗 Smart Contract Setup (if applicable)
Compile contracts:
npx hardhat compile
Deploy contracts:
npx hardhat run scripts/deploy.js --network
🧠 How It Works Users connect their wallet (MetaMask)
They enter the lottery by sending a transaction
Entries are recorded on-chain
After the entry period ends, a winner is selected
Prize is automatically sent to the winner wallet
📸 UI Overview Raffle dashboard showing active lottery
Entry system with wallet interaction
Live status updates
Winner display section
⚠️ Disclaimer This project is for educational and demonstration purposes. Do not use it in production without proper security audits.
