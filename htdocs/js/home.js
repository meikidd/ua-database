$('#submit-btn').click(function(e) {
  var browser = $('#browser-slt').val();
  var version = $('#version-ipt').val();
  var os = $('#os-slt').val();
  var device = $('#device-slt').val();

  if(browser && version && os && device) {
    $('#loading').show();
    $('#submit-btn').hide();

    $.ajax({
      url: '/record',
      data: {
        browser: browser,
        version: version,
        os: os,
        device: device
      },
      success: function(data) {
        $('#loading').hide();
        $('#alert-success').removeClass('hide');
      }
    })
  }
});