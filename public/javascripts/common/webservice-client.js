define(['jquery'], function($) {

    /**
     * This sends to regular POST ajax request to the nodejs server controller
     *
     * @param path absolute path on the nodejs server
     * @param payload an object to be POST'ed in the request body
     * @param successCallback success callback with a single param of data
     * @param failureCallback failure callback with params (error, status)
     * @returns {*}
     */
    var post = function(path, payload, successCallback, failureCallback) {
        return $.ajax({
            url: path,
            accepts: 'application/json',
            contentType: 'application/json',
            dataType: 'json',
            type: 'POST',
            data: payload ? JSON.stringify(payload) : '',
            success: function(data, status, jqXHR) {
                successCallback(data);
            },
            error: function(jqXHR, status, error) {
                failureCallback(JSON.parse(jqXHR.responseText), jqXHR.status);
            }
        });
    };

    /**
     *
     * @param path absolute path on the nodejs server
     * @param queryArgs an object to be converted to query params
     * @param successCallback success callback with a single param of data
     * @param failureCallback failure callback with params (error, status)
     */
    var get = function(path, queryArgs, successCallback, failureCallback) {
        return $.ajax({
            url: path,
            dataType: 'json',
            type: 'GET',
            data: queryArgs,
            success: function(data, status, jqXHR) {
                successCallback(data);
            },
            error: function(jqXHR, status, error) {
                failureCallback(error, status);
            }
        });
    };

    return {
        post: post,
        get: get
    };
});