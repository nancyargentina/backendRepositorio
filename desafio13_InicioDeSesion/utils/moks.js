const {faker} = require("@faker-js/faker/locale/es_MX");

function mockProductos() {
    const producto = {
        title: faker.commerce.productName(),
        price: faker.commerce.price(1000),
        thumbnail: faker.image.imageUrl(150,150,'fashion',true),
    };
    return producto
}
module.exports = mockProductos;
