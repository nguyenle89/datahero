/**
 * Created with IntelliJ IDEA.
 * User: nguyenle
 * Date: 5/13/14
 * Time: 11:56 AM
 * To change this template use File | Settings | File Templates.
 */
var fileUploadController = require("../controllers/file-upload-controller");
var retrieveDataController = require("../controllers/retrieve-data-controller");
var index = require('./index');
var user = require('./user');

module.exports = function(app) {
    app.post('/upload', fileUploadController.uploadHandler);
    app.post('/retrieveEmployeeData', retrieveDataController.retrieveEmployeeData);
    app.post('/calculateAvgSalaryBySex', retrieveDataController.calculateAvgSalaryBySex);
    app.get('/', index.index);
    app.get('/users', user.list);
};