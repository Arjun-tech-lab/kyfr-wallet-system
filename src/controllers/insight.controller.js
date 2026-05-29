const ApiResponse =
require("../utils/ApiResponse");

const asyncHandler =
require("../utils/asyncHandler");

const insightService =
require("../services/insight.service");

const getInsights =
asyncHandler(
  async (req, res) => {

    const insights =
      await insightService
        .getInsights(
          req.user.id
        );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Insights fetched successfully",
        insights
      )
    );

  }
);

module.exports = {
  getInsights
};