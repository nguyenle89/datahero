module.exports = function(sequelize, DataTypes) {
    var Salary = sequelize.define('Salary', {
        salary: {
                type: DataTypes.INTEGER,
                validate: {
                    notEmpty: true,
                    notNull: true
                }
            },
        startOfSalary: {
            type: DataTypes.DATE,
            validate: {
                notEmpty: true,
                notNull: true
            }
        },
        endOfSalary: {
            type: DataTypes.DATE,
            validate: {
                notEmpty: true,
                notNull: true
            }
        },
        EmployeeId: {
            type: DataTypes.INTEGER,
            references: 'Employees',
            referencesKey: 'id'
        }
    });

    return Salary
};