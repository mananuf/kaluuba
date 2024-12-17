
import DashboardLayout from "@/components/layout/DashboardLayout";
import React from "react";

const paymentsData = [
  {
    title: "All Payments",
    payments: [
      { id: 1, name: "Amount", amount: "150" },
    ],
  },
  {
    title: "All Invoices",
    payments: [
      { id: 1, amount: "100" },
      
    ],
  },
  {
    title: "Pending",
    payments: [
      { id: 1,  amount: "250" },
    
    ],
  },
  {
    title: "Cancelled",
    payments: [
      { id: 1,  amount: "400" },
    
    ],
  },
];
const invoiceData = [
    { id: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
    { id: "INV002", status: "Pending", method: "Bank Transfer", amount: "$150.00" },
    { id: "INV003", status: "Cancelled", method: "PayPal", amount: "$0.00" },
  ];

const Dashboard = () => {
  return (
    <DashboardLayout>
        <section>
            <div className="h-full p-8 mt-12 overflow-hidden">
            <h1 className="text-3xl font-semibold mb-6 text-gray-800">Payment Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {paymentsData.map((card, index) => (
                <div
                    key={index}
                    className="relative overflow-clip bg-gradient-to-b from-blue-700 to-blue-500 h-40 flex flex-col justify-between rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300"
                >
                    <h2 className="text-lg font-semibold mb-3">{card.title}</h2>
                    <div className="overflow-y-auto max-h-48">
                    <ul className="space-y-2">
                        {card.payments.map((payment) => (
                        <li
                            key={payment.id}
                            className="flex justify-between border-t pb-2"
                        >
                            <span className="text-white font-bold text-2xl">
                            {payment.amount}
                            </span>
                        </li>
                        ))}
                    </ul>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="absolute -right-10 w-52 h-52 opacity-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                </div>
                ))}
            </div>
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
                        <th className="text-left py-2 px-4 font-medium">Status</th>
                        <th className="text-left py-2 px-4 font-medium">Item</th>
                        <th className="text-right py-2 px-4 font-medium">Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {invoiceData.map((invoice) => (
                        <tr key={invoice.id} className="border-b text-gray-700">
                        <td className="py-2 px-4 font-medium">{invoice.id}</td>
                        <td className="py-2 px-4">{invoice.status}</td>
                        <td className="py-2 px-4">{invoice.method}</td>
                        <td className="py-2 px-4 text-right">{invoice.amount}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
        </section>
    </DashboardLayout>
   
  );
};

export default Dashboard;