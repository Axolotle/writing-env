
var button = document.getElementById('gen');
button.addEventListener("click", generateFont);


function generateFont() {
    var font = [
        "    ╷ ││    ╭┼╴○ ╷╭╮  ╷  ╭╯╰╮ ┬┴┬              ╷╭─╮╶╮ ╶─╮╶─╮╷  ┌─╴╭─╴╶─┐╭─╮╭─╮               ╶─╮╭─╮╭─┐┌─╮╭─╴┌─╮┌─╴┌─╴╭─╮╷ ╷╶┬╴  ╷╷ ╭╷  ╭╮╮╭╮╷╭─╮┌─╮╭─╮┌─╮╭─╴╶┬╴╷ ╷╷ ╷╷╷╷╷ ╷╷ ╷╶─╮ ┌╴╷  ╶┐        │    ╷       ╷    ╭╴   ╷   ╷  ╷ ╷  ╶┐                       ╷                    ╭╯ │ ╰╮",
        "    ╵ ╰╰    ╰┼╮╭─╯├┬╭    │  │    ╶┼╴   ╶─╴   ╭─╯│ │ │ ╭─╯╶─┤└┼╴└─╮├─╮ ╶┤├─┤╰─┤ ·  ·    ╶─╴   ╶─╯│╭┤├─┤│╶┤│  │ │├─╴├─╴│╶╮├─┤ │   │├┴╮│  │││││││ │├─╯│ │├┬╯╰─╮ │ │ ││╭╯│││╭─╯╰─┤ ─  │ ╰─╮ │          ╶─╮├─╮╭─╴╭─┤╭─╮╶├╴╭─┐├─╮╶┐ ╶┐ ├┴╮ │ ╭╮╮╭╮╷╭─╮╭─┐┌─╮╷╭╴╭─╴╶├╴╷ ╷╷ ╷╷╷╷╮╷╭╷ ╷╶─╮╶┤  │  ├╴ ◠◡",
        "    ╵       ╶┼╯╵ ○╰┴╯    ╰╮╭╯        ╯     · ╵  ╰─╯╶┴╴╰─╴╶─╯ ╵ ╶─╯╰─╯  ╵╰─╯╶─╯ ·  ╯    ╶─╴   ╵  ╰╰╯╵ ╵╰─╯╰─╴└─╯╰─╴╵  ╰─╯╵ ╵╶┴╴╰─╯╵ ╵╰─╴╵╵╵╵╰╯╰─╯╵  ╰┬╯╵ ╰╶─╯ ╵ ╰─╯╰╯ ╰╯╯╵ ╵╶─╯╰─╴ └╴  ╵╶┘    ───   ╰─╯╰─╯╰─╴╰─╯╰─╴ ╵ ╰─┤╵ ╵╶┴╴ │ ╵ ╵ ╰╴╵╵╵╵╰╯╰─╯├─╯╰─┤╵  ╶─╯ ╰╴╰─╯╰╯ ╰╯╯╯╵╰╰─┤╰─╴ ╰╮ │ ╭╯",
        "                                                                                                                                                                                                                     ╶─╯      ╶╯                ╵    ╵                     ╶─╯"
    ];

    var input = document.getElementById('input').firstChild.innerHTML;
    console.log("/"+input+"/");
    var output = ["", "", "", ""];

    for (var c = 0; c < input.length; c++) {
        var pos = (input.charCodeAt(c)-32)*3;

        for (var i = 0; i < font.length; i++) {
            output[i] += font[i][pos]+font[i][pos+1]+font[i][pos+2];
        }
    }

    display(output);
}

function display(strings) {
    var div = document.getElementById('displayer');

    for (var i = 0; i < strings.length; i++) {
        let p = document.createElement("P");
        p.innerHTML = strings[i];
        div.appendChild(p);
    }
}
