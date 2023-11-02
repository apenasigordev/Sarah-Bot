import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction } from "discord.js";
import humanize from 'humanize-plus'

export default class  extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
        name: "about",
        description: "See more about our project",
        type: "SLASH_COMMAND",
        category: "Info",
        cooldown: 2,
        
      }
    );
  }

  async execute(interaction: CommandInteraction) {
    await interaction.reply({ content: `\`\`\`\nAbout our project\nSarah is a fun, comedy and (soon) RPG bot that makes your server more alive, with commands like /memes, /animals, /blablabla, etc. Make more, and more, and more, and more funny your server!!!\n\n- Owner: Igor (@igorwastaken)\n- Contributors: Hamburger (@bwrbur)\n- Github: https://github.com/apenasigordev/Sarah-Bot\n- Discord server: In construction\n\nI'm in ${humanize.compactInteger(interaction.client.guilds.cache.size, 1)} servers.\nThat's it for now, thanks.\`\`\`` });
  }
};
