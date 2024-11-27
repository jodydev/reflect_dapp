
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract XGrand is ERC20, Ownable {
    using SafeERC20 for IERC20;

    address public immutable underlying = 0x0000000000000000000000000000000000000000;
    IERC20 public grand;

    mapping(address => bool) public authorized;

    constructor(address grandAddress) ERC20("xGrand", "$xGB") Ownable(msg.sender){
        grand = IERC20(grandAddress);
    }

    /// @notice Creates `_amount` token to `_to`. Must only be called by the authorized.
    function mint(address _to, uint256 _amount) public returns (bool) {
        require(authorized[msg.sender], "Not authorized");
        _mint(_to, _amount);
        return true;
    }

    function burn(address _from, uint256 _amount) public returns (bool) {
        require(authorized[msg.sender], "Not authorized");
        _burn(_from, _amount);
        return true;
    }

    function addAuthorized(address _toAdd) public onlyOwner {
        authorized[_toAdd] = true;
    }

    function removeAuthorized(address _toRemove) public onlyOwner {
        authorized[_toRemove] = false;
    }

    function depositGrand(uint256 _amount) public {
        uint256 totalGrand = grand.balanceOf(address(this));
        uint256 totalIvy = totalSupply();
        if (totalIvy == 0 || totalGrand == 0) {
            _mint(msg.sender, _amount);
        } else {
            uint256 amount = (_amount * totalIvy) / totalGrand;
            _mint(msg.sender, amount);
        }
        grand.safeTransferFrom(msg.sender, address(this), _amount);
    }

    function burnXGrand(uint256 _amount) public {
        uint256 grandToReturn = (_amount * grand.balanceOf(address(this))) /
            totalSupply();
        _burn(msg.sender, _amount);
        grand.safeTransfer(msg.sender, grandToReturn);
    }
}


