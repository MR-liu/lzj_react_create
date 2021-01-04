module.exports = (obj) => {
  var _toString = Object.prototype.toString;

  var _type ={
    "undefined" : "undefined",
    "number" : "number",
    "boolean" : "boolean",
    "string" : "string",
    "[object Function]" : "function0f",
    "[object RegExp]" : "regexp",
    "[object Array] " : "array",
    "[object Date]" : "date",
    "[object Error]" : "error"
  }
  return _type[typeof obj] || _type[_toString.call(obj)] || (obj ? "object" :"null");
}