import { expect } from "chai";
import { network } from "hardhat";
import { RequestedRaffleWinnerEvent } from "../../types/ethers-contracts/Raffle.js";

const connection = await network.connect();
const { ethers } = connection;


describe ("Raffle", function() {
    async function deployRaffleFixture() {
        const entranceFee = ethers.parseEther("0.01");

        const Raffle = await ethers.getContractFactory("Raffle");
        const MockVRF = await ethers.getContractFactory(
            "MockVRFCoordinatorV2Plus"
        );
        const mockVRF = await MockVRF.deploy();

        const raffle = await Raffle.deploy(
            entranceFee,
            /*interval*/
            30,
            /*vrf coordinator*/
            await mockVRF.getAddress(),
            /*key hash */
            ethers.ZeroHash,
            /*subscription id */
            1,
            /* callbackGasLimit */
            500000
        );

        return { raffle, entranceFee, mockVRF };
    }

    describe ("constructor", function() {
        it("initializes the raffle correctly", async function () {
            const { raffle, entranceFee } =
            await deployRaffleFixture();
            
            expect (
                await raffle.getEntranceFee()
            ).to.equal(entranceFee);

            expect(
                await raffle.getNumberOfPlayers()
            ).to.equal(0);

            expect(
                await raffle.getRaffleState()
            ).to.equal(0);
        });
    });

    describe ("enterRaffle", function() {


        it("reverts when not enough ETH is sent", async function () {
            const { raffle } = await deployRaffleFixture();

            await expect(
                raffle.enterRaffle()
            ).to.be.revertedWithCustomError(
                raffle, "Raffle_NotEnoughETHEntered"
            );
        });


        it("records player when they enter", async function () {
            const { raffle, entranceFee } = await deployRaffleFixture();

            await raffle.enterRaffle({
                value: entranceFee, 
            });
            const player = await raffle.getPlayer(0);
            const [ deployer ] = await ethers.getSigners();

            expect(player).to.equal(
                deployer.address
            );
        });


        it("checks if the event was triggered", async function () {
            const { raffle, entranceFee }= await deployRaffleFixture();
            const [ deployer ] = await ethers.getSigners();

            await expect(
                raffle.enterRaffle({
                    value: entranceFee,
                })
            ).to.emit(
                raffle, "RaffleEnter"
            ).withArgs(deployer.address);
        });
    });

    describe ("checkUpKeep", function() {

        it("returns if there are no players", async function () {
            const { raffle } = await deployRaffleFixture();
            await connection.provider.request({
                method: "evm_increaseTime",
                params: [31],
            });

            await connection.provider.request({
                method: "evm_mine",
                params: [],
            });

            const [upKeepNeeded] = await raffle.checkUpkeep("0x");
            expect(upKeepNeeded).to.equal(false);
        });

        it("returns if not enough time has passed", async function () {
            const { raffle, entranceFee } = await deployRaffleFixture();
            await raffle.enterRaffle({
                value: entranceFee,
            });

            const [upKeepNeeded] = await raffle.checkUpkeep("0x");
            expect(upKeepNeeded).to.equal(false);
        });

        it("returns true when all conditions are met", async function () {
            const { raffle, entranceFee } = await deployRaffleFixture();
            await raffle.enterRaffle({
                value: entranceFee,
            });

            await connection.provider.request({
                method: "evm_increaseTime",
                params: [31],
            });
            await connection.provider.request({
                method: "evm_mine",
                params: [],
            });

            const [upKeepNeeded] = await raffle.checkUpkeep("0x");

            expect(upKeepNeeded).to.equal(true);
        });

        it("returns if raffle is not open", async function () {
            const { raffle, entranceFee } = await deployRaffleFixture();
            await raffle.enterRaffle({
                value: entranceFee,
            });

            await connection.provider.request({
                method: "evm_increaseTime",
                params: [31],
            });
            await connection.provider.request({
                method: "evm_mine",
                params: [],
            });

            await raffle.performUpkeep("0x");
            const [upKeepNeeded] = await raffle.checkUpkeep("0x");

            expect(upKeepNeeded).to.equal(false);
        });
    });

    describe("performUpKeep", function() {

        it("reverts if checkUpKeep false", async function () {
            const { raffle } = await deployRaffleFixture();
            await expect(
                raffle.performUpkeep("0x")
            ).to.be.revertedWithCustomError(
                raffle, "Raffle__UpkeepNotNeeded"
            )
            .withArgs(
                0, 0 , 0
            );
        });

        it("updates raffle state for calculating", async function () {
            const { raffle, entranceFee } = await deployRaffleFixture();
            await raffle.enterRaffle({
                value: entranceFee,
            });

            await connection.provider.request({
                method: "evm_increaseTime",
                params: [31]
            })
            await connection.provider.request({
                method: "evm_mine",
                params: []
            });

            await raffle.performUpkeep("0x");
            expect(
                await raffle.getRaffleState()
            ).to.equal(1);
        });

        it("emits a request id when performing upkeep", async function () {
            const { raffle, entranceFee } = await deployRaffleFixture();
            await raffle.enterRaffle({
                value: entranceFee
            });

            await connection.provider.request({
                method: "evm_increaseTime",
                params: [31]
            })
            await connection.provider.request({
                method: "evm_mine",
                params: []
            });

            await expect(
                raffle.performUpkeep("0x")
            ).to.emit(
                raffle, "RequestedRaffleWinner"
            ).withArgs(1);
        })
    });

    describe("fulfillRandomWords", function() {

        it("reverts if the request doesn't exist", async function () {
            const { raffle, entranceFee, mockVRF } = await deployRaffleFixture();
            
            await expect(
                mockVRF.fulfillRandomWords(
                    1, await raffle.getAddress()
                )
            ).to.be.revertedWithCustomError(
                mockVRF, "InvalidRequest"
            );
        });

        it("picks a winner, resets the raffle and send money", async function () {
            const { raffle, entranceFee, mockVRF } = await deployRaffleFixture();

            const signers = await ethers.getSigners();
            for (let i=0; i<4; i++) {
                await raffle.connect(signers[i]).enterRaffle({
                    value: entranceFee,
                })
            }
            const startingTimeStamp = await raffle.getLastTimeStamp();

            await connection.provider.request({
                method: "evm_increaseTime",
                params:[31]
            });
            await connection.provider.request({
                method: "evm_mine", 
                params: []
            });

            await raffle.performUpkeep("0x");
            const winnerStartingBalance = await ethers.provider.getBalance(
                signers[1].address
            );

            await mockVRF.fulfillRandomWords(
                1, await raffle.getAddress()
            );

            const winnerEndingBalance = await ethers.provider.getBalance(
                signers[1].address
            )
            const endingTimeStamp = await raffle.getLastTimeStamp();
            const prize = entranceFee * 4n;

            expect(
                await raffle.getRecentWinner()
            ).to.equal(
                signers[1].address
            );
            expect(
                await raffle.getRaffleState()
            ).to.equal(0);
            expect(
                await raffle.getNumberOfPlayers()
            ).to.equal(0);
            expect(
                endingTimeStamp
            ).to.be.greaterThan(
                startingTimeStamp
            );
            expect(
                winnerEndingBalance
            ).to.equal(
                winnerStartingBalance + prize
            )
        });
    });
});
