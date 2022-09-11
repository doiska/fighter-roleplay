import { PlayerService } from "@components/player/player.service";

import { describe, it, beforeAll, expect } from "vitest";

describe("playerService", () => {

	let playerService!: PlayerService;

	beforeAll(() => {
		playerService = new PlayerService();
	});

	it("should be able to add player", () => {



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
