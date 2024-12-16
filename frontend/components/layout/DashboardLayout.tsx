'use client'

import MainLayout from "./main"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount, useReadContract } from 'wagmi';
import Image from 'next/image';
import Logo from "@/public/img/kaluuba-logo.png";
import { kaluubaAbi } from "@/abi/kaluubaAbi";
import ConnectButton from '@/components/connect-button';

interface DashboardLayoutProps {
    children: React.ReactNode
}

export default function DashboardLayout({children}: DashboardLayoutProps) {
    const [username, setUsername] = useState(null);
    const [fetchUser, setFetchUser] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { isConnected, address } = useAccount();
    const router = useRouter();

    const { data: userData, isError, isSuccess, failureReason } = useReadContract({
        abi: kaluubaAbi,
        address: "0x019383d2360348bF77Bb98b2820A3E2A2fD5D4cF",
        functionName: 'getUser',
        args: [address],
        enabled: fetchUser,
    });

    if(isConnected) {
        console.log(userData)
    }


    return(
        <MainLayout>
            <div>
                <nav className="fixed top-0 z-50 w-full bg-gray-100 border-b-2 border-gray-300 ">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end">
                        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <span className="sr-only">Open sidebar</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                            </svg>
                        </button>
                        <a href="https://flowbite.com" className="flex ms-2 md:me-24">
                        <Image
                            alt=""
                            src={Logo}
                            // width={32}
                            // height={32}
                            className="h-8 w-auto"
                        />
                        </a>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center ms-3">
                            <div>
                            <button type="button" className="flex text-sm bg-blue-200 px-6 py-2 rounded-full focus:ring-4 focus:ring-gray-300" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                <span className="sr-only">Open user menu</span>
                                {isConnected && userData?.username && (
                                    <p className="text-gray-900">{userData.username}</p>
                                )}
                            </button>
                            </div>
                            <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                            <div className="px-4 py-3" role="none">
                                <p className="text-sm text-gray-900 dark:text-white" role="none">
                                Neil Sims
                                </p>
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                                neil.sims@flowbite.com
                                </p>
                            </div>
                            <ul className="py-1" role="none">
                                <li>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</a>
                                </li>
                                <li>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
                                </li>
                                <li>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Earnings</a>
                                </li>
                                <li>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>
                                </li>
                            </ul>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                </nav>
                <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-gray-100 border-r border-gray-200 sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-gray-100 shadow-sm">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 group">
                            <svg className="w-5 h-5 text-blue-600 transition duration-75  group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                            </svg>
                            <span className="ms-3">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 group">
                            <svg className="flex-shrink-0 w-5 h-5 text-blue-600 transition duration-75  group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                            </svg>
                            <span className="flex-1 ms-3 whitespace-nowrap">Invoices</span>
                            <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">1</span>
                            </a>
                        </li>
                     
                    </ul>
                </div>
                </aside>

                <div className="p-4 sm:ml-64">
                    {children}
                </div>
            </div>
        </MainLayout>
    )
}