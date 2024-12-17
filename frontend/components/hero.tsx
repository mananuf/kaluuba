import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount, useReadContract } from 'wagmi';
import { writeContract } from '@wagmi/core';
import { kaluubaAbi } from '../abi/kaluubaAbi';
import { toast } from 'react-toastify';
import { config, kaluubaContractAddress } from "@/config";
import BusinessCategories from "../components/businness-categories";
import Modal from "@/components/modal/modal";
import ConnectButton from '@/components/connect-button';

export default function Hero() {
    const [modalOpen, setModalOpen] = useState(false);
    const { isConnected, address } = useAccount();
    const [usernameInput, setUsernameInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();


    const { data: userData, isError, isSuccess, error: fetchError }: any = useReadContract({
        abi: kaluubaAbi,
        address: kaluubaContractAddress,
        functionName: 'getUser',
        args: [address],
        enabled: !!address,
    });
    
    useEffect(() => {
        if (isSuccess && userData?.username) {
            toast.success(`Welcome back ${userData.username}`);
        } else if (isSuccess && !userData?.username) {
            setModalOpen(true);
        } else if (isError) {
            console.log(`Failed to fetch user: ${fetchError?.message || 'Unknown error'}`);
        }
    }, [isSuccess, isError, userData, fetchError, router]);


    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (!usernameInput.trim()) {
            toast.error('Please enter a valid username.');
            return;
        }

        setIsLoading(true);
        try {
            const result = writeContract(config, {
                abi: kaluubaAbi,
                address: kaluubaContractAddress,
                functionName: 'registerUsername',
                args: [`${usernameInput.toLowerCase()}.kaluuba.eth`],
            });

            await result;
            
            setTimeout(() => {
                toast.success(`Username "${usernameInput}.kaluuba.eth" registered successfully!`);
                setModalOpen(false);
                setUsernameInput('');
                router.push('/dashboard');
            }, 8000);

        } catch (error) {
            console.error(error);
            toast.error('Failed to register username.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='h-screen'>
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="mx-auto max-w-2xl py-5 sm:py-28 lg:py-32">
                    <BusinessCategories />
                    <div className="text-center mt-10 md:mt-0">
                        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
                            Seamless Payments, Globally Accessible
                        </h1>
                        <p className="mt-8 text-base md:text-lg font-medium text-gray-500 sm:text-xl">
                            Empowering social vendors and individuals with seamless crypto-to-fiat payment solutions.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            {isConnected ? (
                                <button
                                    onClick={() => router.push('/dashboard')}
                                    className="rounded-full bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500"
                                >
                                    Get Started
                                </button>
                            ) : (
                                <ConnectButton label="Get Started" />
                            )}
                            <a href="#" className="text-sm font-semibold text-blue-600 rounded-full border-2 px-3.5 py-1 border-blue-600">
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
                                Create a unique username to identify your wallet address for seamless transactions.
                            </p>
                            <div className="mt-5">
                                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 outline-gray-300 focus-within:outline-2 focus-within:outline-blue-600">
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        placeholder="Enter Username"
                                        value={usernameInput}
                                        onChange={(e) => setUsernameInput(e.target.value)}
                                        className="block w-full py-1.5 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
                                        required
                                    />
                                    <div className="shrink-0 text-gray-500 mr-1">.kaluuba.eth</div>
                                </div>
                            </div>
                        </form>
                    }
                />
            )}
        </div>
    );
}
