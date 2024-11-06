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

// Brand routes
router.get('/brands', brandController.getBrands);
router.get('/brands/:id', brandController.getBrand);
router.post('/brands', brandController.createBrand);
router.put('/brands/:id', brandController.updateBrand);
router.delete('/brands/:id', brandController.deleteBrand);

// Presentation routes
router.get('/presentations', presentationController.getPresentations);
router.get('/presentations/:id', presentationController.getPresentation);
router.post('/presentations', presentationController.createPresentation);
router.put('/presentations/:id', presentationController.updatePresentation);
router.delete('/presentations/:id', presentationController.deletePresentation);

// Product routes
router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProduct);
router.get('/products/inventory/inactive', productController.getProductsInactive);
router.get('/products/inventory/active', productController.getProductsActive);
router.post('/products', productController.createProduct);
router.put('/products/delete/:id', productController.deleteProduct);
router.put('/products/activate/:id', productController.activateProduct);
router.put('/products/sell/:id', productController.sellProduct);
router.put('/products/buy/:id', productController.buyProduct);
router.put('/products/:id', productController.updateProduct);
router.post('/products/name', productController.getProductByName);
router.get('/products/stock/:id', productController.getProductStock);

//Card API
router.get('/cards', cardController.allCards);

//Roles routes
router.get('/roles', roleController.getRoles);
router.get('/roles/:id', roleController.getRoleById);
router.post('/roles', roleController.createRole);
router.put('/roles/:id', roleController.updateRole);
router.put('/roles/delete/:id', roleController.deleteRole);

//User routes
router.get('/users', userController.getUsers);
router.post('/users/login', userController.getUserByEmailAndPassword);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.put('/users/delete/:id', userController.deleteUser);

//Token routes
router.get('/isUserAuth', userController.verifyToken);

//Client routes
router.get('/clients', clientController.getClients);
router.get('/clients/user/:user_id', clientController.getClientByUserId);
router.get('/clients/:id', clientController.getClient);
router.post('/clients', clientController.createClient);
router.put('/clients/:id', clientController.updateClient);

//Order routes
router.get('/orders', orderController.getOrders);
router.get('/orders/:id', orderController.getOrder);
router.get('/orders/client/:client_id', orderController.getOrdersByClientId);
router.post('/orders', orderController.createOrder);
router.put('/orders/:id', orderController.updateOrder);

module.exports = router;