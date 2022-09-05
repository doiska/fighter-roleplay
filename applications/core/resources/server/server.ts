import { XiaoApp } from '@app/Xiao';
import { XiaoDS } from "@app/XiaoDS";
import { XiaoApplication } from "@fighter/framework";

(async () => {
	await XiaoDS.initialize();
	await XiaoApplication.create(XiaoApp);
})();
