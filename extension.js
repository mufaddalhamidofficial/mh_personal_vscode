// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "mhpersonal" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('mhpersonal.runcommandonfile', function () {
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
    if (vscode.window.activeTextEditor) {
      vscode.window.activeTextEditor.edit((build) => {
        var startEnd = vscode.window.activeTextEditor.selection;
        var allText = vscode.window.activeTextEditor.document.getText(startEnd);
        // allText = 'Hello';
        // console.log(allText);

        var code1 = allText;

        var reg = /([. $])([^'"][a-zA-Z]*)_([a-zA-Z\_]*[^'"])([\;\,\:\ \}\.\)])/g;

        var itr = code1.matchAll(reg);

        var next = itr.next();
        while (!next?.done) {
          var newText = '';
          var start = 0;
          // console.log(next);
          while (!next?.done) {
            newText += code1.substring(start, next.value.index);
            // console.log(start);
            // if (start == 0) console.log(newText);
            start = next.value.index + next.value[0].length;
            newText += next.value[1];
            newText += next.value[2];
            newText += next.value[3].substring(0, 1).toUpperCase() + next.value[3].substring(1);
            newText += next.value[4];

            next = itr.next();
          }

          newText += code1.substring(start);

          code1 = newText;
          itr = code1.matchAll(reg);
          next = itr.next();
        }

        build.replace(startEnd, code1);
      });
    } else {
      vscode.window.showInformationMessage('No file open');
    }
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
