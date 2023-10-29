import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction } from "discord.js";
import fetch from '@replit/node-fetch'

export default class  extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
        name: "jokes",
        description: "Funny jokes",
        type: "SLASH_COMMAND",
        category: "fun",
        cooldown: 2,
      }
    );
  }

  async execute(interaction: CommandInteraction) {
	  const req = await fetch("https://official-joke-api.appspot.com/random_joke")
	  const data = await req.json() as any;
	  
      await interaction.reply({ content: `${data.setup}\n||${data.punchline}||` });
  }
};
