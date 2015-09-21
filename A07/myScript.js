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
        if (getClasses(elem).indexOf("\b" + className + "\b") >= 0) {
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
        if (getClasses(elem).indexOf("\b" + className + "\b") < 0) {
            var newClasses = classesString.replace(className, '');
            tagContents = tagContents.replace(classesString, newClasses);
        }
    }
    return elem.replace(oldContents, tagContents)
}

function validateForm() {
    var errors;
    errors = [];
    var i = 0;
    var val = "";
    var val1 = "";
    var val2 = "";

    val = document.getElementById('username').value;
    if (!val) {
        document.getElementById('username').outerHTML = addClass(document.getElementById('username').outerHTML, "error_field");
        errors[i] = "Enter a username.";
        i++;
    }
    else {
        document.getElementById('username').outerHTML = removeClass(document.getElementById('username').outerHTML, "error_field");
    }
    document.getElementById('username').setAttribute("value", val);

    val = document.getElementById('email').value;
    if (!val) {
        document.getElementById('email').outerHTML =  addClass(document.getElementById('email').outerHTML, "error_field");
        errors[i] = "Enter a valid email address.";
        i++;
    }
    else {
        document.getElementById('email').outerHTML = removeClass(document.getElementById('email').outerHTML, "error_field");
    }
    document.getElementById('email').setAttribute("value", val);

    val1 = document.getElementById('password').value;
    val2 = document.getElementById('confirm').value;
    if (val1 !== val2) {
        if (!val1) {
            document.getElementById('password').outerHTML = addClass(document.getElementById('password').outerHTML, "error_field");
            errors[i] = "Enter a password before confirming it."
        }
        else if (!val2) {
            document.getElementById('confirm').outerHTML = addClass(document.getElementById('confirm').outerHTML, "error_field");
            errors[i] = "Confirm your password.";
        }
        else {
            document.getElementById('password').outerHTML = addClass(document.getElementById('password').outerHTML, "error_field");
            document.getElementById('confirm').outerHTML = addClass(document.getElementById('confirm').outerHTML, "error_field");
            errors[i] = "Password mismatch.";
        }
        i++;
    }
    else {
        if (!val1 && !val2) {
            document.getElementById('password').outerHTML = addClass(document.getElementById('password').outerHTML, "error_field");
            document.getElementById('confirm').outerHTML = addClass(document.getElementById('confirm').outerHTML, "error_field");
            errors[i] = "Password fields empty.";
            i++;
        }
        else {
            document.getElementById('password').outerHTML = removeClass(document.getElementById('password').outerHTML, "error_field");
            document.getElementById('confirm').outerHTML = removeClass(document.getElementById('confirm').outerHTML, "error_field");
        }
    }
    document.getElementById('password').setAttribute("value", val1);
    document.getElementById('confirm').setAttribute("value", val2);
    document.getElementById("error").innerHTML = "";
    if (i > 0) {
        document.getElementById("error").innerHTML += "Error(s): \<ul\>";
        for (var e = 0; e < errors.length; e++) {
            document.getElementById("error").innerHTML += "\<li\>" + errors[e] + "\</sli\>";
        }
        document.getElementById("error").innerHTML += "\</ul\>";
    }
    return (i == 0);
}
