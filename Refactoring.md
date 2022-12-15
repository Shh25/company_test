# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
1. Created env file to access constants across dev and test file. This is important to order a single source of truth in code. If these constants need to be changed in the future, they can be changed easily by just modifying the .env file without touching the code or the test file. Added this file in gitignore.
2. There is an "if" condition assigning candidate to trivial key if it does not have any value. I am assigning a value to it by default to reduce complication in code. This will work as we re checking existing values before updating candidate.
3. Rename candidate to partitionKey
4. Called "toString()" for inputs which may contain Big ints as they are not supported by JSON.stringify()
5. Code refactoring by creating smaller functions that can be reused later.


