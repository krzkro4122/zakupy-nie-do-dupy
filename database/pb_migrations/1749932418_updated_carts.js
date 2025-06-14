/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2236019783")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id = userId.id",
    "deleteRule": "@request.auth.id = userId.id",
    "listRule": "@request.auth.id = userId.id",
    "updateRule": "@request.auth.id = userId.id",
    "viewRule": "@request.auth.id = userId.id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2236019783")

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
