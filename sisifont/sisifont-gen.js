var editable = document.getElementById("input");
editable.oninput = generateFont;
editable.onclick = function() {
    if (editable.innerHTML == "<p>Entrez un texte</p>") {
        if (document.selection) {
            var range = document.body.createTextRange();
            range.moveToElementText(editable.childNodes[0].childNodes[0]);
            range.select();
        } else if (window.getSelection) {
            var range = document.createRange();
            range.selectNode(editable.childNodes[0].childNodes[0]);
            window.getSelection().addRange(range);
        }
    }
};

document.getElementsByClassName("options")[3].onclick = function() {
    editable.innerHTML = getPureText(editable.innerText).join("<br>");
}
document.getElementsByClassName("options")[2].onclick = function() {
    changeFontSize(document.getElementsByClassName("options")[2].valueAsNumber);
}
document.getElementsByClassName("options")[1].oninput = generateFont;
document.getElementsByClassName("options")[0].onclick = generateFont;

function textToFont(txts, maxWidth) {

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
            if (maxWidth != NaN && c!=0 && c % maxWidth == 0) {
                sentences.push(sentence);
                sentence = ["","","","",""];
            }
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
    var re = new RegExp(String.fromCharCode(10).repeat(5),"g");
    var re2 = new RegExp(String.fromCharCode(10).repeat(2),"g");
    var re3 = new RegExp(String.fromCharCode(10),"g");

    nodes = nodes.replace(re, "\b\b").replace(re2, "\b").replace(re3, "\b");
    sentences = nodes.split("\b");

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
    var optObj = document.getElementsByClassName("options");
    var options = {
        "overlap" : optObj[0].checked,
        "maxWidth": parseInt(optObj[1].value),
        "fontSize": optObj[2].valueAsNumber
    };

    var input = textToFont(pureText, options.maxWidth);
    changeFontSize(options.fontSize);
    if (options.overlap) {
        input = overlap(input);
    }

    var div = document.getElementById('displayer');
    while (div.hasChildNodes()) {
        div.removeChild(div.childNodes[0]);
    }

    input.forEach(function(sentence) {
        sentence.forEach(function(line) {
            let p = document.createElement("P");
            p.innerHTML = line;
            div.appendChild(p);
        });
    });

}

function changeFontSize(size) {
    var displayer = document.getElementById("displayer")
    if (displayer.style.fontSize != size + "px") {
        displayer.style.fontSize = size + "px"
    }
}
