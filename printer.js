class Printer {
    printEntity(message, entity){
        console.log(`${message}:`);
        console.log(entity);
    }

    printMessage(message){
        console.log(message);
    }

    printException(exception){
        console.error(`${exception.name}: ${exception.message}`);
    }

    printArray(message, array){
        console.log(message);
        array.forEach(element => {
            console.log(element);
        });
    }

}

module.exports = Printer;