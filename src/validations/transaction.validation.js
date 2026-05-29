const { z } = require("zod");

const transferSchema = z.object({
  receiverEmail: z.string().email(),
  amount: z.number().positive()
});

module.exports = {
  transferSchema
};