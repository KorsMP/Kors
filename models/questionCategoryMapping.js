module.exports = (sequelize, Sequelize) => {
    return sequelize.define('questionCategoryMapping', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        questionId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'questions', // 'questions' refers to table name
                key: 'id', // 'id' refers to column name in questions table
            }
        },
        catName: {
            type: Sequelize.STRING,
            references: {
                model: 'categories', // 'categories' refers to table name
                key: 'catName', // 'catName' refers to column name in categories table
            }
        },
        createdAt: {
            type: Sequelize.DATE(3),
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
        },
        updatedAt: {
            type: Sequelize.DATE(3),
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
            onUpdate: Sequelize.literal('CURRENT_TIMESTAMP(3)')
        }
    })
};