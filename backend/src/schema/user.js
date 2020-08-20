const graphql = require('graphql')
const bcrypt = require('bcryptjs')

const User = require('../models/user')


const EncryptPassword = async (password)=>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

const comparePassword = async ( password, encryptedPassword )=>{
    return await bcrypt.compare(password, encryptedPassword)
}

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLSchema,
    GraphQLList
} = graphql

const userType = new GraphQLObjectType({
    name: 'user',
    fields: ()=>({
        id: {type: GraphQLID},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        username: {type: GraphQLString},
        role: {type: GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQuerytype',
    fields: {
        user:{
            type: userType,
            args: {id: {type: GraphQLID}},
            resolve(parents, args){
                return User.findById(args.id)
            }
        },
        getUserWithEmail:{
            type: userType,
            args: {email: {type: GraphQLString}},
            resolve (parents, args){
                return User.findOne({email: args.email})
            }
        }
    }
})

const MutationQuery = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser:{
            type: userType,
            args: {
                email: {type:GraphQLString},
                password: {type:GraphQLString},
                username: {type:GraphQLString},
                role: {type:GraphQLString}
            },
            async resolve(parent, args){
                let encryptedPassword = await EncryptPassword(args.password)
                let user = new User({
                    email: args.email,
                    password: encryptedPassword,
                    username: args.username,
                    role: args.role
                })
                return user.save()
            }
        },
        checkUser:{
            type: userType,
            args: {
                email: {type: GraphQLString},
                password: {type: GraphQLString}
            },
            async resolve(parent, args){
                let accountEmail = await User.findOne({email: args.email})
                if(await comparePassword(args.password, accountEmail.password) == false) return null
                return accountEmail
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:  RootQuery,
    mutation: MutationQuery
})