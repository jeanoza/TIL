//4.6 Object Creation Expressions
const a = new Object({ first: "haha", second: "hehe" });
const b = new Object(2, 4);
const c = new Object("haha2");
console.log(a); // {first:'haha', second:'hehe'}
console.log(b); // [Number:2]
console.log(c); // [String:'haha2']

//empty pair of parenthese can be omitted : new Object means new Object();
//for detail, chapter 9

/** 4.7 Operator Overview
 * shift : >>, <<, >>>
 * test not strict(any -> bool): ==, !=
 * test strict(any -> bool): ===, !==
 */
console.log(8 << 1); // 16, 100(2) => 1000(2), same in Java or C
console.log(8 >> 1); // 4
console.log(63 >>> 2); // 11111 for unsigned int(no minus number)

/** 4.7.1 Number of Operands
 * binary operator : 2 + 3, + is binary operator, 2 and 3 are operands
 * single operator : -2, - is unary(single) opeator, 2 is operand
 * ternary operator: a? b: c, if(a) b else c
 */

// 4.7.2 Operands and Result Type
// Conversion implicit according to operator's the need
console.log("3" * 5); // 15(number), because of conversion implicit by operator *
console.log("3" + "5"); // "35", + connect number string.
console.log("3" < 5); // true
/** lval = lvalue, left value : the thing that can be appear on the left side of an assignment, on JS:
 * variable // const name = "Guilane"
 * properties of object // user.name = "Rouslan"
 * element of arrays // user[Ø] = "Kojak"
 */

/** 4.7.3 Operator Side Effect
 * ++ or --
 * delete
 */

// 4.7.4 Operator Precedence
// Property access and invocation expressions have higher precedence than any of the operators
// Although typeof is one of the highest-priority operators : type of result...
// Assignment has very low precedence and is almost always performed last.
// use "()" for stability when use "??" or "**" which are new added on ES2020 & ES6 - rule is not yet well defined

// 4.7.5 Operator Associativity
// Lval is Left-to-right associativity
// Rval is Right-to-left associativity
// (2 ** 3 ** 4) => 2 ** (3 ** 4);

// 4.8 Arithmetic Expressions
// NaN value: Not A Nuùber
// If either operand is (or converts to) NaN, the result of the operation is (almost always) NaN.

// p.74 4.8.1~
