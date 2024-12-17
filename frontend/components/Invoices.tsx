'use client'

import { useInvoices } from './user-invoices';
  
export default function Invoice () {
    const { userInvoices } = useInvoices();

    return (
        <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Recent Invoices</h2>
            <table className="min-w-full border-collapse">
                <caption className="text-gray-700 text-sm mb-4">
                A list of your recent invoices.
                </caption>
                <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-blue-500">
                    <th className="w-[100px] text-left py-2 px-4 font-medium">
                    Invoice
                    </th>
                    <th className="text-left py-2 px-4 font-medium">Payment Status</th>
                    <th className="text-left py-2 px-4 font-medium">Item</th>
                    <th className="text-right py-2 px-4 font-medium">Amount</th>
                    <th className="text-right py-2 px-4 font-medium">Action</th>
                </tr>
                </thead>
                <tbody>
                {userInvoices?.map((invoice: any, index: number) => (
                    <tr key={index} className="border-b text-gray-700">
                    <td className="py-2 px-4 font-medium">{invoice.invoiceId ? `INV${invoice.invoiceId.toString().padStart(2, "0")}` : "N/A"}</td>
                    <td className="py-2 px-4">
                    {
                        invoice.isCancelled 
                        ? 
                        <div className="mt-1 flex items-center gap-x-1.5">
                            <div className="flex-none rounded-full bg-red-500/20 p-1">
                                <div className="size-1.5 rounded-full bg-red-500" />
                            </div>
                            <p className="text-xs/5 text-red-500">Cancelled Payment</p>
                        </div>
                        : (invoice.isPaid 
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
                    }</td>
                    <td className="py-2 px-4">{invoice.description}</td>
                    <td className="py-2 px-4 text-right">{invoice.amount ? Number(invoice.amount) : "0"} WEI</td>
                    <td className="py-2 px-4 text-right">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-blue-600 inline-flex justify-end cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
     )
}