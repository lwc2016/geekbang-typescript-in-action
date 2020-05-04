console.log("------------- function ---------------")
/**
 * 函数定义: 4种方式
*/
// 1. 通过function定义，需要明确指出函数参数的类型，和返回值的类型（函数返回值也可以通过类型推断）
function plus1(x: number, y: number){
    return x + y;
}
// 2. 通过变量定义函数的类型
let plus2: (x: number, y: number) => number;
plus2 = (x, y) => x + y;

// 3. 通过类型别名定义函数的类型
type plus3 = (x: number, y: number) => number;

// 4. 通过接口定义函数的类型
interface plus4 {
    (x: number, y: number): number
}


/**
 * 函数参数
*/
// 在js中函数的参数是没有限制的，在ts中函数的形参和实参是一一对应的

// 1. 可选参数
// 必选参数不能位于可选参数之后
function plus5(x: number, y?: number){
    return y? x + y : x;
}
console.log(plus5(1));

// 2. 默认值
function plus6(x: number, y: number = 1, z: number, w = 2){
    return x + y + z + w;
}
console.log(plus6(1, 2, 3, 4));
console.log(plus6(1, undefined, 2));

// 3. 剩余参数
function plus7(x: number, ...rest: number[]){
    return x + rest.reduce((pre, cur) => pre + cur);
}
console.log(plus7(1, 2, 3, 4));

/*
*** 函数重载
*/
// 两个函数如果名称相同，但参数个数或参数类型不同，那么就实现了函数的重载。函数重载的好处，功能相同的函数，但函数参数不同，不必使用不同的函数名称，增强了函数的可读性
function plus8(...rest: number[]): number;
function plus8(...rest: string[]): string;
function plus8(...rest: any[]): any{
    let [ first ] = rest;
    if(typeof first === "string"){
        return rest.join("");
    }else if(typeof first === "number"){
        return rest.reduce((pre, cur) => pre + cur);
    }
}

console.log(plus8("1", "2", "3"));
console.log(plus8(1, 2, 3));