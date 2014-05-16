/**
 * Created with IntelliJ IDEA.
 * User: nguyenle
 * Date: 5/13/14
 * Time: 11:59 AM
 * To change this template use File | Settings | File Templates.
 */
var models = require("../models");
var Employee = models.Employee;
var Salary = models.Salary;
var _ = require("lodash")._;
var async = require("async");
var moment = require("moment");

var retrieveEmployeeData = function(req, res) {
    var pageSize = req.body.pageSize;
    var page = req.body.page;

    var result = [];
    Employee.findAll({offset: pageSize * page, limit: pageSize, include:[Salary]}).success(function(employees) {
        _.each(employees, function(employee) {
            result.push({
                id: employee.id,
                firstName: employee.firstName,
                lastName: employee.lastName,
                employeeId: employee.employeeId,
                birthDate: moment(employee.birthDate).format('MM/DD/YY'),
                sex: employee.sex,
                startDate: moment(employee.startDate).format('MM/DD/YY'),
                salaries: _.map(employee.salaries, function(salary) {
                    return {
                        id: salary.id,
                        salary: salary.salary,
                        startOfSalary: moment(salary.startOfSalary).format('MM/DD/YY'),
                        endOfSalary: moment(salary.endOfSalary).format('MM/DD/YY')
                    }
                })
            })
        });

        res.send(200, result);
    });
};

var calculateAvgSalaryBySex = function(req, res) {
    async.parallel(
        [
            function(seriesCallback) {
                models.sequelize.query("select avg(salary) as avg_salary from Salaries s left outer join Employees e on s.EmployeeId = e.id where e.sex = 'F'").success(function(result) {
                    seriesCallback(null, result)
                });
            },
            function(seriesCallback) {
                models.sequelize.query("select avg(salary) as avg_salary from Salaries s left outer join Employees e on s.EmployeeId = e.id where e.sex = 'M'").success(function(result) {
                    seriesCallback(null, result)
                });
            }
        ],
        function(err, results) {
            res.send(200, {
                avgSalaryFemale: results[0][0].avg_salary,
                avgSalaryMale: results[1][0].avg_salary
            });
        }
    )
};

module.exports.retrieveEmployeeData = retrieveEmployeeData;
module.exports.calculateAvgSalaryBySex = calculateAvgSalaryBySex;

