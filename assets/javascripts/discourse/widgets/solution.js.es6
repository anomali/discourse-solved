import { createWidget } from 'discourse/widgets/widget';
import { ajax } from 'discourse/lib/ajax';
import RawHtml from 'discourse/widgets/raw-html';
import { h } from 'virtual-dom';
import { popupAjaxError } from 'discourse/lib/ajax-error';

import * as solved from '../initializers/extend-for-solved-button';

export default createWidget('solution-widget', {
  tagName: 'div.solution-indicator',
  buildKey: () => 'solution-widget',

  html(attrs, state){

    let buffer = [];

    if(attrs.post_number == 1) return buffer;

    const canAccept = attrs.can_accept_answer;
    const canUnaccept = attrs.can_unaccept_answer;
    const accepted = attrs.accepted_answer;

    if(!accepted && !canAccept) return buffer;

    buffer.push(h('.solution-button' + ((accepted) ? '.accepted' : ''), h('i.fa.fa-check' + (((canAccept && !accepted) || (canUnaccept && accepted)) ? '.clickable' : ''), '')));
 
    return buffer;
  },

  click(e) {

    if(e.target.className.includes("fa fa-check")) {
      if(this.attrs.accepted_answer && this.attrs.can_unaccept_answer){
        $('article#post_' + this.attrs.post_number + ' button.widget-button.btn-flat.accepted').click();
      } else if(this.attrs.can_accept_answer) {
        $('article#post_' + this.attrs.post_number + ' button.widget-button.btn-flat.unaccepted').click();
      }
    }
  }

});