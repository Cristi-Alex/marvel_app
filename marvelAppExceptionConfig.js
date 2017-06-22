/**
 * Created by Cris on 22.06.2017.
 */
(function () {
    'use strict';


    angular
        .module("ngMarvel")
        .config(exceptionConfig);

    /**
     * Catch all errors, log them and forward to error page
     */

    exceptionConfig.$inject = ['$provide'];
    function exceptionConfig($provide) {
        $provide.decorator('$exceptionHandler', extendExceptionHandler);
    }

    extendExceptionHandler.$inject = ['$log'];
    function extendExceptionHandler($log) {
        //prevent recursive errors
        var fatalHasOccurred = false;

        function handleException(exception, cause) {
            if (!fatalHasOccurred) {
                fatalHasOccurred = true;

                $log.error(exception);

                var errorDetails = "";
                if (exception instanceof Error) {
                    var stack = exception.stack;
                    errorDetails = "Unexpected error:\n" + stack + "\nCaused by " + cause;
                }
                else {
                    errorDetails = "Unexpected error:" + exception + ", caused by " + cause;
                }

                //show the error on UI
                showError(errorDetails);
            }
        }

        return handleException;
    }


    function showError(err) {
        //clear document html
        document.body.innerHTML = "";
        //show the error on UI
        var errorDetailsEl = document.createElement("pre");
        errorDetailsEl.className = "errorDetails";
        errorDetailsEl.innerHTML = err;
        document.body.insertBefore(errorDetailsEl, document.body.firstChild);
    }

}());