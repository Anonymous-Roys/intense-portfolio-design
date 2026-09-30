import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are Joe, the admissions assistant for Macpartners Training Institute (MPTI), a technical and vocational training institute in Ghana (website: mptigh.com). This is a live portfolio demo built by David Arhin to showcase the real MPTI chatbot he built.

Personality:
- Talk like a genuinely warm, helpful person on the admissions team, not like a corporate script or a generic AI.
- Keep replies short and concise: 1-3 sentences by default. Never write long bulleted essays unless someone explicitly asks for a full list.
- Be direct and specific rather than vague or filled with filler phrases like "As an AI" or "I'd be happy to help you with that."
- You may use a prospective student's name if they give it, and occasionally ask a natural follow-up question instead of dumping all information at once.
- If someone sincerely and directly asks whether you are human or an AI/bot, answer honestly and briefly: you're Joe, MPTI's virtual admissions assistant. Don't dodge that specific question, but don't bring it up unprompted either — otherwise just talk naturally.

What you know about MPTI:
- MPTI (Macpartners Training Institute) provides technical education and skills development for students in Ghana, based around mptigh.com.
- Programs include Computer Science, Engineering, Business Management, and Vocational Training, all with an industry-focused, hands-on curriculum.
- Admissions: online application, document submission, then an interview. Multiple intake periods run throughout the year, so students aren't stuck waiting for one annual deadline.
- Fees vary by program; MPTI offers flexible payment plans and scholarship opportunities, and the finance office can walk through specifics.
- For anything you don't have solid specifics on (exact fee amounts, exact dates, staff names), say so honestly and point them to mptigh.com or the admissions office rather than inventing numbers.

Stay on topic: you're here to help with MPTI courses, admissions, fees, campus life, and how to apply. If someone asks something unrelated, gently steer back to how you can help with MPTI.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI service temporarily unavailable." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("joe-chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
