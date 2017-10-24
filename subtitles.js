var box = new Box();

readTxtFile("test.txt", parseSubtitles, runSubtitles);

document.getElementById("format").addEventListener("click", function() {
    readTxtFile("test.txt", parseSubtitles, displayJSON);
});

function readTxtFile(file) {
    return new Promise((resolve, reject) => {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file);
        rawFile.overrideMimeType("text/plain");
        rawFile.onload = () => {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                resolve(rawFile.responseText);
            }
        }
        rawFile.onerror = () => reject("Couldn't find '" + url +"'");
        rawFile.send(null);
    });
}

function parseSubtitles(data, callback) {
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

        // FIXME 5 a la place de 4
        if (opt.length == 5 || opt.length == 4) {
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
        //FIXME /!\ opt[4] a l'arrache
        lol = [timer, sub, color, pos];
        if (opt[4] != undefined) lol.push(opt[4])
        txt.push(lol);
    });

    //callback(txt);
    // FIXME
    displayJSON(txt);
}

function runSubtitles(txt) {
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

    box.init(boxOptions);
    const formatter = new FormatJSON(box.x, box.y, box.marginX, box.marginY);
    const infos = new Animation(formatter.getNewJSON(txts.shift()));
    const sub = new Animation(formatter.getNewJSON(txts));

    box.display(box);
    infos.appendText(box);

    await startListener();
    await sub[0].startSubtitles(box);
}

function displayJSON(txt) {
    var x = document.getElementsByTagName("BODY")[0];

    if (document.getElementById("center")) {
        x.removeChild(document.getElementById("center"));
    }


    var structure = '{<br>&Tab;"txt": [<br>';

    txt.forEach(function(t, index, array) {
        var str = "&Tab;&Tab;[";
        str += '['+t[0][0]+','+t[0][1]+'], ';
        str += '["'+t[1][0];
        if (t[1][1]) {
            str += '", "'+t[1][1]+'"], ';
        }
        else {
            str += '"], ';
        }
        str += '"'+t[2]+'", ';
        str += '['+t[3][0]+','+t[3][1]+']'
        // FIXME ajouté à l'arrache
        if (t[4] != undefined) {
            str += ', '+ t[4];
        }
        str += ']';

        if (index < array.length-1) {
            str += ',';
        }
        str += '<br>';

        structure += str
    });

    structure += '&Tab;],<br>&Tab;"format": "subtitle"<br>}<br>';
    if (!document.getElementById("code")) {
        var z = document.createElement("DIV");
        z.setAttribute("id", "code");
        x.appendChild(z);
        z.innerHTML = structure;
    }
    else {
        document.getElementById("code").innerHTML = structure;
    }


}


function startEp(callback) {
    var link = document.getElementById("start");
    link.addEventListener("click", function() {
        box.cleanBox();
        callback();
    })
}
