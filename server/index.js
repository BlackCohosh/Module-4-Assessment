const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

app.get("/api/compliment", (req, res) => {
  const compliments = ["Gee, you're a smart cookie!",
					 "Cool shirt!",
					 "Your Javascript skills are stellar.",
  ];

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
  
});

app.get("/api/fortunes", (req, res) => {
  const fortunes  = ["Fortune Not Found: Abort, Retry, Ignore?",
  					 "It is better to be an optimist and proven a fool than to be a pessimist and be proven right.",
  					 "Miles are covered one step at a time.",
  					 "The harder you work, the luckier you get.",
  					 "Disbelief destroys the magic.",
    ]
  // choose random fortune
  let randomIndex = Math.floor(Math.random() * fortunes.length)
  let randomFortune = fortunes[randomIndex]
  
  res.status(200).send(randomFortune)

})

app.listen(4000, () => console.log("Server running on 4000"));
