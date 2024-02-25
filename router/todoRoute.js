const express = require('express');

const { getAllCrud, addCurd, editCrud, deleteCrud } = require('../controllers/crudController');
const router = express.Router();
const { isAdmin } = require('../middleware/isAuth')

router.post("/add", addCurd)
router.get("/get", getAllCrud)
router.put("/update", editCrud)
router.delete("/delete", isAdmin, deleteCrud)

module.exports = router;
