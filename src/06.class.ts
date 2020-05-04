console.log("--------class--------");
class Dog{
    name: string;
    age?: number;   // 可选属性
    constructor(name: string){
        this.name = name;
    }
    run(){}
}

console.log(Dog.prototype);
let dog = new Dog("wangwang");
console.log(dog);

// 类的继承
class Husky extends Dog{
    constructor(name: string, color: string){
        super(name)
        this.color = color;
    }
    color: string
}

// 类的成员修饰符
// 1. 公有成员public: 默认都是public，也可以显示的声明
class Dog1{
    constructor(name: string){
        this.name = name;
    }
    public name: string
}

// 2. 私有成员private: 只能被类本身调用，不能被类的实例或子类调用
class Dog2{
    constructor(name: string){
        this.name = name;
    }
    private name: string
}
let dog2 = new Dog2("wangwang");
// console.log(dog2.name); 这里会报错
class Husky2 extends Dog2{
    constructor(name: string){
        super(name);
        // console.log(this.name);
    }
}

// 给构造函数加上私有成员属性, 这是类即不能被实例化，也不能被继承
class Dog3{
    private constructor(name: string){
        this.name = name;
    }
    name: string;
}
// let dog3 = new Dog3("wangwang"); 这里会报错
/*
class Husky3 extends Dog3{
    constructor(name: string){
        super(name);
    }
}
*/

// 3.受保护成员protected: 只能在类和子类中访问，不能在实例中访问
class Dog4{
    protected name: string;
    constructor(name: string){
        this.name = name;
    }
}
let dog4 = new Dog4("wangwang");
console.log(dog4);
// console.log(dog4.name); 这里会报错
class Husky4 extends Dog4{
    constructor(name: string){
        super(name);
        console.log(this.name);
    }
}

// 构造函数也能用protected修饰，它不能进行实例化，只能被继承，相当于声明了一个基类
// 4. 只读属性readonly
class Dog5{
    readonly id = 1;
    name: string;
    constructor(name: string){
        this.name = name;
    }
}
let dog5 = new Dog5("wangwang");
// dog5.id = 3; 这里会报错

// 构造函数的参数也可以使用修饰符，将参数直接变成实例的属性，这样就省略在类中的定义了
class Dog6{
    constructor(public name: string, private color: string, protected age: number, readonly id: number){}
}
let dog6 = new Dog6("wangwang", "red", 25, 1);
console.log(dog6.name);
// console.log(dog6.color);
// console.log(dog6.age);
console.log(dog6.id);

// 5. 静态成员static: 只能通过类来访问，不能通过实例来访问。它也可以被子类继承
class Dog7{
    static food: string = "bones";
}
console.log(Dog7.food);