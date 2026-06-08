import { network } from "hardhat";

async function main() {
    const connection =
        await network.connect();

    console.log(
        "Chain ID:",
        connection.networkConfig.chainId
    );

    console.log(
        "Network Name:",
        connection.networkName
    );
}

main().catch(console.error);