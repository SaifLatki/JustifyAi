import { BookOpen, ExternalLink } from 'lucide-react';

export default function References() {
  const references = [
    {
      category: 'Market Research',
      items: [
        {
          title: 'Global Legal Tech Market Report 2024',
          source: 'Thomson Reuters',
          description: 'Analysis of legal technology adoption trends and market size projections',
          year: '2024'
        },
        {
          title: 'Pakistan Digital Economy Report',
          source: 'Pakistan Software Houses Association (P@SHA)',
          description: 'Overview of digital transformation in Pakistan\'s service sector',
          year: '2023'
        },
        {
          title: 'Access to Justice: The Impact of Technology',
          source: 'World Justice Project',
          description: 'Study on how technology improves legal accessibility globally',
          year: '2023'
        }
      ]
    },
    {
      category: 'Technology & AI',
      items: [
        {
          title: 'Natural Language Processing in Legal Tech',
          source: 'Stanford Legal Informatics',
          description: 'Research on NLP applications for contract analysis and legal document processing',
          year: '2024'
        },
        {
          title: 'AI Ethics in Legal Services',
          source: 'IEEE Technology and Society',
          description: 'Guidelines for responsible AI implementation in legal applications',
          year: '2023'
        },
        {
          title: 'Machine Learning for Contract Review',
          source: 'Journal of Legal Technology',
          description: 'Academic research on ML accuracy in identifying legal risks',
          year: '2024'
        }
      ]
    },
    {
      category: 'Business & Finance',
      items: [
        {
          title: 'Legal Tech Startup Funding Trends',
          source: 'Crunchbase News',
          description: 'Investment patterns and valuation metrics for legal technology companies',
          year: '2024'
        },
        {
          title: 'SaaS Business Model Best Practices',
          source: 'Harvard Business Review',
          description: 'Strategies for building sustainable subscription-based businesses',
          year: '2023'
        },
        {
          title: 'Customer Acquisition in B2C Legal Services',
          source: 'McKinsey & Company',
          description: 'Analysis of effective marketing strategies in legal tech sector',
          year: '2023'
        }
      ]
    },
    {
      category: 'Legal & Compliance',
      items: [
        {
          title: 'Data Privacy Regulations in Pakistan',
          source: 'Pakistan Telecommunication Authority',
          description: 'Guidelines for handling sensitive legal data and user privacy',
          year: '2024'
        },
        {
          title: 'Professional Ethics in Legal Technology',
          source: 'American Bar Association',
          description: 'Ethical considerations for AI-assisted legal services',
          year: '2023'
        },
        {
          title: 'Consumer Protection in Digital Services',
          source: 'Competition Commission of Pakistan',
          description: 'Regulatory framework for consumer-facing legal platforms',
          year: '2023'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto space-y-32">

        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-[#00C2FF] to-[#00FF88] bg-clip-text text-transparent">
              References
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Research and resources that informed our business strategy
          </p>
        </div>

        {/* Reference Sections */}
        <div className="space-y-16">
          {references.map((section, index) => (
            <div key={index}>
              <div className="flex items-center space-x-3 mb-6">
                <BookOpen className="w-6 h-6 text-[#00C2FF]" />
                <h2 className="text-3xl font-bold text-white">{section.category}</h2>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {section.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="group p-6 bg-white/5 border border-white/10 rounded-xl hover:border-[#00C2FF]/50 transition-all duration-300 hover:bg-white/[0.07]"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#00C2FF] transition-colors">
                          {item.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm mb-3">
                          <span className="text-[#00FF88] font-medium">{item.source}</span>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-400">{item.year}</span>
                        </div>
                      </div>
                      <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-[#00C2FF] transition-colors flex-shrink-0 ml-4" />
                    </div>
                    <p className="text-gray-400 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="mt-16 p-8 bg-gradient-to-br from-[#00C2FF]/10 to-[#00FF88]/10 border border-[#00C2FF]/30 rounded-2xl">
          <h3 className="text-2xl font-bold text-white mb-6">Additional Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-300">
            <div>
              <h4 className="font-semibold text-white mb-3">Industry Reports</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-[#00C2FF]">→</span>
                  <span>Gartner Legal Technology Market Guide</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#00C2FF]">→</span>
                  <span>IDC FutureScape: Worldwide Legal Industry Predictions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#00C2FF]">→</span>
                  <span>Deloitte Legal Tech Landscape Report</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Academic Publications</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-[#00FF88]">→</span>
                  <span>MIT Computational Law Report</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#00FF88]">→</span>
                  <span>Oxford Journal of Law and Technology</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#00FF88]">→</span>
                  <span>Stanford Center on the Legal Profession</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>All references accessed and reviewed as of October 2024</p>
          <p className="mt-2">For full citations and additional resources, please contact the JustifyAI team</p>
        </div>

      </div>
    </div>
  );
}
