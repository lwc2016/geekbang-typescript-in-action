console.log("---------------- enum ---------------")
// 1. 数字枚举
enum Role{
    Reporter,
    Developer,
    Maintainer,
    Owner,
    Guest
}
console.log(Role.Reporter);   // 0
console.log(Role.Developer);  // 1
console.log(Role.Maintainer); // 2
console.log(Role.Owner);      // 3
console.log(Role.Guest);      // 4

console.log(Role[0]);
console.log(Role[1]);
console.log(Role[2]);
console.log(Role[3]);
console.log(Role[4]);

enum Role1{
    Reporter = 1,
    Developer,
    Maintainer,
    Owner,
    Guest
}
console.log(Role1.Reporter);   // 1
console.log(Role1.Developer);  // 2
console.log(Role1.Maintainer); // 3
console.log(Role1.Owner);      // 4
console.log(Role1.Guest);      // 5
console.log(Role);

// 反向映射
console.log(Role[Role.Reporter]);  // Reporter

// 2. 字符串枚举， 字符串枚举不能进行反向映射
enum Message{
    Success = "成功，恭喜你",
    Fail = "失败，太遗憾了"
}
console.log(Message.Success);

// 3. 异构枚举
enum Answer {
    N,
    Yes = "yes"
}
console.log(Answer.N);
console.log(Answer.Yes);
console.log(Answer[Answer.N]);

// 枚举成员
// Role.Reporter = 1;  这里枚举的值不能修改
// 枚举成员分为2类：const member, computed member(可计算)
// const member: 常量枚举，包括：没有初始值，对已有成员的引用，一些常量的表达式。常量枚举成员会在编译时计算出枚举的结果，以常量的形式出现在运行时环境
// computed member: 需要被计算的枚举成员，一些非常量的表达式。这些成员的表达式不会在编译阶段被计算，而会保留到程序的执行阶段
enum Char{
    // 常量枚举成员
    a,
    b = Char.a,
    c = 1 + 3,
    // 计算枚举成员
    d = Math.random(),
    e = "Helloworld".length
}

// 常量枚举
// 常量枚举作用，当不需要一个对象，需要对象的值时可以使用常量枚举，这样会减少在编译环境的代码
const enum Month {
    Jan,
    Feb,
    Mar
}

let month = [Month.Jan, Month.Feb, Month.Mar];

// 枚举类型
// 所有枚举成员没有初始值
enum E {a, b};
// 所有枚举成员都是数字枚举
enum F { a = 0, b = 1};
// 所有枚举成员都是字符串枚举
enum G { a = "apple", b = "banana" };

let e: E = 3;
let f: F = 3;
// e === f; 不同枚举类型不能进行比较

// 字符串枚举，只能是枚举成员的类型
let g1: G = G.a;
let g2: G = G.b;
