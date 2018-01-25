window.onload = function() {
    //incomplete implementation: https://stackoverflow.com/questions/16647404/javascript-function-to-enter-only-alphabets-on-keypress
    function alphaOnly(event) {
        var textInput = document.getElementById("input-text").value;
        textInput = textInput.replace(/[^A-Za-z]/g, "");
        document.getElementById("input-text ").value = textInput;
    };

    function main() {
        var input = $("#input-text").val().toUpperCase();
        var key = 13;
        
        var output = [];
        
        for (i = 0; i < input.length; i++) {
            var character = input.charCodeAt(i);
            
            if (character === 32) {
                output.push(' ');
                continue;
            }
            
            var cipherChar = (character - 65 + key) % 26; // encoding
            output.push(String.fromCharCode(cipherChar + 65));
        }
        
        $("#output-text").val(output.join(""));
        
    }

    $('#input-text').bind('input', alphaOnly);
    $("#button-encode").on("click", main);
    
    String.prototype.replaceAt = function(index, replacement) {
        return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
    }
}