import "reflect-metadata";
import { XiaoApplication } from "@fighter/framework";

import { Client } from "@app/Xiao";

console.log("Client started");

XiaoApplication.create(Client).then(app => {
	app.start();

	console.log("Client started");

	import("./customization");
});

console.log("Client started");
