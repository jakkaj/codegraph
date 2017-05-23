import { glueBase } from "./glue/projectGlue";
import * as contracts from './contract/contracts';
var g = new glueBase();

import * as dotenv from 'dotenv';

dotenv.config();

var gremlin = g.glue.container.get<contracts.IGremlinClient>(contracts.tContracts.IGremlinClient);

class someClass{

    async doExec(){
        var result = await gremlin.executeAsync('g.V().count()');
        var js = JSON.stringify(result);
        console.log(js);
    }

}


var s = new someClass();

s.doExec();
