import "reflect-metadata";
import { Container } from "inversify"

import * as contracts from '../contract/contracts';
import { configService } from "../service/configService";
import { localLogService } from "../service/localLogService";
import { gremlinClient } from "../service/gremlinClient";

class glue{
    public container:Container;

    constructor(){
        this.container = new Container();

        this.container.bind<contracts.IConfigService>(contracts.tContracts.IConfigService).
             to(configService).inSingletonScope();        

        this.container.bind<contracts.ILocalLogService>(contracts.tContracts.ILocalLogService).
             to(localLogService).inSingletonScope();
             
        this.container.bind<contracts.IGremlinClient>(contracts.tContracts.IGremlinClient).
             to(gremlinClient).inSingletonScope();
                     
    }    
}

class glueBase{
    private _glue : glue;
    
    get glue():glue{
        return this._glue;
    }
    constructor(){
        
        this._glue = new glue();
    }
}

export {glue, glueBase};