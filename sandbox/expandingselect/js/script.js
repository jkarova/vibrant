var expdrop;
var height = 0;
var width = 0;
var visibleElements = 8;

$(document).ready(
    function() {
        var liHeight;

        expdrop = document.getElementById("fruits");

        var tmp = $("#wwselected");
        var liItems = $("li", expdrop);

        var s;

        for (var i = 0; i < liItems.length-1; i++) {

            if (height < liItems[i].clientHeight)
                height = liItems[i].clientHeight;

            s = document.createElement("span");
            liItems[i].appendChild(s);

            if (width < s.offsetLeft) width = s.offsetLeft;

            liItems[i].removeChild(s);
            liItems[i].onclick = handleClick;
        }

        expdrop = $(expdrop);
        expdrop.css("width", (width+2)+"px");
        expdrop.css("height", (height+2)+"px");
        expdrop.css("overflow", "hidden");
        expdrop.css("visibility", "visible");
        expdrop.attr("data-state", "closed");
    }
);

function handleClick(e) {
    if (expdrop.attr("data-state") == "closed") {
        expdrop.css("height", ((height*visibleElements)+(visibleElements+1)+"px"));
        expdrop.attr("data-state", "open");

    } else if (expdrop.attr("data-state") == "open") {
        expdrop.css("height", (height+2)+"px");
        expdrop.attr("data-state", "closed");
    }
}

function loadjscssfile(filename){
    var filetype = filename.substr(filename.indexOf(".")+1);

    if (filetype == "js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src", "js/" + filename);
    } else if (filetype == "css"){ //if filename is an external CSS file
        var fileref=document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", "css/" + filename);
    }

    if (typeof fileref != "undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}