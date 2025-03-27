<<<<<<< HEAD
const router = require("express").Router()

const {
  addUser,
  getUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
} = require("../controllers/users.controller");

router.post("/", addUser)
router.get("/", getAllUsers)
router.get("/:id", getUserById)
router.put("/:id", updateUserById)
router.delete("/:id", deleteUserById)
=======
const { addNewUser, getAllUsers, getUserById, deleteUserById } = require("../controller/users.controller")

const router = require("express").Router()


router.post("/", addNewUser)
router.get("/", getAllUsers)
router.get("/:id", getUserById)
router.delete("/:id",deleteUserById)
>>>>>>> 8f84cca (first commit)

module.exports = router