import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction } from "discord.js";
import {
	ApplicationCommandOptionType
} from 'discord.js'
import fetch from '@replit/node-fetch'
import moment from 'moment'
import humanize from 'humanize-plus'

export default class  extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
        name: "song",
        description: "Song info, artist, etc",
        type: "SLASH_COMMAND",
        category: "music",
        cooldown: 2,
        options: [
			{
					"name": "query",
				    "description": "Find the song",
				    "type": ApplicationCommandOptionType.String,
                    "autocomplete": true,
				    "required": true
			}
		]
      }
    );
  }

  async execute(interaction: CommandInteraction) {
	  await interaction.deferReply()
	  const req = await fetch(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${process.env.LAST_FM}&artist=${interaction.options.getString("query").split("-")[0]}&track=${interaction.options.getString("query").split("-")[1]}&format=json`)
	  const data = await req.json() as any;
	  if (data.error) {
		  await interaction.editReply({
			  content: "Oops, we got an error. Sorry."
		  })
	  }
	  const trackName = data.track.name;
	  const trackImage = data.track.album.image[3]["#text"];
	  const trackArtist = data.track.artist.name;
	  const artistURL = data.track.artist.url;
	  function formatDuration(duration: number): string {
        const m = moment.duration(duration);
        return `${Math.floor(m.asMinutes())}:${m.seconds().toString().padStart(2, '0')}`;
	  }
      await interaction.editReply({ embeds: [
		  {
			  title: trackName,
			  author: {
				  name: trackArtist,
				  url: artistURL
			  },
			  thumbnail: {
				  url: trackImage
			  },
			  fields: [{
				  name: "💽 Album",
				  value: data.track.album.title,
				  inline: true
			  }, {
				  name: "⏱️ Duration",
				  value: formatDuration(data.track.duration),
				  inline: true
			  }, {
				  name: "🎧 Listeners",
				  value: humanize.compactInteger(data.track.listeners, 1),
				  inline: true
			  }],
			  color: 0x22eeaa
		  }
	  ] });
  }
  async onAutocomplete(interaction) {
    const focusedOption = interaction.options.getFocused(true);
    let choices = [];
	
    if (focusedOption.name === "query" && focusedOption.value) {
		const req = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.search&track=${encodeURI(focusedOption.value)}&api_key=` + process.env.LAST_FM + "&format=json")
		const data = await req.json()
		choices = data.results.trackmatches.track.map((x: any) => ({ name: `${x.name} - ${x.artist}`, value: `${x.artist}-${x.name}`}))
	}
	interaction.respond(choices.slice(0,25))
  }
};
