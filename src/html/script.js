const schemaInput = document.querySelector('#schema')
const moleculesUl = document.querySelector(('#molecules'))
const dialog = document.querySelector('dialog')

const dialogCloseBtn = document.createElement('button')
dialogCloseBtn.innerText = 'Close'
dialogCloseBtn.addEventListener('click', () => {
  if (dialog.show) {
    dialog.close()
  }
})

let molecules = {}

dialog.addEventListener('close', () => {
  dialog.innerHTML = ''
})

const showInfoViaDialog = ({
  name,
  method,
  schema,
  value,
  result
}) => {
  const frag = document.createDocumentFragment()
  const title = document.createElement('h2')
  const schemaTitle = document.createElement('summary')
  const schemaData = document.createElement('pre')
  const rawDataTitle = document.createElement('h3')
  const rawData = document.createElement('div')
  const resultDataTitle = document.createElement('h3')
  const resultData = document.createElement('pre')

  title.innerText = `${name}.${method}`
  schemaTitle.innerText = 'Schema'
  schemaData.innerText = schema
  rawDataTitle.innerText = "Value"
  rawData.innerText = value
  resultDataTitle.innerText = 'Result'
  resultData.innerText = result
  resultData.className = method

  const details = document.createElement('details')
  details.appendChild(schemaTitle)
  details.appendChild(schemaData)

  frag.appendChild(title)
  frag.appendChild(details)
  frag.appendChild(rawDataTitle)
  frag.appendChild(rawData)
  frag.appendChild(resultDataTitle)
  frag.appendChild(resultData)
  frag.appendChild(dialogCloseBtn)
  dialog.appendChild(frag)

  dialog.showModal()
}

document.body.addEventListener('click', e => {
  if (e.target.tagName !== 'BUTTON') {
    return
  }
  const container = e.target.parentNode
  const name = container.id
  if (!Object.keys(molecules).includes(name)) return
  const value = container.querySelector('input').value
  const method = e.target.innerText
  try {
    let result = ''
    if (method === 'serialize') {
      result = molecules[name].serialize(JSON.parse(value))
    }
    if (method === 'deserialize') {
      result = molecules[name].deserialize(value)
    }
    showInfoViaDialog({
      name,
      method,
      schema: JSON.stringify(molecules[name].schema, null, 2),
      value,
      result: JSON.stringify(result, null, 2)
    })

  } catch (err) {
    window.alert(err.message)
  }
})


schemaInput.addEventListener('change', e => {
  moleculesUl.innerHTML = ""
  molecules = {}

  try {
    const schema = JSON.parse(schemaInput.value)
    schema.declarations.forEach(declaration => {
      molecules[declaration.name] = new MoleculeJavaScript.Molecule(declaration)
    })
    const frag = document.createDocumentFragment()

    Object.keys(molecules).map(name => {
      const el = document.createElement('li')
      const label = document.createElement('label')
      const input = document.createElement('input')
      const serializeBtn = document.createElement('button')
      const deserializeBtn = document.createElement('button')

      el.id = name
      el.title = name
      label.innerText = name
      serializeBtn.innerText = 'serialize'
      deserializeBtn.innerText = 'deserialize'

      el.appendChild(label)
      el.appendChild(input)
      el.appendChild(serializeBtn)
      el.appendChild(deserializeBtn)
      frag.appendChild(el)
    })

    moleculesUl.appendChild(frag)

  } catch (err) {
    window.alert(err.message)
  }
})
