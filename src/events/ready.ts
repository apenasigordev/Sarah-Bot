import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import { ActivityType } from 'discord.js'
export default class  extends Event {
  constructor(client: ShewenyClient) {
    super(client, "ready", {
      description: "Ready Event",
      once: false,
    });
  }

  execute(client: ShewenyClient) {
      console.log("Event called !");
	  client.user.setPresence({
		  activities: [{
			  name: "Custom Status",
			  state: "😴 Estou indo dormir",
			  type: 4
		  }]
	  })
  }
};
