class CommandHandler{
    constructor(commandAndArgs){
        this.command = commandAndArgs[0];
        this.paramets = commandAndArgs.slice(1);
        
    }

    execute(){
        let argumentos = this.paramets;
        
        return this.command + '('  +  + ')'
    }
}

module.exports= CommandHandler;