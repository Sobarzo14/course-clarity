// Import required modules
import dotenv from 'dotenv';
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { OpenAIEmbeddings } from "@langchain/openai";
import { ChatPromptTemplate } from '@langchain/core/prompts';

// Load environment variables
dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
const CHROMA_PATH = "chroma";

const PROMPT_TEMPLATE = `
Answer the question based only on the following context:

{context}

---

Answer the question based on the above context: {question}
`;

(async () => {
    const queryText = "What is the prerequisites for HCDD364W?";

    // Prepare the DB
    const embeddingFunction = new OpenAIEmbeddings();
    const db = new Chroma({ persistDirectory: CHROMA_PATH, embeddingFunction });

    // Search the DB
    const results = await db.similaritySearchWithRelevanceScores(queryText, 3);
    if (!results.length || results[0][1] < 0.7) {
        console.log("Unable to find matching results.");
        return;
    }

    const contextText = results.map(([doc]) => doc.pageContent).join('\n\n---\n\n');
    const promptTemplate = ChatPromptTemplate.fromTemplate(PROMPT_TEMPLATE);
    const prompt = promptTemplate.format({ context: contextText, question: queryText });

    console.log(prompt);

    const model = new ChatOpenAI({ apiKey });
    const responseText = await model.predict(prompt);
    const sources = results.map(([doc]) => doc.metadata?.source || null);

    const formattedResponse = `Response: ${responseText}\nSources: ${JSON.stringify(sources)}`;
    console.log(formattedResponse);
})();