import { ShewenyClient } from "sheweny";
import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

const client = new ShewenyClient({
  intents: ["Guilds", "GuildMessages"],
  managers: {
    commands: {
      directory: "./commands",
      autoRegisterApplicationCommands: true,
      prefix: "!",
    },
	events: {
      directory: './events',
    },
  },
  mode : "production", // Change to production for production bot
});

client.login(process.env.DISCORD_TOKEN);
