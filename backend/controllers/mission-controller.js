const { validationResult }      = require("express-validator");
const mongoose                  = require("mongoose");

const HttpError                 = require("../models/http-error");
const Card                      = require("../models/card");
const Mission                   = require("../models/mission");
const Todo                      = require("../models/todos");


const getMissionByCardId = async (req, res, next) => {
    const cardId = req.params.cid;

    let missions;

    try {
        missions = await Mission.find({ card: cardId });
    } catch (err) {
        const error = new HttpError(
            "Bir hata oluştu, lütfen tekrar deneyiniz.",
            500
        );
        return next(error);
    }

    // if(!missions ||  missions.length === 0) {
    //     return next(
    //         new HttpError("Böyle bir görev bulunamadı.", 404)
    //     );
    // }
    res.json({missions: missions.map(m => m.toObject({ getters: true })) });
}
const updateMission = async (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return next(
            new HttpError("Bilgiler geçersiz, lütfen kontrol ediniz.", 422)
        );
    }

    const {name} = req.body;
    const missionId = req.params.mid;

    let mission;
    try {
        mission = await Mission.findById(missionId);
    } catch (err) {
        const error = new HttpError(
            "Bir şeyler ters gitti, bilgileriniz güncellenemedi.",
            500
        );
        return next(error);
    }
    mission.name = name;
    try {
        await mission.save();
    } catch (err) {
        const error = new HttpError(
            "Bir şeyler ters gitti, bilgileriniz güncellenemedi.",
            500
        );
        return next(error);
    }
    res.status(200).json({mission: mission.toObject({ getters: true }) });
}

const isDateMission = async (req, res, next) => {
    const { isDate } = req.body;
    const missionId = req.params.mid;

    let mission;
    try {
        mission = await Mission.findById(missionId);
    } catch (err) {
        const error = new HttpError(
            "Bir şeyler ters gitti, bilgileriniz güncellenemedi.",
            500
        );
        return next(error);
    }
    mission.isDate = isDate;

    try {
        await mission.save();
    } catch (err) {
        const error = new HttpError(
            "Bir şeyler ters gitti, bilgileriniz güncellenemedi.",
            500
        );
        return next(error);
    }
    res.status(200).json({mission: mission.toObject({ getters: true }) });
}

const updateMissionDate = async (req, res, next) => {

    const {date} = req.body;
    const missionId = req.params.mid;

    let mission;
    try {
        mission = await Mission.findById(missionId);
    } catch (err) {
        const error = new HttpError(
            "Bir şeyler ters gitti, bilgileriniz güncellenemedi.",
            500
        );
        return next(error);
    }
    if(date)  mission.date = date;

    try {
        await mission.save();
    } catch (err) {
        const error = new HttpError(
            "Bir şeyler ters gitti, bilgileriniz güncellenemedi.",
            500
        );
        return next(error);
    }
    res.status(200).json({mission: mission.toObject({ getters: true }) });
}


const deleteMission = async (req, res, next) => {
    const missionId = req.params.mid;

    let gorev;
    try {
        gorev = await Mission.findById(missionId).populate("card");
    } catch (err) {
        const error = new HttpError(
            "Bir şeyler ters gitti, görev silinemedi.",
          500
        );
        return next(error);
      }
    if (!gorev) {
        const error = new HttpError('Böyle bir görev bulunamadı', 404);
        return next(error);
      }

      try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await gorev.remove({session: sess});
        gorev.card.missions.pull(gorev);
        await gorev.card.save({session: sess});
        await sess.commitTransaction();
      } catch (err) {
        const error = new HttpError(
          "Bir şeyler ters gitti, görev silinemedi.",
          500
        );
        return next(error);
      }

      try {
        let todoIds = gorev.todos.map(t => t._id);
        await Todo.deleteMany ({
          _id: {
            $in: todoIds,
          },
        });
      } catch (err) {next( new HttpError("Bir şeyler ters gitti..."))}
      
      res.status(200).json({ message: 'Görev silindi.' });
}


const createMission = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('Geçersiz giriş, lütfen verilerinizi kontrol ediniz', 422)
      );
    }

    const {name, card, date} = req.body;

    const createdMission = new Mission({
        name,
        date,
        card,
        todo: []
    });

    let kart;
    try {
        kart = await Card.findById(card);
    } catch(err) {
        const error = new HttpError(
        "Görev oluştururken hata meydana geldi, lütfen tekrar deneyiniz",
        500);
        return next(error);
    }

    if(!kart) {
        const error = new HttpError("Bu idye sahip kart bulunamadı.", 404);
        return next(error);
    }
    // console.log(kart);

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdMission.save({ session: sess });
        kart.missions.push(createdMission);
        await kart.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
            "Görev oluştururken hata meydana geldi, lütfen tekrar deneyiniz.",
            500
        );
        return next(error);
    }
    res.status(201).json({ mission: createdMission });
}

exports.createMission      = createMission;
exports.getMissionByCardId = getMissionByCardId;
exports.updateMission      = updateMission;
exports.updateMissionDate  = updateMissionDate;
exports.deleteMission      = deleteMission;
exports.isDateMission      = isDateMission;