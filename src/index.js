const { Molecule } = require('molecule-javascript')
const schema = require('../generated/blockchain.json')

const molecules = {}
schema.declarations.forEach(declaration => {
  molecules[declaration.name] = new Molecule(declaration)
})

console.log(molecules)
