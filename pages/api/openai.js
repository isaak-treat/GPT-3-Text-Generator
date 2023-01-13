const OpenAI = require('openai-api');
const openai = new OpenAI(process.env.OPENAI_API_KEY);

export default async (req, res) => {
  let prompt = `You are writing a ${req.body.type} message to somebody.
                Your goal is to write to the following person: ${req.body.name} with 100 words. Your goal is to be ${req.body.type}.\n
                Also include how this person is ${req.body.attributes.toString()}`;
  const gptResponse = await openai.complete({
    engine: 'text-davinci-003',
    prompt: prompt,
    maxTokens: 300,
    temperature: 0.9,
    frequencyPenalty: 1,
    n: 1
});

  res.status(200).json({text: `${gptResponse.data.choices[0].text}`})
}