/* eslint-disable */

const interval = setInterval(function () {

	if (typeof global.Core != "undefined") {
		clearInterval(interval);
		return;
	}

	if (GetResourceState("core") === "started") {
		global.Core = global.exports.core.getSharedObject();
		console.log("Core started, importing...", Core);
	}
}, 1000);
