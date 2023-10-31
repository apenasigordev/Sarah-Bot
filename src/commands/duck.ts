import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction } from "discord.js";
import fetch from '@replit/node-fetch'

export default class  extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
        name: "duck",
        description: "Image of ducks",
        type: "SLASH_COMMAND",
        category: "fun",
      }
    );
  }

  async execute(interaction: CommandInteraction) {
	  await interaction.deferReply()
	  const req = await fetch("https://random-d.uk/api/v2/quack")
	  const data = await req.json();
    await interaction.editReply({ files: [
		{
			attachment: data.url,
			//name: "duck.png"
			description: data.message
		}
	] });
  }
};
