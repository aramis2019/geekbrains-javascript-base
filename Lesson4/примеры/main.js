'use strict';

console.log("hi");

//const c = new Object();
//console.log(c);
//console.log(obj.a);
//console.log(obj.b);

// function toBeep(){
//     console.log(`${this.model} сигналит`);
// }

// const myCar ={
//     model: 'BMW',
//     beep() : toBeep
// };

// console.log(myCar);
// myCar.beep();
// myCar.model = "new bmw";
// myCar.beep();


// const myCar2 ={
//     model: 'BMW',
//     beep() : toBeep
// };

// myCar2.beep();

/*******************/

function Car(model){
    this.model = model;
}

const car1 = new Car('bmw');
const car2 = new Car('Toyota');
