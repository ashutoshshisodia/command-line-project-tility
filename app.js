// taking input from terminal
let input = process.argv.slice(2);

let viewFile       = require("./commands/view.js");
let unTreefyFile   = require("./commands/untreefy.js");
let treefyFile     = require("./commands/treefy.js");

let command = input[0];

switch (command) {
  case "view":
    viewFile.view(process.argv[3], process.argv[4]);
    break;

  case "treefy":
    treefyFile.treefyFun(process.argv[3], process.argv[4]);
    break;

  case "untreefy":
    unTreefyFile.unTreefyFun(process.argv[3], process.argv[4]);
    break;

  case "help":
    console.log(`Help for You!
    Format(for viewing file structure): node tpp.js view 'path of directory' -[mode]
    Modes- 
    -t : view as a tree structure
    -f : view as a flat structure
    .
    .
    Format(for treefy/untreefy): node tpp.js [mode] 'path of source directory' 'path of destination directory'
    Modes- 
    untreefy: copy file sub-directories and files from a directory in a destination directory after renaming them. It retains the information about the file/directory in a JSON file and stores it in destination.

    treefy: (inverse of untreefy) It copies the COPIED files and directories in their actual form, with original names by using data stored in JSON file.

    source - from where
    destination- to where
    `);
    break;

  default:
    console.log("wrong command :( , run 'node app.js help' for more help!!");
    break;
}
