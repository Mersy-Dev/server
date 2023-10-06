const express = require("express");
const { getCategory, postCategory, deleteCategory, getCattegory, putCat } = require("../controllers/categoryController")
// const { protect } = require("../middleware/authMiddleware");
const categoryRouter = express.Router()


categoryRouter.get("/getCat", getCategory);
categoryRouter.get("/getCatt:id", getCattegory);


categoryRouter.post("/postCat", postCategory);
categoryRouter.put("/:id", putCat);

categoryRouter.delete('/:id', deleteCategory);




module.exports = categoryRouter
