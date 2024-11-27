// SPDX-License-Identifier: MIT

pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface GrandToken is IERC20 {
    function mint(address _to, uint256 _amount) external;
}


// MasterGrand is the master of Grand Token.

contract MasterGrand is Ownable {
    using SafeERC20 for IERC20;
    using SafeERC20 for GrandToken;

    // Info of each user.
    struct UserInfo {
        uint256 amount; // How many LP tokens the user has provided.
        uint256 rewardDebt; // Reward debt. See explanation below.
    }

    // Info of each pool.
    struct PoolInfo {
        IERC20 lpToken; // Address of LP token contract.
        uint256 allocPoint; // How many allocation points assigned to this pool. Grand to distribute per block.
        uint256 lastRewardBlock; // Last block number that Grand distribution occurs.
        uint256 accGrandPerShare; // Accumulated Grand per share, times 1e12. See below.
    }

    // The Grand TOKEN!
    GrandToken public Grand;

    address public collector;
    // Block number when bonus Grand period ends.
    uint256 public bonusEndBlock;
    // Grand tokens created per block.
    uint256 public GrandPerBlock;
    // Bonus muliplier for early Grand makers.
    uint256 public constant BONUS_MULTIPLIER = 3;
    uint256 public constant GRAND_CAP = 4203333333333333333333333;
    uint256 public grandMinted;
    uint256 public totalBoxes = 0;

    // Info of each pool.
    PoolInfo[] public poolInfo;
    // Info of each Lockbox.

    // Info of each user that stakes LP tokens.
    mapping(uint256 => mapping(address => UserInfo)) public userInfo;
    // Total allocation poitns. Must be the sum of all allocation points in all pools.
    uint256 public totalAllocPoint = 0;
    // The block number when Grand mining starts.
    uint256 public startBlock;
    uint256 public startTime;

    event Deposit(address indexed user, address indexed lpAddress, uint256 indexed pid, uint256 amount);
    event Withdraw(address indexed user, address indexed lpAddress, uint256 indexed pid, uint256 amount);
    event EmergencyWithdraw(
        address indexed user,
        uint256 indexed pid,
        uint256 amount
    );

    constructor(
        GrandToken _Grand,
        uint256 _GrandPerBlock,
        uint256 _bonusEndBlock
    ) Ownable(msg.sender) {
        Grand = _Grand;
        GrandPerBlock = _GrandPerBlock;
        bonusEndBlock = _bonusEndBlock;
        startBlock = block.number;
        startTime = block.timestamp;
    }

    function poolLength() external view returns (uint256) {
        return poolInfo.length;
    }

    // Add a new lp to the pool. Can only be called by the owner.
    // DO NOT add the same LP token more than once. Rewards will be messed up if you do.
    function addPool(
        uint256 _allocPoint,
        IERC20 _lpToken,
        bool _withUpdate
    ) external onlyOwner {
        if (_withUpdate) {
            massUpdatePools();
        }

        totalAllocPoint = totalAllocPoint + _allocPoint;
        poolInfo.push(
            PoolInfo({
                lpToken: _lpToken,
                allocPoint: _allocPoint,
                lastRewardBlock: block.number,
                accGrandPerShare: 0
            })
        );
    }

    // Update the given pool's Grand allocation point. Can only be called by the owner.
    function setPool(
        uint256 _pid,
        uint256 _allocPoint,
        bool _withUpdate
    ) external onlyOwner {
        if (_withUpdate) {
            massUpdatePools();
        }
        totalAllocPoint =
            totalAllocPoint -
            poolInfo[_pid].allocPoint +
            _allocPoint;
        poolInfo[_pid].allocPoint = _allocPoint;
    }

    // Return reward multiplier over the given _from to _to block.
    function getMultiplier(uint256 _from, uint256 _to)
        public
        view
        returns (uint256)
    {
        if (_to <= bonusEndBlock) {
            return (_to - _from) * BONUS_MULTIPLIER;
        } else if (_from >= bonusEndBlock) {
            return _to - _from;
        } else {
            return
                (bonusEndBlock - _from) *
                BONUS_MULTIPLIER +
                (_to - bonusEndBlock);
        }
    }

    // Update reward vairables for all pools. Be careful of gas spending!
    function massUpdatePools() public {
        uint256 length = poolInfo.length;
        for (uint256 pid = 0; pid < length; ++pid) {
            updatePool(pid);
        }
    }

    // Update reward variables of the given pool to be up-to-date.
    function updatePool(uint256 _pid) public {
        PoolInfo storage pool = poolInfo[_pid];
        if (block.number <= pool.lastRewardBlock) {
            return;
        }

        uint256 lpSupply = pool.lpToken.balanceOf(address(this));
        if (lpSupply == 0) {
            pool.lastRewardBlock = block.number;
            return;
        }

        uint256 GrandReward = (getMultiplier(
            pool.lastRewardBlock,
            block.number
        ) *
            GrandPerBlock *
            pool.allocPoint) / totalAllocPoint;

        pool.accGrandPerShare =
            pool.accGrandPerShare +
            ((GrandReward * 1e12) / lpSupply);
        pool.lastRewardBlock = block.number;

        if (grandMinted <= GRAND_CAP) {
            grandMinted = grandMinted + GrandReward;
            Grand.mint(address(this), GrandReward);
        }
    }

    // Deposit LP tokens to MasterGrand for Grand allocation.
    function deposit(uint256 _pid, uint256 _amount) external {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];

        require(
            _amount <= pool.lpToken.allowance(msg.sender, address(this)),
            "Allowance not high enough"
        );
        pool.lpToken.safeTransferFrom(msg.sender, address(this), _amount);

        updatePool(_pid);

        uint256 pending = (user.amount * pool.accGrandPerShare) /
            1e12 -
            user.rewardDebt;
        user.amount = user.amount + _amount;

        if (block.timestamp > (startTime + 40 days) && pending > 0) {
            user.rewardDebt = (user.amount * pool.accGrandPerShare) / 1e12;
            Grand.safeTransfer(msg.sender, pending);
        } else {
            user.rewardDebt =
                (user.amount * pool.accGrandPerShare) /
                1e12 -
                pending;
        }

        emit Deposit(msg.sender, address(pool.lpToken), _pid, _amount);
    }

    // Withdraw LP tokens from MasterGrand.
    function withdraw(uint256 _pid, uint256 _amount) external {
        require(block.timestamp > (startTime + 40 days), "Too early");

        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];

        require(user.amount >= _amount, "withdraw: not good");

        updatePool(_pid);

        uint256 pending = (user.amount * pool.accGrandPerShare) /
            1e12 -
            user.rewardDebt;

        user.amount = user.amount - _amount;
        user.rewardDebt = (user.amount * pool.accGrandPerShare) / 1e12;

        Grand.safeTransfer(msg.sender, pending);
        pool.lpToken.safeTransfer(msg.sender, _amount);

        emit Withdraw(msg.sender, address(pool.lpToken), _pid, _amount);
    }

    // Withdraw without caring about rewards. EMERGENCY ONLY.
    function emergencyWithdraw(uint256 _pid) external {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];

        uint256 amount = user.amount;
        uint256 reward = user.rewardDebt;

        user.amount = 0;
        user.rewardDebt = 0;

        pool.lpToken.safeTransfer(msg.sender, amount);
        emit EmergencyWithdraw(msg.sender, _pid, reward);
    }
}