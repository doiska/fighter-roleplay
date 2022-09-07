import 'reflect-metadata';
import { Client } from "@app/Xiao";
import { XiaoApplication } from "@fighter/framework";

XiaoApplication.create(Client).then(app => app.start());
