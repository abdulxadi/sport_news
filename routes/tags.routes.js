const { addNewTag, getAllTags, getTagById, deleteTagById } = require("../controller/tags.controller")

const router = require("express").Router()


router.post("/", addNewTag)
router.get("/", getAllTags)
router.get("/:id", getTagById)
router.delete("/:id",deleteTagById)

module.exports = router