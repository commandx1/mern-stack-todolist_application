const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const User = require("../models/user");

const getUserById = async (req, res, next) => {
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Bir şeyler ters gitti, lütfen tekrar deneyinizz.",
      500
    );
    return next(error);
  }
  if (!user) {
    const error = new HttpError("Kullanıcı bulunamadı.", 404);
    return next(error);
  }

  res.json({ user: user.toObject({ getters: true }) });
};

const signUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        "Geçersiz giriş. Uygunsuz mail adresi ya da 6 haneden daha kısa şifre. Lütfen bilgilerinizi kontrol ediniz.",
        422
      )
    );
  }
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Kayıt sırasında bir haya meydana geldi, lütfen tekrar deneyin.",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "Mail adresi kullanılmakta, lütfen başka bir email deneyiniz.",
      422
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password,
    background: {
      left: "232526",
      right: "414345"
    },
    cards: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "Kayıt sırasında bir haya meydana geldi, lütfen tekrar deneyin.",
      500
    );
    return next(error);
  }

  res
    .status(201)
    .json({
      message: "Hoşgeldin " + createdUser.name + " :)) Nasılsın tatlı şey ?",
      user: createdUser.toObject({ getters: true }),
    });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Giriş esnasında hata meydana geldi, lütfen tekrar deneyiniz.",
      500
    );
    return next(error);
  }
  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      "Hatalı giriş yaptınız, lütfen tekrar deneyiniz.",
      401
    );
    return next(error);
  }
  res.json({
    message: "Hoşgeldin " + existingUser.name + " :)) Nasılsın tatlı şey ?",
    user: existingUser.toObject({ getters: true }),
  });
};

const googleLogin = async (req, res, next) => {
  const { email, name, image } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Giriş esnasında hata meydana geldi, lütfen tekrar deneyiniz.",
      500
    );
    return next(error);
  }
  if (!existingUser) {
    const createdUser = new User({
      name,
      email,
      image,
      background: {
        left: "232526",
        right: "414345"
      },
      password: "a4s5d6f8eq6w6a53as",
      cards: [],
    });
    try {
      await createdUser.save();
    } catch (err) {
      const error = new HttpError(
        "Kayıt sırasında bir haya meydana geldi, lütfen tekrar deneyin.",
        500
      );
      return next(error);
    }

    res
      .status(201)
      .json({
        message: "Hoşgeldin " + createdUser.name + " :)) Nasılsın tatlı şey ?",
        user: createdUser.toObject({ getters: true }),
      });
  } else {
    existingUser.image = image;
    try {
      await existingUser.save();
    } catch (err) {
      const error = new HttpError(
        "Bir şeyler ters gitti, bilgileriniz güncellenemedi.",
        500
      );
      return next(error);
    }
  }
  res.json({
    message: "Hoşgeldin " + existingUser.name + " :)) Nasılsın tatlı şey ?",
    user: existingUser.toObject({ getters: true }),
  });
};



const updateUsername = async (req, res, next) => {
  const {email, name, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Email geçersiz !", 422));
  }

  const userId = req.params.uid;

  let emailCheck;
  try {
    emailCheck = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Kayıt sırasında bir haya meydana geldi, lütfen tekrar deneyin.",
      500
    );
    return next(error);
  }

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Bir şeyler ters gitti.",
      500
    );
    return next(error);
  }
  if (user.email !== email && emailCheck) {
    const error = new HttpError(
      "Mail adresi kullanılmakta, lütfen başka bir email deneyiniz.",
      422
    );
    return next(error);
  }


  if(name) user.name = name;
  if(email) user.email = email;
  if(password) user.password = password;

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      "Bir şeyler ters gitti, değişiklik yapılamadı",
      500
    );
    return next(error);
  }

  res
    .status(200)
    .json({ message: "Değişikler başarıyla kaydedildi !", user: user.toObject({ getters: true }) });
};




const updateBackground = async (req, res, next) => {
  const {left, right, imageUrl} = req.body;

  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Bir şeyler ters gitti.",
      500
    );
    return next(error);
  }


  if(left && right){  
    user.background.left = left;
    user.background.right = right;
    user.background.imageUrl = null;
  }

  if(imageUrl) user.background.imageUrl = imageUrl;

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      "Bir şeyler ters gitti, değişiklik yapılamadı",
      500
    );
    return next(error);
  }

  res
    .status(200)
    .json({ message: "Değişikler başarıyla kaydedildi !", user: user.toObject({ getters: true }) });
};



exports.signUp = signUp;
exports.login = login;
exports.googleLogin = googleLogin;
exports.getUserById = getUserById;
exports.updateUsername = updateUsername;
exports.updateBackground = updateBackground;
