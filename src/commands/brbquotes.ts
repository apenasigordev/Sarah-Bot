import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction } from "discord.js";
import fetch from '@replit/node-fetch'

export default class  extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
        name: "brbquotes",
        description: "Breaking Bad Quotes",
        type: "SLASH_COMMAND",
        category: "fun",
        cooldown: 1,
        
      }
    );
  }

  async execute(interaction: CommandInteraction) {
	  const req = await fetch("https://api.breakingbadquotes.xyz/v1/quotes")
	  const data = await req.json() as any
      await interaction.reply({ content: `\"${data[0].quote}\" - ${data[0].author}` });
  }
};
