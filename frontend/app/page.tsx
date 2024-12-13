'use client'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../components/header";
import Hero from '@/components/hero';

const KaluubaAddress = process.env.NEXT_PUBLIC_KALUUBA_CONTRACT_ADDRESS;

export default function Home() {
  return (
    <div className="bg-white h-screen">
      <Header/>
      <ToastContainer/>
      <Hero/>
    </div>
  )
}
