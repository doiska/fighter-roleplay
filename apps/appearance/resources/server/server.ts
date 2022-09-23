import "reflect-metadata";
import { XiaoApplication } from "@fighter/framework";

import { XiaoApp } from "@app/Xiao";

// wait until Core is defined using Promise

(async () => {
	console.log("Xiao is running!");
	await XiaoApplication.create(XiaoApp).then(app => app.start());

	setTimeout(() => {
		console.log(Core.getPlayers());
	}, 1000);
})();

