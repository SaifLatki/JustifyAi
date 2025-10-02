import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  FileText, 
  Shield, 
  Zap, 
  Users, 
  Check,
  ArrowRight,
  Star,
  Upload,
  TrendingUp,
  Award,
  Clock,
  Globe,
  ChevronRight
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

export function Landing() {
  const { user } = useAuth();

  const features = [
    {
      icon: FileText,
      title: 'Smart Contract Analysis',
      description: 'AI-powered analysis that breaks down complex legal language into clear, actionable insights.',
      color: 'blue'
    },
    {
      icon: Shield,
      title: 'Risk Assessment',
      description: 'Comprehensive risk scoring with flagged clauses and suggested improvements for better protection.',
      color: 'red'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get detailed summaries and risk analysis in minutes, not hours or days.',
      color: 'yellow'
    },
    {
      icon: Users,
      title: 'Expert Network',
      description: 'Connect with qualified lawyers when you need professional legal advice.',
      color: 'green'
    }
  ];

  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for trying out the platform',
      features: [
        '3 document uploads per month',
        'Basic contract summaries',
        'Risk score analysis',
        'Email support'
      ]
    },
    {
      name: 'Pro',
      price: '$29',
      description: 'For individuals and small businesses',
      features: [
        'Unlimited document uploads',
        'Detailed risk analysis',
        'Suggested clause improvements',
        'Document comparison',
        'Priority support',
        'Export to PDF'
      ],
      popular: true
    },
    {
      name: 'Business',
      price: '$99',
      description: 'For teams and organizations',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Admin dashboard',
        'Usage analytics',
        'Custom integrations',
        'Phone support'
      ]
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Small Business Owner',
      company: 'TechStart Inc.',
      content: 'ClearContracts saved me thousands in legal fees. The risk analysis helped me spot problematic clauses before signing.',
      rating: 5,
      avatar: 'SJ'
    },
    {
      name: 'Michael Chen',
      role: 'Startup Founder',
      company: 'InnovateLab',
      content: 'The AI summaries are incredibly accurate. It\'s like having a legal expert review every contract instantly.',
      rating: 5,
      avatar: 'MC'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Freelancer',
      company: 'Creative Solutions',
      content: 'Simple to use and incredibly helpful. I now understand exactly what I\'m signing every time.',
      rating: 5,
      avatar: 'ER'
    }
  ];

  const stats = [
    { label: 'Documents Analyzed', value: '50,000+', icon: FileText },
    { label: 'Risk Issues Found', value: '12,500+', icon: Shield },
    { label: 'Happy Users', value: '5,000+', icon: Users },
    { label: 'Average Time Saved', value: '4.5 hrs', icon: Clock }
  ];
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                ClearContracts
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Pricing</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Reviews</a>
            </nav>

            <div className="flex items-center space-x-4">
              {user ? (
                <Link to="/dashboard">
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/auth">
                    <Button variant="ghost">Sign In</Button>
                  </Link>
                  <Link to="/auth">
                    <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm font-medium mb-6">
              <Award className="mr-2 h-4 w-4" />
              Trusted by 5,000+ businesses worldwide
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Upload a contract —{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                get clear advice
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Stop guessing what your contracts mean. Our AI analyzes legal documents in seconds, 
              highlighting risks and explaining complex terms in plain English.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link to="/upload">
                  <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                    <Upload className="mr-2 h-5 w-5" />
                    Upload Your First Contract
                  </Button>
                </Link>
              ) : (
                <Link to="/auth">
                  <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                    Start Free Analysis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              )}
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-2 hover:bg-gray-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                See How It Works
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              No credit card required • Free tier includes 3 analyses per month
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to understand contracts
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional-grade contract analysis powered by AI, designed for everyone
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 bg-gradient-to-br ${
                    feature.color === 'blue' ? 'from-blue-100 to-blue-200' :
                    feature.color === 'red' ? 'from-red-100 to-red-200' :
                    feature.color === 'yellow' ? 'from-yellow-100 to-yellow-200' :
                    'from-green-100 to-green-200'
                  } rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <feature.icon className={`h-6 w-6 ${
                      feature.color === 'blue' ? 'text-blue-600' :
                      feature.color === 'red' ? 'text-red-600' :
                      feature.color === 'yellow' ? 'text-yellow-600' :
                      'text-green-600'
                    }`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that's right for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  plan.popular ? 'ring-2 ring-blue-600 scale-105 shadow-xl' : 'shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-1">
                    {plan.price}
                    <span className="text-lg font-normal text-gray-600">/month</span>
                  </div>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center justify-center">
                        <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg' 
                        : 'border-2 hover:bg-gray-50'
                    }`}
                    variant={plan.popular ? 'primary' : 'outline'}
                  >
                    {plan.name === 'Free' ? 'Get Started' : 'Start Free Trial'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by thousands
            </h2>
            <p className="text-xl text-gray-600">
              See what our users say about ClearContracts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, starIndex) => (
                      <Star key={starIndex} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-semibold text-blue-600">{testimonial.avatar}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role} at {testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full opacity-10 animate-float"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full opacity-10 animate-float animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/3 w-12 h-12 bg-white rounded-full opacity-10 animate-float animation-delay-4000"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to understand your contracts?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who trust ClearContracts for their legal document analysis
          </p>
          {user ? (
            <Link to="/upload">
              <Button size="lg" className="text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                <Upload className="mr-2 h-5 w-5" />
                Upload Your Contract Now
              </Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button size="lg" className="text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-500 rounded flex items-center justify-center">
                  <FileText className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
                  ClearContracts
                </span>
              </div>
              <p className="text-sm leading-relaxed">
                Making legal documents accessible and understandable for everyone.
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-blue-400 transition-colors flex items-center"><ChevronRight className="h-3 w-3 mr-1" />Features</a></li>
                <li><a href="#pricing" className="hover:text-blue-400 transition-colors flex items-center"><ChevronRight className="h-3 w-3 mr-1" />Pricing</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center"><ChevronRight className="h-3 w-3 mr-1" />Security</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center"><ChevronRight className="h-3 w-3 mr-1" />Help Center</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center"><ChevronRight className="h-3 w-3 mr-1" />Contact</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center"><ChevronRight className="h-3 w-3 mr-1" />Status</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center"><ChevronRight className="h-3 w-3 mr-1" />Privacy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center"><ChevronRight className="h-3 w-3 mr-1" />Terms</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center"><ChevronRight className="h-3 w-3 mr-1" />Disclaimer</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2025 ClearContracts. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}