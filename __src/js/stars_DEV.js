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

    ////////////////////////////////////////////////////////////////
    //  Передаем параметры из URL в скрытые поля формы
    ////////////////////////////////////////////////////////////////

    var queryStr = window.location.search,
        queryArr = queryStr.replace('?', '').split('&'),
        queryParams = [];

    for (var i = 0, qArrLength = queryArr.length; i < qArrLength; i++) {
        var qArr = queryArr[i].split('='),
            qName = [qArr[0]],
            qValue = [qArr[1]];


        $('<input>').attr({
            type: 'hidden',
            name: 'others[' + qName + ']',
            value: qValue
        }).appendTo($("#wfc_form"));

        // console.log(qName + " - " +qValue)
    }


    ////////////////////////////////////////////////////////////////
    //  Загрузка файлов
    ////////////////////////////////////////////////////////////////
    var iFile = $("input[type=file]"),
        jsFilelimit = $(".jsFilelimit"),
        iFilePlaceholder = iFile.siblings("span"),
        BODY = $("body"),
        maxFileQuan = 5,
        maxTotalFileSizes = 11010048, //10.5 мБ, про запас
        defaultFilesLimitText = "Не более 5 фотографий, общим объемом не более 10 мб";

    var specOverlay = $('<div>').css({
        "position": "fixed",
        "top": "0",
        "left": "0",
        "width": "100%",
        "height": "100%",
        "background": "rgba(0, 0, 0, 0.8)",
        "color": "#fff",
        "font-size": "24px",
        "display": "-webkit-box",
        "display": "-ms-flexbox",
        "display": "flex",
        "-webkit-box-align": "center",
        "-ms-flex-align": "center",
        "align-items": "center",
        "text-align": "center",
        "-webkit-box-pack": "center",
        "-ms-flex-pack": "center",
        "justify-content": "center",
        "padding": "20%",
        "box-sizing": "border-box",
        "cursor": "pointer",
        "z-index": "9999"
    });


    iFile.change(function (event) {
        var filesQuan = this.files.length;
        var totalFileSizes = 0;
        console.log("Кол-во файлов:" + filesQuan);
        for (i = 0; i < filesQuan; i++) {
            totalFileSizes = totalFileSizes + this.files[i].size;
            console.log("Вес файла " + i + ": " + totalFileSizes);
        }
        // console.log("Вес файлов:" + totalFileSizes);

        if (!filesQuan) {
            jsFilelimit.html(defaultFilesLimitText);
        } else if (filesQuan > maxFileQuan) {
            iFile.val();
            iFilePlaceholder.text("Фото*");
            jsFilelimit.html(defaultFilesLimitText);
            specOverlay.appendTo(BODY).html("Не более 5 файлов! Вы загрузили " + filesQuan + ".<br> Попробуйте еще раз))").click(function (event) {
                $(this).remove();
            });
        } else if (totalFileSizes > maxTotalFileSizes) {
            // jsFilelimit.html("Выбрано " + filesQuan + " фото, выберите не более" + maxFileQuan);
            iFile.val();
            iFilePlaceholder.text("Фото*");
            jsFilelimit.html(defaultFilesLimitText);
            specOverlay.appendTo(BODY).html("Суммарный объем фото&nbsp;&mdash; не&nbsp;более 10&nbsp;мб! Вы загрузили " + parseFloat(totalFileSizes / 1024 / 1024).toFixed(2) + " мБ. <br> Попробуйте еще раз))").click(function (event) {
                $(this).remove();
            });
        } else {
            jsFilelimit.html("Выбрано " + filesQuan + " фото общим объемом " + parseFloat(totalFileSizes / 1024 / 1024).toFixed(2) + " мб");
        }
    });

    /////////////////////////////////////////////////////
    // end ready
});


/////////////////////////////////////////////////////