import { 
  TrendingUp, Target, Zap, Shield, Globe, Lightbulb, 
  FileText, Users, Sparkles 
} from 'lucide-react';

export default function Market() {
  const marketSegments = [
    {
      segment: 'Students & Young Professionals',
      size: '2M+ in Pakistan',
      needs: 'Rental agreements, internship contracts, loan documents',
      growth: '+15% annually'
    },
    {
      segment: 'Freelancers & Gig Workers',
      size: '1.5M+ active',
      needs: 'Client contracts, service agreements, IP protection',
      growth: '+25% annually'
    },
    {
      segment: 'Small & Medium Businesses',
      size: '500K+ businesses',
      needs: 'Vendor contracts, partnerships, employment agreements',
      growth: '+12% annually'
    }
  ];

  const competitors = [
    {
      name: 'Traditional Law Firms',
      strength: 'Expert human advice',
      weakness: 'Expensive, slow, inaccessible',
      ourEdge: 'Instant AI analysis at fraction of cost'
    },
    {
      name: 'Generic AI Tools',
      strength: 'Fast processing',
      weakness: 'Not specialized for legal domain',
      ourEdge: 'Purpose-built legal AI with lawyer marketplace'
    },
    {
      name: 'Legal Tech Startups',
      strength: 'Modern interface',
      weakness: 'Limited features, no local support',
      ourEdge: 'Comprehensive features + Pakistan market focus'
    }
  ];

  const products = [
    {
      icon: FileText,
      name: 'Document Analysis',
      description: 'AI-powered contract summaries and risk detection'
    },
    {
      icon: Sparkles,
      name: 'Smart Suggestions',
      description: 'AI recommendations for better contract terms'
    },
    {
      icon: Users,
      name: 'Lawyer Marketplace',
      description: 'Connect with verified legal professionals'
    },
    {
      icon: Shield,
      name: 'Enterprise Solutions',
      description: 'Custom integrations and team collaboration'
    }
  ];

  const usps = [
    {
      icon: Zap,
      title: 'Speed',
      description: 'Get insights in seconds, not days or weeks'
    },
    {
      icon: Target,
      title: 'Accuracy',
      description: 'AI trained on millions of legal documents'
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Available 24/7 from anywhere, any device'
    },
    {
      icon: Lightbulb,
      title: 'Affordability',
      description: '90% cheaper than traditional legal consultation'
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Market & <span className="bg-gradient-to-r from-[#00C2FF] to-[#00FF88] bg-clip-text text-transparent">Product</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Understanding our market opportunity and competitive advantage
          </p>
        </div>

        {/* Market Analysis */}
        <div className="mb-20">
          <div className="flex items-center space-x-3 mb-8">
            <TrendingUp className="w-8 h-8 text-[#00C2FF]" />
            <h2 className="text-4xl font-bold text-white">Market Analysis</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {marketSegments.map((segment, index) => (
              <div
                key={index}
                className="p-6 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl hover:border-[#00C2FF]/50 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-4">{segment.segment}</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-400 text-sm">Market Size:</span>
                    <p className="text-[#00C2FF] font-semibold">{segment.size}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Key Needs:</span>
                    <p className="text-gray-300 text-sm">{segment.needs}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Growth Rate:</span>
                    <p className="text-[#00FF88] font-semibold">{segment.growth}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-8 bg-gradient-to-br from-[#00C2FF]/10 to-[#00FF88]/10 border border-[#00C2FF]/30 rounded-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">Market Trends</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start space-x-3">
                <span className="text-[#00C2FF] font-bold">→</span>
                <span>Digital transformation in legal services accelerating post-pandemic</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-[#00C2FF] font-bold">→</span>
                <span>Growing demand for affordable legal assistance among SMEs</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-[#00C2FF] font-bold">→</span>
                <span>AI adoption in legal tech increasing at 35% CAGR globally</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-[#00C2FF] font-bold">→</span>
                <span>Rising awareness about contract literacy and legal rights</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Competitive Landscape */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white mb-8">Competitive Landscape</h2>
          <div className="space-y-6">
            {competitors.map((competitor, index) => (
              <div
                key={index}
                className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-[#00FF88]/50 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-white mb-6">{competitor.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <span className="text-gray-400 text-sm uppercase tracking-wide">Strength</span>
                    <p className="text-gray-300 mt-2">{competitor.strength}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm uppercase tracking-wide">Weakness</span>
                    <p className="text-gray-300 mt-2">{competitor.weakness}</p>
                  </div>
                  <div>
                    <span className="text-[#00FF88] text-sm uppercase tracking-wide font-semibold">Our Edge</span>
                    <p className="text-[#00FF88] mt-2 font-medium">{competitor.ourEdge}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Line */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white mb-8">Product Line</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => {
              const Icon = product.icon;
              return (
                <div
                  key={index}
                  className="p-6 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl hover:border-[#00C2FF]/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-[#00C2FF]/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#00C2FF]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
                  <p className="text-gray-400 text-sm">{product.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* USPs */}
        <div>
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            Our Unique Selling Propositions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {usps.map((usp, index) => {
              const Icon = usp.icon;
              return (
                <div
                  key={index}
                  className="p-8 bg-gradient-to-br from-[#00C2FF]/10 to-transparent border border-[#00C2FF]/30 rounded-2xl text-center hover:shadow-xl hover:shadow-[#00C2FF]/20 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-[#00C2FF]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-[#00C2FF]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{usp.title}</h3>
                  <p className="text-gray-400 text-sm">{usp.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
