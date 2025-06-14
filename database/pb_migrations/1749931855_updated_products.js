/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4092854851")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id = @collection.products.field.id",
    "deleteRule": "@request.auth.id = @collection.products.field.id",
    "listRule": "@request.auth.id = @collection.products.field.id",
    "updateRule": "@request.auth.id = @collection.products.field.id",
    "viewRule": "@request.auth.id = @collection.products.field.id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4092854851")

  // update collection data
  unmarshal({
    "createRule": "",
    "deleteRule": "",
    "listRule": "",
    "updateRule": "",
    "viewRule": ""
  }, collection)

  return app.save(collection)
})
