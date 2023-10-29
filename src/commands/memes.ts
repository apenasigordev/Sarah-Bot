import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction } from "discord.js";
import fetch from '@replit/node-fetch'

export type MemeModel = {
	postLink: string;
	subreddit: string;
	title: string;
	url: string;
	nsfw: boolean;
	spoiler: boolean;
	author: string;
	ups: number;
	preview: array;
}

export default class  extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
        name: "memes",
        description: "I'll send memes",
        type: "SLASH_COMMAND",
        category: "fun",
        cooldown: 2,
        channel: "GUILD",
      }
    );
  }

  async execute(interaction: CommandInteraction) {
	  await interaction.deferReply()
	  const req = await fetch("https://meme-api.com/gimme")
	  const data = await req.json() as any;
	  //console.log(data)
	  if(data.nsfw) return interaction.editReply({
		  content: "Oops! This meme is nsfw, try running again."
	  })
	  
    await interaction.editReply({
		embeds: [
			{
               color: 0xff00ff,
               author: {
                 name: data.author
               },
               title: data.title,
               image: {
                  url: data.url
                }
			}
		]
		//content: "Hello"
	});
  }
};
