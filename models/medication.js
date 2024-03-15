const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Medication extends Model{}

Medication.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        when_taken: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        is_daily: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        is_every_other: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        custom_schedule: {
            type: DataTypes.STRING,
            allowNull: true
        },
        has_notifications: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        date_checked: {
            type: DataTypes.STRING,
        },
        instance_date: {
            type: DataTypes.STRING,  
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: false,
        underscored: true,
        modelName: 'Medication'
    }
)

module.exports = Medication