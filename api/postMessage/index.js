const CosmosClient = require('@azure/cosmos').CosmosClient

const config = require('./config')
const url = require('url')

const endpoint = config.endpoint
const key = config.key

const databaseId = config.database.id
const containerId = config.container.id

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    const bane = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    if (name) {
        context.bindings.outputDocument = JSON.stringify({
            // create a random ID
            id: new Date().toISOString() + Math.random().toString().substring(2, 10),
            name: name
        });
    }

    const reponses = [responseMessage];
    if (bane) {
        const dbClinet = await getDbClient();

        dbClinet.items.upsert({
            id: new Date().toISOString() + Math.random().toString().substring(2, 10),
            name: bane
        })


        reponses.push["did the db insert!"];
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: reponses.join(" ### ")
    };
}

async function getDbClient() {
    const cosmosClient = new CosmosClient({
        endpoint: process.env.COSMOS_ENDPOINT,
        key: process.env.COSMOS_KEY,
    })
    const database = (
        await this.cosmosClient.databases.createIfNotExists({
            id: process.env.COSMOS_ENV, //TODO:: This should be eventually a variable based on the environment.
        })
    ).database

    const container = (
        await this.database.containers.createIfNotExists({
            id: tableName,
        })
    ).container

    return container
}