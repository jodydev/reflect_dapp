// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

interface IFaucetToken {
  function mint(address, uint256) external returns (bool);
}

contract Faucet {
    /// @notice Creates `_amount` token to `_to`. Must only be called by the authorized.
    function mint(address token, uint256 _amount) external returns (bool) {
        IFaucetToken(token).mint(msg.sender, _amount);
        return true;
    }
}