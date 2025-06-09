#! /usr/bin/env node

for (let n = 0; n <= 20; n++) {
  if (n % 15 === 0) {
    console.log("FizzBuzz");
  } else if (n % 5 === 0) {
    console.log("Buzz");
  } else if (n % 3 === 0) {
    console.log("Fizz");
  } else {
    console.log(n);
  }
}
