"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const Gremlin = require("gremlin");
const serviceBase_1 = require("./serviceBase");
require('dotenv').init();
let gremlinClient = class gremlinClient extends serviceBase_1.configBase {
    constructor() {
        super();
        this.config = this.configService.config;
        this.client = Gremlin.createClient(443, this.config.endpoint, {
            "session": false,
            "ssl": true,
            "user": `/dbs/${this.config.database}/colls/${this.config.collection}`,
            "password": this.config.primaryKey
        });
    }
    execute() {
        console.log('Running Drop');
        this.client.execute('g.V().drop()', {}, (err, results) => {
            if (err)
                return console.error(err);
            console.log(results);
            console.log();
            //g.addV('person').property('id', 'mary').property('firstName', 'Mary').property('lastName', 'Andersen').property('age', 39)
            console.log('Running Add Vertex1');
            this.client.execute("g.addV('person').property('id', 'thomas').property('firstName', 'Thomas').property('age', 44)", {}, (err, results) => {
                if (err)
                    return console.error(err);
                console.log(JSON.stringify(results));
                console.log();
                console.log('Running Add Vertex2');
                this.client.execute("g.addV('person').property('id', 'mary').property('firstName', 'Mary').property('lastName', 'Andersen').property('age', 39)", {}, (err, results) => {
                    if (err)
                        return console.error(err);
                    console.log(JSON.stringify(results));
                    console.log();
                    console.log('Running Add Edge');
                    this.client.execute("g.V('thomas').addE('knows').to(g.V('mary'))", {}, (err, results) => {
                        if (err)
                            return console.error(err);
                        console.log(JSON.stringify(results));
                        console.log();
                        console.log('Running Count');
                        this.client.execute("g.V().count()", {}, (err, results) => {
                            if (err)
                                return console.error(err);
                            console.log(JSON.stringify(results));
                            console.log();
                        });
                    });
                });
            });
        });
    }
};
gremlinClient = __decorate([
    inversify_1.injectable()
], gremlinClient);
exports.gremlinClient = gremlinClient;
//# sourceMappingURL=gremlinService.js.map