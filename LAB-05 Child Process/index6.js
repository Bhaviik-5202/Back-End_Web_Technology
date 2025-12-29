// 6) Create an EventEmitter instance, Register an event "greet" and print a message when 
// triggered. Fire that event manually using .emit().(B)

const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on("greet", () => {
    console.log("Hello !, This is Greet Event.");    
});

emitter.emit('greet');

setInterval( () => {
    emitter.emit("tick");
}, 1);

emitter.on(("tick"), () => {
    console.log("This is Tick Event");
});