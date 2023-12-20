require('dotenv').config()
const neo4j = require('neo4j-driver');

const uri = process.env.URI

const user = process.env.USER

const password = process.env.PASSWORD
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

module.exports.driver = driver;