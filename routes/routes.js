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
/**
 * @swagger
 * /api/brands:
 *   get:
 *     summary: Obtiene una lista de marcas
 *     description: Retorna todas las marcas disponibles en el sistema.
 *     tags: 
 *       - Brands
 *     responses:
 *       200:
 *         description: Lista de marcas obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID de la marca
 *                   brand_name:
 *                     type: string
 *                     description: Nombre de la marca
 */
router.get('/brands', brandController.getBrands);
/**
 * @swagger
 * /api/brands/{id}:
 *   get:
 *     summary: Obtiene una marca por su ID
 *     description: Retorna una marca por su ID.
 *     tags:
 *       - Brands
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la marca
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Marca obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID de la marca
 *                 brand_name:
 *                   type: string
 *                   description: Nombre de la marca
 */
router.get('/brands/:id', brandController.getBrand);
/**
 * @swagger
 * /api/presentations:
 *   get:
 *     summary: Obtiene una lista de presentaciones
 *     description: Retorna todas las presentaciones disponibles en el sistema.
 *     tags: [Presentations]
 *     responses:
 *       200:
 *         description: Lista de presentaciones obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID de la presentación
 *                   presentation_name:
 *                     type: string
 *                     description: Nombre de la presentación
 */
router.get('/presentations', presentationController.getPresentations);
/**
 * @swagger
 * /api/presentations/{id}:
 *   get:
 *     summary: Obtiene una presentación por su ID
 *     description: Retorna una presentación por su ID.
 *     tags: [Presentations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la presentación
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Presentación obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID de la presentación
 *                 presentation_name:
 *                   type: string
 *                   description: Nombre de la presentación
 */
router.get('/presentations/:id', presentationController.getPresentation);
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtiene una lista de productos
 *     description: Retorna todos los productos disponibles en el sistema.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del producto
 *                   product_name:
 *                     type: string
 *                     description: Nombre del producto
 *                   price:
 *                     type: string
 *                     description: Precio del producto
 *                   discount_price:
 *                     type: string
 *                     description: Precio con descuento del producto
 *                   discount:
 *                     type: boolean
 *                     description: Indica si el producto tiene descuento
 *                   product_description:
 *                     type: string
 *                     description: Descripción del producto
 *                   image:
 *                     type: string
 *                     nullable: true
 *                     description: URL de la imagen del producto
 *                   stock:
 *                     type: integer
 *                     description: Cantidad en stock
 *                   brand_id:
 *                     type: integer
 *                     description: ID de la marca
 *                   presentation_id:
 *                     type: integer
 *                     description: ID de la presentación
 *                   status:
 *                     type: boolean
 *                     description: Estado del producto
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de creación del producto
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de actualización del producto
 *                   presentation:
 *                     type: object
 *                     description: Detalles de la presentación del producto
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID de la presentación
 *                       presentation_name:
 *                         type: string
 *                         description: Nombre de la presentación
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de creación de la presentación
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de actualización de la presentación
 *                   brand:
 *                     type: object
 *                     description: Detalles de la marca del producto
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID de la marca
 *                       brand_name:
 *                         type: string
 *                         description: Nombre de la marca
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de creación de la marca
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de actualización de la marca
 */
router.get('/products', productController.getProducts);
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtiene un producto por su ID
 *     description: Retorna el producto por su ID.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del producto
 *                   product_name:
 *                     type: string
 *                     description: Nombre del producto
 *                   price:
 *                     type: string
 *                     description: Precio del producto
 *                   discount_price:
 *                     type: string
 *                     description: Precio con descuento del producto
 *                   discount:
 *                     type: boolean
 *                     description: Indica si el producto tiene descuento
 *                   product_description:
 *                     type: string
 *                     description: Descripción del producto
 *                   image:
 *                     type: string
 *                     nullable: true
 *                     description: URL de la imagen del producto
 *                   stock:
 *                     type: integer
 *                     description: Cantidad en stock
 *                   brand_id:
 *                     type: integer
 *                     description: ID de la marca
 *                   presentation_id:
 *                     type: integer
 *                     description: ID de la presentación
 *                   status:
 *                     type: boolean
 *                     description: Estado del producto
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de creación del producto
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de actualización del producto
 *                   presentation:
 *                     type: object
 *                     description: Detalles de la presentación del producto
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID de la presentación
 *                       presentation_name:
 *                         type: string
 *                         description: Nombre de la presentación
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de creación de la presentación
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de actualización de la presentación
 *                   brand:
 *                     type: object
 *                     description: Detalles de la marca del producto
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID de la marca
 *                       brand_name:
 *                         type: string
 *                         description: Nombre de la marca
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de creación de la marca
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de actualización de la marca
 */
router.get('/products/:id', productController.getProduct);
/**
 * @swagger
 * /api/products/inventory/active:
 *   get:
 *     summary: Obtiene una lista de productos activos
 *     description: Retorna todos los productos activos en el sistema.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos activos obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del producto
 *                   product_name:
 *                     type: string
 *                     description: Nombre del producto
 *                   price:
 *                     type: string
 *                     description: Precio del producto
 *                   discount_price:
 *                     type: string
 *                     description: Precio con descuento del producto
 *                   discount:
 *                     type: boolean
 *                     description: Indica si el producto tiene descuento
 *                   product_description:
 *                     type: string
 *                     description: Descripción del producto
 *                   image:
 *                     type: string
 *                     nullable: true
 *                     description: URL de la imagen del producto
 *                   stock:
 *                     type: integer
 *                     description: Cantidad en stock
 *                   brand_id:
 *                     type: integer
 *                     description: ID de la marca
 *                   presentation_id:
 *                     type: integer
 *                     description: ID de la presentación
 *                   status:
 *                     type: boolean
 *                     description: Estado del producto
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de creación del producto
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de actualización del producto
 *                   presentation:
 *                     type: object
 *                     description: Detalles de la presentación del producto
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID de la presentación
 *                       presentation_name:
 *                         type: string
 *                         description: Nombre de la presentación
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de creación de la presentación
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de actualización de la presentación
 *                   brand:
 *                     type: object
 *                     description: Detalles de la marca del producto
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID de la marca
 *                       brand_name:
 *                         type: string
 *                         description: Nombre de la marca
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de creación de la marca
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de actualización de la marca
 */
router.get('/products/inventory/active', productController.getProductsActive);
/**
 * @swagger
 * /api/products/stock/{id}:
 *   get:
 *     summary: Obtiene la cantidad en stock de un producto
 *     description: Retorna la cantidad en stock de un producto por su ID.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cantidad en stock obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 stock:
 *                   type: integer
 *                   description: Cantidad en stock del producto
 */
router.get('/products/stock/:id', productController.getProductStock);
/**
 * @swagger
 * /api/products/inventory/inactive:
 *   get:
 *     summary: Obtiene una lista de productos inactivos
 *     description: Retorna todos los productos inactivos en el sistema. Requiere autenticación y que el rol sea igual a dos.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de acceso necesario para la autenticación
 *     responses:
 *       200:
 *         description: Lista de productos inactivos obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del producto
 *                   product_name:
 *                     type: string
 *                     description: Nombre del producto
 *                   price:
 *                     type: string
 *                     description: Precio del producto
 *                   discount_price:
 *                     type: string
 *                     description: Precio con descuento del producto
 *                   discount:
 *                     type: boolean
 *                     description: Indica si el producto tiene descuento
 *                   product_description:
 *                     type: string
 *                     description: Descripción del producto
 *                   image:
 *                     type: string
 *                     nullable: true
 *                     description: URL de la imagen del producto
 *                   stock:
 *                     type: integer
 *                     description: Cantidad en stock
 *                   brand_id:
 *                     type: integer
 *                     description: ID de la marca
 *                   presentation_id:
 *                     type: integer
 *                     description: ID de la presentación
 *                   status:
 *                     type: boolean
 *                     description: Estado del producto
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de creación del producto
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de actualización del producto
 *                   presentation:
 *                     type: object
 *                     description: Detalles de la presentación del producto
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID de la presentación
 *                       presentation_name:
 *                         type: string
 *                         description: Nombre de la presentación
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de creación de la presentación
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de actualización de la presentación
 *                   brand:
 *                     type: object
 *                     description: Detalles de la marca del producto
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID de la marca
 *                       brand_name:
 *                         type: string
 *                         description: Nombre de la marca
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de creación de la marca
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de actualización de la marca
 */
router.get('/products/inventory/inactive', userController.verificationOfTokenAndRole, productController.getProductsInactive);
/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Obtiene una lista de roles
 *     description: Retorna todos los roles disponibles en el sistema.
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Lista de roles obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del rol
 *                   name:
 *                     type: string
 *                     description: Nombre del rol
 *                   description:
 *                     type: string
 *                     description: Descripción del rol
 *                   status:
 *                     type: boolean
 *                     description: Estado del rol
 */
router.get('/roles', roleController.getRoles);
/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Obtiene un rol por su ID
 *     description: Retorna un rol por su ID.
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del rol
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rol obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del rol
 *                 name:
 *                   type: string
 *                   description: Nombre del rol
 *                 description:
 *                   type: string
 *                   description: Descripción del rol
 *                 status:
 *                   type: boolean
 *                   description: Estado del rol
 */
router.get('/roles/:id', roleController.getRoleById);
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtiene una lista de usuarios
 *     description: Retorna todos los usuarios disponibles en el sistema. Requiere autenticación.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de acceso necesario para la autenticación
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del usuario
 *                   email:
 *                     type: string
 *                     description: Correo electrónico del usuario
 *                   password:
 *                     type: string
 *                     description: Contraseña del usuario
 *                   status:
 *                     type: boolean
 *                     description: Estado del usuario
 *                   role_id:
 *                     type: integer
 *                     description: ID del rol
 */
router.get('/users', userController.verificationOfToken, userController.getUsers);
/**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Obtiene una lista de clientes
 *     description: Retorna todos los clientes disponibles en el sistema.
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del cliente
 *                   names:
 *                     type: string
 *                     description: Nombres del cliente
 *                   last_names:
 *                     type: string
 *                     description: Apellidos del cliente
 *                   address:
 *                     type: string
 *                     description: Dirección del cliente
 *                   phone:
 *                     type: string
 *                     description: Teléfono del cliente
 *                   nit:
 *                     type: string
 *                     description: NIT del cliente
 *                   status:
 *                     type: boolean
 *                     description: Estado del cliente
 *                   user_id:
 *                     type: integer
 *                     description: ID del usuario
 */
router.get('/clients', clientController.getClients);
/**
 * @swagger
 * /api/clients/user/{user_id}:
 *   get:
 *     summary: Obtiene un cliente por su ID de usuario
 *     description: Retorna un cliente por su ID de usuario.
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: Cliente obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del cliente
 *                   names:
 *                     type: string
 *                     description: Nombres del cliente
 *                   last_names:
 *                     type: string
 *                     description: Apellidos del cliente
 *                   address:
 *                     type: string
 *                     description: Dirección del cliente
 *                   phone:
 *                     type: string
 *                     description: Teléfono del cliente
 *                   nit:
 *                     type: string
 *                     description: NIT del cliente
 *                   status:
 *                     type: boolean
 *                     description: Estado del cliente
 *                   user_id:
 *                     type: integer
 *                     description: ID del usuario
 */
router.get('/clients/user/:user_id', clientController.getClientByUserId);
/**
 * @swagger
 * /api/clients/{id}:
 *   get:
 *     summary: Obtiene un cliente por su ID
 *     description: Retorna un cliente por su ID.
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: Cliente obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del cliente
 *                   names:
 *                     type: string
 *                     description: Nombres del cliente
 *                   last_names:
 *                     type: string
 *                     description: Apellidos del cliente
 *                   address:
 *                     type: string
 *                     description: Dirección del cliente
 *                   phone:
 *                     type: string
 *                     description: Teléfono del cliente
 *                   nit:
 *                     type: string
 *                     description: NIT del cliente
 *                   status:
 *                     type: boolean
 *                     description: Estado del cliente
 *                   user_id:
 *                     type: integer
 *                     description: ID del usuario
 */
router.get('/clients/:id', clientController.getClient);
/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Obtiene una orden por su ID
 *     description: Retorna una orden por su ID.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la orden
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Orden obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID de la orden
 *                 client_id:
 *                   type: integer
 *                   description: ID del cliente que realizó la orden
 *                 date:
 *                   type: string
 *                   format: date
 *                   description: Fecha de la orden
 *                 status:
 *                   type: string
 *                   description: Estado de la orden
 *                 totalAmount:
 *                   type: string
 *                   description: Monto total de la orden
 *                 address:
 *                   type: string
 *                   description: Dirección de envío de la orden
 *                 paymentMethod:
 *                   type: string
 *                   description: Método de pago utilizado
 *                 notes:
 *                   type: string
 *                   description: Notas adicionales sobre la orden
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de creación de la orden
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de actualización de la orden
 */
router.get('/orders/:id', orderController.getOrder);
/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Obtiene una lista de ordenes
 *     description: Retorna todas las ordenes disponibles en el sistema. Requiere autenticación.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de acceso necesario para la autenticación
 *     responses:
 *       200:
 *         description: Lista de ordenes obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID de la orden
 *                 client_id:
 *                   type: integer
 *                   description: ID del cliente que realizó la orden
 *                 date:
 *                   type: string
 *                   format: date
 *                   description: Fecha de la orden
 *                 status:
 *                   type: string
 *                   description: Estado de la orden
 *                 totalAmount:
 *                   type: string
 *                   description: Monto total de la orden
 *                 address:
 *                   type: string
 *                   description: Dirección de envío de la orden
 *                 paymentMethod:
 *                   type: string
 *                   description: Método de pago utilizado
 *                 notes:
 *                   type: string
 *                   description: Notas adicionales sobre la orden
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de creación de la orden
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de actualización de la orden
 */
router.get('/orders',  userController.verificationOfTokenAndRole, orderController.getOrders);

router.get('/pending/orders', userController.verificationOfTokenAndRole, orderController.getPendingOrders);
router.get('/delivered/orders', userController.verificationOfTokenAndRole, orderController.getDeliveredOrders);
/**
 * @swagger
 * /api/orders/client/{client_id}:
 *   get:
 *     summary: Obtiene una lista de ordenes
 *     description: Retorna todas las ordenes disponibles en el sistema para un cliente específico. Requiere autenticación.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de acceso necesario para la autenticación
 *       - in: path
 *         name: client_id
 *         required: true
 *         description: ID del cliente para filtrar las órdenes
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de ordenes obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID de la orden
 *                 client_id:
 *                   type: integer
 *                   description: ID del cliente que realizó la orden
 *                 date:
 *                   type: string
 *                   format: date
 *                   description: Fecha de la orden
 *                 status:
 *                   type: string
 *                   description: Estado de la orden
 *                 totalAmount:
 *                   type: string
 *                   description: Monto total de la orden
 *                 address:
 *                   type: string
 *                   description: Dirección de envío de la orden
 *                 paymentMethod:
 *                   type: string
 *                   description: Método de pago utilizado
 *                 notes:
 *                   type: string
 *                   description: Notas adicionales sobre la orden
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de creación de la orden
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de actualización de la orden
 */
router.get('/orders/client/:client_id', userController.verificationOfToken, orderController.getOrdersByClientId);
//Card API
router.get('/cards', cardController.allCards);
router.get('/isUserAuth', userController.verifyToken);


// POST and PUT routes
/**
 * @swagger
 * /api/brands:
 *   post:
 *     summary: Crea una marca
 *     description: Crea una marca en el sistema. Requiere autenticación y que el rol sea igual a dos.
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de acceso necesario para la autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brand_name:
 *                 type: string
 *                 description: Nombre de la marca
 *                 required: true
 *     responses:
 *       200:
 *         description: Marca creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID de la marca
 *                 brand_name:
 *                   type: string
 *                   description: Nombre de la marca
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de creación de la marca
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de actualización de la marca
 *       400:
 *         description: Error al crear la marca
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 */
router.post('/brands', userController.verificationOfTokenAndRole, brandController.createBrand);
/**
 * @swagger
 * /api/brands/{id}:
 *   put:
 *     summary: Actualiza una marca
 *     description: Actualiza una marca en el sistema. Requiere autenticación y que el rol sea igual a dos.
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de acceso necesario para la autenticación
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la marca
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brand_name:
 *                 type: string
 *                 description: Nombre de la marca
 *                 required: true
 *     responses:
 *       200:
 *         description: Marca actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID de la marca
 *                 brand_name:
 *                   type: string
 *                   description: Nombre de la marca
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de creación de la marca
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de actualización de la marca
 *       400:
 *         description: Error al actualizar la marca
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 */
router.put('/brands/:id', userController.verificationOfTokenAndRole, brandController.updateBrand);
/**
 * @swagger
 * /api/presentations:
 *   post:
 *     summary: Crea una presentación
 *     description: Crea una presentación en el sistema. Requiere autenticación y que el rol sea igual a dos.
 *     tags: [Presentations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de acceso necesario para la autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               presentation_name:
 *                 type: string
 *                 description: Nombre de la presentación
 *                 required: true
 *     responses:
 *       200:
 *         description: Presentación creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID de la presentación
 *                 presentation_name:
 *                   type: string
 *                   description: Nombre de la presentación
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de creación de la presentación
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de actualización de la presentación
 *       400:
 *         description: Error al crear la presentación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 */
router.post('/presentations', userController.verificationOfTokenAndRole, presentationController.createPresentation);
/**
 * @swagger
 * /api/presentations/{id}:
 *   put:
 *     summary: Actualiza una presentación
 *     description: Actualiza una presentación en el sistema. Requiere autenticación y que el rol sea igual a dos.
 *     tags: [Presentations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de acceso necesario para la autenticación
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la presentación
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               presentation_name:
 *                 type: string
 *                 description: Nombre de la presentación
 *                 required: true
 *     responses:
 *       200:
 *         description: Presentación actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID de la presentación
 *                 presentation_name:
 *                   type: string
 *                   description: Nombre de la presentación
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de creación de la presentación
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de actualización de la presentación
 *       400:
 *         description: Error al actualizar la presentación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 */
router.put('/presentations/:id', userController.verificationOfTokenAndRole, presentationController.updatePresentation);
/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crea una marca
 *     description: Crea una marca en el sistema. Requiere autenticación y que el rol sea igual a dos.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de acceso necesario para la autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_name:
 *                 type: string
 *                 description: Nombre del producto
 *               price:
 *                 type: string
 *                 description: Precio del producto
 *               product_description:
 *                 type: string
 *                 description: Descripción del producto
 *               stock:
 *                 type: integer
 *                 description: Cantidad en stock
 *               presentation_id:
 *                 type: integer
 *                 description: ID de la presentación
 *               brand_id:
 *                 type: integer
 *                 description: ID de la marca
 *     responses:
 *       200:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product_name:
 *                   type: string
 *                   description: Nombre del producto
 *                 price:
 *                   type: string
 *                   description: Precio del producto
 *                 product_description:
 *                   type: string
 *                   description: Descripción del producto
 *                 stock:
 *                   type: integer
 *                   description: Cantidad en stock
 *                 presentation_id:
 *                   type: integer
 *                   description: ID de la presentación
 *                 brand_id:
 *                   type: integer
 *                   description: ID de la marca
 *       400:
 *         description: Error al crear el producto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 */
router.post('/products', userController.verificationOfTokenAndRole, productController.createProduct);
router.post('/products/name', productController.getProductByName);
/**
 * @swagger
 * /api/products/activate/{id}:
 *   put:
 *     summary: Activa un producto
 *     description: Activa un producto en el sistema. Requiere autenticación y que el rol sea igual a dos.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de acceso necesario para la autenticación
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto activado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del producto
 *                 product_name:
 *                   type: string
 *                   description: Nombre del producto
 *                 price:
 *                   type: string
 *                   description: Precio del producto
 *                 product_description:
 *                   type: string
 *                   description: Descripción del producto
 *                 stock:
 *                   type: integer
 *                   description: Cantidad en stock
 *                 presentation_id:
 *                   type: integer
 *                   description: ID de la presentación
 *                 brand_id:
 *                   type: integer
 *                   description: ID de la marca
 *                 status:
 *                   type: boolean
 *                   description: Estado del producto
 *       400:
 *         description: Error al activar el producto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 */
router.put('/products/activate/:id', userController.verificationOfTokenAndRole, productController.activateProduct);
/**
 * @swagger
 * /api/products/sell/{id}:
 *   put:
 *     summary: Vender un producto
 *     description: Vende un producto en el sistema, reduciendo el stock. Requiere autenticación y que el rol sea igual a dos.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto vendido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del producto
 *                 product_name:
 *                   type: string
 *                   description: Nombre del producto
 *                 price:
 *                   type: string
 *                   description: Precio del producto
 *                 product_description:
 *                   type: string
 *                   description: Descripción del producto
 *                 stock:
 *                   type: integer
 *                   description: Cantidad en stock
 *                 presentation_id:
 *                   type: integer
 *                   description: ID de la presentación
 *                 brand_id:
 *                   type: integer
 *                   description: ID de la marca
 *                 status:
 *                   type: boolean
 *                   description: Estado del producto
 *       400:
 *         description: Error al vender el producto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 */
router.put('/products/sell/:id', productController.sellProduct);
/**
 * @swagger
 * /api/products/buy/{id}:
 *   put:
 *     summary: Comprar un producto
 *     description: Comprar un producto en el sistema, aumentando el stock. Requiere autenticación y que el rol sea igual a dos.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto comprado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del producto
 *                 product_name:
 *                   type: string
 *                   description: Nombre del producto
 *                 price:
 *                   type: string
 *                   description: Precio del producto
 *                 product_description:
 *                   type: string
 *                   description: Descripción del producto
 *                 stock:
 *                   type: integer
 *                   description: Cantidad en stock
 *                 presentation_id:
 *                   type: integer
 *                   description: ID de la presentación
 *                 brand_id:
 *                   type: integer
 *                   description: ID de la marca
 *                 status:
 *                   type: boolean
 *                   description: Estado del producto
 *       400:
 *         description: Error al comprar el producto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 */
router.put('/products/buy/:id', productController.buyProduct);
router.put('/products/:id', userController.verificationOfTokenAndRole, productController.updateProduct);
/**
 * @swagger
 * /api/products/delete/{id}:
 *   put:
 *     summary: Desactiva un producto
 *     description: Desactiva un producto en el sistema. Requiere autenticación y que el rol sea igual a dos.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de acceso necesario para la autenticación
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto desactivado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del producto
 *                 product_name:
 *                   type: string
 *                   description: Nombre del producto
 *                 price:
 *                   type: string
 *                   description: Precio del producto
 *                 product_description:
 *                   type: string
 *                   description: Descripción del producto
 *                 presentation_id:
 *                   type: integer
 *                   description: ID de la presentación
 *                 brand_id:
 *                   type: integer
 *                   description: ID de la marca
 *                 status:
 *                   type: boolean
 *                   description: Estado del producto
 *       400:
 *         description: Error al activar el producto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 */
router.put('/products/delete/:id', userController.verificationOfTokenAndRole, productController.deleteProduct);
/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Crea un rol
 *     description: Crea un rol en el sistema. Requiere autenticación y que el rol sea igual a dos.
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de acceso necesario para la autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del rol
 *               description:
 *                 type: string
 *                 description: Descripción del rol
 *     responses:
 *       200:
 *         description: Rol creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del rol
 *                 name:
 *                   type: string
 *                   description: Nombre del rol
 *                 description:
 *                   type: string
 *                   description: Descripción del rol
 *                 status:
 *                   type: boolean
 *                   description: Estado del rol
 *       400:
 *         description: Error al crear el rol
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 */
router.post('/roles', userController.verificationOfTokenAndRole, roleController.createRole);
/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     summary: Actualiza un rol
 *     description: Actualiza un rol en el sistema. Requiere autenticación y que el rol sea igual a dos.
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de acceso necesario para la autenticación
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del rol
 *               description:
 *                 type: string
 *                 description: Descripción del rol
 *     responses:
 *       200:
 *         description: Rol actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del rol
 *                 name:
 *                   type: string
 *                   description: Nombre del rol
 *                 description:
 *                   type: string
 *                   description: Descripción del rol
 *                 status:
 *                   type: boolean
 *                   description: Estado del rol
 *       400:
 *         description: Error al actualizar el rol
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 */
router.put('/roles/:id', userController.verificationOfTokenAndRole, roleController.updateRole);
/**
 * @swagger
 * /api/roles/delete/{id}:
 *   put:
 *     summary: Elimina un rol
 *     description: Elimina un rol en el sistema. Requiere autenticación y que el rol sea igual a dos.
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de acceso necesario para la autenticación
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol
 *     responses:
 *       200:
 *         description: Rol eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *       400:
 *         description: Error al eliminar el rol
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 */
router.put('/roles/delete/:id', userController.verificationOfTokenAndRole, roleController.deleteRole);
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Inicia sesión
 *     description: Inicia sesión en el sistema. Retorna un token de acceso.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Sesión iniciada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 auth:
 *                   type: boolean
 *                   description: Indica si la autenticación fue exitosa
 *                 token:
 *                   type: string
 *                   description: Token de acceso
 *                 id:
 *                   type: integer
 *                   description: ID del usuario
 *                 role:
 *                   type: integer
 *                   description: ID del rol
 *       400:
 *         description: Error al iniciar sesión
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 */
router.post('/users/login', userController.getUserByEmailAndPassword);
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crea un usuario
 *     description: Crea un usuario en el sistema. Requiere autenticación y que el rol sea igual a dos.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *               role_id:
 *                 type: integer
 *                 description: ID del rol
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del usuario
 *                 email:
 *                   type: string
 *                   description: Correo electrónico del usuario
 *                 password:
 *                   type: string
 *                   description: Contraseña del usuario
 *                 status:
 *                   type: boolean
 *                   description: Estado del usuario
 *                 role_id:
 *                   type: integer
 *                   description: ID del rol
 *       400:
 *         description: Error al crear el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 */
router.post('/users', userController.createUser);
/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualiza un usuario
 *     description: Actualiza un usuario en el sistema. Requiere autenticación y que el rol sea igual a dos.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *               role_id:
 *                 type: integer
 *                 description: ID del rol
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del usuario
 *                 email:
 *                   type: string
 *                   description: Correo electrónico del usuario
 *                 password:
 *                   type: string
 *                   description: Contraseña del usuario
 *                 status:
 *                   type: boolean
 *                   description: Estado del usuario
 *                 role_id:
 *                   type: integer
 *                   description: ID del rol
 *       400:
 *         description: Error al actualizar el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 */
router.put('/users/:id', userController.updateUser);
/**
 * @swagger
 * /api/users/delete/{id}:
 *   put:
 *     summary: Elimina un usuario
 *     description: Elimina un usuario en el sistema. Requiere autenticación y que el rol sea igual a dos.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de acceso necesario para la autenticación
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *       400:
 *         description: Error al eliminar el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 */
router.put('/users/delete/:id', userController.verificationOfTokenAndRole, userController.deleteUser);
/**
 * @swagger
 * /api/clients:
 *   post:
 *     summary: Crea un cliente
 *     description: Crea un cliente en el sistema. Requiere autenticación y que el rol sea igual a dos.
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del cliente
 *               last_names:
 *                 type: string
 *                 description: Apellidos del cliente
 *               email:
 *                 type: string
 *                 description: Correo electrónico del cliente
 *               password:
 *                 type: string
 *                 description: Contraseña del cliente
 *               phone:
 *                 type: string
 *                 description: Teléfono del cliente
 *               address:
 *                 type: string
 *                 description: Dirección del cliente
 *               nit:
 *                 type: string
 *                 description: NIT del cliente
 *     responses:
 *       200:
 *         description: Cliente creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del cliente
 *                 name:
 *                   type: string
 *                   description: Nombre del cliente
 *                 last_names:
 *                   type: string
 *                   description: Apellidos del cliente
 *                 email:
 *                   type: string
 *                   description: Correo electrónico del cliente
 *                 password:
 *                   type: string
 *                   description: Contraseña del cliente
 *                 phone:
 *                   type: string
 *                   description: Teléfono del cliente
 *                 address:
 *                   type: string
 *                   description: Dirección del cliente
 *                 nit:
 *                   type: string
 *                   description: NIT del cliente
 *       400:
 *         description: Error al crear el cliente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 */
router.post('/clients', clientController.createClient);
/**
 * @swagger
 * /api/clients/{id}:
 *   put:
 *     summary: Actualiza un cliente
 *     description: Actualiza un cliente en el sistema. Requiere autenticación y que el rol sea igual a dos.
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del cliente
 *               last_names:
 *                 type: string
 *                 description: Apellidos del cliente
 *               phone:
 *                 type: string
 *                 description: Teléfono del cliente
 *               address:
 *                 type: string
 *                 description: Dirección del cliente
 *               nit:
 *                 type: string
 *                 description: NIT del cliente
 *     responses:
 *       200:
 *         description: Cliente actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del cliente
 *                 name:
 *                   type: string
 *                   description: Nombre del cliente
 *                 last_names:
 *                   type: string
 *                   description: Apellidos del cliente
 *                 phone:
 *                   type: string
 *                   description: Teléfono del cliente
 *                 address:
 *                   type: string
 *                   description: Dirección del cliente
 *                 nit:
 *                   type: string
 *                   description: NIT del cliente
 *       400:
 *         description: Error al actualizar el cliente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                message:
 *                  type: string
 *                 description: Mensaje de error
 */
router.put('/clients/:id', clientController.updateClient);
/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Crea una orden
 *     description: Crea una orden en el sistema. Requiere autenticación.
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               client_id:
 *                 type: integer
 *                 description: ID del cliente que realiza la orden
 *               totalAmount:
 *                 type: number
 *                 format: float
 *                 description: Monto total de la orden
 *               address:
 *                 type: string
 *                 description: Dirección de envío de la orden
 *               paymentMethod:
 *                 type: string
 *                 description: Método de pago utilizado
 *               notes:
 *                 type: string
 *                 description: Notas adicionales sobre la orden
 *               products:
 *                 type: array
 *                 description: Lista de productos en la orden
 *                 items:
 *                   type: object
 *                   properties:
 *                     product_id:
 *                       type: integer
 *                       description: ID del producto
 *                     quantity:
 *                       type: integer
 *                       description: Cantidad de este producto en la orden
 *     responses:
 *       200:
 *         description: Orden creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order_id:
 *                   type: integer
 *                   description: ID de la orden creada
 *                 client_id:
 *                   type: integer
 *                   description: ID del cliente
 *                 totalAmount:
 *                   type: number
 *                   format: float
 *                   description: Monto total de la orden
 *                 address:
 *                   type: string
 *                   description: Dirección de envío
 *                 paymentMethod:
 *                   type: string
 *                   description: Método de pago
 *                 notes:
 *                   type: string
 *                   description: Notas de la orden
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       product_id:
 *                         type: integer
 *                         description: ID del producto
 *                       quantity:
 *                         type: integer
 *                         description: Cantidad de este producto en la orden
 *       400:
 *         description: Error al crear la orden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 */
router.post('/orders', orderController.createOrder);
/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Actualiza una orden
 *     description: Actualiza una orden en el sistema. Requiere autenticación y que el rol sea igual a dos.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de acceso necesario para la autenticación
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la orden
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: Estado de la orden
 *     responses:
 *       200:
 *         description: Orden actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order_id:
 *                   type: integer
 *                   description: ID de la orden
 *                 client_id:
 *                   type: integer
 *                   description: ID del cliente
 *                 totalAmount:
 *                   type: number
 *                   format: float
 *                   description: Monto total de la orden
 *                 address:
 *                   type: string
 *                   description: Dirección de envío
 *                 paymentMethod:
 *                   type: string
 *                   description: Método de pago
 *                 notes:
 *                   type: string
 *                   description: Notas de la orden
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       product_id:
 *                         type: integer
 *                         description: ID del producto
 *                       quantity:
 *                         type: integer
 *                         description: Cantidad de este producto en la orden
 *                 status:
 *                   type: string
 *                   description: Estado de la orden
 *       400:
 *         description: Error al actualizar la orden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 */
router.put('/orders/:id', userController.verificationOfToken, orderController.updateOrder);

module.exports = router;