const fs = require('fs');
const path = require('path');
const pushProduct = require('../data/molde');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

reescribirJSON = (productos) => {
	fs.writeFileSync(`./src/data/productsDataBase.json`, JSON.stringify(productos, null, 3), 'utf-8')
   return null
}

const controller = {
	// Root - Show all products
	index: (req, res) => {

		res.render("products",{products,toThousand})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const {id} = req.params
		
		const producto = products.find(product => product.id == id)
			
			return res.render("detail", {producto,toThousand})
		},

	// Create - Form to create
	create: (req, res) => {
		

		return res.render("product-create-form")
		
	},
	
	// Create -  Method to store
	store: (req, res) => {
		
		const {name, price, discount, category, description} = req.body
		const imagen = req.file;
		
		
		const nuevoProducto = new pushProduct(name, price, discount, category, description, imagen)

		products.push(nuevoProducto);

		reescribirJSON(products)
		

		return res.redirect("/")
	},
	// Update - Form to edit
	edit: (req, res) => {
		const {id} = req.params
	
		const producto = products.find(product => product.id ==id)

		return res.render("product-edit-form",{producto})
	},
	// Update - Method to update
	update: (req, res) => {
		const {id} = req.params
		const {name,price,discount,category,description} = req.body
		const imagen = req.file

		const productoEditado = products.map(producto =>{
			if(producto.id == id){
(imagen && fs.existsSync('public/images/products/' + producto.image)) && fs.unlinkSync('public/images/products/' + producto.image)
			producto.name = name.trim()
			producto.price = +price
			producto.discount = +discount.trim() <= 100? +discount.trim(): 0;
			producto.category = category
			producto.description = description.trim()
			producto.image = imagen ? imagen.filename : producto.image
			
		} 
		return producto
	})
		
	reescribirJSON(productoEditado)

	return res.redirect("/")
	},
	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const {id} = req.params
		const eliminarImg = products.find(a=> a.id == id)
	fs.existsSync("public/images/products/" + eliminarImg.image) && fs.unlinkSync("public/images/products/" + eliminarImg.image)
	
		const eliminarTodo = products.filter(prod => prod.id != id)
		const jsonEditado = JSON.stringify(eliminarTodo, null, 3)
	
		fs.writeFileSync(`./src/data/productsDataBase.json`, jsonEditado, 'utf-8')
	
	return res.redirect("/")
		}
	};

module.exports = controller;