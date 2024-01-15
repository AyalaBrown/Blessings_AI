const express = require('express');
require('dotenv').config();
const path = require('path');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

app.post('/prompts', async(req, res) => {
    const params = req.query;
    age = ''
    if (params.age !== '')
    {
      const parse_int = parseInt(params.age);
      if (isNaN(parse_int))
      {
        res.status(421).send("invalid age");
      }
      age += " for age" + params.age;
    }
    const prompt = `
    I'm creating AI blessings, please give me 3 ${params.category} in ${params.atmosphere} atmosphere for ${params.event}${age} . 
    Also, return the response in a parsable JSON format like follow:
    {
      "1":"...",
      "2":"...",
      "3":"..."
    }
    `;
    try{
        const response = await openai.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'gpt-3.5-turbo',
            temperature: 0.8
            });

        const parsableJSONresponse = response.choices[0].message.content;

        let parsedResponse;

        parsedResponse = await JSON.parse(parsableJSONresponse);

        console.log(parsedResponse)

        res.send(parsedResponse);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

});

app.listen(process.env.PORT, (req, res) => {
  console.log(`listening on ${process.env.PORT}....`);
})