let myName1 = "Tom1";
let myAge1 = 201;
let myfn1 = function(){
    return "3.js: My name is" + myName1 + "! I'm '" + myAge1 + "years old."
}
let myClass1 =  class myClass{
    static a = "yeah1!";
    
}

let defaultExport1 = "defaultExport1"
export { myName1, myAge1, myfn1, myClass1, defaultExport1 as default }