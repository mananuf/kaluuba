
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount, useReadContract } from 'wagmi';
import { writeContract } from '@wagmi/core';
import { kaluubaAbi } from '../abi/kaluubaAbi';
import { toast } from 'react-toastify';
import { config } from "@/config";
import BusinessCategories from "../components/businness-categories";
import Modal from "@/components/modal/modal";
import ConnectButton from '@/components/connect-button';
import { error } from 'console';

const KaluubaAddress = process.env.NEXT_PUBLIC_KALUUBA_CONTRACT_ADDRESS;

export default function Hero() {
    const [modalOpen, setModalOpen] = useState(false);
    const { isConnected, address } = useAccount();
    const [username, setUsername] = useState(null);
    const [fetchUser, setFetchUser] = useState(false);
    const [usernameInput, setUsernameInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const { data: userData, isError, isSuccess, failureReason } = useReadContract({
        abi: kaluubaAbi,
        address: "0x019383d2360348bF77Bb98b2820A3E2A2fD5D4cF",
        functionName: 'getUser',
        args: [address],
        enabled: fetchUser,
    });

    useEffect(() => {
        if (isSuccess && fetchUser) {
            setUsername(userData.username);

            if (userData.username) {
                // If the username exists, redirect to the dashboard
                toast.success(`Welcome back ${userData.username}`);
                router.push('/dashboard');
            } else {
                // Open modal for username registration
                setModalOpen(true);
            }

            setFetchUser(false);
        } else if (isError && fetchUser) {
            toast.error(`${failureReason}`);
            setFetchUser(false);
        }
    }, [isSuccess, isError, fetchUser, userData, router]);

    useEffect(() => {
        if (!isConnected) {
            setUsername(null);
            toast.info('Wallet disconnected. User cleared.');
        } else if (isConnected) {
            setFetchUser(true);
        }
    }, [isConnected, address]);

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (!usernameInput.trim()) {
            toast.error('Please enter a valid username.');
            return;
        }

        setIsLoading(true);
        try {
            const writeData = writeContract(config, {
                abi: kaluubaAbi,
                address:  "0x019383d2360348bF77Bb98b2820A3E2A2fD5D4cF",
                functionName: 'registerUsername',
                args: [usernameInput.toLowerCase() + '.kaluuba.eth'],
            });

            const registerResult = await writeData;

            if (registerResult) {
                toast.success(`Username "${usernameInput}.kaluuba.eth" registered successfully!`);
                setModalOpen(false);
                setUsernameInput('');
                router.push('/dashboard');
            } else {
                console.log(error);
            }
            
        } catch (error) {
            console.error(error);
            toast.error('Failed to register username.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="mx-auto max-w-2xl py-5 sm:py-28 lg:py-32">
                    <BusinessCategories />
                    <div className="text-center mt-10 md:mt-0">
                        <h1 className="text-3xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">
                            Seamless Payments, Globally Accessible
                        </h1>
                        <p className="mt-8 text-base md:text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                            Empowering social vendors and individuals with seamless crypto-to-fiat payment solutions, bridging borders and breaking barriers for a truly global marketplace.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            {isConnected ? (
                                <button
                                    onClick={() => setFetchUser(true)}
                                    className="rounded-full bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                >
                                    Get Started
                                </button>
                            ) : (
                                <ConnectButton label="Get Started" />
                            )}
                            <a href="#" className="text-sm/6 font-semibold text-blue-600 rounded-full border-2 px-3.5 py-1 border-blue-600">
                                Learn more
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Username Registration Modal */}
            {modalOpen && (
                <Modal
                    title="Create Username"
                    actionButton={{
                        label: isLoading ? 'Registering...' : 'Register',
                        onClick: handleSubmit,
                    }}
                    cancelBtn={false}
                    content={
                        <form onSubmit={handleSubmit}>
                            <p className="mt-1 text-xs text-gray-600">
                                This will create a unique username that identifies your wallet address for ease of transaction.
                            </p>
                            <div className="mt-5">
                                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-600">
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        placeholder="Enter Username"
                                        value={usernameInput}
                                        onChange={(e) => setUsernameInput(e.target.value)}
                                        className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                        required
                                    />
                                    <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6 mr-1">.kaluuba.eth</div>
                                </div>
                            </div>
                        </form>
                    }
                />
            )}
        </div>
    );
}