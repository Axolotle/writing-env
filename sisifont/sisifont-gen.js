window.onload = generateFontSpecimen;

var editable = document.getElementById("input");
editable.oninput = generateFont;
editable.onclick = function() {
    if (editable.innerHTML == "Write something here.") {
        editable.innerHTML = "";
    }
};

var opt = document.getElementsByClassName("options");

var timeout, slider = opt[1];
slider.onmousedown = function() {
    timeout = setInterval(function() {
        changeFontSize(slider.valueAsNumber);
    }, 100);
}
document.onmouseup = function() {
    clearInterval(timeout);
}

opt[0].oninput = opt[2].onclick = opt[3].onclick = generateFont;
document.getElementById("specimen").onclick = generateFontSpecimen;

var selector = document.getElementById("selection");
selector.onclick = function() {
    if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById("displayer"));
        range.select();
    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(document.getElementById("displayer"));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    }
}

function textToFont(txts) {

    var font = [
        "                                                                                                                                                                                                                                                                                                                                                                                                                           ╭─╮            ╭─╮╶─╴ ○    ╶╮ ╶╮                 ╮ ╭╮                 \\  /  ^  ~ · · ○        \\  /  ^ · · \\  /  ^ · ·    ~  \\  /  ^  ~ · ·       \\  /  ^ · · /                                                                                                       ",
        "    ╷  ││ ┼┼╭┼╴ ○ ╭╮  │  ╭╯╰╮ ┬┴┬              /╭─╮╶╮ ╶─╮╶─╮╷  ┌─╴╭─╴╶─┐╭─╮╭─╮               ╶─╮╭─╮╭─┐┌─╮╭─╴┌─╮┌─╴┌─╴╭─╮╷ ╷╶┬╴  ╷╷ ╭╷  ╭╮╮╭╮╷╭─╮┌─╮╭─╮┌─╮╭─╴╶┬╴╷ ╷╷ ╷╷╷╷╷ ╷╷ ╷╶─╮ ┌╴\\  ╶┐  ^     \\    ╷       ╷    ╭╴   ╷   ╷  ╷ ╷  ╶┐                       ╷                    ╭╯ │ ╰╮                                                                                                                 ╭╮ ╷ ╷ ╷ ╷ ╭─╮· ·│╭│╶╮          │╭│         ╭╯  ┤  ╯    ╭┬┬       │ ││    ┌┬┐┌─┐┌─┐   ╭─┐╭─┐╭─┐╭─┐╭─┐╭─┐╭┬╴╭─╴┌─╴┌─╴┌─╴┌─╴╶┬╴╶┬╴╶┬╴╶┬╴┌─╮╭╮╷╭─╮╭─╮╭─╮╭─╮╭─╮   ╭─/╷ ╷╷ ╷╷ ╷╷ ╷╷ ╷├─╮┌─╮ \\  /  ^  ~ · · ○        \\  /  ^ · · \\  /  ^ · · ╶┤ ~  \\  /  ^  ~ · · ·     \\  /  ^ · · /    · ·",
        "    ╵    ┌┼┘╰┼╮╭─╯├┬╭    │  │    ╶┼╴   ╶─╴    / │ │ │ ╭─╯╶─┤└┼╴└─╮├─╮ ╶┤├─┤╰─┤ ·  ·  / ╶─╴ \\ ╶─╯│╭┤├─┤│╶┤│  │ │├─╴├─╴│╶╮├─┤ │   │├┴╮│  │││││││ │├─╯│ │├┬╯╰─╮ │ │ ││╭╯│││╭─╯╰─┤ ─  │  \\  │          ╶─╮├─╮╭─╴╭─┤╭─╮╶├╴╭─┐├─╮╶┐ ╶┐ ├┴╮ │ ╭╮╮╭╮╷╭─╮╭─┐┌─╮╷╭╴╭─╴╶├╴╷ ╷╷ ╷╷╷╷╮╷╭╷ ╷╶─╮╶┤  │  ├╴ ◠◡                                                                                                       ╵ ╭┼╴ ┼╴╶○╴┴┬┴ ╵ ├─╮   │╰│╰╯  //──┐╶─╴│╵│      ╶┼╴╰╴ ╶╯    ╷ ╷╰┤│ ·     ┴ ╰╯ \\\\ ├┘┤├─┤│┌┤  ╵├─┤├─┤├─┤├─┤├─┤├─┤├┼╴│  ├─╴├─╴├─╴├─╴ │  │  │  │ ┼╴│││││ ││ ││ ││ ││ │\\ /│/││ ││ ││ ││ │╰─┤│ ││╶┤╶─╮╶─╮╶─╮╶─╮╶─╮╶─╮╶┬╮╭─╴╭─╮╭─╮╭─╮╭─╮╶┐ ╶┐ ╶┐ ╶┐ ╭─┤╭╮╷╭─╮╭─╮╭─╮╭─╮╭─╮╶─╴╭─/╷ ╷╷ ╷╷ ╷╷ ╷╷ ╷├─╮╷ ╷",
        "    ╵    ┼┼ ╶┼╯ ○ ╰┴╯    ╰╮╭╯        ╯     · /  ╰─╯╶┴╴╰─╴╶─╯ ╵ ╶─╯╰─╯  ╵╰─╯╶─╯ ·  ╯  \\ ╶─╴ / ╵  ╰╰╯╵ ╵└─╯╰─╴└─╯╰─╴╵  ╰─╯╵ ╵╶┴╴╰─╯╵ ╵╰─╴╵╵╵╵╰╯╰─╯╵  ╰┬╯╵ ╰╶─╯ ╵ ╰─╯╰╯ ╰╯╯╵ ╵╶─╯╰─╴ └╴  \\╶┘    ───   ╰─╯╰─╯╰─╴╰─╯╰─╴ ╵ ╰─┤╵ ╵╶┴╴ │ ╵ ╵ ╰╴╵╵╵╵╰╯╰─╯├─╯╰─┤╵  ╶─╯ ╰╴╰─╯╰╯ ╰╯╯╯╵╰╰─┤╰─╴ ╰╮ │ ╭╯                                                                                                           │ ╰┼╴╶╯─ ╵ ─┼─ ╷ ╰─┤   ╰─╯    \\\\      ╰─╯      ╶─╴         ├─┤ ││    ╯       // └┴┘└┴┘└┴┘╭─╴╵ ╵╵ ╵╵ ╵╵ ╵╵ ╵╵ ╵╵╰╴╰┬╴╰─╴╰─╴╰─╴╰─╴╶┴╴╶┴╴╶┴╴╶┴╴└─╯╵╰╯╰─╯╰─╯╰─╯╰─╯╰─╯/ \\/─╯╰─╯╰─╯╰─╯╰─╯╶─╯├─╯╵╰╯╰─╯╰─╯╰─╯╰─╯╰─╯╰─╯╰┴╴╰┬╴╰─╴╰─╴╰─╴╰─╴╶┴╴╶┴╴╶┴╴╶┴╴╰─╯╵╰╯╰─╯╰─╯╰─╯╰─╯╰─╯ · /─╯╰─╯╰─╯╰─╯╰─╯╰─┤├─╯╰─┤",
        "                                                                                                                                                                                                                     ╶─╯      ╶╯                ╵    ╵                     ╶─╯                                                                                                                      ╵              ╵ ╰─╯                                       ╵                             ╰─╴                      ╯                                                                                               ╯                                                                ╶─╯   ╶─╯"
    ];

    var sentences = [];
    txts.forEach(function(txt) {
        var sentence = ["","","","",""];

        if (txt == "") sentence = [" ", " "];

        for (var c = 0; c < txt.length; c++) {
            var pos = (txt.charCodeAt(c)-32)*3;

            for (var i = 0; i < font.length; i++) {
                sentence[i] += font[i][pos]+font[i][pos+1]+font[i][pos+2];
            }
        }
        sentences.push(sentence);
    });

    return sentences;
}

function getPureText(nodes) {
    nodes = nodes.replace(/’/g, "'").replace(/Œ/g, "OE").replace(/œ/g, "oe");
    sentences = nodes.split(String.fromCharCode(10));

    return sentences;
}

function overlap(txts) {
    txts.forEach(function(line, index, array) {
        if (index > 0 && line.length > 2) {
            var l2 = line[0];
            var l1 = array[index-1][array[index-1].length-1];
            var newLine = "";

            for (var i = 0; i < l2.length; i++) {
                if (l2[i] != " ") {
                    newLine += l2[i];
                }
                else if (l1[i] != undefined) {
                    newLine += l1[i];
                }
                else {
                    newLine += " ";
                }
            }

            if (l1.length > newLine.length) {
                array[index-1][array[index-1].length-1] = newLine + l1.substr(newLine.length);
            }
            else {
                array[index-1][array[index-1].length-1] = newLine;
            }
            array[index].shift();

        }
    });

    return txts;
}

function generateFont() {

    var pureText = getPureText(editable.innerText);

    if (editable.hasChildNodes()) {
        let clean = false;
        for (var i = 0; i < editable.children.length; i++) {
            if (editable.children[i].nodeName != "BR") {
                clean = true;
                break;
            }
        }
        if (clean) {
            editable.innerHTML = pureText.join("<br>");
        }
    }

    var options = {
        "overlap" : opt[2].checked,
        "maxWidth": parseInt(opt[0].value),
        "fontSize": opt[1].valueAsNumber,
        "upperCase" : opt[3].checked
    };


    if (options.maxWidth != NaN) {
        pureText = reduceText(pureText, options.maxWidth);
    }
    if (options.upperCase) {
        pureText = pureText.map(function(x) { return x.toUpperCase(); });
    }
    changeFontSize(options.fontSize);

    var input = textToFont(pureText);

    if (options.overlap) {
        input = overlap(input);
    }

    var div = document.getElementById('displayer');
    while (div.hasChildNodes()) {
        div.removeChild(div.childNodes[0]);
    }

    var output = "";
    input.forEach(function(sentence) {
        output += sentence.join("<br>") + "<br>";
    });
    div.innerHTML = output;

}

function generateFontSpecimen() {
    var input = [
        "Ô mage aztèque, l'écuyer vêtu d'un kit hawaïen et de bijoux reçut au coeur l'âcre piqûre, de l'île où arrive son frêle canoë.",
        "",
        "Ô MAGE AZTÈQUE, L'ÉCUYER VÊTU D'UN KIT HAWAÏEN ET DE BIJOUX REÇUT AU COEUR L'ÂCRE PIQÛRE, DE L'ÎLE OÙ ARRIVE SON FRÊLE CANOË.",
        "",
        "",
        "! \" # $ % & ' ( ) * + , - . / 0 1 2 3 4 5 6 7 8 9 : ; < = > ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ \\ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z { | } ~",
        "",
        "",
        "¡ ¢ £ ¤ ¥ ¦ § ¨ © ª « ¬   ® ¯ ° ± ² ³ ´ µ ¶ · ¸ ¹ º » ¼ ½ ¾ ¿ À Á Â Ã Ä Å Æ Ç È É Ê Ë Ì Í Î Ï Ð Ñ Ò Ó Ô Õ Ö × Ø Ù Ú Û Ü Ý Þ ß à á â ã ä å æ ç è é ê ë ì í î ï ð ñ ò ó ô õ ö ÷ ø ù ú û ü ý þ ÿ"
    ];

    input = textToFont(reduceText(input, 40));

    var div = document.getElementById('displayer');
    while (div.hasChildNodes()) {
        div.removeChild(div.childNodes[0]);
    }

    var output = "";
    input.forEach(function(sentence) {
        output += sentence.join("<br>") + "<br>";
    });
    output += "<br><br><br>characters used :<br><br>─ │ ┌ ┐ └ ┘ ├ ┤ ┬ ┴ ┼ ╭ ╮ ╯ ╰ ╴ ╵ ╶ ╷ ~ ^ ○ · / \\<br><br><br><br><br>Sísifont is a box-drawing characters font originally created for <a href='https://sisifo.site/' target='_blanck'>Sísifo</a>.<br><br>Feel free to use it.<br>Nicolas Chesnais - <a href='https://autre.space/' target='_blanck'>autre.space</a>";
    div.innerHTML = output;

}

function reduceText(txts, size) {
    var newTxts = [];

    txts.forEach(function(line) {
        if (line.length > size) {
            var newLine = [];
            var length = 0;
            var splittedLine = line.split(" ");

            var dontEscape = ["?", "!", ":", ";"];

            splittedLine.forEach(function(word) {
                var width = length == 0 ? length + word.length : length + 1 + word.length;

                if (width <= size) {
                    newLine.push(word);
                    length += length == 0 ? word.length : 1 + word.length;
                }
                else if (dontEscape.indexOf(word) > -1) {
                    var lastword = sentence.pop();
                    newTxts.push(newLine.join(" "));

                    newLine = [lastword, word];
                    length = lastword.length + 1 + word.length;
                }
                else {
                    newTxts.push(newLine.join(" "));
                    newLine = [word];
                    length = word.length;
                }

            });
            newTxts.push(newLine.join(" "))
        }
        else {
            newTxts.push(line);
        }
    });

    return newTxts;
}

function changeFontSize(size) {
    var displayer = document.getElementById("displayer")
    if (displayer.style.fontSize != size + "px") {
        displayer.style.fontSize = size + "px"
    }
}
