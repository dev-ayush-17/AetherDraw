export interface NetworkConfigItem {
    name: string;
    entranceFee: bigint;
    interval: number;
    keyHash: string;
    callbackGasLimit: number;
    vrfCoordinator?: string;
}

import { network } from "hardhat";
const { ethers } = await network.connect();

export const networkConfig:
    Record<number, NetworkConfigItem> = {
        31337: {
            name: "localhost",
            entranceFee: ethers.parseEther("0.01"),
            interval: 30,
            keyHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
            callbackGasLimit: 500000,
        },
        11155111: {
            name: "sepolia",
            entranceFee: ethers.parseEther("0.01"),
            vrfCoordinator: "0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B",
            interval: 30,
            keyHash: "0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae",
            callbackGasLimit: 500000,
        },
};

export const developmentChains = [
    "hardhat", "localhost", "default"
];
    
