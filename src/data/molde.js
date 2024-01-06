const crypto = require('crypto');

function molde(name, price, discount, category, description, imagen) {
    this.id =  crypto.randomUUID()
    this.name = name.trim()
    this.price = +price
    this.discount = +discount.trim() <= 100? +discount.trim(): 0;
    this.category = category || null
    this.description = description.trim()
    this.image = imagen ? imagen.filename : null;

}
module.exports = molde;