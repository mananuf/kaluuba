// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import { Test, console } from "forge-std/Test.sol";
import { Kaluuba } from "../src/Kaluuba.sol";
import { Errors } from "../src/libraries/Errors.sol";
import { Event } from "../src/libraries/Event.sol";

contract kaluubaTest is Test {
    Kaluuba public kaluubaContract;
    address kaluubaOwner = mkaddr('kaluuba Owner');
    address kaluubaUser = mkaddr('kaluuba User');
    address payerUser = mkaddr('payer User');


    function mkaddr(string memory name) public returns (address) {
        address addr = address(
            uint160(uint256(keccak256(abi.encodePacked(name))))
        );
        vm.label(addr, name);
        return addr;
    }

    function setUp() public {
        vm.prank(kaluubaOwner);
        kaluubaContract = new Kaluuba();
    }

    function test_kaluuba_owner_user_name_exists_an_is_alpha() public {
        vm.prank(kaluubaOwner);
        Kaluuba.User memory owner = kaluubaContract.getUser(kaluubaOwner);
        assertEq(owner.userId, 1);
        assertEq(owner.username, 'alpha');
    }

    function test_kaluuba_owner_can_not_register_username_again() public {
        vm.prank(kaluubaOwner);

        vm.expectRevert(Errors.ADDRESS_ALREADY_HAS_USERNAME.selector);
        kaluubaContract.registerUsername('omega');
    }

    function test_can_register_username_for_address_that_is_not_yet_registered() public {
        vm.prank(kaluubaUser);

        vm.expectEmit(true, true, false, true);
        emit Event.UsernameRegistered("fifthson.kaluuba.eth", kaluubaUser);

        kaluubaContract.registerUsername("fifthson.kaluuba.eth");

        Kaluuba.User memory registerdUser = kaluubaContract.getUser(kaluubaUser);
        assertEq(registerdUser.username, "fifthson.kaluuba.eth");
        assertEq(registerdUser.walletAddress, kaluubaUser);
        assertEq(registerdUser.userId, 2);
    }

    function test_will_not_create_invoice_if_user_is_not_registered() public {
        vm.prank(kaluubaUser);

        vm.expectRevert(Errors.USER_MUST_BE_REGISTERED.selector);

        kaluubaContract.createInvoice("description", 1000);
    }

    function test_will_not_create_invoice_if_amount_is_less_than_1() public {
        vm.prank(kaluubaUser);
        kaluubaContract.registerUsername("user.kaluuba.eth");

        vm.prank(kaluubaUser);
        vm.expectRevert(Errors.AMOUNT_MUST_BE_GREATER_THAN_ZERO.selector);
        kaluubaContract.createInvoice("description", 0);
    }

    function test_will_create_invoice() public {
        vm.prank(kaluubaUser);
        kaluubaContract.registerUsername("user.kaluuba.eth");

        vm.expectEmit(true, true, false, true);
        emit Event.InvoiceCreated(1, kaluubaUser, 10);

        vm.prank(kaluubaUser);
        kaluubaContract.createInvoice("description", 10);

        Kaluuba.Invoice memory newlyCreatedInvoice = kaluubaContract.getInvoice(1);
        assertEq(newlyCreatedInvoice.description, "description");
        assertEq(newlyCreatedInvoice.amount, 10);
        assertEq(newlyCreatedInvoice.isPaid, false);
        assertEq(newlyCreatedInvoice.isCancelled, false);
        assertEq(newlyCreatedInvoice.creator, kaluubaUser);
        assertEq(newlyCreatedInvoice.payer, address(0));
        assertEq(newlyCreatedInvoice.transactionUrl, "");
    }

    function test_invoice_owner_can_cancel_invoice() public {
        vm.prank(kaluubaUser);
        kaluubaContract.registerUsername("user.kaluuba.eth");

        vm.expectEmit(true, true, false, true);
        emit Event.InvoiceCreated(1, kaluubaUser, 10);

        vm.prank(kaluubaUser);
        kaluubaContract.createInvoice("description", 10);

        Kaluuba.Invoice memory newlyCreatedInvoice = kaluubaContract.getInvoice(1);

        vm.prank(kaluubaUser);

        vm.expectEmit(true, true, false, true);
        emit Event.InvoiceCancelled(1, kaluubaUser);

        kaluubaContract.cancelInvoice(newlyCreatedInvoice.invoiceId);
    }

    function test_can_not_cancel_invoice_if_it_has_been_paid() public {
        vm.prank(kaluubaUser);
        kaluubaContract.registerUsername("user.kaluuba.eth");

        vm.prank(kaluubaUser);
        kaluubaContract.createInvoice("Test payment description", 1 ether);

        Kaluuba.Invoice memory newlyCreatedInvoice = kaluubaContract.getInvoice(1);
        assertEq(newlyCreatedInvoice.amount, 1 ether);
        assertEq(newlyCreatedInvoice.isPaid, false);
        assertEq(newlyCreatedInvoice.isCancelled, false);
        assertEq(newlyCreatedInvoice.invoiceId, 1);

        vm.deal(payerUser, 2 ether);
        vm.prank(payerUser);
        vm.expectEmit(true, true, false, true);
        emit Event.PaymentReceived(newlyCreatedInvoice.invoiceId, payerUser, 1 ether, "");
        kaluubaContract.payInvoice{value: 1 ether}(newlyCreatedInvoice.invoiceId);

        Kaluuba.Invoice memory paidInvoice = kaluubaContract.getInvoice(newlyCreatedInvoice.invoiceId);
        assertEq(paidInvoice.isPaid, true);
        assertEq(paidInvoice.payer, payerUser);
        assertTrue(bytes(paidInvoice.transactionUrl).length > 0);

        vm.prank(kaluubaUser);
        vm.expectRevert(Errors.INVOICE_ALREADY_PAID.selector);
        kaluubaContract.cancelInvoice(newlyCreatedInvoice.invoiceId);
    }

    function test_will_pay_invoice() public {
        vm.prank(kaluubaUser);
        kaluubaContract.registerUsername("user.kaluuba.eth");

        vm.prank(kaluubaUser);
        kaluubaContract.createInvoice("Test payment description", 1 ether);

        Kaluuba.Invoice memory newlyCreatedInvoice = kaluubaContract.getInvoice(1);
        assertEq(newlyCreatedInvoice.amount, 1 ether);
        assertEq(newlyCreatedInvoice.isPaid, false);
        assertEq(newlyCreatedInvoice.isCancelled, false);
        assertEq(newlyCreatedInvoice.invoiceId, 1);

        vm.deal(payerUser, 2 ether);
        vm.prank(payerUser);
        vm.expectEmit(true, true, false, true);
        emit Event.PaymentReceived(newlyCreatedInvoice.invoiceId, payerUser, 1 ether, "");
        kaluubaContract.payInvoice{value: 1 ether}(newlyCreatedInvoice.invoiceId);

        Kaluuba.Invoice memory paidInvoice = kaluubaContract.getInvoice(newlyCreatedInvoice.invoiceId);
        assertEq(paidInvoice.isPaid, true);
        assertEq(paidInvoice.payer, payerUser);
        assertTrue(bytes(paidInvoice.transactionUrl).length > 0);
    }

    function test_pay_invoice_will_fail_if_invoice_is_canclled() public {
        vm.prank(kaluubaUser);
        kaluubaContract.registerUsername("user.kaluuba.eth");

        vm.prank(kaluubaUser);
        kaluubaContract.createInvoice("Test payment description", 1 ether);

        Kaluuba.Invoice memory newlyCreatedInvoice = kaluubaContract.getInvoice(1);

        vm.prank(kaluubaUser);
        kaluubaContract.cancelInvoice(newlyCreatedInvoice.invoiceId);

        vm.deal(payerUser, 2 ether);
        vm.prank(payerUser);
        vm.expectRevert(Errors.INVOICE_ALREADY_CANCELLED.selector);
        kaluubaContract.payInvoice{value: 1 ether}(newlyCreatedInvoice.invoiceId);
    }

    function test_pay_invoice_will_fail_if_invoice_has_already_been_paid() public {
        vm.prank(kaluubaUser);
        kaluubaContract.registerUsername("user.kaluuba.eth");

        vm.prank(kaluubaUser);
        kaluubaContract.createInvoice("Test payment description", 1 ether);

        Kaluuba.Invoice memory newlyCreatedInvoice = kaluubaContract.getInvoice(1);

        vm.deal(payerUser, 2 ether);
        vm.prank(payerUser);
        kaluubaContract.payInvoice{value: 1 ether}(newlyCreatedInvoice.invoiceId);

        vm.prank(payerUser);
        vm.expectRevert(Errors.INVOICE_ALREADY_PAID.selector);
        kaluubaContract.payInvoice{value: 1 ether}(newlyCreatedInvoice.invoiceId);
    }

    function test_pay_invoice_will_fail_if_value_passed_is_less_than_amount_to_be_paid() public {
        vm.prank(kaluubaUser);
        kaluubaContract.registerUsername("user.kaluuba.eth");

        vm.prank(kaluubaUser);
        kaluubaContract.createInvoice("Test payment description", 1 ether);

        Kaluuba.Invoice memory newlyCreatedInvoice = kaluubaContract.getInvoice(1);

        vm.deal(payerUser, 2 ether);
        vm.prank(payerUser);
        vm.expectRevert(Errors.INCORRECT_PAYMENT_AMOUNT.selector);
        kaluubaContract.payInvoice{value: 0.5 ether}(newlyCreatedInvoice.invoiceId);
    }
}
