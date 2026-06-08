// SPDX-License-Identifier: MIT

pragma solidity ^0.8.25;

import {VRFV2PlusClient} from "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";
import {VRFConsumerBaseV2Plus} from "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";

error InvalidRequest();

contract MockVRFCoordinatorV2Plus {
    uint256 private s_requestId;
    mapping(uint256 => bool) private s_requests;

    function requestRandomWords(
        VRFV2PlusClient.RandomWordsRequest calldata
    ) external returns (uint256 requestId) {
        s_requestId++;
        s_requests[s_requestId] = true;
        return s_requestId;
    }

    function fulfillRandomWords(
        uint256 requestId, address raffle
    ) external {
        if (!s_requests[requestId]) {
            revert InvalidRequest();
        }

        uint256[] memory randomWords = new uint256[](1);

        randomWords[0] = 777;

        VRFConsumerBaseV2Plus(raffle)
            .rawFulfillRandomWords(
                requestId, randomWords
            );
    }
}