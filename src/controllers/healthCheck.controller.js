import asyncHandler from "express-async-handler";

const healthCheck = asyncHandler(async (req, res) => {
 return res.status(200).json({ message: "Healthy" });
});

export { healthCheck };