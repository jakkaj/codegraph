"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
const contracts = require("../contract/contracts");
const configService_1 = require("../service/configService");
const localLogService_1 = require("../service/localLogService");
const gremlinClient_1 = require("../service/gremlinClient");
class glue {
    constructor() {
        this.container = new inversify_1.Container();
        this.container.bind(contracts.tContracts.IConfigService).
            to(configService_1.configService).inSingletonScope();
        this.container.bind(contracts.tContracts.ILocalLogService).
            to(localLogService_1.localLogService).inSingletonScope();
        this.container.bind(contracts.tContracts.IGremlinClient).
            to(gremlinClient_1.gremlinClient).inSingletonScope();
    }
}
exports.glue = glue;
class glueBase {
    get glue() {
        return this._glue;
    }
    constructor() {
        this._glue = new glue();
    }
}
exports.glueBase = glueBase;
//# sourceMappingURL=projectGlue.js.map