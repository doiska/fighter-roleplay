import "reflect-metadata";
import { XiaoApplication } from "@fighter/framework";

import { XiaoApp } from "@app/Xiao";

(async () => await XiaoApplication.create(XiaoApp).then(app => app.start()))();
