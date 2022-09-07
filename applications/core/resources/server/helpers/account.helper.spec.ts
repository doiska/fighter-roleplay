import { getParsedIdentifiers } from "@helpers/account.helper";
import { describe, it, beforeAll, expect } from "vitest";

describe("AccountHelper", () => {
	beforeAll(() => {
		global.getPlayerIdentifiers = (source: string | number) => {
			return [
				"steam:123",
				"discord:123",
				"license:123",
				"xbl:123",
				"live:123",
				"fivem:123",
				"ip:123",
			];
		};
	});

	it("should parse correctly identifiers", () => {
		const identifiers = getParsedIdentifiers("1");
		expect(identifiers).toEqual({
			steam: "123",
			discord: "123",
			license: "123",
			xbl: "123",
			live: "123",
			fivem: "123",
			ip: "123",
		});
	});
});
