const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: "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"
  });

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/processData', async(req, res) => {
  const { event, atmosphere, type, age } = req.body;

  // Do something with the parameters (e.g., concatenate them)
  const result = `Received: ${event}, ${atmosphere}, ${type}, ${age}`;
  if  (!type|| !event|| !atmosphere)
  {
      console.log("missing")
      res.status(500).send("missing parameters...");
  }
  age_ = ''
  if (age !== undefined)
  {
      console.log("Age: " + age);
      const parse_int = parseInt(age);
      if (isNaN(parse_int))
      {
          res.status(421).send("invalid age");
      }
      age_ += " for age" + age;
  }
  const prompt = `
  I'm creating AI blessings, please give me 3 ${type} in ${atmosphere} atmosphere for ${event}${age_} . 
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
    //   res.json({ message: result });
  } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
  }
  
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
