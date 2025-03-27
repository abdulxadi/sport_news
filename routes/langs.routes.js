<<<<<<< HEAD
const router = require("express").Router()
const {
  addNewLang,
  getLangById,
  getAllLang,
  updateLangById,
  deleteLangById,
} = require("../controllers/langs.controller");



router.post("/", addNewLang)
router.get("/", getAllLang)
router.get("/:id", getLangById)
router.put("/:id", updateLangById)
router.delete("/:id", deleteLangById)
=======
const { addNewLang, getAllLangs, getLangById, deleteLangById } = require("../controller/langs.controller")

const router = require("express").Router()


router.post("/", addNewLang)
router.get("/", getAllLangs)
router.get("/:id", getLangById)
router.delete("/:id",deleteLangById)
>>>>>>> 8f84cca (first commit)

module.exports = router