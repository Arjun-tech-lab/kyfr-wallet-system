const { z } = require("zod");

const addMoneySchema = z.object({
  amount: z
    .number()
    .positive(
      "Amount must be positive"
    )
});

module.exports = {
  addMoneySchema
};