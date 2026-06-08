import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "viem/chains";

export const config  = getDefaultConfig({
    appName: "Smart Lottery",
    projectId: "fd40802d584903daec11676a021091a2",
    chains: [sepolia],
});