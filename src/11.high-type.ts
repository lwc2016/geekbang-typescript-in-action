// 高级类型：typescript为保证语言的灵活性，引入的语言特性
// 1. 交叉类型: 将多个类型合并一个类型，新类型拥有所有类型的特性。交叉类型适合对象的混入场景
interface DogInterface{
    run(): void
}
interface CatInterface{
    jump(): void
}

// pet是一个交叉类型，它拥有DogInterface和CatInterface的所有属性
let PetInterface: DogInterface & CatInterface = {
    run(){},
    jump(){}
};

// 2. 联合类型：声明的类型并不确定，可以是多个类型中的一个
let a3: number | string = "1";
// 字符串联合类型
let b3: 'a' | 'b' | 'c' = 'a';  // b3的取值必须是a,b,c中的一种
// 数字联合类型
let c3: 1 | 2 | 3 = 3;         // c3的取值必须是1，2，3中的一个
// 对象联合类型， 会访问公有成员
class Dog8 implements DogInterface{
    run(){}
    eat(){}
}
class Cat8 implements CatInterface{
    jump(){}
    eat(){}
}
enum Master { Boy, Girl };
function getPet(master: Master){
    let pet = master === Master.Boy ? new Dog8() : new Cat8();

    pet.eat();  // 因为Dog8和Cat8都有eat方法，所以不会报错
    return pet;
}

// 可区分的联合类型
// 核心思想：一个类型如果是多个类型的联合类型，并且每个类型之间有个公共的属性，那么我们就可以凭借这个公共属性，创建不同的类型保护区块。
interface Square{
    kind: "square",
    size: number
}
interface Rectangle{
    kind: "rectangle",
    width: number,
    height: number
}
interface Circle{
    kind: "circle",
    r: number
}

type Shape = Square | Rectangle | Circle;
function area(s: Shape){
    switch(s.kind){
        case "square":
            return s.size * s.size;
        case "rectangle":
            return s.width + s.height;   
        case "circle":
            return  Math.PI * s.r ** 2;
        default:
            return ((e:never)=>{throw new Error(e)})(s);
    }
}
// 总结：交叉类型比较适合做对象的混入，联合类型可以使类型有一定的不确定性，可以增强代码的灵活性

// 3. 索引类型
let obj2 = {
    a: 1,
    b: 2,
    c: 3
}
function getValues(obj:any, keys:string[]){
    return keys.map(key => obj[key]);
}
console.log(getValues(obj2, ['a', 'b']));

function getValues1<T, K extends keyof T>(obj: T, keys: K[]): T[K][]{
    return keys.map(key => obj[key]);
}
// console.log(getValues1(obj2, ['e', 'f'])); 这里会报错

// 4. 映射类型，可以从一个旧的类型生成一个新的类型
interface Obj{
    a: string,
    b: number,
    c: boolean
}
// 将接口中所有成员变成只读
type ReadOnlyObj = Readonly<Obj>;
let obj3: ReadOnlyObj = {
    a: 'Jack',
    b: 1,
    c: true
}
// obj3.a = '122';

// 将接口中所有成员变成可选
type PartialObj = Partial<Obj>;
let obj4: PartialObj = {
    a: 'Lucy'
};

// 抽取Obj的一些字集
type PickObj = Pick<Obj, 'a' | 'b'>
let obj5: PickObj = {
    a: 'Ilen',
    b: 2
}

// 
type RecordObj = Record<'x' | 'y', Obj>;
let obj6: RecordObj = {
    x: {
        a: 'Jack',
        b: 1,
        c: true
    },
    y: {
        a: 'Jack',
        b: 1,
        c: true
    }
}
// 映射类型本质是预先定义的一些泛型接口，通常会集合索引类型，获取对象的属性和属性值，从而将对象映射成我们想要的结构

// 5. 条件类型： 是有条件表达式决定的类型
// T extends U ? x: y  如果类型T可以被赋值给类型U，就是x类型，否是y类型
type Typename<T> = 
    T extends string ? 'string':
    T extends number ? 'number':
    T extends boolean ? 'boolean':
    T extends undefined ? 'undefined':
    T extends null ? 'null':
    "object";

type T1 = Typename<string>;
type T2 = Typename<string[]>

// 分步条件类型
// (A | B) extends U ? x : Y;
// (A extends U ? x : y) | (B extends U ? x: y);
type T3 = Typename<string | number>;

type Diff<T, U> = T extends U ? never : T;

// b和c的联合类型
type T4 = Diff<"a" | "b" | "c", "a" | "e">;

// 预制的条件类型
// Extract
// Exclude
// ReturnType<T> 获取函数返回值的类型
type T7 = ReturnType<() => string>;

