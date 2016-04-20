/**
 * Created by swillison on 4/20/2016.
 */
window.beeline = window.beeline || {};
window.console = window.console || {
    console: function () {
    }
  };

window.beeline.messageTemplateHtmlBlock = function (message) {
  var messageTemplate = '';
  messageTemplate += '<li data-index="0" class="statusBoxValidationSummary" style="color:red;">';
  messageTemplate += message;
  messageTemplate += '</li>';

  return messageTemplate;
}

window.beeline.notificationHtmlBlock = function (dataId) {
  var alertSystemHtml = '';

  alertSystemHtml += ' <div data-id="' + dataId + '" class="StatusBox">';
  alertSystemHtml += '    <table class="theme-notification notification-bold notification-danger validation-errors" style="display: none;">';
  alertSystemHtml += '       <tbody>';
  alertSystemHtml += '          <tr>';
  alertSystemHtml += '             <td class="message-column">';
  alertSystemHtml += '                <span>Please fix the following errors and try again:</span>';
  alertSystemHtml += '                <ul data-id="errors-list">';
  alertSystemHtml += '                </ul>';
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

/*Usage:
 *   var x = new window.beeline.Alerts('DomElemIdToBeNestedUnder');
 *   x.init();
 */
window.beeline.Alerts = function (target) {
  this.$targetElem = $('#' + target);
  this.alertRootElemDataId = target + '-message-container';
  this.$alertRootElem = {};

  this.$errorRootHandle = {};
  this.$successRootHandle = {};
  this.$infoRootHandle = {};

  this.callbackAide = function (callback) {
    if (typeof(callback) == "function") {
      callback();
    }
  };

  this.init = function () {
    this.$targetElem.prepend(beeline.notificationHtmlBlock(this.alertRootElemDataId))
    this.$alertRootElem = $('[data-id=' + this.alertRootElemDataId + ']');
    this.$errorRootHandle = this.$alertRootElem.find(".validation-errors");
    this.$successRootHandle = this.$alertRootElem.find(".notification-success");
  };

  this.addError = function (message, callback) {

    this.$errorRootHandle.find('[data-id=errors-list]')
      .append(beeline.messageTemplateHtmlBlock(message));

    this.$errorRootHandle.show();

    this.callbackAide(callback);
  };

  this.success = function (message, callback) {
    this.$successRootHandle.find(".message-column").empty().append(message);
    this.$successRootHandle.show();

    this.callbackAide(callback);
  };

  this.showAll = function () {
    this.$alertRootElem.find('.theme-notification').show();
  };

  this.hideAll = function () {
    this.$errorRootHandle.find('[data-id=errors-list]').empty();
    this.$successRootHandle.find(".message-column").empty();
    this.$alertRootElem.find('.theme-notification').hide();
  };

  this.init();
}

window.beeline.messageTypes = {
  success: 1,
  warning: 2,
  error: 3
}

/*Usage:
 *   beeline.messageSystem.init();
 *   beeline.messageSystem.showAlert(beeline.messageSystem.showAlert("Message", "Title", beeline.messageTypes.warning, true);
 */
window.beeline.messageSystem = function () {
  function initMessageSystem() {
    toastr.options = {
      "closeButton": true,
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

  function displayAlert(message, title, messageType, persist, callback) {
    switch (messageType || -1) {
      case beeline.messageTypes.success:
        toastr.success(message, title, {timeOut: persist === true ? null : 5000});
        break;
      case beeline.messageTypes.warning:
        toastr.warning(message, title, {timeOut: persist === true ? null : 5000});
        break;
      case beeline.messageTypes.error:
        toastr.error(message, title, {timeOut: persist === true ? null : 5000});
        break;
      default:
        console.log("Unknown message type" + messageType);
        break;
    }
  }

  return {
    init: function () {
      initMessageSystem();
    },
    showAlert: function (message, title, messageType, persist, callback) {
      displayAlert(message, title, messageType, persist, callback);
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
  window.beeline.messageSystem.init();
});

