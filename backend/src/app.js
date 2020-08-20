const cors = require('cors')
const express = require('express')
const {graphqlHTTP} = require('express-graphql')

const app = express()

const userSchema = require('./schema/user')
const Database = require('./database')

//settings
app.set('PORT', process.env.PORT || 4000)

//allow multi-cross 
app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema: userSchema,
    graphiql: true
}))

app.listen(app.get('PORT'), ()=>{
    console.log(`App in port: ${app.get('PORT')}`)
})

