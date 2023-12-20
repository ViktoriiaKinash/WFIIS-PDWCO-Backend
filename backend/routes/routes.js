const products = require("../controllers/products")
const shops = require("../controllers/shops")

module.exports = function(app) {
    app.get("/api/getProducts", products.getProducts)
    app.post("/api/addProduct", products.addProduct)
    app.delete("/api/deleteProduct", products.deleteProduct)
    app.get("/api/getShops", shops.getShops)
    app.post("/api/addShop", shops.addShop)
    app.delete("/api/deleteShop", shops.deleteShop)
}