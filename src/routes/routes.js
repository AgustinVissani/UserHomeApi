const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

/**
* @swagger
* /users:
*   get:
*     summary: Obtener todos los usuarios
*     parameters:
*       - name: name
*         in: query
*         schema:
*           type: string
*       - name: email
*         in: query
*         schema:
*           type: string
*     responses:
*       200:
*         description: Lista de usuarios
*   post:
*     summary: Crear un nuevo usuario
*     requestBody:
*       required: true
*       content:
*         application/json:
*           example:
*             name: ""
*             email: "example@example.com"
*     responses:
*       201:
*         description: Usuario creado
*       404:
*         description: Usuario no encontrado
*/
router.get('/users', userController.getAllUsers);
router.post('/users', userController.createUser);

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalle del usuario
 *       404:
 *         description: Usuario no encontrado
 *   patch:
 *     summary: Actualizar parcialmente un usuario
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserPartialUpdate'
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       404:
 *         description: Usuario no encontrado
 *   put:
 *     summary: Actualizar completamente un usuario
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
*           example:
*             name: ""
*             email: "example@example.com"
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       404:
 *         description: Usuario no encontrado
 *   delete:
 *     summary: Borrar un usuario
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Usuario borrado
 *       400:
 *         description: No se puede borrar el usuario porque tiene viviendas
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/users/:userId', userController.getUserById);
router.patch('/users/:userId', userController.updateUserPartially);
router.put('/users/:userId', userController.updateUserCompletely);
router.delete('/users/:userId', userController.deleteUser);

/**
 * @swagger
 * /users/{userId}/homes:
 *   get:
 *     summary: Obtener todas las viviendas de un usuario
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: city
 *         in: query
 *         schema:
 *           type: string
 *       - name: street
 *         in: query
 *         schema:
 *           type: string
 *       - name: country
 *         in: query
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lista de viviendas
 *       '404':
 *         description: Usuario no encontrado
 */
router.get('/users/:userId/homes', userController.getUserHomes);
router.post('/users/:userId/homes', userController.createHomeForUser);

/**
 * @swagger
 * /users/{userId}/homes/{homeId}:
 *   put:
 *     summary: Actualizar una vivienda de un usuario
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: homeId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
*           example:
*             city: ""
*             street: ""
*             country: ""
 *     responses:
 *       200:
 *         description: Vivienda actualizada
 *       404:
 *         description: Usuario o vivienda no encontrado
 *   delete:
 *     summary: Borrar una vivienda de un usuario
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: homeId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Vivienda borrada
 *       404:
 *         description: Usuario o vivienda no encontrado
 */
router.put('/users/:userId/homes/:homeId', userController.updateHomeForUser);
router.delete('/users/:userId/homes/:homeId', userController.deleteHomeForUser);

module.exports = router;
