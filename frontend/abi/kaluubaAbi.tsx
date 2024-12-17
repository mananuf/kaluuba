export const kaluubaAbi = 
[
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "ADDRESS_ALREADY_HAS_USERNAME",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "AMOUNT_MUST_BE_GREATER_THAN_ZERO",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "HEX_LENGTH_INSUFICIENT",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "INCORRECT_PAYMENT_AMOUNT",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "INVOICE_ALREADY_CANCELLED",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "INVOICE_ALREADY_PAID",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "INVOICE_DOES_NOT_EXISTS",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NOT_INVOICE_OWNER",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "STRING_TOO_LONG",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "USERNAME_TAKEN",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "USER_MUST_BE_REGISTERED",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "invoiceId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "creator",
                "type": "address"
            }
        ],
        "name": "InvoiceCancelled",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "invoiceId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "creator",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "InvoiceCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "invoiceId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "payer",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "string",
                "name": "transactionUrl",
                "type": "string"
            }
        ],
        "name": "PaymentReceived",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "string",
                "name": "username",
                "type": "string"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "wallet",
                "type": "address"
            }
        ],
        "name": "UsernameRegistered",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "invoiceId",
                "type": "uint256"
            }
        ],
        "name": "cancelInvoice",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "createInvoice",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "invoiceAddress",
                "type": "uint256"
            }
        ],
        "name": "getInvoice",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "invoiceId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "creator",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "username",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isPaid",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "isCancelled",
                        "type": "bool"
                    },
                    {
                        "internalType": "address",
                        "name": "payer",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "transactionUrl",
                        "type": "string"
                    }
                ],
                "internalType": "struct Kaluuba.Invoice",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "getInvoicesForUser",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "invoiceId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "creator",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "username",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isPaid",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "isCancelled",
                        "type": "bool"
                    },
                    {
                        "internalType": "address",
                        "name": "payer",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "transactionUrl",
                        "type": "string"
                    }
                ],
                "internalType": "struct Kaluuba.Invoice[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            }
        ],
        "name": "getUser",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "userId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "walletAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "username",
                        "type": "string"
                    }
                ],
                "internalType": "struct Kaluuba.User",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "invoiceCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "invoiceDetails",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "invoiceId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "creator",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "username",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isPaid",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "isCancelled",
                "type": "bool"
            },
            {
                "internalType": "address",
                "name": "payer",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "transactionUrl",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "invoiceId",
                "type": "uint256"
            }
        ],
        "name": "payInvoice",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_username",
                "type": "string"
            }
        ],
        "name": "registerUsername",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "registeredUsernames",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "source",
                "type": "string"
            }
        ],
        "name": "stringToBytes32",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "result",
                "type": "bytes32"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "userCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "userInvoices",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "invoiceId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "creator",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "username",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isPaid",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "isCancelled",
                "type": "bool"
            },
            {
                "internalType": "address",
                "name": "payer",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "transactionUrl",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "users",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "userId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "walletAddress",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "username",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]
