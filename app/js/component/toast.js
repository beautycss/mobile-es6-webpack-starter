/*
 * toast
 */
import $ from '../common/utils';

export default function toast(message) {
  setTimeout(() => {
    $('.toast-msg').html(message);
    $('.toast-wrap').addClass('toastAnimate');
    setTimeout(() => {
      $('.toast-wrap').removeClass('toastAnimate');
    }, 1000);
  }, 200);
}
