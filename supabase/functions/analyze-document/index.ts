const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface AnalysisRequest {
  document_id: string;
  content: string;
}

interface RiskFlag {
  clause: string;
  reason: string;
  severity: 'low' | 'medium' | 'high';
}

interface AnalysisResponse {
  client_summary: string;
  lawyer_summary: string;
  risk_score: number;
  risk_flags: RiskFlag[];
  suggested_clause: string;
}

// Mock LLM analysis for demonstration
function analyzeContract(content: string): AnalysisResponse {
  const words = content.split(' ').length;
  const riskScore = Math.min(90, Math.max(10, 30 + Math.random() * 50));
  
  const riskFlags: RiskFlag[] = [
    {
      clause: "Payment terms require 30-day advance notice",
      reason: "Extended payment terms may impact cash flow",
      severity: riskScore > 70 ? 'high' : riskScore > 40 ? 'medium' : 'low'
    },
    {
      clause: "Liability limitation clause",
      reason: "May limit your ability to recover damages",
      severity: 'medium'
    }
  ].filter(() => Math.random() > 0.3);

  return {
    client_summary: `This contract contains ${words} words and establishes key terms for your agreement. The document outlines payment obligations, delivery schedules, and termination conditions. Key highlights include specific performance metrics and deadlines that require your attention. Overall, this appears to be a ${riskScore > 70 ? 'high-risk' : riskScore > 40 ? 'moderate-risk' : 'low-risk'} agreement that ${riskScore > 50 ? 'requires careful consideration' : 'appears relatively standard'}.`,
    
    lawyer_summary: `Legal Analysis: This agreement presents a ${riskScore > 70 ? 'high' : riskScore > 40 ? 'moderate' : 'low'} risk profile. Critical provisions include indemnification clauses, dispute resolution mechanisms, and intellectual property assignments. The contract establishes clear obligations for both parties with specific performance standards. ${riskScore > 60 ? 'Several clauses warrant negotiation to better protect your interests.' : 'The terms appear generally favorable with standard commercial provisions.'} Compliance requirements and regulatory considerations should be reviewed with relevant stakeholders.`,
    
    risk_score: Math.round(riskScore),
    risk_flags: riskFlags.slice(0, 6),
    
    suggested_clause: riskFlags.length > 0 
      ? "Consider revising to: 'Payment terms shall be net 15 days from invoice date, with a 2% discount for payments made within 10 days, providing better cash flow management.'"
      : "The current terms appear reasonable. Consider adding a force majeure clause for additional protection."
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { document_id, content }: AnalysisRequest = await req.json();

    if (!document_id || !content) {
      throw new Error('Missing document_id or content');
    }

    // In production, this would call your chosen LLM provider
    const analysis = analyzeContract(content);

    // Save analysis to database
    const { error } = await fetch(`${Deno.env.get('SUPABASE_URL')}/rest/v1/document_analyses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
        'apikey': Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      },
      body: JSON.stringify({
        document_id,
        client_summary: analysis.client_summary,
        lawyer_summary: analysis.lawyer_summary,
        risk_score: analysis.risk_score,
        risk_flags: analysis.risk_flags,
        suggested_clause: analysis.suggested_clause,
      }),
    });

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Analysis error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});