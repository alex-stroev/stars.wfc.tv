require('../plugins/jquery_mask_plugin/jquery.mask.js');
let form = document.getElementById('form')
$(document).ready(function () {
    ////////////////////////////////////////////////////////////////
    // 
    ////////////////////////////////////////////////////////////////
    // 
    var iFile = $("input[type=file]");
    // alert(iFile.length)

    iFile.on('change', function (event) {
        // event.preventDefault();
        var $this = $(this),
            thisDescriptionField = $this.siblings("span"),
            defaultDescription = $this.parent("label").attr("data-default");
        thisVal = $this.val();
        // thisVal = thisVal.substring(thisVal.lastIndexOf("\\") + 1, thisVal.length);

        // alert(thisVal)


        if (thisVal !== "") {
            thisDescriptionField.text(thisVal);
        } else {
            thisDescriptionField.text(defaultDescription);
        }
    });

    $("input[name='phone']").mask('+0 (000) 000-0000');
    ////////////////////////////////////////////////////////////////
    //   Трюк с ДР
    ////////////////////////////////////////////////////////////////

    var bday = $("input[name='birthday']");
    bday.on('focus', function (event) {
        var $this = $(this);
        $this.get(0).type = 'date';
    });
    bday.on('blur', function (event) {
        var $this = $(this);
        if ($this.val() === "") {
            $this.get(0).type = 'text';
        }

    });

    ////////////////////////////////////////////////////////////////
    //  Select
    ////////////////////////////////////////////////////////////////

    $('select').select2({
        // minimumInputLength: 3 // only start searching when the user has input 3 or more characters
    });

    ////////////////////////////////////////////////////////////////
    //  Hint
    ////////////////////////////////////////////////////////////////

    var jsHintTrig = $(".jsHintTrig");

    jsHintTrig.on('mouseenter', function (event) {
        var $this = $(this);
        $this.siblings(".jsHint").show()
    });
    jsHintTrig.on('mouseleave', function (event) {
        var $this = $(this);
        $this.siblings(".jsHint").hide()
    });

    // end ready
});


/////////////////////////////////////////////////////