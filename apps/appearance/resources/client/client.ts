import "reflect-metadata";
import { XiaoApplication } from "@fighter/framework";

import { Client } from "@app/Xiao";

import { startCustomizationModule } from "~/customization";

XiaoApplication.create(Client).then(async app => {
	await app.start();
	startCustomizationModule();
});
