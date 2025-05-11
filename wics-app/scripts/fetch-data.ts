const { client } = require('../sanity/lib/client')
const fs = require('fs')

const schemas = [
  'blogPost',
  'pageBull',
  'personList',
  'post',
  'profile',
  'sponsor',
  'tag'
]

async function fetchAll() {
  const data = {}
  
  for (const type of schemas) {
    data[type] = await client.fetch(`*[_type == "${type}"]`)
  }

  fs.writeFileSync('public/data.json', JSON.stringify(data))
}