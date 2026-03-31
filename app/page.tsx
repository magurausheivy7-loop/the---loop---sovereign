'use client';

import { useRouter } from 'next/navigation';

export default function WelcomePage() {
  const router = useRouter();

  const handleGoToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-6">
      <h1 className="text-5xl font-bold text-purple-500 mb-4 text-center">Welcome to the Loop!</h1>
      <p className="text-zinc-400 text-xl text-center mb-8">Your account has been created successfully.</p>
      
      <button 
        onClick={handleGoToDashboard}
        className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-all active:scale-95"
      >
        Go to Dashboard
      </button>
    </main>
  );
}