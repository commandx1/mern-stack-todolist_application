const { validationResult }      = require("express-validator");
const mongoose                  = require("mongoose");
const HttpError                 = require("../models/http-error");
const Card                      = require("../models/card");
const User                      = require("../models/user");
const Mission                   = require("../models/mission");
const Todo                      = require("../models/todos");


const getCardById = () => {}  //buna ihtiyaç olmayacak gibi...

const getCardByUserId = async (req, res, next) => {

    const userId = req.params.uid;

    let cards;
    try {
        cards = await Card.find({kullanici: userId});
    } catch (err) {
        const error = new HttpError(
            "Kart bulunamadı, lütfen tekrar deneyiniz.", 500 
        );
        return next(error);
    }

    // if (!cards || cards.length === 0) {
    //     return next(
    //       new HttpError('Bu kayıtta bir kart bulunamadı.', 404)
    //     );
    //   }
    
      res.json({ cards: cards.map(c => c.toObject({ getters: true })) });
    };

const updateCard = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Girdiğiniz veriler geçersiz, lütfen tekrar deneyiniz.', 422)
    );
  }

  const { header } = req.body;
  const cardId = req.params.cid;

  let card;
  try {
      card = await Card.findById(cardId);
  } catch ( err ) {
      const error = new HttpError(
          "Bir şeyler ters gitti, değişiklik yapılamadı.",
          500
      );
      return next(error);
  }

  if(header) card.header = header;
  try {
      await card.save();
  } catch (err) {
    const error = new HttpError(
        "Bir şeyler ters gitti, değişiklik yapılamadı.",
        500
    );
    return next(error);
  }

  res.status(200).json({ card: card.toObject({ getters: true }) });
}

const deleteCard = async (req, res, next) => {
    const cardId = req.params.cid;

    let card;
    try {
      card = await Card.findById(cardId).populate('kullanici');
    } catch (err) {
      const error = new HttpError(
        'Bir şeyler ters gitti, kart silinemiyor.',
        500
      );
      return next(error);
    }
  
    if (!card) {
      const error = new HttpError('Böyle bir kart bulunamadı', 404);
      return next(error);
    }
  
    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await card.remove({session: sess});
      card.kullanici.cards.pull(card);
      await card.kullanici.save({session: sess});
      await sess.commitTransaction();
    } catch (err) {
      const error = new HttpError(
        'Bir şeyler ters gitti, kart silinemiyor.',
        500
      );
      return next(error);
    }

    
    try {
      let missionIds = card.missions.map(m => m._id);
      await Mission.deleteMany ({
        _id: {
          $in: missionIds,
        },
      });
    } catch (err) {next( new HttpError("Bir şeyler ters gitti..."))}
    
    try {
      let todoIds = card.missions.map(m => m.todos.map(t => t._id));
      await Todo.deleteMany ({
        _id: {
          $in: todoIds,
        },
      });
    } catch (err) {next( new HttpError("Bir şeyler ters gitti..."))}
    
    
    
    res.status(200).json({ message: 'Kart başarıyla silindi.' });

}




const createCard = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('Hiçbir şey yazmadınız! Lütfen tekrar deneyin.', 422)
      );
    }

    const {header, kullanici} = req.body;

    const createdCard = new Card({
        header,
        kullanici,
        missions: []
    });

    let user;
    try {
        user = await User.findById(kullanici);
    } catch(err) {
        const error = new HttpError(
        "Kart oluştururken hata meydana geldi, lütfen tekrar deneyiniz",
        500);
        return next(error);
    }

    if(!user) {
        const error = new HttpError("Bu idye sahip kullanıcı bulunamadı.", 404);
        return next(error);
    }
    // console.log(user);

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdCard.save({ session: sess });
        user.cards.push(createdCard);
        await user.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
            "Kart oluştururken hata meydana geldi, lütfen tekrar deneyiniz.",
            500
        );
        return next(error);
    }
    res.status(201).json({ card:createdCard });

}

exports.createCard      = createCard;
exports.getCardByUserId = getCardByUserId;
exports.updateCard      = updateCard;
exports.deleteCard      = deleteCard;