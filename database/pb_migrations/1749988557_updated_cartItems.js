/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4130623731")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id = cart.user.id",
    "deleteRule": "@request.auth.id = cart.user.id",
    "listRule": "@request.auth.id = cart.user.id",
    "updateRule": "@request.auth.id = cart.user.id",
    "viewRule": "@request.auth.id = cart.user.id"
  }, collection)

  // update field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_4092854851",
    "hidden": false,
    "id": "relation913937925",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "product",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2236019783",
    "hidden": false,
    "id": "relation1650096956",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "cart",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4130623731")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id = cartId.userId.id",
    "deleteRule": "@request.auth.id = cartId.userId.id",
    "listRule": "@request.auth.id = cartId.userId.id",
    "updateRule": "@request.auth.id = cartId.userId.id",
    "viewRule": "@request.auth.id = cartId.userId.id"
  }, collection)

  // update field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_4092854851",
    "hidden": false,
    "id": "relation913937925",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "productId",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2236019783",
    "hidden": false,
    "id": "relation1650096956",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "cartId",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
