const express           = require("express");
const {check}           = require("express-validator");
const missionController  = require("../controllers/mission-controller");

const router = express.Router();

router.post( "/", [check("name").not().isEmpty()], missionController.createMission );

router.get( "/card/:cid", missionController.getMissionByCardId );

router.patch( "/:mid", [check("name").not().isEmpty()], missionController.updateMission );

router.patch( "/date/:mid", missionController.updateMissionDate );

router.patch( "/isDate/:mid", missionController.isDateMission );

router.delete( "/:mid", missionController.deleteMission );

module.exports = router;