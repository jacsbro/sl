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
function ShoppingList(aName) {
  this.id = guid();
  this.name = aName;
  this.created = new Date();
  this.modified = new Date();
  this.items = [];
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


function ShoppingListItem(aName, aUnit, aQty) {
  this.id = guid();
  this.name = aName;
  this.unit = aUnit;
  this.qty = aQty;
  this.done = false;
};
