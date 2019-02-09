const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const engines = require('consolidate')

express()
  .use(express.static(path.join(__dirname, 'public')))
  .engine('html',engines.mustache)
  .set('view engine', 'html')  
  .get('/', (req, res) => res.sendFile(path.join(__dirname + '/public/MedMath.html')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))  
  


