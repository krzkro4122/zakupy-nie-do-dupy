/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4092854851")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id = userId.id",
    "deleteRule": "@request.auth.id = userId.id",
    "listRule": "@request.auth.id = userId.id",
    "updateRule": "@request.auth.id = userId.id",
    "viewRule": "@request.auth.id = userId.id"
  }, collection)

  // update field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "relation1542800728",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "userId",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4092854851")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id = @collection.products.field.id",
    "deleteRule": "@request.auth.id = @collection.products.field.id",
    "listRule": "@request.auth.id = field.id",
    "updateRule": "@request.auth.id = @collection.products.field.id",
    "viewRule": "@request.auth.id = @collection.users.products_via_field.id"
  }, collection)

  // update field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "relation1542800728",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "field",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
