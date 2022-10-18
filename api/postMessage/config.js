var config = {}

config.endpoint = 'https://azure-core-compare-mongo.documents.azure.com:443/'
config.key = '0dksNDFy61MNZlaeOo2x7w8MHD7PPLqg2ASn4d9usQRmoDmxqIfaB3haTdZnTG8oBjRyBsuPyvIZGIDKsOlKnw=='

config.database = {
  id: 'ToDoList'
}

config.container = {
  id: 'Items'
}

config.items = {
  Andersen: {
    id: 'Anderson.1',
    Country: 'USA',
    partitionKey: 'USA',
    lastName: 'Andersen',
    parents: [
      {
        firstName: 'Thomas'
      },
      {
        firstName: 'Mary Kay'
      }
    ],
    children: [
      {
        firstName: 'Henriette Thaulow',
        gender: 'female',
        grade: 5,
        pets: [
          {
            givenName: 'Fluffy'
          }
        ]
      }
    ],
    address: {
      state: 'WA',
      county: 'King',
      city: 'Seattle'
    }
  },
  Wakefield: {
    id: 'Wakefield.7',
    partitionKey: 'Italy',
    Country: 'Italy',
    parents: [
      {
        familyName: 'Wakefield',
        firstName: 'Robin'
      },
      {
        familyName: 'Miller',
        firstName: 'Ben'
      }
    ],
    children: [
      {
        familyName: 'Merriam',
        firstName: 'Jesse',
        gender: 'female',
        grade: 8,
        pets: [
          {
            givenName: 'Goofy'
          },
          {
            givenName: 'Shadow'
          }
        ]
      },
      {
        familyName: 'Miller',
        firstName: 'Lisa',
        gender: 'female',
        grade: 1
      }
    ],
    address: {
      state: 'NY',
      county: 'Manhattan',
      city: 'NY'
    },
    isRegistered: false
  }
}

module.exports = config