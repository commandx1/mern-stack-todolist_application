const express           = require("express");
const {check}           = require("express-validator");
const todoController  = require("../controllers/todo-controller");

const router = express.Router();

router.post( "/", [check("task").not().isEmpty()], todoController.createTodo );

router.get( "/mission/:mid", todoController.getTodoByMissionId );

router.patch( "/:tid", [check("task").not().isEmpty()], todoController.updateTodo );

router.patch("/c/:tid",todoController.toggleTodo);

router.delete( "/:tid", todoController.deleteTodo );

module.exports = router;