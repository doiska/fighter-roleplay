import "reflect-metadata";
import { XiaoApplication } from "@fighter/framework";

import { XiaoApp } from "@app/Xiao";
import { XiaoDS } from "@app/XiaoDS";

(async () => {
	await XiaoDS.initialize();
	await XiaoApplication.create(XiaoApp).then(app => app.start());

	setTimeout(() => {
		getPlayers().forEach(source => {
			emit("fighter:playerJoined", source);
			console.log("emit fighter:playerJoined", source);
		});
	}, 2000);
})();
