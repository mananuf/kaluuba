// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract Kaluuba {
    struct Invoice {
        address creator;
        string username;
        string description; // Purpose or items details
        uint256 amount; // Amount in wei (ETH)
        bool isPaid;
        address payer;
        string transactionUrl; // Etherscan transaction URL
    }

    mapping(string => address) public usernames; // Maps username to wallet address
    mapping(address => Invoice[]) public userInvoices; // Maps user to their invoices
    mapping(string => Invoice) public invoiceDetails; // Maps invoice ID to its details

    event UsernameRegistered(string username, address wallet);
    event InvoiceCreated(string invoiceId, address creator, uint256 amount);
    event PaymentReceived(string invoiceId, address payer, uint256 amount, string transactionUrl);

    modifier usernameAvailable(string memory username) {
        require(usernames[username] == address(0), "Username already taken");
        _;
    }

    // Function to register a unique username
    function registerUsername(string memory username) external usernameAvailable(username) {
        usernames[username] = msg.sender;
        emit UsernameRegistered(username, msg.sender);
    }

    // Function to create an invoice (vendor or personal)
    function createInvoice(
        string memory invoiceId,
        string memory username,
        string memory description,
        uint256 amount
    ) external {
        require(usernames[username] == msg.sender, "Unauthorized to create invoice for this username");
        require(amount > 0, "Invoice amount must be greater than zero");

        Invoice memory newInvoice = Invoice({
            creator: msg.sender,
            username: username,
            description: description,
            amount: amount,
            isPaid: false,
            payer: address(0),
            transactionUrl: "" // Placeholder, will be updated after payment
        });

        userInvoices[msg.sender].push(newInvoice);
        invoiceDetails[invoiceId] = newInvoice;

        emit InvoiceCreated(invoiceId, msg.sender, amount);
    }

    // Function to pay for an invoice
    function payInvoice(string memory invoiceId) external payable {
        Invoice storage invoice = invoiceDetails[invoiceId];

        require(invoice.amount > 0, "Invoice does not exist");
        require(!invoice.isPaid, "Invoice already paid");
        require(msg.value == invoice.amount, "Incorrect payment amount");

        invoice.isPaid = true;
        invoice.payer = msg.sender;

        // Generate the Etherscan transaction URL
        string memory transactionHash = toHexString(uint256(uint160(msg.sender)), 20);
        invoice.transactionUrl = string(abi.encodePacked("https://etherscan.io/tx/", transactionHash));

        // Transfer ETH to the creator
        payable(invoice.creator).transfer(msg.value);

        emit PaymentReceived(invoiceId, msg.sender, msg.value, invoice.transactionUrl);
    }

    // Function to fetch invoices for a user
    function getInvoicesForUser(address user) external view returns (Invoice[] memory) {
        return userInvoices[user];
    }

    // Helper function to convert string to bytes32 (for frontend integration)
    function stringToBytes32(string memory source) public pure returns (bytes32 result) {
        require(bytes(source).length <= 32, "String too long");
        assembly {
            result := mload(add(source, 32))
        }
    }

    // Helper function to convert address to string (Etherscan URL generation)
    function toHexString(uint256 value, uint256 length) internal pure returns (string memory) {
        bytes16 _SYMBOLS = "0123456789abcdef";
        bytes memory buffer = new bytes(2 * length + 2);
        buffer[0] = "0";
        buffer[1] = "x";
        for (uint256 i = 2 * length + 1; i > 1; --i) {
            buffer[i] = _SYMBOLS[value & 0xf];
            value >>= 4;
        }
        require(value == 0, "Hex length insufficient");
        return string(buffer);
    }
}
