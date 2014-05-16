define([
    'jquery',
    'underscore',
    'upload/ui-manager',
    'common/event-bus',
    'common/webservice-client',
    'common/constants'
], function($, _, uiManager, eventBus, webserviceClient, constants) {
    var currentPage = 0;
    var atTheEnd = false;
    var currentBatchOfEmployeeData;

    var retrieveEmployee = function() {
        webserviceClient.post(
            '/retrieveEmployeeData',
            {
                page: currentPage,
                pageSize: 20
            },
            function(employeeData) {
                if(employeeData.length > 0) {
                    currentBatchOfEmployeeData = employeeData;
                    eventBus.publish(constants.TOPIC_EMPLOYEE_DATA_LOADED, employeeData)
                }
                else if(currentPage > 0) {
                    currentPage--;
                    atTheEnd = true;
                }
            },
            function(err) {
                uiManager.renderError(err);
            }
        )
    };

    var calculateAvgSalaryBySex = function() {
        webserviceClient.post(
            '/calculateAvgSalaryBySex',
            {},
            function(avgData) {
                eventBus.publish(constants.TOPIC_AVG_SALARY_DATA_LOADED, avgData);
            },
            function(err) {
                uiManager.renderError(err);
            }
        )
    };

    var subNextButtonClick = function() {
        if(!atTheEnd) {
            currentPage++;
            retrieveEmployee();
        }
    };

    var subPreviousButtonClick = function() {
        if(currentPage > 0) {
            currentPage--;
            atTheEnd = false;
            retrieveEmployee();
        }
    };

    var subSalaryDataClick = function(employeeId) {
        var employeeIdInteger = parseInt(employeeId);
        var employeeData = _.find(currentBatchOfEmployeeData, function(employee) {
            return employeeIdInteger == employee.id;
        });

        eventBus.publish(constants.TOPIC_SALARY_DATA_LOADED, employeeData);
    };

    return {
        retrieveEmployee: retrieveEmployee,
        subNextButtonClick: subNextButtonClick,
        subPreviousButtonClick: subPreviousButtonClick,
        subSalaryDataClick: subSalaryDataClick,
        calculateAvgSalaryBySex: calculateAvgSalaryBySex
    }
});