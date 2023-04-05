import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const openai_config = new Configuration({
    organization: '[ORGANISATION]',
    apiKey: '[API_KEY]'
});

const chatGPT = new OpenAIApi(openai_config);

const app = express();
const port = 3621;

app.use(bodyParser.json());
app.use(cors());

app.post('/chat', async (req, res) => {

    const messages = req.body.params.messages;
    console.log(messages);

    const response = await chatGPT.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: messages,
    });

    messages.push(response.data.choices[0].message);
    console.log(messages);
    res.send(messages);
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
