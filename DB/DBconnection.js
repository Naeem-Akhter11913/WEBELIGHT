const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://user834016:user834016@vvit.gkwddtz.mongodb.net/hamAppKeHaiKoun?retryWrites=true&w=majority').then(() => console.log("DB is connected")).catch((err) => console.log(err))