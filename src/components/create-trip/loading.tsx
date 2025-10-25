export const Loading = () => {
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center px-6 py-12 bg-[#F54927] overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.02)_40%,rgba(0,0,0,0.05)_100%)]"></div>
            <div className="absolute inset-0 -z-10">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white/10 animate-float"
                        style={{
                            width: `${Math.random() * 60 + 20}px`,
                            height: `${Math.random() * 60 + 20}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                        }}
                    />
                ))}
            </div>

            <div className="relative w-full max-w-3xl p-12 bg-[#1E1E1E] rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.4)] overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-[#F54927]/10 via-transparent to-[#F54927]/10 rounded-3xl blur-2xl animate-pulse-slow pointer-events-none"></div>

                <div className="relative z-10 flex flex-col items-center">
                    <div className="relative w-24 h-24 mb-8">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 bg-linear-to-br from-[#F54927] to-[#ff7659] rounded-full animate-pulse-slow shadow-[0_0_30px_rgba(245,73,39,0.5)]"></div>
                        </div>

                        {[0, 1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="absolute inset-0 animate-orbit"
                                style={{
                                    animationDelay: `${i * 0.75}s`,
                                    animationDuration: '3s'
                                }}
                            >
                                <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)]"></div>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-3 text-center">
                        Crafting Your Perfect Journey
                    </h2>
                    <p className="text-white/60 text-base mb-10 text-center">Creating personalized itinerary...</p>
                </div>

                <div className="relative z-10 space-y-3">
                    {[
                        { text: 'Analyzing preferences', delay: '0s' },
                        { text: 'Finding destinations', delay: '1s' },
                        { text: 'Building itinerary', delay: '2s' }
                    ].map((step, i) => (
                        <div
                            key={i}
                            className="flex items-center space-x-3 opacity-0 animate-slide-in"
                            style={{ animationDelay: step.delay }}
                        >
                            <div className="shrink-0 w-2 h-2 bg-[#F54927] rounded-full"></div>
                            <div className="flex-1 h-2 bg-[#2A2A2A] rounded-full overflow-hidden relative">
                                <div
                                    className="absolute inset-0 bg-linear-to-r from-transparent via-[#F54927] to-transparent rounded-full shimmer-bar"
                                    style={{ animationDelay: step.delay }}
                                ></div>
                            </div>
                            <span className="text-white/70 text-sm">
                                {step.text}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          .animate-float { animation: float 6s ease-in-out infinite; }
  
          @keyframes pulse-slow {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.08); }
          }
          .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }
  
          @keyframes orbit {
            0% { transform: rotate(0deg) translateX(48px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(48px) rotate(-360deg); }
          }
          .animate-orbit { animation: orbit 3s linear infinite; }
  
          @keyframes shimmer-bar {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }
          .shimmer-bar { animation: shimmer-bar 1.8s ease-in-out infinite; }
  
          @keyframes slide-in {
            0% { opacity: 0; transform: translateX(-10px); }
            100% { opacity: 1; transform: translateX(0); }
          }
          .animate-slide-in { animation: slide-in 0.5s ease-out forwards; }
        `}</style>
        </div>
    )
}