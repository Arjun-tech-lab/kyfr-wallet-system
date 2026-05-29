
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
const express = require("express");

const router = express.Router();

const authController =
  require("../controllers/auth.controller");

const validate =
  require("../middlewares/validation.middleware");

const {
  registerSchema,
  loginSchema
} = require("../validations/auth.validation");
router.post(
  "/users",
  validate(registerSchema),
  authController.register
);
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */

router.post(
  "/login",
  validate(loginSchema),
  authController.login
);

module.exports = router;