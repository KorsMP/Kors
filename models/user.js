module.exports = (sequelize, Sequelize) => {
    return sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rollNumber: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING,
        middleName: Sequelize.STRING,
        email: Sequelize.STRING,
        userName: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        online: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        phone: {
            type: Sequelize.STRING,
        },
        year: {
            type: Sequelize.STRING,
        },
        branch: {
            type: Sequelize.STRING,
        },
        section: {
            type: Sequelize.STRING,
        },
        about: {
            type: Sequelize.STRING,
            defaultValue: ""
        },
        skills: {
            type: Sequelize.STRING,
            defaultValue: ""
        },
        socketId: {
            type: Sequelize.STRING,
            defaultValue: ""
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