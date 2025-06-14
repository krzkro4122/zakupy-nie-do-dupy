/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4130623731")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id = cartId.userId.id",
    "deleteRule": "@request.auth.id = cartId.userId.id",
    "listRule": "@request.auth.id = cartId.userId.id",
    "updateRule": "@request.auth.id = cartId.userId.id",
    "viewRule": "@request.auth.id = cartId.userId.id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4130623731")

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
