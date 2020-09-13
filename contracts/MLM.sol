//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.20;

contract MLM {
    address public ownerWallet;
    uint256 public totalUsers;
    uint256 public rewardWallet;
    uint256 public levelRewardWallet;
    uint256 public ownerAmount;
    uint256 public totalAmountDistributed;
    address[] public levelWinners;
    uint256 public allLevelPrice;
    struct User {
        uint256 id;
        address inviter;
        uint256 totalReferals;
        uint256 totalWins;
        uint256 totalRecycles;
        uint256 levelsPurchased;
        uint256 upline;
        address[] uplines;
        address[] referral;
        uint256[] referralsIds;
        bool isExist;
        uint256 loss;
        bool getLevelReward;
        uint256[] usersAtLevels;
    }

    struct LevelMembers {
        address add;
        uint256[] level1;
        uint256[] level2;
        uint256[] level3;
        uint256[] level4;
        uint256[] level5;
        uint256[] level6;
        uint256[] level7;
        uint256[] level8;
        uint256[] level9;
        uint256[] level10;
    }
    struct UserIncomes {
        uint256 directIncome;
        uint256 rewardIncome;
        uint256 levelIncome;
        uint256 recycleIncome;
        uint256 upgradeIncome;
        uint256 levelRewardIncome;
    }

    struct UserFunds {
        uint256 recycleFund;
        uint256 levelFund;
        bool[10] levelsLoss;
    }

    uint256[] public levels;

    mapping(address => User) public users;
    mapping(address => UserIncomes) public usersIncomes;
    mapping(address => UserFunds) public usersFund;
    mapping(uint256 => address) public users_ids;
    mapping(uint256 => LevelMembers) public levelMembers;

    event Register(address indexed addr, uint256 inviter, uint256 id);
    event buyLevelEvent(address indexed _user, uint256 _level);
    event distributeRewardEvent(uint256 _add1, uint256 _add2, uint256 _add3);
    event distributeLevelRewardEvent();

    constructor() public {
        totalUsers = 0;
        ownerWallet = msg.sender;
        levels.push(500000000);
        levels.push(200000000);
        levels.push(300000000);
        levels.push(400000000);
        levels.push(500000000);
        levels.push(600000000);
        levels.push(700000000);
        levels.push(800000000);
        levels.push(900000000);
        levels.push(1000000000);
        levels.push(1100000000);
        newUser(msg.sender, address(0));
        users[msg.sender].levelsPurchased = 10;
        users[msg.sender].referral = new address[](0);
        users[msg.sender].upline = 0;
        users[msg.sender].uplines = new address[](0);
    }

    function newUser(address _addr, address _inviter) private {
        totalUsers++;
        users[_addr].id = totalUsers;
        users[_addr].inviter = _inviter;
        users_ids[totalUsers] = _addr;
        users[_addr].isExist = true;
        users[_addr].getLevelReward = false;
        users[msg.sender].levelsPurchased = 0;
        emit Register(_addr, users[_inviter].id, totalUsers);
    }

    function _register(
        address _user,
        address _inviter,
        uint256 _value
    ) private {
        require(users[_user].id == 0, "User arleady registered");
        require(users[_inviter].id != 0, "Inviter not registered");
        require(_value >= levels[0], "Insufficient funds");

        uint256 _level = users[_inviter].levelsPurchased + 1;

        rewardWallet += (levels[0] * 10) / 100;
        levelRewardWallet += (levels[0] * 10) / 100;

        uint256 referalMoney = (levels[0] * 80) / 100;
        usersIncomes[_inviter].directIncome += (referalMoney -
            (referalMoney * 20) /
            100);
        usersFund[_inviter].recycleFund += (referalMoney * 10) / 100;
        usersFund[_inviter].levelFund += (referalMoney * 10) / 100;
        users[_inviter].totalReferals++;

        if (users[_inviter].levelsPurchased < 10) {
            if (usersFund[_inviter].levelFund >= levels[_level]) {
                autoBuyLevel(_inviter);
            }
        }
        if (usersFund[_inviter].recycleFund >= levels[0]) {
            recycleId(_inviter);
        }
        address(uint256(_inviter)).transfer(
            referalMoney - (referalMoney * 20) / 100
        );
        totalAmountDistributed += (referalMoney - (referalMoney * 20) / 100);

        newUser(_user, _inviter);
    }

    function register(uint256 _inviter_id) external payable {
        _register(msg.sender, users_ids[_inviter_id], msg.value);
        address add;
        uint256 id = _inviter_id;
        if (users[users_ids[_inviter_id]].referral.length >= 4) {
            add = findFreeReferrer(users_ids[_inviter_id]);
            id = users[add].id;
        }
        users[users_ids[id]].referral.push(msg.sender);
        users[users_ids[id]].referralsIds.push(users[msg.sender].id);
        users[msg.sender].upline = id;

        uint256 uid = id;
        levelMembers[uid].level1.push(totalUsers);

        if (uid != 0) {
            uid = users[users_ids[uid]].upline;
            levelMembers[uid].level2.push(totalUsers);
        }
        if (uid != 0) {
            uid = users[users_ids[uid]].upline;
            levelMembers[uid].level3.push(totalUsers);
        }

        if (uid != 0) {
            uid = users[users_ids[uid]].upline;
            levelMembers[uid].level4.push(totalUsers);
        }

        if (uid != 0) {
            uid = users[users_ids[uid]].upline;
            levelMembers[uid].level5.push(totalUsers);
        }

        if (uid != 0) {
            uid = users[users_ids[uid]].upline;
            levelMembers[uid].level6.push(totalUsers);
        }

        if (uid != 0) {
            uid = users[users_ids[uid]].upline;
            levelMembers[uid].level7.push(totalUsers);
        }

        if (uid != 0) {
            uid = users[users_ids[uid]].upline;
            levelMembers[uid].level8.push(totalUsers);
        }

        if (uid != 0) {
            uid = users[users_ids[uid]].upline;
            levelMembers[uid].level9.push(totalUsers);
        }

        if (uid != 0) {
            uid = users[users_ids[uid]].upline;
            levelMembers[uid].level10.push(totalUsers);
        }
    }

    function buyLevelHelper(uint256 _level) public {
        usersFund[msg.sender].levelsLoss[_level - 1] = false;
        uint256 upgradeAmount = (levels[_level] * 20) / 100;
        address _inviter = users[msg.sender].inviter;
        usersIncomes[_inviter].levelIncome += (upgradeAmount -
            (20 * upgradeAmount) /
            100);
        usersFund[_inviter].recycleFund += (10 * upgradeAmount) / 100;
        usersFund[_inviter].levelFund += (10 * upgradeAmount) / 100;
        uint256 level = users[_inviter].levelsPurchased + 1;

        if (users[_inviter].levelsPurchased < 10) {
            if (usersFund[_inviter].levelFund >= levels[level]) {
                autoBuyLevel(_inviter);
            }
        }

        if (usersFund[_inviter].recycleFund >= levels[0]) {
            recycleId(_inviter);
        }

        totalAmountDistributed += (upgradeAmount - (20 * upgradeAmount) / 100);
        distributeLevelUpgradeAmount(_level, msg.sender);
    }

    function buyLevel(uint256 _level) public payable {
        require(
            _level > users[msg.sender].levelsPurchased,
            "Already purchased level"
        );
        require(users[msg.sender].isExist, "User not exist");
        require(_level > 0 && _level <= 10, "Incorrect level");
        require(msg.value == levels[_level], "Incorrect Value");
        require(
            users[msg.sender].levelsPurchased == _level - 1,
            "You haven't purchased previous level yet"
        );
        uint256 upgradeAmount = (levels[_level] * 20) / 100;
        buyLevelHelper(_level);
        address(uint256(users[msg.sender].inviter)).transfer(
            upgradeAmount - (20 * upgradeAmount) / 100
        );
        if (users[msg.sender].levelsPurchased + 1 < 10)
            users[msg.sender].levelsPurchased += 1;

        emit buyLevelEvent(msg.sender, _level);
    }

    function buyAllLevels() public payable {
        require(users[msg.sender].isExist, "User not exist");
        uint256 price;
        uint256 level = users[msg.sender].levelsPurchased + 1;
        require(level <= 10, "incorrect level");
        for (uint256 i = level; i <= 10; i++) {
            price = price + levels[i];
        }

        require(msg.value == price, "Incorrect Value");

        users[msg.sender].levelsPurchased = 10;
        for (uint256 i = level; i <= 10; i++) {
            buyLevelHelper(i);
        }

        uint256 upgradeAmount = (20 * price) / 100;
        address(uint256(users[msg.sender].inviter)).transfer(
            upgradeAmount - (20 * upgradeAmount) / 100
        );

        totalAmountDistributed += (upgradeAmount - (20 * upgradeAmount) / 100);

        if (users[msg.sender].levelsPurchased + 1 < 10)
            users[msg.sender].levelsPurchased += 1;

        emit buyLevelEvent(msg.sender, 10);
    }

    function autoBuyLevel(address _user) public {
        uint256 _level = users[_user].levelsPurchased + 1;
        usersFund[_user].levelsLoss[_level - 1] = false;
        uint256 upgradeAmount = (levels[_level] * 20) / 100;
        address _inviter = users[_user].inviter;
        if (_inviter == address(0)) {
            ownerAmount += upgradeAmount;
        } else {
            usersIncomes[_inviter].levelIncome += (upgradeAmount -
                (20 * upgradeAmount) /
                100);
            usersFund[_inviter].recycleFund += (10 * upgradeAmount) / 100;
            usersFund[_inviter].levelFund += (10 * upgradeAmount) / 100;

            address(uint256(users[_user].inviter)).transfer(
                (upgradeAmount - (20 * upgradeAmount) / 100)
            );

            totalAmountDistributed += (upgradeAmount -
                (20 * upgradeAmount) /
                100);

            distributeLevelUpgradeAmount(_level, _user);
        }
        usersFund[_user].levelFund -= levels[_level];
        users[_user].levelsPurchased += 1;
    }

    function recycleId(address _user) public {
        if (usersFund[_user].recycleFund >= levels[0]) {
            usersFund[_user].recycleFund -= levels[0];
            users[_user].totalRecycles += 1;

            uint256 referalMoney = (levels[0] * 80) / 100;

            address _inviter = users[_user].inviter;
            if (_inviter == address(0)) {
                ownerAmount += referalMoney;
            }
            usersIncomes[_inviter].recycleIncome += (referalMoney -
                (referalMoney * 20) /
                100);
            usersFund[_inviter].recycleFund += (referalMoney * 10) / 100;
            usersFund[_inviter].levelFund += (referalMoney * 10) / 100;

            //owner Wallet
            if (_inviter == address(0)) {
                ownerAmount += referalMoney - (referalMoney * 20) / 100;
            } else {
                address(uint256(_inviter)).transfer(
                    referalMoney - (referalMoney * 20) / 100
                );
                totalAmountDistributed += (referalMoney -
                    (referalMoney * 20) /
                    100);
            }

            rewardWallet += (levels[0] * 10) / 100;
            levelRewardWallet += (levels[0] * 10) / 100;
        }
    }

    function distributeReward(
        uint256 _winner1,
        uint256 _winner2,
        uint256 _winner3
    ) public {
        require(
            _winner1 >= 1 && _winner2 >= 1 && _winner3 >= 1,
            "invalid winnerId"
        );
        uint256 first = (50 * rewardWallet) / 100;
        uint256 second = (30 * rewardWallet) / 100;
        uint256 third = (20 * rewardWallet) / 100;

        usersIncomes[users_ids[_winner1]].rewardIncome += (first -
            (20 * first) /
            100);
        usersIncomes[users_ids[_winner2]].rewardIncome += (second -
            (20 * second) /
            100);
        usersIncomes[users_ids[_winner3]].rewardIncome += (third -
            (20 * third) /
            100);

        address(uint256(users_ids[_winner1])).transfer(
            (first - (20 * first) / 100)
        );
        address(uint256(users_ids[_winner2])).transfer(
            (second - (20 * second) / 100)
        );
        address(uint256(users_ids[_winner3])).transfer(
            (third - (20 * third) / 100)
        );

        users[users_ids[_winner1]].totalWins += 1;
        users[users_ids[_winner2]].totalWins += 1;
        users[users_ids[_winner3]].totalWins += 1;

        totalAmountDistributed += ((first - (20 * first) / 100) +
            (second - (20 * second) / 100) +
            (third - (20 * third) / 100));

        rewardWallet = 0;

        usersFund[users_ids[_winner1]].recycleFund += (10 * first) / 100;
        usersFund[users_ids[_winner1]].levelFund += (10 * first) / 100;

        usersFund[users_ids[_winner2]].recycleFund += (10 * second) / 100;
        usersFund[users_ids[_winner2]].levelFund += (10 * second) / 100;

        usersFund[users_ids[_winner3]].recycleFund += (10 * third) / 100;
        usersFund[users_ids[_winner3]].levelFund += (10 * third) / 100;

        emit distributeRewardEvent(_winner1, _winner2, _winner3);
    }

    function distributeLevelReward() public {
        uint256 size = setLevelWinners();
        // uint256 size = levelWinners.length;
        uint256 totalprice = levelRewardWallet / size;
        uint256 price = totalprice - (20 * totalprice) / 100;
        uint256 recyclePrice = (10 * totalprice) / 100;
        uint256 levelPrice = (10 * totalprice) / 100;
        for (uint256 i = 0; i < size; i++) {
            if (levelWinners[i] == address(0)) {
                ownerAmount += totalprice;
            } else {
                address(uint256(levelWinners[i])).transfer(price);
                usersIncomes[levelWinners[i]].levelRewardIncome += price;

                usersFund[levelWinners[i]].recycleFund += recyclePrice;
                usersFund[levelWinners[i]].levelFund += levelPrice;
                totalAmountDistributed += price;
            }
        }
        levelRewardWallet = 0;

        emit distributeLevelRewardEvent();
    }

    function distributeLevelUpgradeAmount(uint256 _level, address _user)
        public
    {
        uint256 x = (levels[_level] * 8) / 100;
        uint256 y = (20 * x) / 100;
        uint256 price = (x - y);
        setUplines(users[_user].id);
        address[] memory uplines = new address[](10);
        uplines = users[_user].uplines;
        for (uint256 i = 0; i < 10; i++) {
            if (uplines[i] == address(0)) {
                ownerAmount += x;
            } else if (users[uplines[i]].levelsPurchased >= _level) {
                usersIncomes[uplines[i]].upgradeIncome += price;

                usersFund[uplines[i]].recycleFund += (10 * x) / 100;
                usersFund[uplines[i]].levelFund += (10 * x) / 100;

                if (users[uplines[i]].levelsPurchased < 10) {
                    if (usersFund[uplines[i]].levelFund >= levels[_level]) {
                        autoBuyLevel(uplines[i]);
                    }
                }
                if (usersFund[uplines[i]].recycleFund >= levels[0]) {
                    recycleId(uplines[i]);
                }

                address(uint256(uplines[i])).transfer(price);
                totalAmountDistributed += price;
            } else {
                users[uplines[i]].loss += x;
                usersFund[uplines[i]].levelsLoss[i] = true;
                ownerAmount += x;
            }
        }
    }

    function getUserInfo(uint256 _id)
        public
        view
        returns (
            address inviter,
            uint256 totalReferals,
            uint256 totalRecycles,
            uint256 totalWins,
            uint256 levelsPurchased,
            uint256 loss
        )
    {
        User memory user = users[users_ids[_id]];
        return (
            user.inviter,
            user.totalReferals,
            user.totalRecycles,
            user.totalWins,
            user.levelsPurchased,
            user.loss
        );
    }

    function getUsersIncomes(uint256 _id)
        public
        view
        returns (
            uint256 directIncome,
            uint256 rewardIncome,
            uint256 levelIncome,
            uint256 recycleIncome,
            uint256 upgradeIncome,
            uint256 levelRewardIncome
        )
    {
        return (
            usersIncomes[users_ids[_id]].directIncome,
            usersIncomes[users_ids[_id]].rewardIncome,
            usersIncomes[users_ids[_id]].levelIncome,
            usersIncomes[users_ids[_id]].recycleIncome,
            usersIncomes[users_ids[_id]].upgradeIncome,
            usersIncomes[users_ids[_id]].levelRewardIncome
        );
    }

    function getUsersFundsAndUserAddress(uint256 _id)
        public
        view
        returns (
            uint256 recycleFund,
            uint256 levelFund,
            address add
        )
    {
        return (
            usersFund[users_ids[_id]].recycleFund,
            usersFund[users_ids[_id]].levelFund,
            users_ids[_id]
        );
    }

    function withDrawlevelFund() public {
        require(
            users[msg.sender].levelsPurchased >= 10,
            "you cannot withdraw amount"
        );

        address(uint256(msg.sender)).transfer(usersFund[msg.sender].levelFund);

        usersFund[msg.sender].levelFund = 0;
    }

    function withdrawDistributionWallet() public {
        require(msg.sender == ownerWallet, "you are not owner");
        address(uint256(ownerWallet)).transfer(ownerAmount);
        totalAmountDistributed += ownerAmount;
        ownerAmount = 0;
    }

    function findFreeReferrer(address _user) public view returns (address) {
        if (users[_user].referral.length < 4) return _user;

        address[] memory referrals = new address[](30000);
        referrals[0] = users[_user].referral[0];
        referrals[1] = users[_user].referral[1];
        referrals[2] = users[_user].referral[2];
        referrals[3] = users[_user].referral[3];

        address freeReferrer;
        bool noFreeReferrer = true;

        for (uint256 i = 0; i < 30000; i++) {
            if (users[referrals[i]].referral.length == 4) {
                referrals[(i + 1) * 4] = users[referrals[i]].referral[0];
                referrals[(i + 1) * 4 + 1] = users[referrals[i]].referral[1];
                referrals[(i + 1) * 4 + 2] = users[referrals[i]].referral[2];
                referrals[(i + 1) * 4 + 3] = users[referrals[i]].referral[3];
            } else {
                noFreeReferrer = false;
                freeReferrer = referrals[i];
                break;
            }
        }

        require(!noFreeReferrer, "No Free Referrer");

        return freeReferrer;
    }

    function viewUserReferral(uint256 _id)
        public
        view
        returns (uint256[] memory)
    {
        return users[users_ids[_id]].referralsIds;
    }

    function setUplines(uint256 _id) internal {
        address[] memory uplinesLocal = new address[](10);
        uint256 userId = users[users_ids[_id]].upline;
        for (uint256 i = 0; i < 10; i++) {
            if (userId == 0) break;
            uplinesLocal[i] = users_ids[userId];
            userId = users[users_ids[userId]].upline;
        }
        users[users_ids[_id]].uplines = uplinesLocal;
    }

    function getUplines(uint256 _id) public view returns (address[] memory) {
        return users[users_ids[_id]].uplines;
    }

    function setLevelWinners() public returns (uint256) {
        address[] memory levelWinner = new address[](100);
        uint256 i;
        uint256 j = 0;
        for (i = 1; i <= totalUsers; i++) {
            if (
                users[users_ids[i]].referral.length == 4 &&
                users_ids[i] != address(0)
            ) {
                levelWinner[j++] = (users_ids[i]);
            }
        }
        levelWinners = levelWinner;
        return j;
    }

    function getLevelWinners() public view returns (address[] memory) {
        return levelWinners;
    }

    function getLevelsLoss(uint256 _id) public view returns (bool[] memory) {
        bool[] memory levelsLoss = new bool[](10);
        for (uint256 i = 0; i < 10; i++) {
            levelsLoss[i] = usersFund[users_ids[_id]].levelsLoss[i];
        }
        return levelsLoss;
    }

    function getLevelMembers(uint256 _id, uint256 _level)
        public
        view
        returns (uint256[] memory)
    {
        if (_level == 1) {
            return levelMembers[_id].level1;
        }
        if (_level == 2) {
            return levelMembers[_id].level2;
        }
        if (_level == 3) {
            return levelMembers[_id].level3;
        }
        if (_level == 4) {
            return levelMembers[_id].level4;
        }
        if (_level == 5) {
            return levelMembers[_id].level5;
        }
        if (_level == 6) {
            return levelMembers[_id].level6;
        }
        if (_level == 7) {
            return levelMembers[_id].level7;
        }
        if (_level == 8) {
            return levelMembers[_id].level8;
        }
        if (_level == 9) {
            return levelMembers[_id].level9;
        }
        if (_level == 10) {
            return levelMembers[_id].level10;
        }
    }

    function getLevelMembersCount(uint256 _id)
        public
        view
        returns (uint256[] memory)
    {
        uint256[] memory userCount = new uint256[](10);
        for (uint256 i = 0; i < 10; i++) {
            if (i == 0) {
                userCount[i] = levelMembers[_id].level1.length;
            }
            if (i == 1) {
                userCount[i] = levelMembers[_id].level2.length;
            }
            if (i == 2) {
                userCount[i] = levelMembers[_id].level3.length;
            }
            if (i == 3) {
                userCount[i] = levelMembers[_id].level4.length;
            }
            if (i == 4) {
                userCount[i] = levelMembers[_id].level5.length;
            }
            if (i == 5) {
                userCount[i] = levelMembers[_id].level6.length;
            }
            if (i == 6) {
                userCount[i] = levelMembers[_id].level7.length;
            }
            if (i == 7) {
                userCount[i] = levelMembers[_id].level8.length;
            }
            if (i == 8) {
                userCount[i] = levelMembers[_id].level9.length;
            }
            if (i == 9) {
                userCount[i] = levelMembers[_id].level10.length;
            }
        }
        return userCount;
    }
}

