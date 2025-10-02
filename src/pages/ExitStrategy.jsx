import { Handshake, Building2, TrendingUp, Target } from 'lucide-react';

export default function ExitStrategy() {
  const strategies = [
    {
      icon: Handshake,
      title: 'Acquisition',
      timeline: '3-5 Years',
      description: 'Strategic acquisition by major legal tech companies or traditional law firms seeking to expand their digital offerings.',
      targets: [
        'LegalZoom, Rocket Lawyer, or similar legal tech giants',
        'Major law firms investing in technology',
        'Tech companies expanding into legal services',
        'International legal tech platforms'
      ],
      value: 'Estimated valuation: $15M - $30M based on user base and revenue multiples'
    },
    {
      icon: Building2,
      title: 'Strategic Partnership',
      timeline: '2-4 Years',
      description: 'Form strategic partnerships with established legal firms or tech companies, potentially leading to buyout or merger.',
      targets: [
        'Partnership with bar associations',
        'Integration with legal practice management software',
        'Collaboration with educational institutions',
        'White-label solutions for corporate legal departments'
      ],
      value: 'Multiple partnership revenue streams while maintaining independence'
    },
    {
      icon: TrendingUp,
      title: 'Sustainable Growth',
      timeline: 'Ongoing',
      description: 'Build a profitable, self-sustaining business with consistent growth and dividend distribution to founders.',
      targets: [
        'Achieve 50,000+ active users',
        'Expand to multiple countries',
        'Diversify revenue streams',
        'Build strong brand equity'
      ],
      value: 'Long-term wealth creation through profitable operations and market leadership'
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Exit <span className="bg-gradient-to-r from-[#00C2FF] to-[#00FF88] bg-clip-text text-transparent">Strategy</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Multiple pathways to value realization and long-term success
          </p>
        </div>

        {/* Strategies */}
        <div className="space-y-8 mb-16">
          {strategies.map((strategy, index) => {
            const Icon = strategy.icon;
            return (
              <div
                key={index}
                className="p-8 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl hover:border-[#00C2FF]/50 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column */}
                  <div className="lg:col-span-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#00C2FF]/20 to-[#00FF88]/20 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-[#00C2FF]" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">{strategy.title}</h3>
                    <div className="inline-block px-4 py-1 bg-[#00C2FF]/20 rounded-full">
                      <span className="text-[#00C2FF] text-sm font-semibold">{strategy.timeline}</span>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="lg:col-span-9 space-y-6">
                    <p className="text-gray-300 text-lg leading-relaxed">{strategy.description}</p>

                    {/* Targets */}
                    <div>
                      <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                        <Target className="w-4 h-4 text-[#00FF88]" />
                        <span>Key Targets & Opportunities</span>
                      </h4>
                      <ul className="space-y-2">
                        {strategy.targets.map((target, idx) => (
                          <li key={idx} className="flex items-start space-x-3 text-gray-400">
                            <span className="text-[#00C2FF] font-bold mt-1">→</span>
                            <span>{target}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Value */}
                    <div className="p-4 bg-gradient-to-r from-[#00FF88]/10 to-transparent border-l-4 border-[#00FF88] rounded">
                      <p className="text-[#00FF88] font-semibold">{strategy.value}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-8 bg-gradient-to-br from-[#00C2FF]/10 to-transparent border border-[#00C2FF]/30 rounded-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">Why We're Attractive</h3>
            <ul className="space-y-4">
              {[
                { title: 'Proven AI Technology', desc: 'Advanced legal AI with high accuracy and scalability' },
                { title: 'Growing User Base', desc: 'Strong traction in underserved market segments' },
                { title: 'Revenue Model', desc: 'Multiple revenue streams with high margins' },
                { title: 'Market Position', desc: 'First-mover advantage in Pakistan legal tech space' }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#00C2FF]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#00C2FF] text-xs font-bold">{idx + 1}</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 bg-gradient-to-br from-[#00FF88]/10 to-transparent border border-[#00FF88]/30 rounded-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">Value Drivers</h3>
            {[
              { label: 'User Growth Rate', value: '25% MoM', width: '85%' },
              { label: 'Revenue Growth', value: '200% YoY', width: '90%' },
              { label: 'Technology IP', value: 'Proprietary', width: '80%' },
              { label: 'Market Potential', value: '$500M+', width: '95%' }
            ].map((item, idx) => (
              <div key={idx} className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">{item.label}</span>
                  <span className="text-[#00FF88] font-bold">{item.value}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-[#00FF88] h-2 rounded-full" style={{ width: item.width }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
