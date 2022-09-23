import "reflect-metadata";
import { XiaoApplication } from "@fighter/framework";

import { XiaoApp } from "@app/Xiao";

(async () => {
	console.log("Xiao is running!");
	await XiaoApplication.create(XiaoApp).then(app => app.start());
})();

