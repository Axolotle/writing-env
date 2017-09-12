
function readTxtFile(file, callbackFormat, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.overrideMimeType("text/plain");
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callbackFormat(rawFile.responseText, callback);
        }
    }
    rawFile.send(null);
}

var box = new Box();

readTxtFile("test.txt",
    function(data, callback) {
        if (data.indexOf("<--") > -1) {
            data = data.substring(data.indexOf("<--")+5);
        }
        if (data.indexOf("-->") > -1) {
            data = data.substring(0, data.indexOf("-->")-2);
        }
        if (data[data.length-1] == " " || data[data.length-1] == "\n") {
            data = data.substring(0, data.length-1);
        }


        data = data.split('\n\n');

        var txt = [];
        var sumTimer = 0;

        data.forEach(function(sub) {


            sub = sub.split("\n");

            var opt = sub.shift().split(" ");

            // formatting timer
            var timer = [];
            sumTimer += parseFloat(opt[0]) *1000;
            timer.push(sumTimer);
            sumTimer += parseFloat(opt[1]) *1000
            timer.push(sumTimer);

            var color, pos;
            if (opt.length == 4) {
                color = opt[2];
                pos = opt[3].split("/").map(function(n) {return parseInt(n)});
            }
            else if (opt.length == 3) {
                if (isNaN(parseInt(opt[2][0]))) {
                    color = opt[2];
                    pos = [50,100];
                }
                else {
                    color = "face";
                    pos = opt[2].split("/").map(function(n) {return parseInt(n)});
                }
            }
            else {
                color = "face";
                pos = [50,100];
            }

            txt.push([timer, sub, color, pos]);
        });

        callback(txt);
    },
    function(txt) {
        var opt = {
            "longestWord": 14,
            "divName": "text",
            "idealX": 99,
            "idealY": 32,
            "marginX": 2,
            "marginY": 2
        };

        var txts = [
            {
                "txt": [
                    " /                            ",
                    "┌─╴┌─╮╶┬╴╭─╴╭─╮┌─╮┌─╴   ╶─╮╭─┐",
                    "├─╴├─╯ │ ╰─╮│ ││ │├─╴    ─┤├─┤",
                    "╰─╴╵  ╶┴╴╶─╯╰─╯└─╯╰─╴   ╶─╯╵ ╵",
                    "~ 0 min 0 sec",
                    "",
                    "pas d'interaction",
                    "",
                    "",
                    "<a id='start' class='ep'>Lancer l'épisode</a>"
                ],
                "charToAdd": " "
            },

            {
                "txt": [],
                "format": "subtitle"
            }
        ];

        txts[1].txt = txt

        box.init(opt);
        var infoEp = new ModifyJSON(txts.shift(), txts, box);
        infoEp = new Animation(infoEp, box);

        txts[0] = new ModifyJSON(txts[0], txts, box);
        var txtAnim = [new Animation(txts[0], box)]

        Step(
            function init() {
                box.displayBox(this);
                //box.reDraw(this);
            },
            function menu() {
                infoEp.appendText();
                startEp(this);
            },
            function flow0() {
                txtAnim[0].startSubtitles(this);
            }
        );
    }
);

function startEp(callback) {
    var link = document.getElementById("start");
    link.addEventListener("click", function() {
        box.cleanBox();
        callback();
    })
}
