"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const projectGlue_1 = require("./glue/projectGlue");
const contracts = require("./contract/contracts");
var g = new projectGlue_1.glueBase();
const dotenv = require("dotenv");
dotenv.config();
var gremlin = g.glue.container.get(contracts.tContracts.IGremlinClient);
class someClass {
    doExec() {
        return __awaiter(this, void 0, void 0, function* () {
            var result = yield gremlin.executeAsync('g.V().count()');
            var js = JSON.stringify(result);
            console.log(js);
        });
    }
}
var s = new someClass();
s.doExec();
//# sourceMappingURL=index.js.map