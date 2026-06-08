//SPDX-License-Identifier: MIT

pragma solidity ^0.8.25;

import {VRFConsumerBaseV2Plus} from "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";

import {VRFV2PlusClient} from "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";

import {IVRFCoordinatorV2Plus} from "@chainlink/contracts/src/v0.8/vrf/dev/interfaces/IVRFCoordinatorV2Plus.sol";

error Raffle_NotEnoughETHEntered();
error Raffle_RaffleNotOpen();
error Raffle__UpkeepNotNeeded(
    uint256 currentBalance,
    uint256 numPlayers,
    uint256 raffleState
);
error Raffle__TransferFailed();

contract Raffle is VRFConsumerBaseV2Plus{

    uint256 private immutable i_entranceFee;
    address payable[] private s_players;
    bytes32 private immutable i_keyHash;
    uint256 private immutable i_subscriptionId;
    uint32 private immutable i_callbackGasLimit;
    uint16 private constant REQUEST_CONFIRMATIONS = 3;
    uint32 private constant NUM_WORDS = 1;
    IVRFCoordinatorV2Plus private immutable i_vrfCoordinator;
    uint256 private immutable i_interval;
    uint256 private s_lastTimeStamp;
    address private s_recentWinner;

    enum RaffleState { 
        OPEN,
        CALCULATING
    }

    /* Events */
    event RaffleEnter(address indexed player);

    event RequestedRaffleWinner(
        uint256 indexed requestId
    );

    event WinnerPicked(
        address indexed winner
    );

    RaffleState private s_raffleState;

    constructor (
        uint256 entranceFee,
        uint256 interval,
        address vrfCoordinator,
        bytes32 keyHash,
        uint256 subscriptionId,
        uint32 callbackGasLimit
    ) 
    VRFConsumerBaseV2Plus(vrfCoordinator){
        i_entranceFee = entranceFee;
        i_vrfCoordinator = IVRFCoordinatorV2Plus(vrfCoordinator);
        i_callbackGasLimit = callbackGasLimit;
        i_subscriptionId = subscriptionId;
        i_keyHash = keyHash;
        i_interval = interval;
        s_lastTimeStamp = block.timestamp;
        s_raffleState = RaffleState.OPEN;
    }

    //function to enter the raffle
    function enterRaffle () public payable {
        //require msg.value > i_entranceFee
        if (msg.value < i_entranceFee) {
            revert Raffle_NotEnoughETHEntered();
        }

        if (s_raffleState != RaffleState.OPEN) {
            revert Raffle_RaffleNotOpen();
        }

        s_players.push(payable(msg.sender));
        //Emit an update when we update a dynamic array or mapping 
        emit RaffleEnter(msg.sender);
    }
          
    function getPlayer (uint256 index) public view returns (address) {
        return s_players[index];
    }


    function checkUpkeep(
        bytes memory
    )
        public
        view
        returns (
            bool upkeepNeeded,
            bytes memory
        )
    {
        bool isOpen =
            s_raffleState == RaffleState.OPEN;

        bool timePassed =
            (block.timestamp - s_lastTimeStamp)
                >= i_interval;

        bool hasPlayers =
            s_players.length > 0;

        bool hasBalance =
            address(this).balance > 0;

        upkeepNeeded =
            (
                isOpen &&
                timePassed &&
                hasPlayers &&
                hasBalance
            );

        return (upkeepNeeded, "0x0");
    }

    function performUpkeep(
        bytes calldata
    ) external {
        (
            bool upkeepNeeded,

        ) = checkUpkeep("");

        if (!upkeepNeeded) {
            revert Raffle__UpkeepNotNeeded(
                address(this).balance,
                s_players.length,
                uint256(s_raffleState)
            );
        }

        s_raffleState =
            RaffleState.CALCULATING;

        uint256 requestId =
        i_vrfCoordinator.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest({
                keyHash: i_keyHash,
                subId: i_subscriptionId,
                requestConfirmations: REQUEST_CONFIRMATIONS,
                callbackGasLimit: i_callbackGasLimit,
                numWords: NUM_WORDS,
                extraArgs: VRFV2PlusClient._argsToBytes(
                    VRFV2PlusClient.ExtraArgsV1({
                        nativePayment: false
                    })
                )
            })
        );

        emit RequestedRaffleWinner(requestId);
    }

    function fulfillRandomWords(
        uint256,
        uint256[] calldata randomWords
    ) internal override {
        uint256 winnerIndex =
            randomWords[0] % s_players.length;

        address payable recentWinner =
            s_players[winnerIndex];

        s_recentWinner = recentWinner;

        s_raffleState = RaffleState.OPEN;

        s_players = new address payable[](0);

        s_lastTimeStamp = block.timestamp;

        (bool success, ) =
            recentWinner.call{
                value: address(this).balance
            }("");

        if (!success) {
            revert Raffle__TransferFailed();
        }

        emit WinnerPicked(recentWinner);
    }

    function getEntranceFee() public view returns (uint256) {
        return i_entranceFee;
    }

    function getRecentWinner() public view returns (address) {
        return s_recentWinner;
    }

    function getRaffleState() public view returns (RaffleState) {
        return s_raffleState;
    }

    function getNumberOfPlayers() public view returns (uint256) {
        return s_players.length;
    }

    function getLastTimeStamp() public view returns (uint256) {
        return s_lastTimeStamp;
    }
    
}