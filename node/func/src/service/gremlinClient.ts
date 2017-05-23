import { injectable } from 'inversify';
import * as Gremlin from 'gremlin';
import { serviceBase, configBase } from "./serviceBase";
import { IGremlinClient } from "../contract/contracts";

require('dotenv').config();

@injectable()
export class gremlinClient extends configBase implements IGremlinClient{
  
  private config: config;
  private client:any = null;
  constructor() {
    super();
  }

  private init(){

    if(this.client!=null){
      return;
    }

    this.config = this.configService.config;
    
    var cfg = { 
        "session": false, 
        "ssl": true, 
        "user": `/dbs/${this.config.database}/colls/${this.config.collection}`,
        "password": this.config.primaryKey
    };

    this.client = Gremlin.createClient(
    443, 
    this.config.endpoint,
    cfg 
    );
  }

  public async executeAsync(query:string):Promise<any>{
      this.init();
      return new Promise<any>((good, bad)=>{
        this.client.execute(query, { }, (err, results) => {
              
              if (err) {
                bad(err);
                return;
              }

              good(results);              
         });  
      });         
  }

  public execute(){
    this.init();
    console.log('Running Drop');
    this.client.execute('g.V().drop()', { }, (err, results) => {
      if (err) return console.error(err);
      console.log(results);
      console.log();
    //g.addV('person').property('id', 'mary').property('firstName', 'Mary').property('lastName', 'Andersen').property('age', 39)
      console.log('Running Add Vertex1'); 
      this.client.execute("g.addV('person').property('repo', 'a').property('id', 'thomas').property('firstName', 'Thomas').property('age', 44)", { }, (err, results) => {
        if (err) return console.error(err);
        console.log(JSON.stringify(results));
        console.log();
        
        console.log('Running Add Vertex2'); 
        this.client.execute("g.addV('person').property('repo', 'a').property('id', 'mary').property('firstName', 'Mary').property('lastName', 'Andersen').property('age', 39)", { }, (err, results) => {
          if (err) return console.error(err);
          console.log(JSON.stringify(results));
          console.log();

          console.log('Running Add Edge'); 
          this.client.execute("g.V('thomas').addE('knows').to(g.V('mary'))", { }, (err, results) => {
            if (err) return console.error(err);
            console.log(JSON.stringify(results));
            console.log();
            
            console.log('Running Count'); 
            this.client.execute("g.V().count()", { }, (err, results) => {
              if (err) return console.error(err);
              console.log(JSON.stringify(results));
              console.log();
            });
          });
          
        });

      });
      
    });
      }
} 


