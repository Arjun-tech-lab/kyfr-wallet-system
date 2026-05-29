const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middlewares/auth.middleware");

const validate =
  require("../middlewares/validation.middleware");

const {
  transferSchema
} = require("../validations/transaction.validation");

const transactionController =
  require("../controllers/transaction.controller");

/**
 * @swagger
 * /transfer:
 *   post:
 *     summary: Transfer money to another user
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               receiverEmail:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Transfer successful
 */
router.post(
  "/transfer",
  authMiddleware,
  validate(transferSchema),
  transactionController.transfer
);
/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get transaction history
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Transactions fetched successfully
 */
router.get(
  "/transactions",
  authMiddleware,
  transactionController.getTransactions
);

module.exports = router;