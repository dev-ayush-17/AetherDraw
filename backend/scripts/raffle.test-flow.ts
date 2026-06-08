import { network } from "hardhat";

async function main() {
    const connection = await network.connect();
    const { ethers } = connection;

    const [player] = await ethers.getSigners();

    console.log("Player:", await player.getAddress());

    const raffleAddress = "PASTE_DEPLOYED_RAFFLE_ADDRESS";

    const raffle = await ethers.getContractAt(
        "Raffle",
        raffleAddress
    );

    const tx = await raffle.enterRaffle({
        value: ethers.parseEther("0.01"),
    });

    await tx.wait();

    console.log("Entered raffle 🎟️");
}

main().catch(console.error);