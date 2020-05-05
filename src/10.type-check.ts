// 类型推断
// 1. 基础类型推断
let a = 1;
let b = [];
let c = (x = 1) => x;
let d = (y = 2) => y + 1;

// 2. 上下文类型推荐
let inputEl = document.querySelector("#input");
(inputEl  as HTMLInputElement).oninput = function(event){
    console.log((event.target as HTMLInputElement).value);
};

// 3. 类型断言
interface Foo{
    bar: number
}
let foo = {} as Foo;
console.log(foo.bar);

// 类型兼容
let s: string = "a";
s = null;
s = undefined;
let s3: number = 1;
s3 = null;
s = undefined;
let s4: any[] = [1, 2, 3];
s4 = null;
s4 = undefined;

// 接口兼容
interface X{
    a: any,
    b: any
}
interface Y{
    a: any,
    b: any,
    c: any
}
let x1: X = { a: 'Jack', b: 20 };
let y1: Y = { a: "Lucy", b: 32, c: 'red'};

x1 = y1;
// y1 = x1;  这里会报错，y1不兼容x1

// 函数兼容
type Handler = (x: number, y: number) => void;
function hof(handler: Handler){
    return handler
}

// 1), 参数的个数
let handler1 = (a: number) => {};
hof(handler1);
let handler2 = (a: number, b: number, c: number) => {};
// hof(handler2);  这里报错


// , 可选参数和剩余参数
let a2 = (p1: number, p2: number) => {};
let b2 = (p1?:number, p2?: number) => {};
let c2 = (...args: number[]) => {};
// a. 剩余参数可以兼容可选参数
a2 = b2;
a2 = c2;
// b. 可选参数不兼容固定参数和可选参数
b2 = a2;
b2 = c2;
// c. 剩余参数可以兼容固定参数和可选参数
c2 = a2;
c2 = b2;

// 2），参数类型
let handler3 = (a: string) => {};
// foo(handler3); 这里会报错

interface Point3D{
    x: number,
    y: number,
    z: number
}

interface Point2D{
    x: number,
    y: number
}
let p3d = (point: Point3D) => {};
let p2d = (point: Point2D) => {};

// p3d兼容p2d
p3d = p2d;
// p2d不兼容p3d
// p2d = p3d; 这里会报错
// 成员个数多的，兼容成员个数少的

// 3）：返回值类型
let e1 = () => ({name: "Alice"});
let f1 = () => ({name: "Alice", location: "Hangzhou"});
// e1兼容f1
e1 = f1;
// f1不兼容e1
// f1 = e2; 这里会报错

// 函数的重载
function overload(a: number, b: number): number;
function overload(a: string, b: string): string;
function overload(a: any, b: any): any{

};

/*
枚举类型兼容
*/
// 1. 枚举可以和数字类型兼容
enum Fruit { Apple, Banana };
enum Color { Red, Yellow };
let fruit: Fruit = 3;
let no: number = Fruit.Apple;
// 2. 枚举之间是不兼容的
// let color: Color = Fruit.Apple; 这里会报错

/*
类兼容
*/
// 类兼容性只比较结构，在比较两个类时，静态成员和构造函数不参与比较。
class A{
    constructor(p: number, q: number){}
    id: number = 1;
    // private name = "Jack";
}
class B{
    static s = 1;
    constructor(p: number){};
    id: number = 2;
    // private name = "Jack";
}

console.log(B.s);
let a1 = new A(1, 2);
let b1 = new B(1);
// 这两个实例是相互兼容的
a1 = b1;
b1 = a1;
// 如果类中含有私有成员，那么这两个类就不兼容了，只有父类和子类之间才能相互兼容

/*
*** 泛型兼容性
*/
// 泛型接口
interface Empty<T>{
    value: T
}
let object1: Empty<string> = {value: '123'};
let object2: Empty<number> = {value: 123};
// object1 = object2;
// object2 = object1;
// 泛型函数
let l1 = <T>(x: T): T => {
    return x;
}
let l2 = <T>(x: T): T => {
    return x;
}
l2 = l2;
l2 = l1;

// 口诀
// 结构之间兼容：成员少的，兼容成员多的
// 函数之间兼容：参数多的，兼容参数少的
/**
 * 类型保护
*/
enum Type { Strong, Weak };

class Java{
    helloJava(){
        console.log("I'm Java");
    }
    java: any
}

class Javascript{
    helloJavaScript(){
        console.log("I'm Javascript");
    }
    javascript: any
}

function getLanguage(type: Type, x: string | number){
    let lang = type === Type.Strong ? new Java(): new Javascript();
    // 打印实例的方法
    // 下面会报错
    if((lang as Java).helloJava){
        (lang as Java).helloJava();
    }else {
        (lang as Javascript).helloJavaScript();
    }
    // 解决方法
    // 类型保护机制
    // Typescript能在特定的区块中保证变量属于某个特定的类型
    // 可以在此区块中放心地引用此类型的属性，或者调用此类型的方法
    // 1. instanceof: 判断实例是否属于某个类
    if(lang instanceof Java){
        lang.helloJava();
    }else{
        lang.helloJavaScript();
    }

    // 2. in关键字
    if("java" in lang){
        lang.helloJava();
    }else if("javascript" in lang){
        lang.helloJavaScript();
    }

    // 3. typeof
    if(typeof x === "string"){
        x.length
    }else{
        x.toFixed();
    }

    // 4. 创建类型保护函数
    if(isJava(lang)){
        lang.helloJava();
    }else{
        lang.helloJavaScript();
    }
    return lang;
}

getLanguage(Type.Strong, "java");

// 类型位词
function isJava(lang: Java | Javascript): lang is Java{
    return (lang as Java).helloJava !== undefined;
}