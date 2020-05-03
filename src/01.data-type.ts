// 原始类型
let bool: boolean = true;
let num: number = 123;
let str: string = "hello world";
// str = 123;  这里编辑器会报错
let bool1 = false;
let num3 = 24;
let str2 = "Jack";
// bool1 = 23;
// num3 = '24';
// str2 = true;


// 数组
let arr1: number[] = [1,2,3];
let arr2: Array<number> = [1,2,3];  // 这里Array<number>写法其实是ts为我们预定义的泛型接口
let arr3: (number | string)[] = [1, 2, 'Jack'];
let arr4: Array<number | string> = [1,2,3,'Jack'];


// 元组：元组是一种特殊的数组，它限定了数组元素的类型和个数
let tuple: [number, string] = [1, 'Jack'];

// 元组越界问题
tuple.push(2);   
console.log(tuple);  
tuple.shift();
console.log(tuple);
// console.log(tuple[2]); 这里会报错
// 可以通过push方法添加新元素，但不能越界访问
console.log(tuple[1]);

// 函数
let add = (x: number, y: number) => x + y;
// 类型推断功能

// 这里定义了函数类型，但没有具体实现
let compute: (x: number, y: number) => number;
compute = (a, b) => a + b;

// 对象类型
let obj: object = {x: 1, y: 2};

let obj1: {
    x: number,
    y: number
} = {x: 1, y: 2};


// symbol
let s1: symbol = Symbol();
let s2 = Symbol();
console.log(s1 === s2);

// undefined, null
// 可以给变量赋值undefined和null，但赋值undefined和null后，不能在赋值其他类型了
let un: undefined = undefined;
let nu: null = null;

// un = 1; 这里会报错
num = undefined;  //这里也会报错，但typescript官方规定undefined和null为任何类型的子类，可以通过在tsconfig.jsonp设置"strictNullChecks": true

// 另外可以通过声明联合类型来解决
let num2: number | undefined | null = 1;
num2 = undefined;

// void：是一种操作符，可以让任何表达式返回undefined
let noReturn = () => {};

// any：类型
let x;
x = 1;
x = 'Hello world';

// never：永远不会有返回值的类型
// 抛出错误时，不会有返回值
let err = ():never=>{
    throw new Error("error");
}
// 死循环时，也不会有返回值
let endless = ():never=>{
    while(true){}
}