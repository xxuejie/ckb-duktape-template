# Molecule JavaScript Template

This repo demonstrates the most general way of using `molecule-javascript`

## Schema Including Intermediate Types

There're two files listed in `schema` already.

- `schema/blockchain.mol`: schema including intermediate types in Molefile foramt.
- `schema/blockchain.json`: schema including intermediate types in JSON format.

They are totally equivalent in different formats through.

By [`moleculec`](https://github.com/nervosnetwork/molecule) you can easily transform the `blockchain.mol` into the `blockchain.json`

> Rust is required in using molecules

```bash
$ cargo install moleculec
$ moleculec --language - --format json --schema-file ./schema/blockchain.mol > ./schema/blockchain.json
```

## Normalized Schema

While there are only `byte`, `array`, `fixvec`, `dynvec`, `struct`, `table`, `option` and `union` in molecule serialization, we have to normalize the schema mentioned above with the following command.

```bash
$ npm install
$ mkdir -p generated
$ npx moleculec-js --normalize-schema ./schema/blockchain.json > ./generated/blockchain.json
# or
$ npx moleculec-js -ns ./schema/blockchain.json > ./generated/blockchain.json
```

A new file named `blockchain.json` will be generated in `./generated/` and it's totally composed with native types.

With the normalized schema we can in 2 JavaScript run-time.

## Use in Node.js

The file `src/index.js` is a demo for Node.js.

```js
// src/index.js
const { Molecule } = require('molecule-javascript')
const schema = require('../generated/blockchain.json')

const molecules = {}
schema.declarations.forEach(declaration => {
  molecules[declaration.name] = new Molecule(declaration)
})

console.log(molecules)
```

## Use in browser

The folder `src/html` is a demo for browser.
![demo](./demo.png)

## Use in Duktape

The file `src/duktape/index.js` is a demo for Duktape.

```js
const { Molecule } = require('molecule-javascript')
const schema = require('../../generated/blockchain.json')

const scriptTypeIndex = schema.declarations.map(declaration => declaration.name).indexOf('Script')

if (scriptTypeIndex < 0) {
  throw new Error('Type Script is not defined')
}

const scriptType = schema.declarations[scriptTypeIndex]

const molecule = new Molecule(scriptType)
const scriptData = [
  [ 'code_hash', [ '0x68', '0xd5', '0x43', '0x8a', '0xc9', '0x52', '0xd2', '0xf5', '0x84', '0xab', '0xf8', '0x79', '0x52', '0x79', '0x46', '0xa5', '0x37', '0xe8', '0x2c', '0x7f', '0x3c', '0x1c', '0xbf', '0x6d', '0x8e', '0xbf', '0x97', '0x67', '0x43', '0x7d', '0x8e', '0x88', ], ],
  ['hash_type', '0x01'],
  [ 'args', [ '0x39', '0x54', '0xac', '0xec', '0xe6', '0x50', '0x96', '0xbf', '0xa8', '0x12', '0x58', '0x98', '0x3d', '0xdb', '0x83', '0x91', '0x5f', '0xc5', '0x6b', '0xd8', ], ],
]
const serialized = molecule.serialize(scriptData)
console.log(serialized)
const parsed = molecule.deserialize(serialized)
console.log(parsed)
```

For running in duktape it should be pre-compiled into ES5 with the following command

```sh
$ npm run build
```

and a file named `duktape.js` will be generated in the `build` directory.

If you have installed duktape, simply run

```sh
$ duk duktape.js
```

and the result will be printed as follows

```sh
$ duk duktape.js

0x4900000010000000300000003100000068d5438ac952d2f584abf879527946a537e82c7f3c1cbf6d8ebf9767437d8e8801140000003954acece65096bfa81258983ddb83915fc56bd8
[["code_hash",["0x68","0xd5","0x43","0x8a","0xc9","0x52","0xd2","0xf5","0x84","0xab","0xf8","0x79","0x52","0x79","0x46","0xa5","0x37","0xe8","0x2c","0x7f","0x3c","0x1c","0xbf","0x6d","0x8e","0xbf","0x97","0x67","0x43","0x7d","0x8e","0x88"]],["hash_type","0x01"],["args",["0x39","0x54","0xac","0xec","0xe6","0x50","0x96","0xbf","0xa8","0x12","0x58","0x98","0x3d","0xdb","0x83","0x91","0x5f","0xc5","0x6b","0xd8"]]]
```
