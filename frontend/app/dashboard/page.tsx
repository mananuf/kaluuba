'use client'

import DashboardLayout from "@/components/layout/DashboardLayout";
import React from "react";
import Invoice from "@/components/Invoices";
import { useInvoices } from "@/components/user-invoices";

const Dashboard = () => {
  const { invoiceSummary }: any = useInvoices();

  return (
    <DashboardLayout>
        <section>
            <div className="h-full p-8 mt-12 overflow-hidden">
                <h1 className="text-3xl font-semibold mb-6 text-gray-800">Payment Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { title: "All Invoices", data: invoiceSummary.allInvoices, color: "blue" },
                        { title: "Paid", data: invoiceSummary.paid, color: "emerald" },
                        { title: "Pending", data: invoiceSummary.pending, color: "gray" },
                        { title: "Cancelled", data: invoiceSummary.cancelled, color: "red" },
                    ].map((card, index) => (
                        <div
                            key={index}
                            className="relative overflow-clip bg-gradient-to-b from-blue-700 to-blue-500 h-40 flex flex-col justify-between rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300"
                        >
                            <h2 className="text-lg font-semibold mb-3">{card.title}</h2>
                            <div className="overflow-y-auto max-h-48">
                                <ul className="space-y-2">
                                    <li className="flex justify-between border-t pb-2">
                                        <span className="text-white font-bold text-2xl flex justify-between w-full">
                                            <span>{card.data ? `${card.data.count} Invoices` : "Loading..."}</span>
                                            <span>{card.data ? `${card.data.totalAmount} WEI` : "Loading..."} </span>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="absolute -right-10 w-52 h-52 opacity-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                    ))}
                </div>
                <Invoice/>
            </div>
        </section>
    </DashboardLayout>
  );
};

export default Dashboard;
