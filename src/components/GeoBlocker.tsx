import { useEffect, useState } from 'react';
import { Globe } from 'lucide-react';

interface GeoBlockerProps {
  children: React.ReactNode;
}

export function GeoBlocker({ children }: GeoBlockerProps) {
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);
  const [country, setCountry] = useState<string>('');

  useEffect(() => {
    const checkLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setCountry(data.country_name || 'Unknown');

        if (data.country_code === 'KE') {
          setIsAllowed(true);
        } else {
          setIsAllowed(false);
        }
      } catch (error) {
        setIsAllowed(true);
      }
    };

    checkLocation();
  }, []);

  if (isAllowed === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0f1a] via-[#0d1520] to-[#0a0f1a] flex items-center justify-center px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00B4D8] opacity-10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C4F000] opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="relative z-10">
          <div className="animate-spin rounded-full h-12 w-12 border border-[#00B4D8] border-t-[#C4F000]"></div>
        </div>
      </div>
    );
  }

  if (!isAllowed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0f1a] via-[#0d1520] to-[#0a0f1a] flex items-center justify-center px-4 py-12">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00B4D8] opacity-10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C4F000] opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-2xl w-full text-center">
          <div className="mb-8 flex justify-center">
            <div className="p-4 bg-red-500/10 rounded-full border border-red-500/30">
              <Globe className="w-16 h-16 text-red-400" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Access Restricted</h1>

          <p className="text-gray-300 text-lg md:text-xl mb-8">
            GamiKonnect is currently only available in Kenya.
          </p>

          <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 mb-8">
            <p className="text-gray-400 text-sm mb-2">Your Location</p>
            <p className="text-2xl font-semibold text-[#00B4D8]">{country}</p>
          </div>

          <div className="max-w-xl mx-auto p-6 bg-gradient-to-br from-[#00B4D8]/5 to-[#C4F000]/5 border border-white/10 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-3">Coming Soon to Your Region</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              We're excited about bringing GamiKonnect to more countries across Africa. Stay tuned for expansion updates as we grow our competitive gaming network.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}