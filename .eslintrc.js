module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended"
	],
	"overrides": [],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"plugins": [
		"@typescript-eslint",
		"eslint-plugin-import-helpers"
	],
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		],
		"import-helpers/order-imports": [
			"warn",
			{
				"newlinesBetween": "always",
				groups: [
					[
						"/^@fighter/",
					],
					[
						"/^@app/",
						"/^@controllers/",
						"/^@infra/",
						"/^@orm/",
						"/^@entities/",
						"/^@tasks/",
					],
					[
						"/^@shared/",
					],
					"module",
					[
						"parent",
						"sibling",
						"index"
					],
				],
				alphabetize: {
					order: "asc",
					ignoreCase: true
				}
			}
		]
	}
};
