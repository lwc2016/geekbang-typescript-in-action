function log(value: string): string{
    console.log(value);
    return value;
}

// 泛型：不预先确定的数据类型，具体的类型在使用的时候才能确定
/*
*** 泛型函数
*/
// 1. 用泛型定义一个函数
function print<T>(value: T): T{
    console.log(value);
    return value;
}

// 2种调用
// 第一种，指明类型
print<string[]>(["1", "2", "3", "4"]);
// 第二种，省略类型的指定，使用类型推断
print([1, 2, 3, 4]);

// 2. 用泛型定义函数的类型
type Print = <T>(value: T) => T;
let myPrint: Print = (value) => {
    console.log(value);
    return value;
}
myPrint([1,2,3]);
myPrint<string[]>(["1", "2", "3"]);

// 3. 用泛型定义接口
interface Log{
    <T>(value: T): T
}

interface Log1<T>{
    (value: T): T
}
let myLog: Log1<number> = (value) => {
    return value;
} 
myLog(1);

// 泛型和接口非常类似，泛型也可以约束类的成员
class Log2<T>{
    run(value: T){
        console.log(value);
        return value;
    }
}

let log2 = new Log2<number>();
log2.run(12);

// 当不指定类型时，value可以为任意值
let log3 = new Log2();
log3.run(12);
log3.run("12");

// 泛型约束
interface Log3{
    length: number
}
function log4<T extends Log3>(value: T): T{
    console.log(value, value.length);
    return value;
}

log4('123');
log4([1,2,3]);
// log4(1); 这里会报错