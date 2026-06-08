import { network } from "hardhat";
import { networkConfig, developmentChains } from "../helper.hardhat.config.js";


async function main() {
    const connection = await network.connect();
    const { ethers }= connection;

    console.log("networkName:", connection.networkName);
    console.log("networkConfig:", connection.networkConfig);
    console.log("chainId raw:", connection.networkConfig.chainId);
    const [deployer] = await ethers.getSigners();

    console.log("Deployer:", deployer.address);

    const balance = await ethers.provider.getBalance(deployer.address);

    console.log("Balance:", ethers.formatEther(balance), "ETH");

    const blockNumber = await ethers.provider.getBlockNumber();
console.log("Block Number:", blockNumber);

const Network = await ethers.provider.getNetwork();
console.log("Chain ID:", Network.chainId);

    const networkName = connection.networkName;
    const chainId = 
        networkName === "sepolia" ? 11155111 : 31337;
    const config = networkConfig[chainId];

    if (!config) {
        throw new Error(`No config for chainId: ${chainId}`);
    }

    const isLocal = networkName === "hardhatMainnet" || networkName === "hardhatOp";

    console.log("Deploying on: ", networkName);

    let vrfCoordinatorAddress: string;

    // 🧪 If local network → deploy mock
    if (isLocal) {
        const MockVRF = await ethers.getContractFactory(
            "MockVRFCoordinatorV2Plus"
        );

        const mock = await MockVRF.deploy();
        await mock.waitForDeployment();

        vrfCoordinatorAddress = await mock.getAddress();

        console.log("Mock VRF deployed:", vrfCoordinatorAddress);
    } 
    // 🌐 If testnet → use real VRF coordinator
    else {
        if(!config.vrfCoordinator) {
            throw new Error("VRF Coordinator not set for this network")
        }
        vrfCoordinatorAddress = config.vrfCoordinator;

        console.log("Using real VRF coordinator:", vrfCoordinatorAddress);
    }

    const Raffle = await ethers.getContractFactory("Raffle");
    const subscriptionId = BigInt(
        process.env.VRF_SUBSCRIPTION_ID || "1"
    )

    const raffle = await Raffle.deploy(
        config.entranceFee,
        config.interval,
        vrfCoordinatorAddress,
        config.keyHash,
        subscriptionId, // subscriptionId (update later for real VRF)
        config.callbackGasLimit
    );

    await raffle.waitForDeployment();

    console.log("Raffle deployed to:", await raffle.getAddress());

    if (!isLocal) {
        const vrf = await ethers.getContractAt(
            "VRFCoordinatorV2Plus",
            vrfCoordinatorAddress
        );
        await vrf.addConsumer(subscriptionId, raffle.target);
        console.log("Added raffle as VRF consumer")
    }
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });