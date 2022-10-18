const { CosmosClient } = require('@azure/cosmos')

const config = require('./config')
const url = require('url')

const endpoint = config.endpoint
const key = config.key

const databaseId = config.database.id
const containerId = config.container.id

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    const bane = (req.query.bane || (req.body && req.body.bane));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    if (name) {
        context.bindings.outputDocument = JSON.stringify({
            // create a random ID
            id: new Date().toISOString() + Math.random().toString().substring(2, 10),
            name: name,
            partitionKey: 'baneRange' 
        });
    }

    const reponses = [responseMessage];
    if (bane) {
        const dbClinet = await getDbClient();

        const response = await dbClinet.items.upsert({
            id: new Date().toISOString() + Math.random().toString().substring(2, 10),
            name: bane
        })

        reponses.push("bane name: "+ bane);
        // reponses.push(req);
        // reponses.push(context);
        reponses.push("did the db insert!");
        reponses.push(JSON.stringify(response.item.id));
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        contentType: 'application/json',
        body: reponses//reponses.join(" ### ")
    };
}

async function getDbClient() {
    const cosmosClient = new CosmosClient({
        endpoint: process.env.COSMOS_ENDPOINT || endpoint,
        key: process.env.COSMOS_KEY || key,
    })
    const database = (
        await cosmosClient.databases.createIfNotExists({
            id: process.env.COSMOS_ENV || databaseId , //TODO:: This should be eventually a variable based on the environment.
        })
    ).database

    const container = (
        await database.containers.createIfNotExists({
            id: containerId,
        })
    ).container

    return container
}