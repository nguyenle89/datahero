define([
    'jquery',
    'underscore',
    'Mustache',
    'common/event-bus',
    'common/constants',
    'text!templates/employee.tpl',
    'text!templates/salary.tpl',
    'text!templates/average-salary-by-sex.tpl',
    'jquery-form'
], function($, _, Mustache, eventBus, constants, employeeTpl, salaryTpl, averageSalaryBySexTpl) {

    var $progressBox = $('#progress-box');
    var $progressBar = $('#progress-bar');
    var $statusText = $('#status-txt');
    var completed = '0%';

    var onProgress = function(event, position, total, percentComplete) {
        $progressBar.width(percentComplete + '%');
        $statusText.html(percentComplete + '%');
        if(percentComplete > 50) {
            $statusText.css('color', '#fff');
        }
    };

    var afterSuccess = function() {
        $('#submit-btn').show();
        $progressBox.hide();
        eventBus.publish(constants.TOPIC_FILE_UPLOADED_AVG);
        eventBus.publish(constants.TOPIC_FILE_UPLOADED);
    };

    var onError = function(err) {
        if (err.responseText) {
            var errorResponse = JSON.parse(err.responseText);
            var $output = $("#output");

            renderError(errorResponse.error);
            $output.css('color', '#F00');

            $('#submit-btn').show();
        }
    };

    var beforeSubmit = function() {
        if(!$('#file-input').val()) {
            renderError("Please select a file to upload");
            return false
        }

        //Progress bar
        $progressBox.show();
        $progressBar.width(completed);
        $statusText.html(completed);
        $statusText.css('color', '#000');

        $('#submit-btn').hide();
        $('#loading-img').show();
        $("#output").html('<img class="spinner-content" src="/images/spinner32x32.gif" alt="32 by 32 spinner">');
    };

    //Public method
    var init = function() {
        var options = {
            target: '#output',
            beforeSubmit: beforeSubmit,
            uploadProgress: onProgress,
            success: afterSuccess,
            resetForm: true,
            error: onError
        };

        $('#upload-form').submit(function() {
            $(this).ajaxSubmit(options);
            // return false to prevent standard browser submit and page navigation
            return false;
        });

        $('#previous-button').off().on('click', function() {
            eventBus.publish(constants.TOPIC_PREVIOUS_BUTTON_CLICK);
        });

        $('#next-button').off().on('click', function() {
            eventBus.publish(constants.TOPIC_NEXT_BUTTON_CLICK);
        });
    };

    var renderError = function(err) {
        var $output = $("#output");
        $output.html(err);
    };

    var renderEmployeeData = function(employeeData) {
        var htmlContent = Mustache.to_html(employeeTpl, {
            employees: employeeData
        });

        $('#employee-wrapper').html(htmlContent);
        $('#button-group').show();

        $('.employee-name').on('click', function(e) {
            e.preventDefault();
            var employeeId = $(this).attr('id');

            eventBus.publish(constants.TOPIC_SALARY_DATA_CLICK, employeeId);
        });

        $('#avg-salary').show();
    };

    var renderSalaryHistory = function(employeeData) {
        var htmlContent = Mustache.to_html(salaryTpl, {
            salaries: employeeData.salaries,
            firstName: employeeData.firstName
        });
        var $salaryWrapper = $('#salary-wrapper');

        $salaryWrapper.html(htmlContent);

        var data = {
            labels : _.map(employeeData.salaries, function(salary, index) { return index }),
            datasets : [
                {
                    fillColor : "rgba(220,220,220,0.5)",
                    strokeColor : "rgba(220,220,220,1)",
                    data : _.map(employeeData.salaries, function(salary) { return salary.salary })
                }
            ]
        };

        var ctx = document.getElementById("salary-chart").getContext("2d");
        new Chart(ctx).Bar(data);
        $salaryWrapper.show();
    };

    var renderAvgSalary = function(avgSalaryData) {
        var htmlContent = Mustache.to_html(averageSalaryBySexTpl, {
            avgSalaryFemale: Math.round(avgSalaryData.avgSalaryFemale),
            avgSalaryMale: Math.round(avgSalaryData.avgSalaryMale)
        });

        $('#avg-salary').html(htmlContent);
    };

    return {
        init: init,
        renderError: renderError,
        renderEmployeeData: renderEmployeeData,
        renderSalaryHistory: renderSalaryHistory,
        renderAvgSalary: renderAvgSalary
    }
});