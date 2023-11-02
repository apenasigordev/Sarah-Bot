import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction } from "discord.js";
import sql from "../../database"
import { ApplicationCommandOptionType } from "discord.js";

export default class  extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
        name: "economy",
        description: "Economy commands",
        type: "SLASH_COMMAND",
        category: "economy",
        cooldown: 2,
        options: [
			{
				name: "coins",
				description: "See your coins!",
				type: ApplicationCommandOptionType.Subcommand,
			}
		]
      }
    );
  }

  async execute(interaction: CommandInteraction) {
	
    await interaction.reply({ content: "Pong" });
  }
};
