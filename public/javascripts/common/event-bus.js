define(['jquery'], function($) {

    var topics = {};

    var create = function(topicName) {
        if (topicName === undefined || topicName == null) {
            return;
        }

        if (!topics[topicName]) {
            topics[topicName] = $.Callbacks('unique');
        }
    };

    var destroy = function(topicName) {
        if (topicName === undefined || topicName == null) {
            return;
        }

        if (topics[topicName]) {
            topics[topicName].empty();
        }
    };

    var subscribe = function(topicName, fn) {
        var topicCallbacks = topics[topicName];
        if (topicCallbacks) {
            topicCallbacks.add(fn);
        }
    };

    var publish = function(topicName, args) {
        var topicCallbacks = topics[topicName];
        if (topicCallbacks) {
            topicCallbacks.fire(args);
        }
    };

    var unsubscribe = function(topicName, fn) {
        var topicCallbacks = topics[topicName];
        if (topicCallbacks) {
            topicCallbacks.remove(fn);
        }
    };

    return {
        create: create,
        destroy: destroy,
        subscribe: subscribe,
        publish: publish,
        unsubscribe: unsubscribe
    };
});