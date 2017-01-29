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

function ShoppingListItem(aName, aUnit, aQty, aDone, aNeeded) {
  this.id = guid();
  this.name = aName;
  this.unit = aUnit;
  this.qty = aQty;
  this.done = app.toBoolean(aDone);
  this.needed = app.toBoolean(aNeeded);
};

function BatchAdd() {
  console.log("Adding a new hardcoded Shoppinglist ");
  var newList = new ShoppingList(app.toDate(new Date()));
  var items =
    [
      'Brot',
      'Toast',
      'Brezeln / Brötchen',
      'Ciabatta',
      'Zwieback',
      'Salzletten',
      'Müsli (Früchte/Knusper)',
      'Schokolade',
      'Nussnougatcreme',
      'Honig',
      'Kaffee',
      'Kaffeefilter',
      'Tee',
      'Frischhaltefolie',
      'Alufolie',
      'Müllbeutel',
      'Gefrierbeutel',
      'Topfreiniger',
      'Spültücher',
      'Putztücher (blau)',
      'Kerzen',
      'Spülmittel',
      'Geschirrspüler',
      'WC-Reiniger',
      'Badreiniger',
      'Waschpulver',
      'Weichspüler',
      'Fleckensalz',
      'Küchenrolle',
      'Taschentücher',
      'Toilettenpapier',
      'Servietten',
      'Flügelbinden',
      'Tampons',
      'Shampoo',
      'Nudeln',
      'Spätzle',
      'Spaghetti',
      'Backpulver',
      'Vanillezucker',
      'Senf',
      'Ketchup',
      'Salatsaucen-Pulver',
      'Tomatenmark',
      'Mehl',
      'Brot-Mehl',
      'Zucker',
      'Thunfisch',
      'Tomatensuppe',
      'Salametti',
      'Butter',
      'Kräuterbutter',
      'Magarine',
      'H-Milch',
      'Frischmilch',
      'Buttermilch',
      'Schlagsahne',
      'Schmand',
      'Quark mager',
      'Quark fett',
      'Knöpfle',
      'Rapsöl',
      'Olivenöl',
      'Mozarella',
      'Käseaufschnitt',
      'Parmesan',
      'Emmentaler am Stück',
      'Frischkäse Natur',
      'Frischkäse Kräuter',
      'Ziegenkäse',
      'Obatzder',
      'Joghurt Natur',
      'Joghurt Knusperecke',
      'Fruchtzwerge',
      'Freiland-Eier',
      'Schinkenspeck',
      'Schinken spanisch',
      'gekochter Schinken',
      'Würstchen',
      'Schinkenwürfel',
      'Zwiebeln',
      'Kartoffeln',
      'Paprika mix',
      'Tomaten',
      'Cherry Tomaten',
      'Gurke',
      'Karotten',
      'Feldsalat',
      'Salatherzen',
      'Champignons',
      'Äpfel',
      'Bananen',
      'Kiwi',
      'Zitronen',
      'Mango/Pfirsich/Apriko.',
      'Apfelsinen / Mandar.',
      'Party-Gurken',
      'Oliven (gün/schwarz)',
      'Tomatensauce',
      'TK-Gemüse',
      'TK-Buttergemüse',
      'TK-Spinat',
      'Tk-Obst',
      'Eis',
      'TK-Schweinefleisch',
      'TK-Lammfleisch',
      'TK-Hackfleisch',
      'TK-Minischnitzel',
      'TK-Pizza',
      'TK-ask',
      'TK -Baguettes',
      'Laugenbrezeln',
      'Fischstäbchen',
      'TK-Lachs',
      'Kap-Seehecht',
      'Schinken  fein',
      'Baguette',
      'Croissant',
      'Sonnencreme',
      'Shampoo',
      'Pflegebad',
      'Rasierschaum',
      'Haarwasser',
      'Seesand-Mandelkl.',
      'Salz Geschirrspül.',
      'Zahnpasta',
      'Handsan',
      'Pflaster',
      'Nutella',
      'Senf',
      'Ketchup',
      'Thunfisch',
      'Fencheltee',
      'Grüner Tee',
      'Oliven'
  ];
  for (var i=0; i<items.length; i++) {
    var theItem = new ShoppingListItem(items[i], '', 1, false, false);
    newList.addItem(theItem);
  }
  app.getSlComponent().addList(newList);
  console.log('saved');
  console.log(newList);
};
