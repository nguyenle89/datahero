/**
 * Created with IntelliJ IDEA.
 * User: nguyenle
 * Date: 5/13/14
 * Time: 11:59 AM
 * To change this template use File | Settings | File Templates.
 */
var csv = require("ya-csv");
var models = require("../models");
var Employee = models.Employee;
var Salary = models.Salary;
var moment = require("moment");
var _ = require("lodash")._;
var async = require("async");


var uploadHandler = function(req, res) {
    var employeeFile = null;
    var salaryFile = null;

    _.each(req.files.file, function(file) {
        if(file.name == 'employees_small.csv') {
            employeeFile = file;
        }
        if(file.name == 'salaries_small.csv') {
            salaryFile = file;
        }
    });

    // Hack file names specific for this coding challenge
    if(employeeFile && salaryFile) {
        async.waterfall(
            [
                function(waterfallCallback) {
                    createEmployeeData(employeeFile.path, waterfallCallback);
                },
                function(employeeData, waterfallCallback) {
                    createSalaryData(employeeData, salaryFile.path,
                        function(err, salaryData){
                            waterfallCallback(null, employeeData, salaryData);
                        });
                }
            ],
            function(err, employeeData, salaryData) {
                if (err) {
                    res.send(500, {
                        error: err.msg
                    })
                }
                else {
                    res.send(200, {})
                }
            }
        )

    }
    else {
        res.send(500, {
            error: "Uploaded files are not supported"
        });
    }
};

var createEmployeeData = function(path, callback) {
    var reader = csv.createCsvFileReader(path);
    var employeeData = [];
    reader.on('data', function(row) {
        employeeData.push({
                employeeId: parseInt(row[0]),
                birthDate: moment(row[1], "MM/DD/YY").toDate(),
                firstName: row[2],
                lastName: row[3],
                sex: row[4],
                startDate: moment(row[5], "MM/DD/YY").toDate()
            });
    });

    reader.on('end', function(err) {
        if(err) {
            console.log('There is a problem going through the file');
            process.nextTick(function() {
                callback(err);
            })
        }
        else {
            Employee.bulkCreate(employeeData)
                .error(function(err){
                    var errMsg
                    if(err.code == 'ER_DUP_ENTRY') {
                        errMsg = 'Duplicated record'
                    }
                    else {
                        errMsg = 'Unable to insert data'
                    }
                    callback({msg: errMsg}, []);
                })
                .success(function() {
                Employee.findAll().success(function(employees) {
                    callback(null, employees);
                })
            });
        }
    });
};

var createSalaryData = function(employeeData, path, callback) {
    var reader = csv.createCsvFileReader(path);
    var salaryData = [];
    reader.on('data', function(row) {
        var corespondingEmployee = _.find(employeeData, function(employee) {
            return employee.employeeId == parseInt(row[0]);
        });

        var salary = {
            salary: row[1],
            startOfSalary: moment(row[2], "MM/DD/YY").toDate(),
            endOfSalary: moment(row[3], "MM/DD/YY").toDate(),
            EmployeeId: corespondingEmployee.id
        };
        salaryData.push(salary);
    });

    reader.on('end', function(err) {
        if(err) {
            console.log('There is a problem going through the file');
            process.nextTick(function() {
                callback(err);
            })
        }
        else {
            Salary.bulkCreate(salaryData).success(function() {
                callback(null);
            })
        }
    });
};

module.exports.uploadHandler = uploadHandler;
