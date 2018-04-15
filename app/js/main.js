import $ from './common/utils';
import handleSubmit from './component/form';

class Main {
  constructor(){
    this.handleSubmit = handleSubmit.bind(this);
  }

  init = () => {
    this.bindEvents();
  }

  bindEvents = () => {
    $('#submitBtn')[0].addEventListener('touchstart', (e) => { this.handleSubmit(e); });
  }

}

window.onload = function onload() {
  const main = new Main();
  main.init();
};
