/*
Copy-Cut-Line-Chocmixin.
A Mixin for Chocolat to copy/cut the whole line with CMD-C / CMD-X if no selection.
https://github.com/franzheidl/copy-cut-line.chocmixin
Franz Heidl 2014
MIT License
*/



function run(action) {
  Recipe.run(function(recipe) {
    
    var cursorRange = recipe.selection;
    
    if (cursorRange.length < 1) {
      
      var lineRange = recipe.contentRangeOfLinesInRange(cursorRange);
      
      // remove leading whitespace:
      var lineContent = recipe.textInRange(lineRange).replace(/(^\s*)/g, '');
      
      // don't copy/cut line content is only whitespace:
      if (lineContent.trim() !== '') {
        
        Clipboard.copy(lineContent.trim());
        
        if (action === 'cut') {
          recipe.replaceTextInRange(lineRange, '');
          recipe.selection = new Range(lineRange.location, 0);
        }
        
      }
      
    }
    
  });
}


Hooks.addKeyboardShortcut('cmd-c', function() {
  run('copy');
});

Hooks.addKeyboardShortcut('cmd-x', function() {
  run('cut');
});


