'use strict';

console.log("hi");

const c = new Object();
console.log(c);
// получить прототип:
console.log(`Прототип:`);
console.log(c.__proto__);
console.log(Object.getPrototypeOf(c));


// Создать объект без прототипа
const c2 = Object.create(null);

// Создание объекта который в качестве свойства содержит функцию. Это метод.
const myCar1 ={
    model: 'BMW',
    beep() {
        console.log(` сигналит`);
    }
}
console.log(myCar1);
myCar1.beep();

// пример. Внутри метода в this будет тот объект который находился слева от точки в момент вызова.
const myCar2 ={
    model: 'BMW',
    beep() {
        console.log(` ${this.model} сигналит`);
    }
}
console.log(myCar2);
myCar2.beep();
myCar2.model = 'Волга';
myCar2.beep();

// пример 
function toBeep(){
    console.log(`${this.model} сигналит 3`);
}

const myCar3 ={
    model: 'BMW 3',
    beep : toBeep
};

console.log(myCar3);
myCar3.beep();

const myCar4 ={
    model: 'BMW 4',
    beep : toBeep
};
myCar4.beep();


// Пример.Функция конструктор. Нужа чтобы создавать новые объекты.
// прототип car1 === прототипу car2.
function Car(model){
    //1 this = {}
    //2 this.__proto__ = Car.prototype
    this.model = model;
    //3 return this

    this.beep  = function(){
        console.log(`${this.model} сигналит 6`);
    }
}

const car1 = new Car('BMW'); // ключевое слово new делает эти 3 вещи
const car2 = new Car('Toyota');
//car1.beep();
//car2.beep();

// проблема предыдущего примера в том что функция будет создаваться каждый раз при создании нового объекта.
function Car(model){
    this.model = model;
}

Car.prototype.weelsCount = 4; // одной строкой добавляем всем будущим объектам свойство 
Car.prototype.beep = function(){
    console.log(`${this.model} сигналит 7`);
}
const car3 = new Car('BMW'); // ключевое слово new делает эти 3 вещи
const car4 = new Car('Toyota');
car3.beep();

// пример call

const obj4 = {
    name: 'Pavel'
}

const obj5 = {
    name: 'Dima'
}

function sayHello(){
    console.log(`${this.name} говорит`)
}

sayHello.call(obj4); // передавая объект в метод call мы говорим что будет лежать в this

//// пример Наследование

function Person(name, gender) {
    this.name = name;
    this.gender = gender;
}
Person.prototype.sayName = function () {
    console.log(`мое имя ${this.name}`);
}
function Employee (name, gender, position) {
    Person.call(this, name, gender)
    this.positin = position;
}

Employee.prototype = Object.create(Person.prototype); // указываем в методе что будет являтся прототипом
// также получаем доступ ко всем мтодам котороые есть у Person

Employee.prototype.constuctor = Employee; // Хороший тон указывать конструктор. 
// тогда при вызове emp1.constructor будет указано от какого конструктора создан объект.
// Конструктор это свойство которое содержит ссылку на функцию.
Employee.prototype.sayPosition = function () {
    console.log(`моя должность ${this.positin}`);
}

const emp1 = new Employee('Pavel','m', 'Director');
emp1.sayName();
emp1.sayPosition();

//// Тоже самое но с использованем классов.
class Person1{
    constructor(name, gender) {
        this.name = name;
        this.gender = gender;
    }
    sayName = function () {
        console.log(`мое имя ${this.name}`);
    }
}

class Employee1 extends Person1 {

    constructor(name, gender, position){
        super(name, gender); // Здесь вызовем конструктор базового класса
        this.positin=position;
    } 
    sayPosition = function () {
        console.log(`моя должность ${this.positin}`);
    }
}