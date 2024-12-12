// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

library Errors {

    error ADDRESS_ALREADY_HAS_USERNAME();

    error USERNAME_TAKEN();

    error INVOICE_DOES_NOT_EXISTS();

    error INVOICE_ALREADY_EXISTS();

    error INVOICE_ALREADY_PAID();

    error INVOICE_ALREADY_CANCELLED();

    error NOT_INVOICE_OWNER();

    error INCORRECT_PAYMENT_AMOUNT();

    error USER_MUST_BE_REGISTERED();

    error ADDRESS_NOT_SUPPORTED();

    error INSUFICIENT_STAKE_BALANCE();

    error AMOUNT_MUST_BE_GREATER_THAN_ZERO();

    // =====================================
    // ======== Helpers ====================
    // =====================================


    error STRING_TOO_LONG();

    error HEX_LENGTH_INSUFICIENT();
}