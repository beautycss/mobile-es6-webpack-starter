/*
 * 工具类
 */

// const $ = document.querySelectorAll.bind(document);
const $ = (function (e, f, g) { function c(a, b, d) { d = Object.create(c.fn); a && d.push.apply(d, a[f] ? [a] : '' + a === a ? /</.test(a) ? ((b = e.createElement(b || f)).innerHTML = a, b.children) : b ? (b = c(b)[0]) ? b[g](a) : d : e[g](a) : 'function' == typeof a ? e.readyState[7] ? a() : e[f]('DOMContentLoaded', a) : a); return d } c.fn = []; c.one = function (a, b) { return c(a, b)[0] || null }; return c }(document, 'addEventListener', 'querySelectorAll'));

Object.assign($.fn, {
  hide() {
    this.forEach(($element) => {
      $element.style.display = 'none';
    });
    return this;
  },
  show() {
    this.forEach(($element) => {
      $element.style.display = 'block';
    });
    return this;
  },
  val() {
    // console.log(this);
    if (arguments.length) {
      this.forEach(($element) => {
        $element.value = arguments[0];
      });
      return this;
    }
    return this[0].value;
  },
  html(html) {
    this.forEach(($element) => {
      $element.innerHTML = html;
    });
    return this;
  },
  hasClass(className) {
    return this[0].classList.contains(className);
  },
  addClass(className) {
    // console.log(arguments);
    this.forEach(($element) => {
      $element.classList.add(className);
    });
    return this;
  },
  removeClass(className) {
    this.forEach(($element) => {
      $element.classList.remove(className);
    });
    return this;
  },
  css(obj) {
    Object.keys(obj).forEach((key) => {
      this.forEach(($element) => {
        $element.style[key] = obj[key];
      });
    });
    return this;
  },
  find(selector) {
    return $(selector, this);
  },
  append($child) {
    if (!($child instanceof HTMLElement)) {
      $child = $child[0];
    }
    this.forEach(($element) => {
      $element.appendChild($child);
    });
    return this;
  },
  attr() {
    if (typeof arguments[0] == 'object') {
      const attrsObj = arguments[0];
      const that = this;
      Object.keys(attrsObj).forEach((attr) => {
        that.forEach(($element) => {
          $element.setAttribute(attr, attrsObj[attr]);
        });
      });
      return this;
    }

    if (typeof arguments[0] == 'string' && arguments.length < 2) {
      return this[0].getAttribute(arguments[0]);
    }

    this.forEach(($element) => {
      $element.setAttribute(arguments[0], arguments[1]);
    });
    return this;
  },
});

export default $;

/**
 * Return urlSearchParams
 * @param {*} data 
 */
export function getUrlSearchParams(data) {
  // console.log(data);
  let urlSearchParams = new URLSearchParams();
  Object.keys(data).map((key) => {
    urlSearchParams.set(key, data[key]);
  });
  return urlSearchParams;
}

/**
 * Return formData
 * @param {*} data 
 */
export function getFormData(data) {
  // console.log(data);
  let formData = new FormData();
  Object.keys(data).map((key) => {
    formData.append(key, data[key]);
  });
  return formData;
}

/**
 * Return a promise
 * @param {*} url 
 * @param {*} options 
 */
export function request(url, options) {
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    if (newOptions.body instanceof FormData) {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        ...newOptions.headers,
      };
    }
  }
  return fetch(url, newOptions)
    .then(response => response.json()) // parses response to JSON
    .catch(error => console.error(error));
}
