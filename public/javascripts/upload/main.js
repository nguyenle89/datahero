define([
    'jquery',
    'underscore',
    'upload/ui-manager',
    'upload/upload-controller',
    'common/event-bus',
    'common/constants',
    'domReady!'
], function($, _, uiManager, uploadController, eventBus, constants) {

    var setupEventBus = function() {
        eventBus.destroy(constants.TOPIC_EMPLOYEE_DATA_LOADED);
        eventBus.destroy(constants.TOPIC_PREVIOUS_BUTTON_CLICK);
        eventBus.destroy(constants.TOPIC_NEXT_BUTTON_CLICK);
        eventBus.destroy(constants.TOPIC_SALARY_DATA_CLICK);
        eventBus.destroy(constants.TOPIC_SALARY_DATA_LOADED);
        eventBus.destroy(constants.TOPIC_FILE_UPLOADED);
        eventBus.destroy(constants.TOPIC_FILE_UPLOADED_AVG);
        eventBus.destroy(constants.TOPIC_AVG_SALARY_DATA_LOADED);

        eventBus.create(constants.TOPIC_EMPLOYEE_DATA_LOADED);
        eventBus.create(constants.TOPIC_PREVIOUS_BUTTON_CLICK);
        eventBus.create(constants.TOPIC_NEXT_BUTTON_CLICK);
        eventBus.create(constants.TOPIC_SALARY_DATA_CLICK);
        eventBus.create(constants.TOPIC_SALARY_DATA_LOADED);
        eventBus.create(constants.TOPIC_FILE_UPLOADED);
        eventBus.create(constants.TOPIC_FILE_UPLOADED_AVG);
        eventBus.create(constants.TOPIC_AVG_SALARY_DATA_LOADED);

        eventBus.subscribe(constants.TOPIC_EMPLOYEE_DATA_LOADED, uiManager.renderEmployeeData);
        eventBus.subscribe(constants.TOPIC_PREVIOUS_BUTTON_CLICK, uploadController.subPreviousButtonClick);
        eventBus.subscribe(constants.TOPIC_NEXT_BUTTON_CLICK, uploadController.subNextButtonClick);
        eventBus.subscribe(constants.TOPIC_SALARY_DATA_CLICK, uploadController.subSalaryDataClick);
        eventBus.subscribe(constants.TOPIC_SALARY_DATA_LOADED, uiManager.renderSalaryHistory);
        eventBus.subscribe(constants.TOPIC_FILE_UPLOADED, uploadController.retrieveEmployee);
        eventBus.subscribe(constants.TOPIC_FILE_UPLOADED_AVG, uploadController.calculateAvgSalaryBySex);
        eventBus.subscribe(constants.TOPIC_AVG_SALARY_DATA_LOADED, uiManager.renderAvgSalary);
    };

    setupEventBus();
    uiManager.init();
    uploadController.retrieveEmployee();
    uploadController.calculateAvgSalaryBySex();
});