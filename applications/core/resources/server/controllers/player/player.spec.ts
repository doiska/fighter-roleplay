import { PlayerService } from "@controllers/player/player.service";

import exp from "constants";
import { describe, it, beforeAll, expect } from "vitest";

describe("playerService", () => {

	let playerService!: PlayerService;

	beforeAll(() => {
		playerService = new PlayerService();
	});

	it("should be able to add player", () => {

		playerService.addPlayer({
			characterId: 1,
			accountId: 1,
			name: "doiská",
			source: "1",
			identifier: "steam:123456789",
		});

		playerService.addPlayer({
			characterId: 2,
			accountId: 2,
			name: "doiská2",
			source: "2",
			identifier: "steam:1234567892"
		});

		expect(playerService.getPlayer(1)).toBeDefined();
	});


	it("should be able to get player", () => {
		const player = playerService.getPlayer("1");
		expect(player).toBeDefined();
	});


	it("should be able to get player by identifier", () => {
		const player = playerService.getPlayerByIdentifier("steam:123456789");
		expect(player).toBeDefined();
	});

	it("should be able to get player by character id", () => {
		const player = playerService.getPlayerByCharacterId(1);
		expect(player).toBeDefined();
	});

	it("should be able to remove player", () => {
		playerService.removePlayer("1");
		expect(playerService.getPlayer("1")).toBeUndefined();
	});
});
