function getClasses(elem) {
    var tagContents = elem.substring(0, elem.indexOf('\>')).replace('\<', '').replace('\>', '');
    if (tagContents.indexOf("class") >= 0) {
        var classesString = tagContents.substring(tagContents.indexOf("\"", tagContents.indexOf("=", tagContents.indexOf("class"))) + 1, tagContents.indexOf("\"", tagContents.indexOf("\"", tagContents.indexOf("=", tagContents.indexOf("class"))) + 1)).replace('\"', '');
        var classes = classesString.split(' ');
        return classes;
    }
}

function addClass(elem, className) {
    var tagContents = elem.substring(0, elem.indexOf('\>')).replace('\<', '').replace('\>', '');
    var oldContents = tagContents;
    var a = tagContents.indexOf("class")
    if (a >= 0) {
        var classesString = tagContents.substring(tagContents.indexOf("\"", tagContents.indexOf("=", tagContents.indexOf("class"))) + 1, tagContents.indexOf("\"", tagContents.indexOf("\"", tagContents.indexOf("=", tagContents.indexOf("class"))) + 1)).replace('\"', '');
        if (classesString.search(className) < 0) {
            var newClasses = classesString + " " + className;
            tagContents = tagContents.replace(classesString, newClasses);
        }
    }
    else {
        tagContents += " class=\"" + className + "\""
    }
    return elem.replace(oldContents, tagContents)
}

function removeClass(elem, className) {
    var tagContents = elem.substring(0, elem.indexOf('\>')).replace('\<', '').replace('\>', '');
    var oldContents = tagContents;
    var a = tagContents.indexOf("class")
    if (a >= 0) {
        var classesString = tagContents.substring(tagContents.indexOf("\"", tagContents.indexOf("=", tagContents.indexOf("class"))) + 1, tagContents.indexOf("\"", tagContents.indexOf("\"", tagContents.indexOf("=", tagContents.indexOf("class"))) + 1)).replace('\"', '');
        if (classesString.search("\b" + className + "\b") < 0) {
            var newClasses = classesString.replace(className, '');
            tagContents = tagContents.replace(classesString, newClasses);
        }
    }
    else {
        tagContents += " class=\"" + className + "\""
    }
    return elem.replace(oldContents, tagContents)
}

function validateForm() {
    var errors = {};
    var retval;
    var i = 0;
    if (document.getElementById('username').value == "") {
        document.getElementById('username').outerHTML =  addClass(document.getElementById('username').outerHTML, "error_field");
        errors[i] =  "Enter a username.";
        i++;
    }
    else {
        document.getElementById('username').outerHTML = removeClass(document.getElementById('username').outerHTML, "error_field");
    }
    if (i > 0) return false;
}
