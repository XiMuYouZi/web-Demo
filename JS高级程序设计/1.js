
let myName = "Tom";
let myAge = 20;
let myfn = function(){
    return "1.js: My name is" + myName + "! I'm '" + myAge + "years old."
}
let myClass =  class myClass {
    static a = "yeah!";
}
let defaultExport = "defaultExport"

export { myName, myAge, myfn, myClass, defaultExport as default }
export * from './3.js'
