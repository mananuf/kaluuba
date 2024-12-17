'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { QRCodeCanvas } from 'qrcode.react';
import { useAccount, useReadContract } from 'wagmi';
import { kaluubaAbi } from '@/abi/kaluubaAbi';
import { toast, ToastContainer } from 'react-toastify';

export default function ViewInvoice() {
  const searchParams = useSearchParams();
  const invoiceId = searchParams.get('invoiceId');
  const { address, isConnected } = useAccount();

  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  const {
    data: getInvoice,
    isError,
    isLoading,
    isSuccess,
    failureReason,
  } = useReadContract({
    abi: kaluubaAbi,
    address: '0x019383d2360348bF77Bb98b2820A3E2A2fD5D4cF',
    functionName: 'getInvoice',
    args: [invoiceId],
  });

  // Update the selectedInvoice state when data is fetched
  useEffect(() => {
    if (getInvoice && isSuccess) {

      const invoiceData = {
        invoiceId: invoiceId,
        description: getInvoice.description,
        amount: getInvoice.amount,
        username: getInvoice.username,
        creatorAddress: getInvoice.creator,
        isPaid: getInvoice.isPaid,
        isCancelled: getInvoice.isCancelled,
      };
      setSelectedInvoice(invoiceData);
    }
  }, [getInvoice, isSuccess, invoiceId]);

  if (isLoading || !selectedInvoice) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-screen text-emerald-500 font-semibold text-xl">
          <p>Loading Invoice...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex justify-center items-center min-h-screen bg-white p-4">
      {/* <ToastContainer/> */}
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          {/* QR Code Section */}
          <div className="flex justify-center mb-6">
            <QRCodeCanvas
              value={typeof window !== 'undefined' ? window.location.href : `INV-${selectedInvoice.invoiceId}`}
              size={400}
              bgColor={'#FFFFFF'}
              fgColor={'#000000'}
              className="rounded-md"
            />
          </div>

          <div className='flex justify-between'>
            {/* Invoice Header */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Invoice Details</h2>
                <p className="text-sm text-gray-600">
                Invoice Number: INV-00{selectedInvoice.invoiceId}
                </p>
            </div>

            <div className="mb-6 text-right">
                <h2 className="text-xl font-semibold text-gray-800">Status</h2>
                {
                        selectedInvoice.isCancelled 
                        ? 
                        <div className="mt-1 flex items-center gap-x-1.5">
                            <div className="flex-none rounded-full bg-red-500/20 p-1">
                                <div className="size-1.5 rounded-full bg-red-500" />
                            </div>
                            <p className="text-xs/5 text-red-500">Cancelled Payment</p>
                        </div>
                        : (selectedInvoice.isPaid 
                            ? 
                            <div className="mt-1 flex items-center gap-x-1.5">
                                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                    <div className="size-1.5 rounded-full bg-emerald-500" />
                                </div>
                                <p className="text-xs/5 text-emerald-500">Paid</p>
                            </div>
                            : 
                            <div className="mt-1 flex items-center gap-x-1.5">
                                <div className="flex-none rounded-full bg-blue-500/20 p-1">
                                    <div className="size-1.5 rounded-full bg-blue-500" />
                                </div>
                                <p className="text-xs/5 text-blue-500">Pending</p>
                            </div>
                        )
                    }
            </div>
          </div>

          <div className="text-left mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Merchant Details</h2>
            <p className="text-sm text-gray-600">
              Name: {selectedInvoice.username}
            </p>
            <p className="text-sm text-gray-600">
              Address: {selectedInvoice.creatorAddress}
            </p>
          </div>

          {/* Payment Breakdown */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3">Payment Breakdown</h3>
            <table className="w-full text-sm text-left">
              <tbody className="text-gray-700">
                <tr className="border-b">
                  <td className="py-2 font-semibold">Description</td>
                  <td className="py-2 text-right font-semibold">Amount</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-left">{selectedInvoice.description}</td>
                  <td className="py-2 text-right">{selectedInvoice.amount}</td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold">Total</td>
                  <td className="py-2 text-right font-semibold">
                    {selectedInvoice.amount} WEI
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Action Button */}
            <div className="flex justify-center mt-6">
            {address && isConnected && selectedInvoice.creatorAddress === address ? (
                // Copy Link Button
                <button
                onClick={() => {
                    if (typeof window !== 'undefined') {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success('Invoice link copied to clipboard!');
                    }
                }}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-md focus:outline-none"
                >
                Copy Invoice Link
                </button>
            ) : (
                // Pay Invoice Button
                <button
                onClick={() => {
                    console.log('Redirect to payment functionality here');
                }}
                className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold rounded-md focus:outline-none"
                >
                Pay Invoice
                </button>
            )}
            </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
