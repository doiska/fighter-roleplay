import "reflect-metadata";
import { XiaoApplication } from "@fighter/framework";

import { Client } from "@app/Xiao";

XiaoApplication.create(Client).then(app => app.start());
