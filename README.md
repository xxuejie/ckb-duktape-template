# CKB Duktape Template

This repo provides a template for writing JavaScript on CKB. It ships with [molecule](https://github.com/nervosnetwork/molecule) integration directly for CKB data structures. We also provide a handy package script that combines everything to a single ES5 JavaScript file, so you deploy to CKB powered by either duktape, or quickjs.


## How to use it

```
$ git clone https://github.com/xxuejie/ckb-duktape-template
$ cd ckb-duktape-template
$ npm install
```

`src/index.js` serves as a starting point for your script. You can add the logic you want beneath the line "Write your script logic here."

When you finish editing the files. Run the following command to build the script:

```
$ npm run build
```

A file named `duktape.js` will be generated in the `build` directory. This file should contain everything you need to run your script logic.
