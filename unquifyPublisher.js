const {NewsletterObserver} = require('./NewsletterObserver')



class ObserverManager{
    
    constructor(){

        this._observers = [];
        this._observers.push(new NewsletterObserver())
    }

    get observers(){ return this._observers; }

    subscribe(newObserver){this._observers.push(newObserver)}
    
    unsuscribe(obsToRemove){
        this._observers = this._observers.filter(observer=> observer==obsToRemove)}
    
    notifyAll(json){
        this._observers.forEach(observer => { observer.updateState(json)
            
        });    
    }
}


module.exports={ 
    ObserverManager:ObserverManager}