interface ILocalLogService{
    logError(output:string);
    logWarning(output:string);
    log(output:string);
    logGood(output:string);
    logInfo(output:string);
    logException(output:string);
}

interface IGremlinClient{
    execute();
    executeAsync(query:string):Promise<any>;
}

interface IConfigService{
    config:config;
}

let tContracts = {
    ILocalLogService: Symbol("ILocalLogService"), 
    IConfigService: Symbol("IConfigService") , 
    IGremlinClient: Symbol("IGremlinClient")
}

export {tContracts, ILocalLogService, IConfigService, IGremlinClient};