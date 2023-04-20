// SimpleStorage.sol
pragma solidity >=0.4.0 <0.9.0;


contract SimpleStorage {
    struct Funds {
        string name;
        string amount;
        string message;
        string date;
        string mode_of_payment;
        string userId;
        uint256 transactionId;
    }

    mapping(uint256 => Funds) funds;
    Funds[] public fundArray;
    Funds[] userFunds;

    uint storedData;

    function registerFunds(
        string memory name,
        string memory amount,
        string memory mode_of_payment,
        string memory date,
        string memory message,
        string memory userId
    ) public {
        Funds storage newFund = funds[500];
        newFund.name = name;
        newFund.message = message;
        newFund.amount = amount;
        newFund.date = date;
        newFund.mode_of_payment = mode_of_payment;
        newFund.userId = userId;
        newFund.transactionId = block.prevrandao;
        fundArray.push(newFund);
    }

    function getMyFunds(string memory userId) public returns (Funds[] memory) {
        for (uint i = 0; i < fundArray.length; i++) {
            if (
                keccak256(abi.encodePacked(fundArray[i].userId)) ==
                keccak256(abi.encodePacked(userId))
            ) {
                userFunds.push(fundArray[i]);
            }
        }
        return userFunds;
    }

    function getAll() public view returns (Funds[] memory) {
        return fundArray;
    }

   
}
