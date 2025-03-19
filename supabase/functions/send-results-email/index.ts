
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  email: string;
  results: any;
}

const formatResultsForEmail = (results: any) => {
  const { readinessLevel, percentage, categories, overallRecommendations } = results;
  
  // Format categories
  const categoriesHtml = categories.map((category: any) => {
    return `
      <div style="margin-bottom: 15px;">
        <h3 style="margin-bottom: 5px;">${category.name}: ${category.percentage}%</h3>
        <p style="margin-top: 0;">${category.description}</p>
        ${category.recommendations.length > 0 ? 
          `<p style="margin-bottom: 5px;"><strong>Recommendations:</strong></p>
           <ul style="margin-top: 0;">
             ${category.recommendations.map((rec: string) => `<li>${rec}</li>`).join('')}
           </ul>` 
          : ''}
      </div>
    `;
  }).join('');
  
  // Format overall recommendations
  const recommendationsHtml = overallRecommendations.map((rec: string) => 
    `<li>${rec}</li>`
  ).join('');
  
  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          h1 { color: #2563eb; }
          h2 { color: #1e40af; margin-top: 30px; }
          .score-box { background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .progress-bar { background-color: #e5e7eb; height: 10px; border-radius: 5px; margin: 10px 0; }
          .progress-bar-fill { background-color: #3b82f6; height: 100%; border-radius: 5px; }
        </style>
      </head>
      <body>
        <h1>Your AI Readiness Assessment Results</h1>
        
        <div class="score-box">
          <h2>Overall Readiness: ${readinessLevel}</h2>
          <p>Your organization scored <strong>${percentage}%</strong> on the AI Readiness Assessment.</p>
          <div class="progress-bar">
            <div class="progress-bar-fill" style="width: ${percentage}%;"></div>
          </div>
        </div>
        
        <h2>Category Breakdown</h2>
        ${categoriesHtml}
        
        <h2>Key Recommendations</h2>
        <ul>
          ${recommendationsHtml}
        </ul>
        
        <p style="margin-top: 40px; font-size: 12px; color: #6b7280;">
          This assessment provides a snapshot of your organization's AI readiness.<br>
          For a more detailed analysis, consider consulting with an AI strategy expert.
        </p>
      </body>
    </html>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, results }: EmailRequest = await req.json();

    if (!email || !results) {
      throw new Error("Email and results are required");
    }

    console.log(`Sending results email to: ${email}`);

    const emailHtml = formatResultsForEmail(results);
    
    const { data, error } = await resend.emails.send({
      from: "AI Readiness Assessment <onboarding@resend.dev>",
      to: [email],
      subject: "Your AI Readiness Assessment Results",
      html: emailHtml,
    });

    if (error) {
      console.error("Resend API error:", error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log("Email sent successfully:", data);

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in send-results-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
};

serve(handler);
