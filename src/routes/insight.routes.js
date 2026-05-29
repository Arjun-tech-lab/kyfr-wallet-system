const express =
require("express");

const router =
express.Router();

const authMiddleware =
require("../middlewares/auth.middleware");

const insightController =
require("../controllers/insight.controller");

/**
 * @swagger
 * /insights:
 *   get:
 *     summary: Get spending insights
 *     tags:
 *       - Insights
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Insights fetched successfully
 */
router.get(
  "/insights",
  authMiddleware,
  insightController.getInsights
);

module.exports = router;