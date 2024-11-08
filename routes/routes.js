const { Router } = require('express');
const router = Router();

const brandController = require('../controllers/brandController');
const presentationController = require('../controllers/presentationController');
const productController = require('../controllers/productController');
const cardController = require('../controllers/cardController');
const roleController = require('../controllers/roleController');
const userController = require('../controllers/userController');
const clientController = require('../controllers/clientController');
const orderController = require('../controllers/ordersController');

// GET routes
// Brands
router.get('/brands', brandController.getBrands);
router.get('/brands/:id', brandController.getBrand);
// Presentations
router.get('/presentations', presentationController.getPresentations);
router.get('/presentations/:id', presentationController.getPresentation);
// Products
router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProduct);
router.get('/products/inventory/active', productController.getProductsActive);
router.get('/products/stock/:id', productController.getProductStock);
router.get('/products/inventory/inactive', userController.verificationOfTokenAndRole, productController.getProductsInactive);
// Roles
router.get('/roles', roleController.getRoles);
router.get('/roles/:id', roleController.getRoleById);
// Users
router.get('/users', userController.verificationOfToken, userController.getUsers);
// Clients
router.get('/clients', clientController.getClients);
router.get('/clients/user/:user_id', clientController.getClientByUserId);
router.get('/clients/:id', clientController.getClient);
// Orders
router.get('/orders/:id', orderController.getOrder);
router.get('/orders', userController.verifyToken, orderController.getOrders);
router.get('/orders/client/:client_id', userController.verifyToken, orderController.getOrdersByClientId);
//Card API
router.get('/cards', cardController.allCards);
//Token
router.get('/isUserAuth', userController.verifyToken);


// POST and PUT routes
// Brands
router.post('/brands', userController.verificationOfTokenAndRole, brandController.createBrand);
router.put('/brands/:id', userController.verificationOfTokenAndRole, brandController.updateBrand);
// Presentation routes
router.post('/presentations', userController.verificationOfTokenAndRole, presentationController.createPresentation);
router.put('/presentations/:id', userController.verificationOfTokenAndRole, presentationController.updatePresentation);
// Product routes
router.post('/products', userController.verificationOfTokenAndRole, productController.createProduct);
router.post('/products/name', productController.getProductByName);
router.put('/products/activate/:id', userController.verificationOfTokenAndRole, productController.activateProduct);
router.put('/products/sell/:id', productController.sellProduct);
router.put('/products/buy/:id', productController.buyProduct);
router.put('/products/:id', userController.verificationOfTokenAndRole, productController.updateProduct);
router.put('/products/delete/:id', userController.verificationOfTokenAndRole, productController.deleteProduct);
//Roles routes
router.post('/roles', userController.verificationOfTokenAndRole, roleController.createRole);
router.put('/roles/:id', userController.verificationOfTokenAndRole, roleController.updateRole);
router.put('/roles/delete/:id', userController.verificationOfTokenAndRole, roleController.deleteRole);
//User routes
router.post('/users/login', userController.getUserByEmailAndPassword);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.put('/users/delete/:id', userController.verificationOfTokenAndRole, userController.deleteUser);
//Client routes
router.post('/clients', clientController.createClient);
router.put('/clients/:id', clientController.updateClient);
//Order routes
router.post('/orders', orderController.createOrder);
router.put('/orders/:id', orderController.updateOrder);

module.exports = router;