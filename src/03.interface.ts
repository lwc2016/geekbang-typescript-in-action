console.log("---------------- interface ---------------")
interface User{
    id: number,
    name: string,
    [x: string]: any,  //用任意字符串去索引List，可以得到任意的结果 
}
interface Result{
    data: User[]
}

function render(result: Result){
    result.data.map(user => {
        console.log(user.id, user.name);
    })
}

// 鸭式变形法
const result = {
    data: [
        {id: 1, name: 'Jack', sex: "male"},
        {id: 2, name: 'Lucy', sex: "female"}
    ]
}
render(result);

// 下面会报错
/*
render({
    data: [
        {id: 1, name: 'Jack', sex: "male"},
        {id: 2, name: 'Lucy', sex: "female"}
    ]
})
*/
// 第一种方法：将对象字面量赋值给变量
render(result);
// 第二种方法：类型断言
render({
    data: [
        {id: 1, name: 'Jack'},
        {id: 2, name: 'Lucy', sex: "female" }
    ]
} as Result );
render(<Result>{
    data: [
        {id: 1, name: 'Jack'},
        {id: 2, name: 'Lucy', sex: "female" }
    ]
})
// 第三种方式：字符串索引签名

// 接口成员的属性
interface Person{
    readonly id: number,  // 只读属性
    name: string,
    age?: number,  // 可选属性
}
let person: Person = {
    id: 1,
    name: 'Jack',
    age: 26
}
// person.id = 2; 这里会报错

// 当不知道接口中属性的个数时，可以使用可索引类型的接口：数字索引和字符串索引
// 数字索引接口
interface StringArray {
    [index: number]: string  // 用任意的数字去索引StringArray都可以得到一个字符串，相当于声明了一个字符串类型的数组
}
let chars: StringArray = ['1', '2', '3'];
let chars2: StringArray = {
    1: 'Lucy',
    2: 'Jack'
}

// 字符串索引接口
interface Names {
    [x: string]: string  // 用任意的字符串去索引Names得到一个字符串，
    [y: number]: string
}
let names: Names = {
    name: "Jack"
}