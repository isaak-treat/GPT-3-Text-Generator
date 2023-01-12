const OpenAI = require('openai-api');
const openai = new OpenAI(process.env.OPENAI_API_KEY);

export default async (req, res) => {
  let prompt = `You are at a Comedy Central roast. 
                Your goal is to roast the following person: ${req.body.name} with about 100 words. 
                Include how this person's name sucks and give a reason why.
                Include how this person is ${req.body.attributes.toString()}.`;
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