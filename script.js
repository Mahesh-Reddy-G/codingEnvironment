jQuery(document).ready(function() {
      jQuery('.chat-button').click(function() {
        jQuery('.comments-block').toggle();
        scrollPosition();
      });
      /* functions starts here */
      function scrollPosition() {
        var result = document.getElementById('chat-message-block').scrollHeight;
        jQuery('#chat-message-block').animate({scrollTop: result}, 2000);
      }
      function newMessage() {
        var newChatMessage = jQuery('#chat-message').val();
        if (jQuery.trim(newChatMessage) == '') {
          return false;
        }
        jQuery('<li class="replies"><p>' + newChatMessage + '<br><span id="messageTimestamp"></span></p></li>').appendTo(
          '.chat-message-block ul'
        );
        jQuery('').append('');
        jQuery('#chat-message').val(null);
        scrollPosition();
      }
      jQuery('.chat-form').submit(function(e) {
        e.preventDefault();
        newMessage();
        var d = new Date();
        var dd = d.getDate();
        var mm = d.getMonth() + 1;
        var yy = d.getFullYear();
        if (dd < 10) {
          dd = '0' + dd;
        }
        if (mm < 10) {
          mm = '0' + mm;
        }
        var today;
        today = dd + '-' + mm + '-' + yy;
        var hh = d.getHours();
        var min = d.getMinutes();
        var ampm = 'am';
        if (hh > 12) {
          hh -= 12;
          ampm = 'pm';
        }
        if (min < 10) {
          min = '0' + min;
        }
        var time = dd + '-' + mm + '-' + yy + ' ' + hh + ':' + min + ampm;
        jQuery('span#messageTimestamp').text(timezone);
        jQuery('#timeStamp').val(time);
      });

      var d = new Date();
      var dd = d.getDate();
      var mm = d.getMonth() + 1;
      var yy = d.getFullYear();
      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      var today;
      today = dd + '-' + mm + '-' + yy;
      var hh = d.getHours();
      var min = d.getMinutes();
      var ampm = 'am';
      if (hh > 12) {
        hh -= 12;
        ampm = 'pm';
      }
      if (min < 10) {
        min = '0' + min;
      }
      var timezone = dd + '-' + mm + '-' + yy + ' ' + hh + ':' + min + ampm;
      jQuery('span#messageTimestamp').text(timezone);

      var actualFileUpload = jQuery("#actualFileUpload");
      var customBtn = jQuery("#customBtn");
      var textDisplay = jQuery("#textDisplay");

      customBtn.click(function(){
       actualFileUpload.click();
      });

      actualFileUpload.change(function(){
       if(actualFileUpload.text){
            let getarrayVal = actualFileUpload.val()
            let result = getarrayVal.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
            textDisplay.textContent = result;

            jQuery('<li class="replies"><p>' + textDisplay.textContent + '<br><span id="messageTimestamp"></span></p></li>').appendTo(
              '.chat-message-block ul'
            );
            jQuery('').append('');
            jQuery('#chat-message').val(null);
            scrollPosition();
            }
      });
});
    