import { useState } from 'react';
import { supabase } from './lib/supabase';
import { Rocket, CheckCircle, AlertCircle, Gamepad2, Trophy, Users } from 'lucide-react';

function App() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const { error } = await supabase
        .from('waitlist_signups')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') {
          setMessage("You're already on the waitlist!");
          setStatus('success');
        } else {
          throw error;
        }
      } else {
        setMessage("You're on the list! We'll notify you at launch.");
        setStatus('success');
        setEmail('');
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1a] via-[#0d1520] to-[#0a0f1a] flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00B4D8] opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C4F000] opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="mb-8 flex justify-center">
            <img
              src="/GamiKonnect_MainLogo-removebg-preview.png"
              alt="GamiKonnect Logo"
              className="w-full max-w-md h-auto"
            />
          </div>

          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00B4D8]/10 border border-[#00B4D8]/30 rounded-full mb-6">
              <Rocket className="w-4 h-4 text-[#00B4D8]" />
              <span className="text-[#00B4D8] font-semibold text-sm tracking-wide">LAUNCHING SOON</span>
            </div>
          </div>

          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-[#C4F000]/20 border border-[#C4F000]/50 text-[#C4F000] text-xs font-bold tracking-widest rounded-full mb-4">
              KENYAN'S AND AFRICA COMPETITIVE GAMING NETWORK
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">Where Gaming Meets</span>
            <br />
            <span className="bg-gradient-to-r from-[#00B4D8] via-[#0EA5E9] to-[#C4F000] bg-clip-text text-transparent">
              Competition
            </span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl mb-6 max-w-2xl mx-auto leading-relaxed">
            Connect players, gaming arenas, and leagues through structured, skill-based competitions. Transform casual gaming into a competitive, social, and scalable ecosystem.
          </p>

          <p className="text-[#C4F000] font-semibold text-sm tracking-wider uppercase">
            Play. Compete. Rank.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={status === 'loading' || status === 'success'}
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00B4D8] focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="w-full px-6 py-4 bg-gradient-to-r from-[#00B4D8] to-[#0EA5E9] hover:from-[#0EA5E9] hover:to-[#00B4D8] text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#00B4D8]/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none"
            >
              {status === 'loading' ? 'Joining...' : status === 'success' ? 'Welcome to the Waitlist!' : 'Join the Waitlist'}
            </button>
          </form>

          {message && (
            <div className={`mt-4 p-4 rounded-lg flex items-center gap-3 ${
              status === 'success'
                ? 'bg-[#C4F000]/10 border border-[#C4F000]/30'
                : 'bg-red-500/10 border border-red-500/30'
            }`}>
              {status === 'success' ? (
                <CheckCircle className="w-5 h-5 text-[#C4F000] flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              )}
              <p className={status === 'success' ? 'text-[#C4F000]' : 'text-red-400'}>
                {message}
              </p>
            </div>
          )}
        </div>

        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#00B4D8]/50 transition-all duration-300 group">
              <div className="mb-4 inline-flex p-3 bg-[#00B4D8]/10 rounded-lg group-hover:bg-[#00B4D8]/20 transition-colors">
                <Gamepad2 className="w-6 h-6 text-[#00B4D8]" />
              </div>
              <div className="text-xl font-bold text-white mb-2">For Players</div>
              <p className="text-gray-400 text-sm">Compete with gamers across Kenya, build your ranking, and establish your competitive identity</p>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#00B4D8]/50 transition-all duration-300 group">
              <div className="mb-4 inline-flex p-3 bg-[#00B4D8]/10 rounded-lg group-hover:bg-[#00B4D8]/20 transition-colors">
                <Users className="w-6 h-6 text-[#00B4D8]" />
              </div>
              <div className="text-xl font-bold text-white mb-2">For Arenas</div>
              <p className="text-gray-400 text-sm">Connect your gaming venue to a structured ecosystem and manage tournaments with ease</p>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#C4F000]/50 transition-all duration-300 group">
              <div className="mb-4 inline-flex p-3 bg-[#C4F000]/10 rounded-lg group-hover:bg-[#C4F000]/20 transition-colors">
                <Trophy className="w-6 h-6 text-[#C4F000]" />
              </div>
              <div className="text-xl font-bold text-white mb-2">For Leagues</div>
              <p className="text-gray-400 text-sm">Scale your esports league with integrated tournaments, rankings, and community engagement tools</p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-[#00B4D8]/5 to-[#C4F000]/5 border border-white/10 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              We're transforming the African gaming landscape by creating a comprehensive platform that connects gamers with competitive opportunities. Through structured, skill-based competitions, we enable players to rank up, build identity, and compete meaningfully across our integrated network of players, arenas, and leagues.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;