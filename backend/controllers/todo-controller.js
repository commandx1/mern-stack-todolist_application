const { validationResult } = require("express-validator");
const mongoose             = require("mongoose");

const HttpError            = require("../models/http-error");
const Todo                 = require("../models/todos");
const Mission              = require("../models/mission");

const getTodoByMissionId = async (req, res, next) => {
    const missionId = req.params.mid;

    let todos;

    try {
        todos = await Todo.find({mission: missionId});
    } catch(err) {
        return next(
            new HttpError("Bir hata oluştu, lütfen tekrar deneyiniz.", 500)
        );
    }
    // if(!todos || todos.length === 0){
    //     return next(
    //         new HttpError("Todo bulunamadı.", 404)
    //     );
    // }
    res.json({todos: todos.map(m => m.toObject({ getters: true })) });
}


const createTodo = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('Geçersiz giriş, lütfen verilerinizi kontrol ediniz', 422)
      );
    }

    const {task, mission} = req.body;

    const createdTodo = new Todo({
        task,
        completed: false,
        mission
    });

    let gorev;
    try {
        gorev = await Mission.findById(mission);
    } catch(err) {
        const error = new HttpError(
        "Todo oluştururken hata meydana geldi, lütfen tekrar deneyiniz",
        500);
        return next(error);
    }

    if(!gorev) {
        const error = new HttpError("Bu idye sahip görev bulunamadı.", 404);
        return next(error);
    }
    // console.log(gorev);

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdTodo.save({ session: sess });
        gorev.todos.push(createdTodo);
        await gorev.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
            "Todo oluştururken hata meydana geldi, lütfen tekrar deneyiniz.",
            500
        );
        return next(error);
    }
    res.status(201).json({ todo: createdTodo });

}

const toggleTodo = async (req, res, next) => {
    const todoId = req.params.tid;
    let todo;
    try {
        todo = await Todo.findById(todoId);
    } catch (err) {
        const error = new HttpError(
            "Bir şeyler ters gitti, bilgileriniz güncellenemedi.",
            500
        );
        return next(error);
    }
    todo.completed = !todo.completed;
    try {
        await todo.save();
    } catch (err) {
        const error = new HttpError(
            "Bir şeyler ters gitti, bilgileriniz güncellenemedi.",
            500
        );
        return next(error);
    }
    res.status(200).json({todo: todo.toObject({ getters: true }) });
}



const updateTodo = async (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return next(
            new HttpError("Bilgiler geçersiz, lütfen kontrol ediniz.", 422)
        );
    }

    const {task} = req.body;
    const todoId = req.params.tid;

    let todo;
    try {
        todo = await Todo.findById(todoId);
    } catch (err) {
        const error = new HttpError(
            "Bir şeyler ters gitti, bilgileriniz güncellenemedi.",
            500
        );
        return next(error);
    }
    todo.task = task;
    try {
        await todo.save();
    } catch (err) {
        const error = new HttpError(
            "Bir şeyler ters gitti, bilgileriniz güncellenemedi.",
            500
        );
        return next(error);
    }
    res.status(200).json({todo: todo.toObject({ getters: true }) });
}


const deleteTodo = async (req, res, next) => {
    const todoId = req.params.tid;

    let todo;
    try {
        todo = await Todo.findById(todoId).populate("mission");
    } catch (err) {
        const error = new HttpError(
            "Bir şeyler ters gitti, todo silinemedi.",
          500
        );
        return next(error);
      }
    if (!todo) {
        const error = new HttpError('Böyle bir todo bulunamadı', 404);
        return next(error);
      }

      try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await todo.remove({session: sess});
        todo.mission.todos.pull(todo);
        await todo.mission.save({session: sess});
        await sess.commitTransaction();
      } catch (err) {
        const error = new HttpError(
          "Bir şeyler ters gitti, todo silinemedi.",
          500
        );
        return next(error);
      }
      
      res.status(200).json({ message: todo.task + ' Başarıyla silindi !!!' });
}



exports.getTodoByMissionId  = getTodoByMissionId;
exports.createTodo          = createTodo;
exports.updateTodo          = updateTodo;
exports.deleteTodo          = deleteTodo;
exports.toggleTodo          = toggleTodo;