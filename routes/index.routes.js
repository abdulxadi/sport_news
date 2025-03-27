<<<<<<< HEAD
const router = require("express").Router();

const langsRoute = require("./langs.routes");
const newsRoute = require("./news.routes");
const usersRoute = require("./users.routes");
const newsWithLangsRoute = require("./newsWithLangs.routes");
const categoriesRoute = require("./category.routes");

router.use("/langs", langsRoute);
router.use("/news", newsRoute);
router.use("/users", usersRoute);
router.use("/news-with-langs", newsWithLangsRoute);
router.use("/categories", categoriesRoute);

module.exports = router;

=======
const router = require("express").Router()
const langsRoute = require("./langs.routes")
const tagsRoute = require("./tags.routes")
const categoryRoute = require("./category.routes")
const newsWithLangsRoute = require("./newsWithLangs.routes")
const usersRoute = require("./users.routes")
const newsRoute = require("./news.routes")

router.use("/langs", langsRoute)
router.use("/tags", tagsRoute)
router.use("/category", categoryRoute)
router.use("/newswlangs", newsWithLangsRoute)
router.use("/users", usersRoute)
router.use("/news", newsRoute)

module.exports = router
>>>>>>> 8f84cca (first commit)
