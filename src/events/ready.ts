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
	  //client.user.setStatus("DND")
	  client.user.setPresence({
		  status: "idle",
		  activities: [/*{
			  name: "Custom Status",
			  state: "Let's have some fun, huh?",
			  type: 4
		  }, */{
			  name: "Unavailable for some hours",
			  state: "Sarah will be under maintenance in 30/10, at 20:30 - 21:30 (Brazilian Time)"
		  }]
	  })
  }
};
