var Sequelize = require('sequelize')
var globals = require('./public/globals')

var UserModel = require('./models/user')
var CategoryModel = require('./models/category')
var QuestionModel = require('./models/question')
var AnswerModel = require('./models/answer')
var QuestionCategoryMappingModel = require('./models/questionCategoryMapping')
var FollowFollowerModel = require('./models/followFollower')
var MessageModel = require('./models/message')
var TempModel = require('./models/temp')

const sequelize = new Sequelize(globals.db_name, globals.db_user, globals.db_password, {
    host: globals.db_host,
    dialect: globals.dialect
    // define: {
    //     timestamps: false
    // }
});

const User = UserModel(sequelize, Sequelize);
const Category = CategoryModel(sequelize, Sequelize);
const Question = QuestionModel(sequelize, Sequelize);
const Answer = AnswerModel(sequelize, Sequelize);
const QuestionCategoryMapping = QuestionCategoryMappingModel(sequelize, Sequelize);
const FollowFollower = FollowFollowerModel(sequelize, Sequelize);
const Message = MessageModel(sequelize, Sequelize);
const Temp = TempModel(sequelize, Sequelize);

User.hasMany(Question);
User.hasMany(Answer);
Question.hasMany(Answer);
Question.hasMany(QuestionCategoryMapping);
//Category.hasMany(QuestionCategoryMapping);
User.hasMany(FollowFollower);
User.hasMany(Message);

sequelize.sync()
    .then(() => {
        console.log('database kors and tables have been created')
    });

module.exports = { User, Category, Question, Answer, QuestionCategoryMapping, FollowFollower, Message, Temp }; 