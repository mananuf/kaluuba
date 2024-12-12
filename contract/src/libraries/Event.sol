// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

library Event {
    event UsernameRegistered(string indexed username, address indexed wallet);
    event InvoiceCreated(uint256 indexed invoiceId, address indexed creator, uint256 indexed amount);
    event InvoiceCancelled(uint256 indexed invoiceId, address indexed creator);
    event PaymentReceived(uint256 indexed invoiceId, address payer, uint256 indexed amount, string indexed transactionUrl);
}