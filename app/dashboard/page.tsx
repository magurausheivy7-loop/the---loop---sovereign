'use client';

import { useState, useRef, useEffect, useMemo } from 'react';

// --- CORE SYSTEM TYPES ---
interface Post { id: number; user: string; caption: string; media: string; avatar: string; comments: string[]; }
interface Story { id: number; user: string; avatar: string; viewed: boolean; }

export default function LoopUltimateSovereign() {
  // --- NAVIGATION & ENGINE ---
  const [tab, setTab] = useState<'feed' | 'inbox' | 'profile'>('feed'); 
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCommentId, setActiveCommentId] = useState<number | null>(null);

  // --- MEDIA & DEVICE ENGINE ---
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const videoPreviewRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());

  // --- SOCIAL DATA & INTERACTION ---
  const [vol, setVol] = useState(0.8);
  const [msg, setMsg] = useState('');
  const [chatId, setChatId] = useState<number | null>(null);
  const [playing, setPlaying] = useState<Record<number, boolean>>({ 1: true, 2: true });
  const [likes, setLikes] = useState<Record<number, number>>({ 1: 1200500, 2: 850200 });

  const [stories] = useState<Story[]>([
    { id: 1, user: 'Your Node', avatar: 'IV', viewed: false },
    { id: 2, user: 'Tatenda', avatar: 'TM', viewed: false },
    { id: 3, user: 'Lalapanzi', avatar: 'LZ', viewed: true },
    { id: 4, user: 'Sovereign', avatar: 'SV', viewed: false },
    { id: 5, user: 'Harare', avatar: 'HR', viewed: true },
    { id: 6, user: 'Global', avatar: 'GL', viewed: false },
  ]);

  const [posts, setPosts] = useState<Post[]>([
    { id: 1, user: 'magurausheivy7', caption: 'Lalapanzi Creative Hub. The future of Zimbabwe is digital. 🇿🇼', media: 'https://www.w3schools.com/html/mov_bbb.mp4', avatar: 'IV', comments: ['Cleanest UI ever.', 'This is the dream.'] },
    { id: 2, user: 'sovereign_node', caption: 'Scaling the Loop. Architecture of the future.', media: 'https://www.w3schools.com/html/movie.mp4', avatar: 'SN', comments: ['Glassmorphism is 10/10.'] }
  ]);

  const [chats, setChats] = useState([
    { id: 1, name: 'Tatenda M.', msgs: ['The Loop is live! 🇿🇼'], initial: 'TM' },
    { id: 2, name: 'Sovereign Core', msgs: ['Encryption: Active.'], initial: 'SC' }
  ]);

  // --- DEVICE HANDLERS ---
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setMediaStream(stream);
      if (videoPreviewRef.current) videoPreviewRef.current.srcObject = stream;
      setIsRecording(true);
    } catch (err) { alert("Camera access required for Sovereign Node."); }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newPost: Post = { id: Date.now(), user: 'magurausheivy7', caption: "New Transmission", media: url, avatar: 'IV', comments: [] };
      setPosts([newPost, ...posts]);
      setIsUploadOpen(false);
    }
  };

  const togglePlay = (id: number) => {
    const video = videoRefs.current.get(id);
    if (video) {
      video.paused ? video.play() : video.pause();
      setPlaying(prev => ({ ...prev, [id]: !video.paused }));
    }
  };

  return (
    <div className="h-screen w-full bg-[#000000] text-white flex flex-col overflow-hidden font-sans selection:bg-pink-500">
      
      {/* 1. APPLE-GRADE MEDIA MODAL */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center p-6 bg-black/60 backdrop-blur-[60px] animate-in fade-in zoom-in-95 duration-500">
          <div className="w-full max-w-md bg-white/[0.03] border border-white/20 rounded-[4rem] p-10 shadow-[0_0_100px_rgba(0,0,0,1)] relative">
            <div className="absolute inset-0 rounded-[4rem] border-[0.5px] border-white/20 pointer-events-none" />
            <h2 className="text-2xl font-black italic mb-8 uppercase tracking-tighter bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">Node Creation</h2>
            <div className="aspect-video bg-black/60 rounded-[2.5rem] mb-8 overflow-hidden border border-white/10 flex items-center justify-center">
              {isRecording ? <video ref={videoPreviewRef} autoPlay muted className="w-full h-full object-cover" /> : <p className="text-[8px] font-black opacity-20 tracking-[0.5em]">Camera Offline</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={startCamera} className="py-6 bg-white/5 rounded-3xl text-[9px] font-black uppercase tracking-widest border border-white/10 hover:bg-white/10 transition-all">Live Cam</button>
              <button onClick={() => fileInputRef.current?.click()} className="py-6 bg-white/5 rounded-3xl text-[9px] font-black uppercase tracking-widest border border-white/10 hover:bg-white/10 transition-all">Upload</button>
              <input type="file" ref={fileInputRef} hidden onChange={handleFileUpload} />
            </div>
            <button onClick={() => setIsUploadOpen(false)} className="w-full mt-6 py-4 text-[8px] font-black text-zinc-600 uppercase">Abort</button>
          </div>
        </div>
      )}

      {/* 2. ULTIMATE GLASS HEADER */}
      <nav className="px-8 pt-12 pb-6 bg-black/40 backdrop-blur-[50px] border-b border-white/[0.05] z-[1000] flex justify-between items-center">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-900 rounded-[1.3rem] flex items-center justify-center font-black italic text-2xl shadow-[0_0_40px_rgba(255,20,147,0.4)] border-[0.5px] border-white/20">L</div>
          <h1 className="text-2xl font-black italic tracking-tighter uppercase leading-none">The Loop</h1>
        </div>
        <div className="bg-white/[0.03] p-3 px-6 rounded-full border border-white/10 flex items-center gap-4">
          <input type="range" min="0" max="1" step="0.1" value={vol} onChange={(e) => setVol(parseFloat(e.target.value))} className="w-16 accent-pink-500 h-1" />
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-48">
        
        {/* 3. THE ICONIC STORY LINE */}
        <div className="flex gap-6 px-8 py-10 overflow-x-auto no-scrollbar bg-gradient-to-b from-white/[0.03] to-transparent">
          {stories.map(s => (
            <div key={s.id} className="flex flex-col items-center gap-3 flex-shrink-0 group">
              <div className={`p-[2.5px] rounded-[2.5rem] transition-all duration-500 group-hover:scale-105 ${!s.viewed ? 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600' : 'bg-white/10'}`}>
                <div className="w-20 h-20 rounded-[2.3rem] bg-black border-[4px] border-black flex items-center justify-center text-sm font-black italic shadow-2xl">
                  {s.avatar}
                </div>
              </div>
              <span className={`text-[9px] font-black uppercase tracking-widest ${!s.viewed ? 'text-white' : 'text-zinc-600'}`}>{s.user}</span>
            </div>
          ))}
        </div>

        {/* 4. FEED (100x BETTER THAN IG) */}
        {tab === 'feed' && (
          <div className="max-w-lg mx-auto py-12 px-6 space-y-28">
            {posts.map(p => (
              <div key={p.id} className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
                <div className="flex items-center gap-4 mb-6 px-2">
                  <div className="w-11 h-11 rounded-[1.3rem] bg-pink-600/10 border border-pink-500/20 flex items-center justify-center text-[10px] font-black text-pink-500">{p.avatar}</div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em]">@{p.user}</p>
                </div>

                <div className="relative rounded-[4.5rem] overflow-hidden border border-white/10 bg-[#080808] shadow-[0_60px_120px_-20px_rgba(0,0,0,1)] group" onClick={() => togglePlay(p.id)}>
                  {!playing[p.id] && <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px]"><span className="text-4xl opacity-40">▶️</span></div>}
                  
                  <div className="absolute top-10 left-10 z-50 pointer-events-none opacity-40 mix-blend-overlay">
                    <div className="bg-black/40 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full text-[7px] font-black tracking-widest uppercase italic">Sovereign Node</div>
                  </div>

                  <video ref={(el) => { if (el) videoRefs.current.set(p.id, el); }} src={p.media} autoPlay loop muted playsInline className="w-full aspect-[4/5] object-cover transition-transform duration-[3s] group-hover:scale-110" />

                  {/* INTERACTION SIDEBAR */}
                  <div className="absolute right-8 bottom-32 flex flex-col items-center gap-8 z-40" onClick={e => e.stopPropagation()}>
                    {[
                      { icon: '❤️', label: '1.2M', color: 'hover:bg-pink-600' },
                      { icon: '💬', label: p.comments.length, color: 'hover:bg-zinc-800', action: () => setActiveCommentId(activeCommentId === p.id ? null : p.id) },
                      { icon: '🚀', label: 'Share', color: 'hover:bg-zinc-800' },
                      { icon: '🔖', label: 'Save', color: 'hover:bg-zinc-800' }
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center gap-2" onClick={item.action}>
                        <div className={`w-14 h-14 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[1.4rem] flex items-center justify-center text-xl transition-all cursor-pointer ${item.color} active:scale-75`}>
                          {item.icon}
                        </div>
                        <span className="text-[9px] font-black italic opacity-40">{item.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* CAPTION & COMMENTS */}
                  <div className="absolute bottom-0 left-0 right-0 p-10 pt-24 bg-gradient-to-t from-black via-black/80 to-transparent">
                    <p className="text-[16px] font-bold leading-relaxed tracking-tight text-zinc-100 max-w-[80%]">{p.caption}</p>
                    {activeCommentId === p.id && (
                      <div className="mt-6 p-6 bg-white/[0.03] backdrop-blur-3xl rounded-[2.5rem] border border-white/10 animate-in slide-in-from-bottom-4">
                        {p.comments.map((c, i) => (
                          <p key={i} className="text-[10px] font-medium opacity-70 mb-2 border-l-2 border-pink-500 pl-4">{c}</p>
                        ))}
                        <input 
                          placeholder="Add to the loop..." 
                          className="w-full mt-4 bg-black/40 rounded-2xl px-5 py-3 text-[10px] outline-none border border-white/5"
                          onKeyDown={e => e.key === 'Enter' && setPosts(prev => prev.map(post => post.id === p.id ? {...post, comments: [...post.comments, (e.target as HTMLInputElement).value]} : post))}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* INBOX (MESSAGING NODE) */}
        {tab === 'inbox' && (
          <div className="max-w-md mx-auto p-12 space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
            {chatId === null ? (
              chats.map(c => (
                <div key={c.id} onClick={() => setChatId(c.id)} className="p-10 bg-white/[0.02] rounded-[3.5rem] border border-white/5 flex items-center gap-8 cursor-pointer hover:bg-white/[0.05] transition-all group shadow-2xl relative">
                   <div className="absolute inset-0 rounded-[3.5rem] border-[0.5px] border-white/10 pointer-events-none" />
                   <div className="w-16 h-16 rounded-[1.5rem] bg-zinc-900 border border-white/10 flex items-center justify-center text-lg font-black text-pink-500">{c.initial}</div>
                   <div className="flex-1">
                      <p className="font-black text-base italic tracking-tight">{c.name}</p>
                      <p className="text-[9px] text-zinc-600 font-black uppercase tracking-[0.4em] mt-2">Encrypted Node</p>
                   </div>
                </div>
              ))
            ) : (
              <div className="h-[60vh] flex flex-col bg-zinc-950/80 backdrop-blur-3xl rounded-[4rem] border border-white/10 overflow-hidden shadow-2xl relative">
                <div className="p-8 border-b border-white/5 flex justify-between items-center bg-black/40">
                  <p className="text-[10px] font-black uppercase text-pink-500">{chats.find(c => c.id === chatId)?.name}</p>
                  <button onClick={() => setChatId(null)} className="text-[9px] font-black uppercase opacity-40">Exit</button>
                </div>
                <div className="flex-1 p-8 overflow-y-auto space-y-6 no-scrollbar">
                  {chats.find(c => c.id === chatId)?.msgs.map((m, i) => (
                    <div key={i} className={`p-6 rounded-[2.2rem] text-[12px] font-bold max-w-[80%] ${i % 2 === 0 ? 'bg-white/5' : 'bg-pink-600 ml-auto shadow-lg shadow-pink-900/30'}`}>{m}</div>
                  ))}
                </div>
                <div className="p-8 flex gap-4 bg-black/40 border-t border-white/5">
                  <input value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' && setChats(prev => prev.map(c => c.id === chatId ? {...c, msgs: [...c.msgs, msg]} : c))} placeholder="Message..." className="flex-1 bg-white/5 rounded-3xl px-8 text-[11px] outline-none" />
                </div>
              </div>
            )}
          </div>
        )}

        {/* PROFILE (SOVEREIGN DASHBOARD) */}
        {tab === 'profile' && (
          <div className="max-w-md mx-auto p-12 text-center animate-in zoom-in-95 duration-1000">
            <div className="relative inline-block mb-12 p-1.5 bg-gradient-to-br from-pink-500 via-yellow-500 to-pink-900 rounded-[4.5rem] shadow-[0_0_100px_rgba(255,20,147,0.2)]">
              <div className="w-48 h-48 rounded-[4.2rem] bg-black flex items-center justify-center text-7xl font-black italic border-[8px] border-black">IV</div>
            </div>
            <h2 className="text-5xl font-black italic tracking-tighter uppercase mb-4">Ivy Maguraushe</h2>
            <p className="text-[11px] font-black text-pink-500 uppercase tracking-[0.6em] mb-16">Global Founder • Zimbabwe</p>
            <div className="grid grid-cols-3 gap-5 mb-16">
              {[ {l: 'Reach', v: '1.2M'}, {l: 'Nodes', v: '48'}, {l: 'Loops', v: '240'} ].map(s => (
                <div key={s.l} className="bg-white/[0.03] backdrop-blur-xl p-8 rounded-[3rem] border border-white/5 shadow-2xl relative">
                  <div className="absolute inset-0 rounded-[3rem] border-[0.5px] border-white/10 pointer-events-none" />
                  <p className="text-2xl font-black italic">{s.v}</p>
                  <p className="text-[8px] font-black text-zinc-600 uppercase mt-2">{s.l}</p>
                </div>
              ))}
            </div>
            <button className="w-full py-8 bg-white text-black rounded-[2.5rem] font-black uppercase text-[11px] tracking-[0.5em] shadow-white/10 shadow-2xl">Deploy Updates</button>
          </div>
        )}
      </main>

      {/* 5. THE ICONIC DOCK (PURE APPLE GLASS) */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 w-[92%] max-w-sm h-24 bg-white/[0.03] backdrop-blur-[60px] border border-white/10 rounded-[5rem] flex items-center justify-around z-[5000] shadow-[0_50px_100px_-15px_rgba(0,0,0,1)]">
        <div className="absolute inset-0 rounded-[5rem] border-[0.5px] border-white/20 pointer-events-none shadow-inner" />
        <button onClick={() => setTab('feed')} className={`text-2xl transition-all duration-500 ${tab === 'feed' ? 'text-pink-500 scale-125' : 'opacity-20 hover:opacity-50'}`}>🏠</button>
        <button onClick={() => setTab('inbox')} className={`text-2xl transition-all duration-500 ${tab === 'inbox' ? 'text-pink-500 scale-125' : 'opacity-20 hover:opacity-50'}`}>✉️</button>
        <div onClick={() => setIsUploadOpen(true)} className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-900 rounded-[2.6rem] flex items-center justify-center text-5xl font-light text-white transform -translate-y-10 shadow-[0_25px_50px_rgba(255,20,147,0.4)] cursor-pointer hover:rotate-90 hover:scale-110 transition-all duration-700">
           <span className="mb-2">+</span>
        </div>
        <button className="text-2xl opacity-20 hover:opacity-50 transition-all">🔍</button>
        <button onClick={() => setTab('profile')} className={`text-2xl transition-all duration-500 ${tab === 'profile' ? 'text-pink-500 scale-125' : 'opacity-20 hover:opacity-50'}`}>👤</button>
      </div>

    </div>
  );
}