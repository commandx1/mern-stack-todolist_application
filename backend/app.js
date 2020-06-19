const express       = require("express");
const bodyParser    = require("body-parser");
const mongoose      = require("mongoose");
const userRoutes    = require("./routes/users-routes");
const cardRoutes    = require("./routes/cards-routes");
const missionRoutes = require("./routes/missions-routes");
const todoRoutes    = require("./routes/todos-routes");
const HttpError     = require("./models/http-error");


const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers", 
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE");
  
    next();
  });

app.use("/api/users", userRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api/missions", missionRoutes);
app.use("/api/todos", todoRoutes);


app.use((req, res, next) => {
    const error = new HttpError("Sayfa Bulunamadı...", 404);
    throw error;
});

app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || "Bilinmeyen bir hata meydana geldi."});
});


mongoose
.connect(
    "mongodb+srv://serhatbelen:ser215@planli-yasa-8jxt2.mongodb.net/planli-yasa?retryWrites=true&w=majority"
)
.then(() => {
    app.listen(5000);
})
.catch(err => {
    console.log(err);
});

