import { GoogleGenerativeAI } from "@google/generative-ai";
import { error, json } from "@sveltejs/kit";

//@ts-ignore l
import { GOOGLE_API_KEY, SYSTEM_DATA } from "$env/static/private";

export const GET = async ({ url }: { url: URL }) => {
  const query = url.searchParams.get("query");

  if (!query) {
    throw error(400, "Query is required");
  }

  const response = await getModel(query);
  const result = response.response;

  if (result.candidates) {
    return json({
      content: result.candidates[0].content.parts[0].text,
      stop_reason: result.candidates[0].finishReason,
    });
  } else {
    console.error("[Gemini] Candidate Missing");
    throw error(500, "Internal Server Error");
  }
};

const getModel = async (prompt: string) => {
  const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: SYSTEM_DATA,
    generationConfig: {
      candidateCount: 1,
      stopSequences: ["x"],
      temperature: 1.0,
    },
  });
  const result = await model.generateContent(prompt);
  return result;
};
