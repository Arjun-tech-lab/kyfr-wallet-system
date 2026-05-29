const insightRepository =
require("../repositories/insight.repository");

const getInsights = async (
  userId
) => {

  return insightRepository
    .getInsights(userId);

};

module.exports = {
  getInsights
};