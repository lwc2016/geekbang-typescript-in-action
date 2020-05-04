console.log("----------- function iterface ----------")
// 用变量定义函数类型
let sum: (x: number, y: number) => number;
sum = (a, b) => a + b;

// 用接口定义函数
interface Sum {
    (x: number, y: number): number
}
let sum1: Sum = (a, b) => a + b;

// 使用类型别名定义函数
type Add = (x: number, y: number) => number;
let sum2: Add = (a, b) => a + b;

// 混合类型接口：既可以定义个函数，又可以像对象一样拥有属性和方法
interface Lib {
    (): void,
    version: string,
    doSomething(): void
};
// 实现这个接口
let lib: Lib = (() => { }) as Lib;
lib.version = "1.0.0";
lib.doSomething = () => {
    console.log("hello world");
}

function getLib() {
    let lib: Lib = (() => { }) as Lib;
    lib.version = "1.0.0";
    lib.doSomething = () => {
        console.log("hello world");
    }
    return lib;
}
let lib1 = getLib();
let lib2 = getLib();

console.log(lib1.version);
lib2.doSomething();