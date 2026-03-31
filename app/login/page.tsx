'use client';

import Link from 'next/link'; // <--- This is the important part!

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white p-6 relative">
      
      {/* This is the Back Button */}
      <div className="absolute top-8 left-8">
        <Link href="/" className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2">
          ← Back to Home
        </Link>
      </div>

      <div className="w-full max-w-sm p-8 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-2 text-center">Welcome back</h2>
        <p  className="text-zinc-400 text-center mb-8">Enter your details to enter the Loop.</p>
        
        <div className="space-y-4">
          {/* Your inputs stay here... */}
        </div>

        <p className="text-center text-zinc-500 mt-6 text-sm">
          Don't have an account? 
          <Link href="/signup" className="text-blue-400 hover:underline ml-1">
            Sign up
          </Link>
        </p>
    
        
        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="Email address" 
            className="w-full p-4 bg-black border border-zinc-700 rounded-xl focus:border-blue-500 outline-none transition-all"
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-4 bg-black border border-zinc-700 rounded-xl focus:border-blue-500 outline-none transition-all"
          />
          <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl mt-4 transition-colors">
            Continue
          </button>
        </div>
      </div>
    </main>
  );
}