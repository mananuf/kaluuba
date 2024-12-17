import { useAccount, useReadContract } from 'wagmi';
import { kaluubaAbi } from "@/abi/kaluubaAbi";
import { useMemo } from "react";

export function useInvoices() {
    const { address } = useAccount();

    const { data: userInvoices, isError, isSuccess, failureReason } = useReadContract({
        abi: kaluubaAbi,
        address: "0x019383d2360348bF77Bb98b2820A3E2A2fD5D4cF",
        functionName: 'getInvoicesForUser',
        args: [address],
    });


    const invoiceSummary = useMemo(() => {
        if (!userInvoices) return {};
        const summary = {
            allInvoices: {
                count: userInvoices.length,
                totalAmount: userInvoices.reduce((acc, invoice) => acc + Number(invoice.amount), 0), // in WEI
            },
            paid: {
                count: userInvoices.filter(invoice => invoice.isPaid).length,
                totalAmount: userInvoices.filter(invoice => invoice.isPaid)
                    .reduce((acc, invoice) => acc + Number(invoice.amount), 0), // in WEI
            },
            pending: {
                count: userInvoices.filter(invoice => !invoice.isPaid && !invoice.isCancelled).length,
                totalAmount: userInvoices.filter(invoice => !invoice.isPaid && !invoice.isCancelled)
                    .reduce((acc, invoice) => acc + Number(invoice.amount), 0), // in WEI
            },
            cancelled: {
                count: userInvoices.filter(invoice => invoice.isCancelled).length,
                totalAmount: userInvoices.filter(invoice => invoice.isCancelled)
                    .reduce((acc, invoice) => acc + Number(invoice.amount), 0), // in WEI
            },
        };
        return summary;
    }, [userInvoices]);

    return { userInvoices, isError, isSuccess, failureReason, invoiceSummary };
}
