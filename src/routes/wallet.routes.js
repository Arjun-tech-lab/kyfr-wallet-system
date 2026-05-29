const express = require("express");

const router =
  express.Router();

const walletController =
require("../controllers/wallet.controller");

const authMiddleware =
require("../middlewares/auth.middleware");

const validate =
require("../middlewares/validation.middleware");

const {
  addMoneySchema
} = require("../validations/wallet.validation");

/**
 * @swagger
 * /wallet/add:
 *   post:
 *     summary: Add money to wallet
 *     tags:
 *       - Wallet
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Money added successfully
 */
router.post(
  "/wallet/add",
  authMiddleware,
  validate(addMoneySchema),
  walletController.addMoney
);
/**
 * @swagger
 * /wallet/balance:
 *   get:
 *     summary: Get wallet balance
 *     tags:
 *       - Wallet
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Balance fetched successfully
 */
router.get(
  "/wallet/balance",
  authMiddleware,
  walletController.getBalance
);
module.exports = router;