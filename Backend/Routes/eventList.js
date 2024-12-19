const express = require("express")
const { addProduct, adminDeleteOneProduct, getAllProduct, decreaseAvailableTickets } = require("../controller/EventListController")
const router = express.Router()


router.route("/admin/addProduct").post(addProduct)
router.route("/admin/deleteProduct/:id").delete(adminDeleteOneProduct)
router.route("/admin/getAllProduct").get(getAllProduct);
router.route("/admin/delete/:id").put(decreaseAvailableTickets);

module.exports = router;
