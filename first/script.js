"use strict";

let num = prompt("Gimme a number!");

if (num < 0) {
    console.log("-1");
} else if (num > 0) {
    console.log("1");
} else {
    console.log("0")
}

let b = 2;
let result = num +b < 4 ? "Below" : "Above";
console.log(result);