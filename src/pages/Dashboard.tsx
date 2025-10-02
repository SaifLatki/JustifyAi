import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { FileText, Upload, TriangleAlert as AlertTriangle, TrendingUp, Plus, Clock, Shield, ChartBar as BarChart3, Users, Zap } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import type { Database } from '../types/database';

type Document = Database['public']['Tables']['documents']['Row'] & {
  document_analyses: Database['public']['Tables']['document_analyses']['Row'][];
};

export function Dashboard() {
  const { profile } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [stats, setStats] = useState({
    totalDocuments: 0,
    highRiskDocuments: 0,
    avgRiskScore: 0,
    thisMonthUploads: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch recent documents with analyses
      const { data: docsData } = await supabase
        .from('documents')
        .select(`
          *,
          document_analyses (*)
        `)
        .order('created_at', { ascending: false })
        .limit(5);

      // Fetch stats
      const { data: allDocs } = await supabase
        .from('documents')
        .select('id, created_at');

      const { data: analyses } = await supabase
        .from('document_analyses')
        .select('risk_score');

      if (docsData) setDocuments(docsData as Document[]);
      
      // Calculate stats
      const totalDocs = allDocs?.length || 0;
      const highRiskDocs = analyses?.filter(a => (a.risk_score || 0) > 70).length || 0;
      const avgRisk = analyses?.length 
        ? Math.round(analyses.reduce((sum, a) => sum + (a.risk_score || 0), 0) / analyses.length)
        : 0;
      
      const thisMonth = allDocs?.filter(doc => {
        const docDate = new Date(doc.created_at);
        const now = new Date();
        return docDate.getMonth() === now.getMonth() && docDate.getFullYear() === now.getFullYear();
      }).length || 0;

      setStats({
        totalDocuments: totalDocs,
        highRiskDocuments: highRiskDocs,
        avgRiskScore: avgRisk,
        thisMonthUploads: thisMonth
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskLevel = (score: number | null) => {
    if (!score) return { label: 'Unknown', color: 'gray' };
    if (score >= 70) return { label: 'High', color: 'red' };
    if (score >= 40) return { label: 'Medium', color: 'yellow' };
    return { label: 'Low', color: 'green' };
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {profile?.full_name || 'there'}!
        </h1>
        <p className="text-gray-600">
          Here's an overview of your contract analysis activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Documents</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalDocuments}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">High Risk</p>
                <p className="text-2xl font-bold text-gray-900">{stats.highRiskDocuments}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg Risk Score</p>
                <p className="text-2xl font-bold text-gray-900">{stats.avgRiskScore}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">This Month</p>
                <p className="text-2xl font-bold text-gray-900">{stats.thisMonthUploads}</p>
                {profile?.subscription_plan === 'free' && (
                  <p className="text-xs text-gray-500 mt-1">
                    {3 - (profile?.monthly_uploads || 0)} uploads left
                  </p>
                )}
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2 border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Documents</h2>
              <Link to="/documents">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {documents.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500 mb-4">No documents uploaded yet</p>
                <Link to="/upload">
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Your First Document
                  </Button>
                </Link>
              </div>
            ) : (
              documents.map((doc) => {
                const analysis = doc.document_analyses[0];
                const risk = getRiskLevel(analysis?.risk_score || null);
                
                return (
                  <div key={doc.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">{doc.title}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(doc.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {analysis && (
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          risk.color === 'red' ? 'bg-red-100 text-red-800' :
                          risk.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          <Shield className="mr-1 h-3 w-3" />
                          {risk.label} Risk
                        </span>
                      )}
                      <Link to={`/documents/${doc.id}`}>
                        <Button variant="ghost" size="sm" className="hover:bg-blue-50 hover:text-blue-600">View</Button>
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link to="/upload" className="block">
              <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                <Plus className="mr-2 h-4 w-4" />
                Upload New Document
              </Button>
            </Link>
            <Link to="/lawyers" className="block">
              <Button variant="outline" className="w-full justify-start border-2 hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 hover:border-green-300 hover:text-green-700 transition-all">
                <Users className="mr-2 h-4 w-4" />
                Connect with Lawyers
              </Button>
            </Link>
            <Link to="/billing" className="block">
              <Button variant="outline" className="w-full justify-start border-2 hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 hover:border-purple-300 hover:text-purple-700 transition-all">
                <Zap className="mr-2 h-4 w-4" />
                Upgrade Plan
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Subscription Status */}
      {profile?.subscription_plan === 'free' && profile.monthly_uploads >= 3 && (
        <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-orange-800">
                  Upload limit reached
                </h3>
                <p className="text-sm text-orange-700 mt-1">
                  You've used all 3 free uploads this month. Upgrade to Pro for unlimited uploads and advanced features.
                </p>
              </div>
              <Link to="/billing">
                <Button size="sm" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                  Upgrade Now
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}