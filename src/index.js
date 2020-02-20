const { Molecule } = require('molecule-javascript')
const schema = require('../schema/blockchain-combined.json')

const names = schema.declarations.map(declaration => declaration.name)
const scriptTypeIndex = names.indexOf('Script')
const scriptType = schema.declarations[scriptTypeIndex]

// Write your script logic here.
CKB.debug(scriptType)
