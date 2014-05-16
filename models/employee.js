module.exports = function(sequelize, DataTypes) {
    var Employee = sequelize.define('Employee', {
        employeeId: {
            type: DataTypes.INTEGER,
            notNull: true,
            notEmpty:true,
            validation: {
                notEmpty: true,
                notNull: true
            },
            unique: { name: 'employeeId', msg: 'This employeeId already existed' }
        },
        birthDate: DataTypes.DATE,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        sex: DataTypes.STRING,
        startDate: DataTypes.DATE
    }, {
        classMethods: {
            associate: function(models) {
                Employee.hasMany(models.Salary)
            }
        }
    });

    return Employee
};