
import { glueBase } from "../glue/projectGlue";
import * as contracts from '../contract/contracts';

var g = new glueBase();

import * as dotenv from 'dotenv';

dotenv.config();

var gremlin = g.glue.container.get<contracts.IGremlinClient>(contracts.tContracts.IGremlinClient);
var config = g.glue.container.get<contracts.IConfigService>(contracts.tContracts.IConfigService);

class runner{
    async doRun(context){
        var c = config.config;

        var res = JSON.stringify(c);
        context.log(res);
        
        var g = await gremlin.executeAsync('g.V().count()');
        
        var js = JSON.stringify(g);  
        context.log(js);
        context.done();   
        
    }
}


module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    var r= new runner();
    r.doRun(context);
    
    if (req.query.name || (req.body && req.body.name)) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello " + (req.query.name || req.body.name)
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
    
};