"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const dotenv = require("dotenv");
dotenv.config();
console.log("testing 123");
ava_1.default('test', t => {
    console.log("hi");
    t.pass();
});
//# sourceMappingURL=testCosmosGraph.js.map