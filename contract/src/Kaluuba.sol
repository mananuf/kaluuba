// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import { Errors } from "../src/libraries/Errors.sol";
import { Event } from "./libraries/Event.sol";

contract Kaluuba {
    struct Invoice {
        uint256 invoiceId;
        address creator;
        string username;
        string description;
        uint256 amount; // Amount in wei (ETH)
        bool isPaid;
        bool isCancelled;
        address payer;
        string transactionUrl; // Etherscan transaction URL
    }

    struct User {
        uint256 userId;
        address walletAddress;
        string username;
    }

    uint256 public userCount;
    uint256 public invoiceCount;


    mapping(address => User) public users; // Maps wallet address to User
    mapping(string => bool) public registeredUsernames; // Tracks registered usernames
    mapping(address => Invoice[]) public userInvoices; // Maps user to their invoices
    mapping(uint256 => Invoice) public invoiceDetails; // Maps invoice ID to its details

    modifier addressHasNoUsername() {
        require(users[msg.sender].userId == 0, Errors.ADDRESS_ALREADY_HAS_USERNAME());
        _;
    }

    modifier usernameAvailable(string memory username) {
        require(!registeredUsernames[username], Errors.USERNAME_TAKEN());
        _;
    }

    modifier validInvoice(uint256 invoiceId) {
        require(invoiceDetails[invoiceId].creator != address(0), Errors.INVOICE_DOES_NOT_EXISTS());
        _;
    }

    modifier invoiceOwner(uint256 invoiceId) {
        require(invoiceDetails[invoiceId].creator == msg.sender, Errors.NOT_INVOICE_OWNER());
        _;
    }

    constructor() {
        userCount += 1;
        users[msg.sender] = User({
            userId: userCount,
            walletAddress: msg.sender,
            username: "alpha"
        });
        registeredUsernames["alpha"] = true;
    }

    function registerUsername(string memory _username)
        external
        addressHasNoUsername
        usernameAvailable(_username)
    {
        userCount += 1;
        users[msg.sender] = User({
            userId: userCount,
            walletAddress: msg.sender,
            username: _username
        });
        registeredUsernames[_username] = true;

        emit Event.UsernameRegistered(_username, msg.sender);
    }

    function createInvoice(
        string memory description,
        uint256 amount
    ) external {
        require(users[msg.sender].userId != 0, Errors.USER_MUST_BE_REGISTERED());
        require(amount > 0, Errors.AMOUNT_MUST_BE_GREATER_THAN_ZERO());
        
        invoiceCount += 1;

        Invoice memory newInvoice = Invoice({
            invoiceId: invoiceCount,
            creator: msg.sender,
            username: users[msg.sender].username,
            description: description,
            amount: amount,
            isPaid: false,
            isCancelled: false,
            payer: address(0),
            transactionUrl: ""
        });

        userInvoices[msg.sender].push(newInvoice);
        invoiceDetails[invoiceCount] = newInvoice;

        emit Event.InvoiceCreated(invoiceCount, msg.sender, amount);
    }

    function cancelInvoice(uint256 invoiceId) 
        external 
        payable 
        invoiceOwner(invoiceId) 
    {
        Invoice storage invoice = invoiceDetails[invoiceId];

        require(!invoice.isPaid, Errors.INVOICE_ALREADY_PAID());

        invoice.isCancelled = true;

        // Update the corresponding invoice in userInvoices
        Invoice[] storage creatorInvoices = userInvoices[invoice.creator];
        for (uint256 i = 0; i < creatorInvoices.length; i++) {
            if (creatorInvoices[i].invoiceId == invoiceId) {
                creatorInvoices[i].isCancelled = true;
                break;
            }
        }

        emit Event.InvoiceCancelled(invoice.invoiceId, msg.sender);
    }

    function payInvoice(uint256 invoiceId) 
        external 
        payable 
        validInvoice(invoiceId) 
    {
        Invoice storage invoice = invoiceDetails[invoiceId];

        require(!invoice.isCancelled, Errors.INVOICE_ALREADY_CANCELLED());
        require(!invoice.isPaid, Errors.INVOICE_ALREADY_PAID());
        require(msg.value == invoice.amount, Errors.INCORRECT_PAYMENT_AMOUNT());

        invoice.isPaid = true;
        invoice.payer = msg.sender;

        // Update the corresponding invoice in userInvoices
        Invoice[] storage creatorInvoices = userInvoices[invoice.creator];
        for (uint256 i = 0; i < creatorInvoices.length; i++) {
            if (creatorInvoices[i].invoiceId == invoiceId) {
                creatorInvoices[i].isPaid = true;
                creatorInvoices[i].payer = msg.sender;
                break;
            }
        }

        //todo: remove
        // Generate the Etherscan transaction URL
        invoice.transactionUrl = string(
            abi.encodePacked("https://sepolia.etherscan.io/tx/", toHexString(uint256(uint160(msg.sender)), 20))
        );

        // Transfer ETH to the creator
        payable(invoice.creator).transfer(msg.value);

        emit Event.PaymentReceived(invoiceId, msg.sender, msg.value, invoice.transactionUrl);
    }

    // Helper function to convert string to bytes32 (for frontend integration)
    function stringToBytes32(string memory source) public pure returns (bytes32 result) {
        require(bytes(source).length <= 32, Errors.STRING_TOO_LONG());
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
        require(value == 0, Errors.HEX_LENGTH_INSUFICIENT());
        return string(buffer);
    }

    // ================================================================================
    // ========================= Getter Functions =====================================
    // ================================================================================

    function getInvoicesForUser(address user) external view returns (Invoice[] memory) {
        return userInvoices[user];
    }

    function getUser(address userAddress) external view returns (User memory) {
        return users[userAddress];
    }

    function getInvoice(uint256 invoiceAddress) external view returns (Invoice memory) {
        return invoiceDetails[invoiceAddress];
    }
}
