'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = () => {
    // This tells the browser to move to the welcome folder
    router.push('/welcome');
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white p-6 relative">
      <div className="absolute top-8 left-8">
        <Link href="/" className="text-zinc-500 hover:text-white transition-colors">
          ← Back to Home
        </Link>
      </div>

      <div className="w-full max-w-sm p-8 bg-zinc-900 border border-zinc-800 rounded-3xl">
        <h2 className="text-3xl font-bold mb-2 text-center text-purple-500">Join the Loop</h2>
        <p className="text-zinc-400 text-center mb-8">Create your account to get started.</p>
        
        <div className="space-y-4">
          <input placeholder="Full Name" className="w-full p-4 bg-black border border-zinc-700 rounded-xl outline-none" />
          <input placeholder="Email" className="w-full p-4 bg-black border border-zinc-700 rounded-xl outline-none" />
          <input type="password" placeholder="Password" className="w-full p-4 bg-black border border-zinc-700 rounded-xl outline-none" />
          
          <button 
            onClick={handleSignup} 
            className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl mt-4"
          >
            Create Account
          </button>
        </div>
      </div>
    </main>
  );
}