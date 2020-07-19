let fs      = require("fs");
let path    = require("path");
let uniqid  = require("uniqid");

module.exports.unTreefyFun = function () {
  let source = arguments[0];
  let desination = arguments[1];
  let root = {};
  unTreefy(source, desination, root);
  fs.writeFileSync(
    path.join(desination, "metadata.json"),
    JSON.stringify(root)
  );
};

function checkWhetherFile(src) {
  return fs.lstatSync(src).isFile();
}

function getContent(src) {
  return fs.readdirSync(src);
}

function unTreefy(src, dest, obj) {
  // check whether file or directory
  if (checkWhetherFile(src) === true) {
    // copy with a new name
    let oldName = path.basename(src);
    let newName = uniqid();
    obj.oldname = oldName;
    obj.newName = newName;
    obj.isFile = true;

    let destinationPath = path.join(dest, newName);
    fs.copyFileSync(src, destinationPath);

    console.log(`File ${oldName} from source is copied to ${destinationPath}`);
  } 
  else {
    //else -> directory
    obj.isFile = false;
    obj.name = path.basename(src);
    obj.childrenArray = [];

    //get it's children
    let children = getContent(src);

    //console.log(children);
    for (let i = 0; i < children.length; i++) {
      let childrenPath = path.join(src, children[i]);
      let childObj = {};
      unTreefy(childrenPath, dest, childObj);
      obj.childrenArray.push(childObj);
    }
  }
}

