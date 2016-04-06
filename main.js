function readTextFile(file) {
    var allText;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                allText = rawFile.responseText.replace(/(?:\r\n|\r|\n)/g, '<br />');
            }
        }
    }
    rawFile.send(null);
    return allText;
}

function displayFile(fname, id) {
    extension = fname.split('.').pop();
    if (extension === "png") {
        $("#"+id).append("<a href="+fname+"><img src="+fname+" width=400></a>");
    } else if (extension === "txt") {
        $("#"+id).append("<br>"+readTextFile(fname));
    } else if (extension === "mp4") {
        $("#"+id).append("<video width='640' height='480' controls><source src="
                         +fname+" type='video/mp4'></video>");
    }
}

function queryPath(path, id) {
    if ($("#"+id).is(':empty')) {
        $.ajax({
            url: "query_path.php",
            dataType: "json",
            type: "GET",
            data: { "path" : path },
            success: function(data) {
                $.each(data, function(k, v) {
                    displayFile(v, id);
                });
                $("#"+id).append("<br>");
            }
        });
    } else {
        $("#"+id).empty();
    }
}

function sortDates(date_arr) {
    return date_arr.sort(function(a, b){
        return new Date(b) - new Date(a);
    });
}

function dateFromPath(path) {
    var tmp = path.split("/");
    return tmp[tmp.length - 1];
}

function pathCompare(a,b) {
    return new Date(dateFromPath(b)) - new Date(dateFromPath(a));
}

$(document).ready(function(){
    $.ajax({
        type: 'GET',
        url: 'get_dates.php',
        success: function(data) {
            var data_arr = Object.keys(JSON.parse(data)).sort(pathCompare);
            $.each(data_arr, function(indx, path) {
                var elem_id = path.replace(/\//g,'_');
                var name = path.split("/").reverse();
                $("#dates").append(
                    "<li><a onclick='queryPath(\""+path+"\",\""+elem_id+"\");'>"
                        + dateFromPath(path) + "</a>" +
                        " <div class='Experiments'>"+name[1]+"</div>" +
                        " <div class='Projects'>"+name[2]+"</div>" +
                        "<div id="+elem_id+"></div></li>");
            });
        }
    });
});
