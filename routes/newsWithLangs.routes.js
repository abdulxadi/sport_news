<<<<<<< HEAD
const router = require("express").Router()
const {
  addNewNewsWithLang,
  getNewsWithLangById,
  getAllNewsWithLang,
  updateNewsWithLangById,
  deleteNewsWithLangById,
} =  newsWithLangsController = require("../controllers/NewsWithLangs .controller");

router.post("/", addNewNewsWithLang)
router.get("/", getAllNewsWithLang)
router.get("/:id", getNewsWithLangById)
router.put("/:id", updateNewsWithLangById)
router.delete("/:id", deleteNewsWithLangById)
=======
const { addNewNews_with_lang, getAllNews_with_langs, getNews_with_langById, deleteNews_with_langById } = require("../controller/newsWithLangs.controller")

const router = require("express").Router()


router.post("/", addNewNews_with_lang)
router.get("/", getAllNews_with_langs)
router.get("/:id", getNews_with_langById)
router.delete("/:id",deleteNews_with_langById)
>>>>>>> 8f84cca (first commit)

module.exports = router