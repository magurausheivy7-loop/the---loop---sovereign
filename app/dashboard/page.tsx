'use client';

import { useState, useRef } from 'react';

export default function TheLoopFinalStable() {
  // 1. App State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userHandle, setUserHandle] = useState('');
  const [tab, setTab] = useState<'feed' | 'profile' | 'settings'>('feed'); 
  const [isMuted, setIsMuted] = useState(false); 
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());

  // 2. Sample Data
  const [posts] = useState([
    { id: 1, user: 'magurausheivy7', caption: 'Lalapanzi Creative Hub. 🇿🇼', media: 'https://www.w3schools.com/html/mov_bbb.mp4', avatar: 'IV' },
    { id: 2, user: 'sovereign_node', caption: 'Scaling the Loop.', media: 'https://www.w3schools.com/html/movie.mp4', avatar: 'SN' }
  ]);

  // 3. Helper Functions
  const togglePlay = (id: number) => {
    const video = videoRefs.current.get(id);
    if (video) {
      if (video.paused) {
        video.play().catch(err => console.log("Playback blocked:", err));
      } else {
        video.pause();
      }
    }
  };

  // 4. LOGIN / SIGNUP SCREEN
  if (!isLoggedIn) {
    return (
      <div className="h-screen w-full bg-black text-white flex flex-col items-center justify-center px-10">
        <div className="w-20 h-20 bg-pink-600 rounded-[2rem] mb-8 flex items-center justify-center font-black italic shadow-2xl shadow-pink-900/40">L</div>
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2 text-center">The Loop</h1>
        <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase mb-12 text-center font-bold">Sovereign Social Protocol</p>
        
        <input 
          type="text" 
          placeholder="CHOOSE YOUR HANDLE" 
          className="w-full bg-white/5 border border-white/10 p-6 rounded-[2rem] text-center font-bold mb-4 focus:border-pink-500 outline-none transition-all placeholder:opacity-20"
          value={userHandle}
          onChange={(e) => setUserHandle(e.target.value)}
        />
        <button 
          onClick={() => { if(userHandle) setIsLoggedIn(true); }}
          className="w-full bg-white text-black p-6 rounded-[2rem] font-black uppercase tracking-tighter italic hover:scale-105 active:scale-95 transition-transform shadow-xl"
        >
          Create Sovereign Profile
        </button>
      </div>
    );
  }

  // 5. MAIN APP UI
  return (
    <div className="h-screen w-full bg-black text-white flex flex-col overflow-hidden font-sans">
      
      {/* HEADER */}
      <nav className="px-8 pt-12 pb-6 border-b border-white/5 bg-black/40 backdrop-blur-3xl flex justify-between items-center shrink-0">
        <h1 className="text-xl font-black italic tracking-tighter uppercase">The Loop</h1>
        <button onClick={() => setTab('settings')} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10">⚙️</button>
      </nav>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-40">
        {tab === 'feed' && (
          <div className="max-w-md mx-auto py-6 space-y-12">
            {posts.map(p => (
              <div key={p.id} className="relative group">
                <div className="flex items-center gap-4 px-6 mb-4">
                   <div className="w-8 h-8 rounded-lg bg-pink-600 flex items-center justify-center text-[10px] font-black">{p.avatar}</div>
                   <p className="text-[10px] font-bold uppercase tracking-widest">@{p.user}</p>
                </div>

                <div className="relative aspect-[9/16] bg-zinc-950 rounded-[3rem] overflow-hidden border border-white/10 mx-2 shadow-2xl">
                  <video 
                    ref={(el) => { if (el) videoRefs.current.set(p.id, el); }} 
                    src={p.media} 
                    autoPlay 
                    loop 
                    muted={isMuted} 
                    playsInline 
                    className="w-full h-full object-cover" 
                    onClick={() => togglePlay(p.id)}
                  />
                  
                  {/* AUDIO CONTROL */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
                    className="absolute bottom-10 right-6 w-12 h-12 bg-black/60 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20 z-[100] shadow-2xl active:scale-90 transition-transform"
                  >
                    {isMuted ? '🔇' : '🔊'}
                  </button>

                  <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none">
                    <p className="font-bold text-lg leading-tight">{p.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'profile' && (
          <div className="flex flex-col items-center pt-20 animate-in fade-in slide-in-from-bottom-4">
            <div className="w-32 h-32 bg-gradient-to-tr from-pink-600 to-pink-400 rounded-[3rem] flex items-center justify-center text-4xl font-black shadow-2xl border-4 border-white/10">
              {userHandle ? userHandle.charAt(0).toUpperCase() : 'U'}
            </div>
            <h2 className="mt-8 text-3xl font-black italic uppercase tracking-tighter">@{userHandle || 'user'}</h2>
            <p className="text-pink-500 font-bold text-[10px] uppercase tracking-[0.3em] mt-2">Verified Sovereign Node</p>
            
            <div className="flex gap-4 mt-12 px-8 w-full">
                <div className="flex-1 bg-white/5 p-8 rounded-[2.5rem] border border-white/10 text-center">
                    <p className="text-2xl font-black italic tracking-tighter">0</p>
                    <p className="text-[8px] opacity-40 uppercase font-bold tracking-widest mt-1">Loops</p>
                </div>
                <div className="flex-1 bg-white/5 p-8 rounded-[2.5rem] border border-white/10 text-center">
                    <p className="text-2xl font-black italic tracking-tighter">1</p>
                    <p className="text-[8px] opacity-40 uppercase font-bold tracking-widest mt-1">Nodes</p>
                </div>
            </div>
          </div>
        )}

        {tab === 'settings' && (
          <div className="p-10 space-y-8">
            <h2 className="text-3xl font-black italic uppercase">Settings</h2>
            <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10">
               <p className="text-xs font-bold uppercase opacity-40 mb-2">Account Privacy</p>
               <p className="text-lg font-bold italic">Sovereign Encryption Active</p>
            </div>
            <button onClick={() => setTab('feed')} className="w-full py-6 bg-white text-black rounded-[2rem] font-black uppercase tracking-tighter italic">Close</button>
          </div>
        )}
      </main>

      {/* DOCK */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-xs h-20 bg-white/[0.05] backdrop-blur-3xl border border-white/10 rounded-[4rem] flex items-center justify-around z-[5000] shadow-2xl shadow-black">
        <button onClick={() => setTab('feed')} className={`text-xl transition-all ${tab === 'feed' ? 'text-pink-500 scale-125' : 'opacity-20 hover:opacity-50'}`}>🏠</button>
        <div className="w-14 h-14 bg-white text-black rounded-2xl flex items-center justify-center text-3xl font-bold transform -translate-y-2 shadow-lg">+</div>
        <button onClick={() => setTab('profile')} className={`text-xl transition-all ${tab === 'profile' ? 'text-pink-500 scale-125' : 'opacity-20 hover:opacity-50'}`}>👤</button>
      </div>
    </div>
  );
}