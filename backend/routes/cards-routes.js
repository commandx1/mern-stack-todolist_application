const express           = require("express");
const {check}           = require("express-validator");
const cardsControllers  = require("../controllers/card-controller");

const router = express.Router();


router.get( "/user/:uid", cardsControllers.getCardByUserId );

router.post( "/", [check("header").not().isEmpty()], cardsControllers.createCard );

router.patch( "/:cid", [check("header").not().isEmpty()], cardsControllers.updateCard );

router.delete( "/:cid", cardsControllers.deleteCard );


module.exports = router;