import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction } from "discord.js";
import {
	ApplicationCommandOptionType
} from 'discord.js'
import fetch from '@replit/node-fetch';

export default class  extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
        name: "valorant",
        description: "Valorant commands",
        type: "SLASH_COMMAND",
        category: "gaming",
        cooldown: 4,
		options: [
			{
				name: "weapons",
				description: "See Valorant weapons",
				type: ApplicationCommandOptionType.Subcommand,
				options: [
					{
						name: "weapon",
						description: "Find the weapon",
						type: ApplicationCommandOptionType.String,
						autocomplete: true,
						required: true
					}
				]
			}
		]
      }
    );
  }

  async execute(interaction: CommandInteraction) {
	  await interaction.deferReply()
      const req = await fetch("https://valorant-api.com/v1/weapons/"+interaction.options.getString("weapon"))
	  const { data } = await req.json();

	  interaction.editReply({
		  embeds: [
			  {
				  author: {
					  name: "Valorant",
					  icon_url: "https://cdn.discordapp.com/attachments/1064218942576541776/1168226337455083530/V_Logomark_Red.png"
				  },
				  title: data.displayName,
				  color: 0xfa4454,
				 // description: ""
				  image: {
					  url: data.displayIcon
				  },
				  fields: [
					  {
						  name: "🔥 Fire Rate", 
						  value: data.weaponStats.fireRate,
						  inline: true
					  },
					  {
						  name: `🎯 Damage (${data.weaponStats.damageRanges[0].rangeStartMeters}m - ${data.weaponStats.damageRanges[0].rangeEndMeters}m)`,
						  value: `👦 ${data.weaponStats.damageRanges[0].headDamage}\n🧍 ${data.weaponStats.damageRanges[0].bodyDamage}\n🦵 ${data.weaponStats.damageRanges[0].legDamage}`,
						  inline: true
					  },
					  {
						  name: "🏷️ Price",
						  value: data.shopData.cost,
						  inline: true
					  },
					  {
						  name: "📁 Category",
						  value: data.shopData.category,
						  inline: true
					  }
				  ],
				  thumbnail: {
					  url: data.killStreamIcon
				  }
			  }
		  ]
	  })
  }
  async onAutocomplete(interaction) {
	  const focusedValue = interaction.options.getFocused();
	  const req = await fetch("https://valorant-api.com/v1/weapons")
	  const data = await req.json();
	  let options = []
	  // console.log(focusedValue)
	  options = data.data.slice(0,10).map((item) => { return { name: item.displayName, value: item.uuid }})
	  if(focusedValue) {
		  // console.log(focusedValue.toLowerCase())
		  /*const req = await fetch("https://valorant-api.com/v1/weapons")
		  const data = await req.json();*/
		  const filteredData = data.data.filter((item) => {
			  return item.displayName.toLowerCase().includes(focusedValue.toLowerCase());
		  });
		  
		  options = filteredData.map((item) => { return { name: item.displayName, value: item.uuid}})
	  }
      // console.log(options)
	  interaction.respond(options)
  }
};
