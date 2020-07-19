let fs      = require("fs");
let path    = require("path");
module.exports.treefyFun = function () {
  let src = arguments[0];
  let dest = arguments[1];
  let contents = fs.readFileSync(path.join(src, "metadata.json"));

  let jsonContent = JSON.parse(contents);
  treefy(src, dest, jsonContent);
};

function treefy(src, dest, jsonContent) {
  if (jsonContent.isFile == true) {
    let filePath = path.join(src, jsonContent.newName);
    let destPath = path.join(dest, jsonContent.oldname);
    let finalFile = jsonContent.oldname;
    let folder = path.basename(dest);
    fs.copyFileSync(filePath, destPath);
    console.log(`File ${finalFile} created in ${folder}`);
  } 
  else {
    let dirName = jsonContent.name;
    let dirPath = path.join(dest, dirName);
    let destFolder = path.basename(dest);
    fs.mkdirSync(dirPath);
    console.log(`Directory ${dirName} created inside ${destFolder}`);
    //recursion
    for (let i = 0; i < jsonContent.childrenArray.length; i++) {
      treefy(src, dirPath, jsonContent.childrenArray[i]);
    }
  }
}
