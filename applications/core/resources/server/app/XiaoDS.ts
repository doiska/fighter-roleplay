import { DataSource } from 'typeorm';

export const XiaoDS = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "postgres",
	password: "postgres",
	database: "xiao",
	synchronize: true,
	logging: true,
	entities: [
		'../orm/models/**/*.model.ts'
	]
})
