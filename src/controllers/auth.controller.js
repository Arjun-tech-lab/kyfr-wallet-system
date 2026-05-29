const ApiResponse =
  require("../utils/ApiResponse");

const authService =
  require("../services/auth.service");

const asyncHandler =
  require("../utils/asyncHandler");

const register = asyncHandler(
  async (req, res) => {

    const user =
      await authService.register(
        req.body
      );

    return res.status(201).json(
      new ApiResponse(
        201,
        "User created successfully",
        {
          id: user.id,
          name: user.name,
          email: user.email
        }
      )
    );

  }
);
const login = asyncHandler(
  async (req, res) => {

    const result =
      await authService.login(
        req.body
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Login successful",
        result
      )
    );
  }
);
module.exports = {
  register,
  login
};