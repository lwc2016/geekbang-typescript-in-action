// 类类型接口，它可以约束类成员和数据类型
interface Human{
    name: string,
    eat(): void
}

// 类实现接口的时候，必须实现接口中声明的所有属性
// 接口只能约束类的公有成员
class Aisan implements Human{
    constructor(public name: string){};
    eat(){
        console.log("我们只吃米饭");
    }
    // 类可以声明接口中没有的成员
    sleep(){

    }
}

// 接口的继承，接口可以像类一样继承，一个接口可以继承一个或多个接口
interface Man extends Human{
    run(): void
}

interface Child{
    cry(): void
}

interface Boy extends Human, Child{}

let bod:Boy = {
    name: "Jack",
    eat(){
        console.log("吃饭了");
    },
    cry(){
        console.log("哇哇哇");
    }
}

// 接口继承类
// 相当于接口将类的成员都抽象类出来，也就是只有类的成员结构，而没有具体的实现
class Auto{
    state = 1
}

interface AuthInterface extends Auto{};

// 接口在抽离类时，只会抽象公有成员
class C implements AuthInterface{
    state = 2;
};

class Bus extends C implements Auto{

}

// 类和接口之间的关系
// 1. 接口之间可以继承
// 2. 类之间也可以继承
// 3. 接口可以通过类来实现的， 但接口只能约束类的公有成员
// 4. 接口可以抽离类的成员，包括公有成员、私有成员、受保护成员
