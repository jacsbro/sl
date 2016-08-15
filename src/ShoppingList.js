//////////////////////////////////////////////////////////////////////////////
// version of the data structure
var SL_VERSION = 1;

// units
var UNIT_ST = 0;
var UNIT_G = 1;
var UNIT_L = 2;
var UNIT_M = 3;

var UNITS = ["ST", "g", "l", "m"];

//////////////////////////////////////////////////////////////////////////////
// guid function
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
};

//////////////////////////////////////////////////////////////////////////////
// shopping list Objects
function ShoppingList(aNameOrTemplate) {
  this.id = guid();
  this.created = new Date();
  this.modified = new Date();
  this.version = SL_VERSION;
  this.items = [];
  if (typeof aNameOrTemplate === "string") {
    this.name = aNameOrTemplate;
  }
  if (aNameOrTemplate.name !== undefined && aNameOrTemplate.items !== undefined) {
    this.name = "Copy of " + aNameOrTemplate.name;
    for (var i=0; i<aNameOrTemplate.items.length; i++) {
      var theItem = new ShoppingListItem(aNameOrTemplate.items[i].name, aNameOrTemplate.items[i].unit, aNameOrTemplate.items[i].qty, aNameOrTemplate.items[i].done, aNameOrTemplate.items[i].needed);
      this.addItem(theItem);
    }
  }
};

ShoppingList.prototype.addItem = function(aItem) {
  this.items.push(aItem);
  this.modified = new Date();
};
ShoppingList.prototype.deleteItem = function(aItem) {
  for(var i=0; i<this.items.length; i++) {
    if(this.items[i].uid === aItem.uid) {
      this.items.splice(i, 1);
    }
  }
  this.modified = new Date();
};
ShoppingList.prototype.modifiedDisplay = function() {
  return this.modified;
};

function ShoppingListItem(aName, aUnit, aQty) {
  this.id = guid();
  this.name = aName;
  this.unit = aUnit;
  this.qty = aQty;
  this.done = false;
  this.needed = true;
};

function ShoppingListItem(aName, aUnit, aQty, aDone, aNeeded) {
  this.id = guid();
  this.name = aName;
  this.unit = aUnit;
  this.qty = aQty;
  this.done = aDone;
  this.needed = aNeeded;
};
