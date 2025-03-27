<<<<<<< HEAD
const router = require("express").Router();
const {
  addCategory,
  getCategoryById,
  getAllCategories,
  updateCategoryById,
  deleteCategoryById,
} = require("../controllers/category.controller");

router.post("/", addCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.put("/:id", updateCategoryById);
router.delete("/:id", deleteCategoryById);

module.exports = router;
=======
const { addNewCategory, getAllCategorys, getCategoryById, deleteCategoryById } = require("../controller/category.controller")

const router = require("express").Router()


router.post("/", addNewCategory)
router.get("/", getAllCategorys)
router.get("/:id", getCategoryById)
router.delete("/:id",deleteCategoryById)

module.exports = router
>>>>>>> 8f84cca (first commit)
