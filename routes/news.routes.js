<<<<<<< HEAD
const router = require("express").Router()

const {
  addNewNews,
  getNewsById,
  getAllNews,
  updateNewsById,
  deleteNewsById,
} = require("../controllers/news.controller");

router.post("/", addNewNews)
router.get("/", getAllNews)
router.get("/:id", getNewsById)
router.put("/:id", updateNewsById)
router.delete("/:id", deleteNewsById)
=======
const { addNewNew, getAllNews, getNewById, deleteNewById } = require("../controller/news.controller")

const router = require("express").Router()


router.post("/", addNewNew)
router.get("/", getAllNews)
router.get("/:id", getNewById)
router.delete("/:id",deleteNewById)
>>>>>>> 8f84cca (first commit)

module.exports = router