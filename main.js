window.onload = function() {
    //code implementation from: https://stackoverflow.com/questions/16647404/javascript-function-to-enter-only-alphabets-on-keypress
    function alphaOnly(event) {
        var textInput = document.getElementById("input-text").value;
        textInput = textInput.replace(/[^A-Za-z ]/g, "");
        document.getElementById("input-text").value = textInput;
    };

    function main() {
        var input = $("#input-text").val().toUpperCase();
        var key = parseInt($("#key-select").val());
        
        if ($("#method-select").val() === "Cipher") {
            key = 26 - key;
        }
        
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
    
    function isCorrect(diff, input, output){
        for(var i = 0; i<input.length; i++){
            var i_char = input.charCodeAt(i);
            var o_char = output.charCodeAt(i);
            if((o_char-i_char)!=diff){
                return false;
            }
        }
       return true;
    }
    
    function getWord(diff, input){
        var res = "";
        for(var i = 0; i<input.length; i++){
            var i_char = input.charCodeAt(i);
            //res = res + String.fromCharCode(i_char+((26-diff)%26));
            res = res + String.fromCharCode(i_char+diff);
        }
        return res;
    }
    
    $( "#button_bfattack" ).click(function() {
        var input = $("#input-text").val().toUpperCase();
        input = input.replace(/ /g, "");
        var output = $("#output-text").val().toUpperCase();
        output = output.replace(/ /g, "");
        
        if(input.length == 0 || output.length == 0){
            alert("An input is missing or both.");    
            return;
        }
        if(input.length!=output.length){
            alert("Both inputs must be of equal length.");    
            return;
        }
        
        var start = input.charCodeAt(0);
        var end = output.charCodeAt(0);
        var diff = end - start;
        
        $("#bfattack_results tbody").empty();
        if(isCorrect(diff, input, output)){
            $("#key_found").val("Key is: "+((26-diff)%26));//((26-diff)%26) o diff
        }
        else{
            $("#key_found").val("No key found. Testing all possible shifts.");
            for(var a=1; a<26; a++){
                    $("#bfattack_results tbody").append("" +
                        "<tr>"+
                            "<td> "+a+" </td>" +
                            "<td>"+getWord(a, input)+"</td> " +
                        "</tr>");    
            }
        }
            
        
        
        
    });
}