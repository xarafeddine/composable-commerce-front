import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { getProducts } from "@/lib/client";
import { Configuration, OpenAIApi } from "openai";
import https from "https";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const { message } = req.body;

  try {
    // Check if it's an ecommerce query

    // Extract relevant ecommerce information from the message

    const productsData = getProducts().map((prod) => {
      return {
        title: prod.title,
        price: prod.price,
        description: prod.details,
        rating: prod.rating.rate,
        category: prod.category,
      };
    });

    // Send the custom message to ChatGPT API

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are e-commerce chatbot, so act according to that. here are some information about the site you are integrated in:
            the name of the platform is "composable commerce".
            it is a pwa app.
            this is the products's data JSON stringified:
            ${JSON.stringify(productsData)}
            `,
          },
          {
            role: "assistant",
            content:
              "Welcome to our e-commerce platform I am you chatbot assistant!",
          },

          { role: "user", content: message },
        ],
      },
      {
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GPT_API_KEY}`,
        },
      }
    );
    const reply = response.data.choices[0].message.content;

    // const configuration = new Configuration({
    //   organization: "org-HhhTZNJA3FuneSU4GJCIepLm",
    //   apiKey: process.env.OPENAI_API_KEY,
    // });

    // const openai = new OpenAIApi(configuration);

    // // Define the payload for chat completions
    // const payload = {
    //   model: "gpt-3.5-turbo",
    //   messages: [],
    // };
    // const completion = await openai.createChatCompletion(payload);

    // console.log(completion.data.choices[0].message);

    // // Extract chatbot response
    // const reply = completion.data.choices[0].message;

    res.json({ reply });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
