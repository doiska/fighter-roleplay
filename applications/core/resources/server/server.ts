import 'reflect-metadata';
import { XiaoApp } from '@app/Xiao';
import { XiaoDS } from "@app/XiaoDS";
import { XiaoApplication } from "@fighter/framework";

(async () => {
	await XiaoDS.initialize();
	await XiaoApplication.create(XiaoApp).then(app => app.start());

	setTimeout(() => {
		const players = getPlayers();
		for (const player of players) {
			console.log(`Player ${player} joined.`);
			emit('fighter:spawnPlayer', player);
		}
	}, 3000)
})();
