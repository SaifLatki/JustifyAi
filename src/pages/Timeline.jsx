import { Calendar, CheckCircle, Circle } from 'lucide-react';

export default function Timeline() {
  const milestones = [
    {
      month: 'October 2024',
      title: 'Foundation & Planning',
      tasks: [
        'Business plan finalization',
        'Market research completion',
        'Team formation',
        'Technology stack selection'
      ],
      completed: true
    },
    {
      month: 'November 2024',
      title: 'Product Development',
      tasks: [
        'AI model training with legal datasets',
        'Web platform development',
        'Mobile app prototype',
        'Beta testing with 50 users'
      ],
      completed: false
    },
    {
      month: 'December 2024',
      title: 'Launch & Growth',
      tasks: [
        'Public launch',
        'Marketing campaign rollout',
        'Lawyer marketplace integration',
        'Customer acquisition: 500+ users'
      ],
      completed: false
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-5xl mx-auto space-y-32">

        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Project <span className="bg-gradient-to-r from-[#00C2FF] to-[#00FF88] bg-clip-text text-transparent">Timeline</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our roadmap to transforming legal accessibility
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00C2FF] via-[#00FF88] to-transparent hidden md:block"></div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative md:pl-20">
                
                {/* Timeline Icon */}
                <div className="absolute left-0 top-0 hidden md:flex">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 ${
                    milestone.completed ? 'bg-[#00FF88] border-[#00FF88]/30' : 'bg-[#0D1117] border-[#00C2FF]/30'
                  }`}>
                    {milestone.completed ? <CheckCircle className="w-8 h-8 text-white" /> : <Circle className="w-8 h-8 text-[#00C2FF]" />}
                  </div>
                </div>

                {/* Milestone Card */}
                <div className={`p-8 rounded-2xl border transition-all duration-300 ${
                  milestone.completed
                    ? 'bg-gradient-to-br from-[#00FF88]/10 to-transparent border-[#00FF88]/30'
                    : 'bg-white/5 border-white/10 hover:border-[#00C2FF]/50'
                }`}>
                  <div className="flex items-center space-x-3 mb-4">
                    <Calendar className={`w-5 h-5 ${milestone.completed ? 'text-[#00FF88]' : 'text-[#00C2FF]'}`} />
                    <span className={`text-sm font-semibold uppercase tracking-wide ${
                      milestone.completed ? 'text-[#00FF88]' : 'text-[#00C2FF]'
                    }`}>
                      {milestone.month}
                    </span>
                    {milestone.completed && (
                      <span className="px-3 py-1 bg-[#00FF88]/20 text-[#00FF88] text-xs font-semibold rounded-full">
                        Completed
                      </span>
                    )}
                  </div>

                  <h3 className="text-3xl font-bold text-white mb-6">{milestone.title}</h3>

                  <div className="space-y-3">
                    {milestone.tasks.map((task, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <div className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          milestone.completed ? 'bg-[#00FF88]' : 'bg-[#00C2FF]'
                        }`}></div>
                        <span className={milestone.completed ? 'text-gray-300' : 'text-gray-400'}>{task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-[#00C2FF]/10 to-transparent border border-[#00C2FF]/30 rounded-xl text-center">
            <div className="text-4xl font-bold text-[#00C2FF] mb-2">3</div>
            <div className="text-gray-400">Months to Launch</div>
          </div>
          <div className="p-6 bg-gradient-to-br from-[#00FF88]/10 to-transparent border border-[#00FF88]/30 rounded-xl text-center">
            <div className="text-4xl font-bold text-[#00FF88] mb-2">500+</div>
            <div className="text-gray-400">Target Users by Dec</div>
          </div>
          <div className="p-6 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl text-center">
            <div className="text-4xl font-bold text-white mb-2">100%</div>
            <div className="text-gray-400">Committed to Success</div>
          </div>
        </div>
      </div>
    </div>
  );
}
