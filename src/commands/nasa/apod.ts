import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction } from "discord.js";
import fetch from '@replit/node-fetch'

export default class  extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
        name: "apod",
        description: "Astronomy Picture of the Day from NASA",
        type: "SLASH_COMMAND",
        category: "astronomy",
        cooldown: 2,
      }
    );
  }

  async execute(interaction: CommandInteraction) {
	  await interaction.deferReply()
	  const req = await fetch("https://api.nasa.gov/planetary/apod?api_key="+process.env.NASA_API)
	  const data = await req.json()
      await interaction.editReply({
		  embeds: [
			  {
				  title: data.title,
				  description: data.explanation,
				  author: {
					  name: "© " + data.copyright
				  },
				  image: {
					  url: data.hdurl
				  },
				  timestamp: new Date(data.date).toISOString(),
				  color: 0x001eaa
			  }
		  ]
	  });
  }
};
