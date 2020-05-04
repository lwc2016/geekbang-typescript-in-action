// 抽象类
abstract class Animal {
    eat(){
        console.log("eat food");
    };
    abstract sleep(): void;  // 抽象方法
}

// let animal = new Animal();  抽象类不能被实例化
class Cat extends Animal{
    name: string;
    constructor(name: string){
        super();
        this.name = name;
    }
    sleep(){
        console.log("sleep");
    }
}
let cat = new Cat("喵");

// 多态
class Pig extends Animal{
    sleep(){
        console.log("sleep! sleep! sleep!");
    }
}
let pig = new Pig();

let animals: Animal[] = [cat, pig];
animals.forEach(i => i.sleep());


// this类型
class WorkFlow{
    step1(){
        console.log("step1");
        return this;
    };
    step2(){
        console.log("step2");
        return this;
    }
}
let workFlow = new WorkFlow();
// 方法的链式调用
workFlow.step1().step2();