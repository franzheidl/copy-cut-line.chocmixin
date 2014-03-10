/*
Copy-Cut-Line-Chocmixin.
A Mixin for Chocolat to copy/cut the whole line with CMD-C / CMD-X if no selection.
https://github.com/franzheidl/copy-cut-line.chocmixin
Franz Heidl 2014
MIT License
*/

function copyLine() {
  Recipe.run(function(recipe) {
    var cursorRange = recipe.selection;
    if (cursorRange.length < 1) {
      var lineRange = recipe.contentRangeOfLinesInRange(cursorRange);
      var lineContent = recipe.textInRange(lineRange).replace(/(^\s*)/g, '');
      if (lineContent.trim() !== '') {
        Clipboard.copy(lineContent.trim());
      }
    }
  });
}

function cutLine() {
  Recipe.run(function(recipe) {
    var cursorRange = recipe.selection;
    if (cursorRange.length < 1) {
      var lineRange = recipe.contentRangeOfLinesInRange(cursorRange);
      var lineContent = recipe.textInRange(lineRange).replace(/(^\s*)/g, '');
      if (lineContent.trim() !== '') {
        Clipboard.copy(lineContent.trim());
        recipe.replaceTextInRange(lineRange, '');
        recipe.selection = new Range(lineRange.location, 0);
      }
      return;
    } else {
      Clipboard.copy(recipe.textInRange(recipe.selection));
      recipe.replaceTextInRange(recipe.selection, '');
    }
  });
}


Hooks.addKeyboardShortcut('cmd-c', function() {
  copyLine();
});

Hooks.setShortcutForMenuItem('Edit/Cut', 'ctrl-cmd-x');

Hooks.addMenuItem('Edit/Cut line or selection', 'cmd-x', function() {
  cutLine();
});
