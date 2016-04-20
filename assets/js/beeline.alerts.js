/**
 * Created by swillison on 4/20/2016.
 */


function notificationHtmlBlock(dataId) {
  var alertSystemHtml = '';

  alertSystemHtml += ' <div data-id="' + dataId + '" class="StatusBox">';
  alertSystemHtml += '    <table class="theme-notification notification-bold notification-danger" style="display: none;">';
  alertSystemHtml += '       <tbody>';
  alertSystemHtml += '          <tr>';
  alertSystemHtml += '             <td class="message-column"></td>';
  alertSystemHtml += '          </tr>';
  alertSystemHtml += '       </tbody>';
  alertSystemHtml += '    </table>';
  alertSystemHtml += '    <table class="theme-notification notification-bold notification-danger validation-errors " style="display: none;">';
  alertSystemHtml += '       <tbody>';
  alertSystemHtml += '          <tr>';
  alertSystemHtml += '             <td class="message-column">';
  alertSystemHtml += '                <span>Please fix the following errors and try again:</span>';
  alertSystemHtml += '                <div data-id="errors-list" class="statusBoxValidationSummary" style="color:Red;display:none;">';
  alertSystemHtml += '                </div>';
  alertSystemHtml += '             </td>';
  alertSystemHtml += '          </tr>';
  alertSystemHtml += '       </tbody>';
  alertSystemHtml += '    </table>';
  alertSystemHtml += '    <table class="theme-notification notification-bold notification-warning" style="display: none;">';
  alertSystemHtml += '       <tbody>';
  alertSystemHtml += '          <tr>';
  alertSystemHtml += '             <td class="message-column"></td>';
  alertSystemHtml += '          </tr>';
  alertSystemHtml += '       </tbody>';
  alertSystemHtml += '    </table>';
  alertSystemHtml += '    <table class="theme-notification notification-bold notification-success" style="display: none;">';
  alertSystemHtml += '       <tbody>';
  alertSystemHtml += '          <tr>';
  alertSystemHtml += '             <td class="message-column"></td>';
  alertSystemHtml += '          </tr>';
  alertSystemHtml += '       </tbody>';
  alertSystemHtml += '    </table>';
  alertSystemHtml += '    <table class="theme-notification notification-bold notification-info" style="display: none;">';
  alertSystemHtml += '       <tbody>';
  alertSystemHtml += '          <tr>';
  alertSystemHtml += '             <td class="message-column"></td>';
  alertSystemHtml += '          </tr>';
  alertSystemHtml += '       </tbody>';
  alertSystemHtml += '    </table>';
  alertSystemHtml += ' </div>';

  return alertSystemHtml;
}

function Alerts(target) {
  this.$targetElem = $('#' + target);
  this.alertRootElemDataId = target + '-message-container';
  this.$alertRootElem = {};

  this.init = function () {
    this.$targetElem.prepend(notificationHtmlBlock(this.alertRootElemDataId))
    this.$alertRootElem = $('[data-id=' + this.alertRootElemDataId + ']');
  }

  this.showAll = function () {
    this.$alertRootElem.find('.theme-notification').show();
  }

  this.hideAll = function () {
    this.$alertRootElem.find('.theme-notification').hide();
  }
}

var messageTypes = {
  success: 0,
  warning: 1,
  error: 2
}

var messageSystem = function () {
  function initMessageSystem() {
    toastr.options = {
      "closeButton": false,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-top-full-width",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
  }

  function displayAlert(message, title, messageType, persist) {
    switch (messageType || -1) {
      case messageTypes.success:
        toastr.success(message, title, {timeOut: persist === true ? null : 5000});
        break;
      case messageTypes.warning:
        toastr.warning(message, title, {timeOut: persist === true ? null : 5000});
        break;
      case messageTypes.error:
        toastr.error(message, title, {timeOut: persist === true ? null : 5000});
        break;
      default:
        toastr.warning(message, title, {timeOut: persist === true ? null : 5000});
    }
  }

  return {
    init: function () {
      initMessageSystem();
    },
    showAlert: function (message, title, messageType, persist) {
      displayAlert(message, title, messageType, persist);
    },
    clear: function () {
      toastr.clear();
    },
    remove: function () {
      toastr.remove();
    }
  }
}();

$(function () {
  messageSystem.init();
});

