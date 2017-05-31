import { Pipe, PipeTransform } from '@angular/core';
import Prism from 'prismjs';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
// import 'prismjs/components/prism-typescript';

// syntax hightlighter
import '!style-loader!css-loader!prismjs/themes/prism.css';


/**
 * Generated class for the HighlightPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {

  constructor() {
  }
  transform(value: string, ...args) {
    var el = document.createElement('div');
    el.innerHTML = value;
    [].forEach.call(el.querySelectorAll('pre'), (el) => {
      const language = extractBrushLanguage(el.className);
      if (language) {
        el.className += ` language-${language}`;
      }
      Prism.highlightElement(el, false);
    });
    return el.innerHTML;
  }
}

// SyntaxHighlighter Evolved WP plugin support
function extractBrushLanguage(iCalContent) {
  var rx = /(?:brush: )(.*?)(?:;)/;
  var arr = iCalContent.match(rx);
  if (arr[1] === 'jscript') {
    return 'javascript';
  }
  return arr[1];
}
