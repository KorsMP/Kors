module.exports = (sequelize, Sequelize) => {
    return sequelize.define('answer', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        upVote: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        downVote: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        answer: Sequelize.STRING,
        displayName: Sequelize.STRING,
        anonymous: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        userId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users', // 'users' refers to table name
                key: 'id', // 'id' refers to column name in users table
            }
        },
        questionId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'questions', // 'questions' refers to table name
                key: 'id', // 'id' refers to column name in questions table
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