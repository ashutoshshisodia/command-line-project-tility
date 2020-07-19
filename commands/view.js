let fs    = require("fs");
let path  = require("path");

// src -f -> flat
// src -t -> tree
module.exports.view = function () {
  let src = arguments[0];
  let mode = arguments[1];
  if (mode == "-t") {
    viewAsTree(src, " > ");
  } 
  else if (mode == "-f") {
    viewAsFlatFile(src, path.basename(src));
  } 
  else {
    console.log("wrong mode!!");
  }
};

function checkWhetherFile(src) {
  return fs.lstatSync(src).isFile();
}

function getContent(src) {
  return fs.readdirSync(src);
}

function viewAsFlatFile(src, toprint) {
  // check whether file or directory
  if (checkWhetherFile(src) === true) {
    console.log(toprint + " *");
  } else {
    //else -> directory
    console.log(toprint); // printing
    //get its children
    let children = getContent(src);
    //console.log(children);
    for (let i = 0; i < children.length; i++) {
      let childrenPath = path.join(src, children[i]);
      let childToPrint = path.join(toprint, children[i]);
      viewAsFlatFile(childrenPath, childToPrint);
    }
  }
}

function viewAsTree(src, indent) {
  // check whether file or directory
  if (checkWhetherFile(src) === true) {
    console.log(indent + path.basename(src) + " *");
  } else {
    //else -> directory
    console.log(indent + path.basename(src)); // printing
    //get its children (inside content)
    let children = getContent(src);

    for (let i = 0; i < children.length; i++) {
      // children path (to pass as source)
      let childrenPath = path.join(src, children[i]);

      viewAsTree(childrenPath, " | " + indent);
    }
  }
}

