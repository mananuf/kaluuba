'use client'

import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from 'react-toastify';
import { useState } from 'react';
import { kaluubaAbi } from "@/abi/kaluubaAbi";
import { writeContract } from '@wagmi/core';
import { config } from "@/config";
import Invoice from "@/components/Invoices";

export default function Dashboard() {
    const [descriptionInput, setDescriptionInput] = useState('');
    const [amountInput, setAmountInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    return (
        <DashboardLayout>
            <div>
            {/* <form onSubmit={handleSubmit} className="mt-20 max-w-xl shadow-lg p-5 border-[0.5px] border-gray-200 rounded-sm">
                <p className="mt-1 text-xl capitalize font-semibold text-gray-900">
                    Create New Invoice
                </p>
                <div className="mt-5">
                    <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-600">
                        <input
                            id="description"
                            name="description"
                            type="text"
                            placeholder="Enter Description"
                            value={descriptionInput}
                            onChange={(e) => setDescriptionInput(e.target.value)}
                            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                            required
                        />
                    </div>
                </div>
                <div className="mt-5">
                    <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-600">
                        <input
                            id="amount"
                            name="amount"
                            type="number"
                            placeholder="Enter Amount"
                            value={amountInput}
                            onChange={(e) => setAmountInput(e.target.value)}
                            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                            required
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className={`mt-5 bg-gradient-to-tr from-blue-600 to-blue-400 text-white px-4 py-2 rounded-md ${
                        isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={isLoading}
                >
                    {isLoading ? 'Creating...' : 'Create New'}
                </button>
            </form>
            <Invoice/> */}
        </div>
        </DashboardLayout>
    );
}