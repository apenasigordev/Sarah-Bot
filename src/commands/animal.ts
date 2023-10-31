import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction } from "discord.js";
import Animality from 'animality'
import {
	ApplicationCommandOptionType
} from 'discord.js'

export default class  extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
        name: "animal",
        description: "See cute animals (Provided by Animality API)",
        type: "SLASH_COMMAND",
        category: "images",
        cooldown: 2,
        options: [
			{
				name: "animal",
				description: "The animal you want to see",
				type: ApplicationCommandOptionType.String,
				required: true,
				choices: [
					{
						name: "Dog",
						value: "dog"
					},
					{
						name: "Cat",
						value: "cat"
					}
				]
			}
		]
      }
    );
  }

  async execute(interaction: CommandInteraction) {
      await interaction.deferReply()

	  const animal = await Animality.getAsync(interaction.options.getString("animal"));

	  await interaction.editReply({
		  files: [
			  {
				  attachment: animal.image,
				  description: `${animal.fact} (Provided by animality.xyz)`
			  }
		  ]
	  })
  }
};
