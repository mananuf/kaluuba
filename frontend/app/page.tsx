'use client'

import 'react-toastify/dist/ReactToastify.css';
import Hero from '@/components/hero';
import MainLayout from '@/components/layout/main';
import Header from '@/components/header';

export default function Home() {
  return (
    <MainLayout>
      <Header/>
      <Hero/>
    </MainLayout>
  )
}
