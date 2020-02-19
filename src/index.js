const { Molecule } = require('molecule-javascript')
const schema = require('../schema/blockchain-combined.json')

const scriptType = schema.declarations.find(declaration => declaration.name === "Script")

// Write your script logic here.
CKB.debug(scriptType)
