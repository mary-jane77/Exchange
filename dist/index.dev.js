"use strict";

var form = document.querySelector('.convert');
var rate = document.querySelector('.num-rate');
var total = document.querySelector('.num-total');
var incoming = document.querySelector('#first');
var out = document.querySelector('#second');
var clear = document.querySelector('.clear');
var sum = document.querySelector('.num-summ');
var currencies = ['GBP', 'USD', 'EUR', 'CNY', 'RUB', 'BYN']; // localStorage.setItem('rem-USD', 100000);
// localStorage.setItem('rem-EUR', 10);
// localStorage.setItem('rem-CNY', 100000);
// localStorage.setItem('rem-BYN', 100000);
// localStorage.setItem('rem-RUB', 100000);
// localStorage.setItem('rem-GBP', 100000);

currencies.map(function (i) {
  if (localStorage.getItem("rem-".concat(i)) == null) {
    localStorage.setItem("rem-".concat(i), 100000);
  }
});
console.log(incoming.value);
console.log(out); // caa5bc61c6db402b959da595a864614b

function getRate() {
  var url, res, data;
  return regeneratorRuntime.async(function getRate$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          url = "https://openexchangerates.org/api/latest.json?app_id=caa5bc61c6db402b959da595a864614b";
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch(url));

        case 3:
          res = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(res.json());

        case 6:
          data = _context.sent;
          localStorage.setItem('BYN', data.rates.BYN);
          localStorage.setItem('EUR', data.rates.EUR);
          localStorage.setItem('CNY', data.rates.CNY);
          localStorage.setItem('RUB', data.rates.RUB);
          localStorage.setItem('GBP', data.rates.GBP);
          console.log(data); // window.setTimeout(getRate, 60 * 60 * 1000);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
}

window.addEventListener('load', getRate()); //   getRate()

var historyArr = [];
document.querySelector('.calculations').addEventListener('change', function () {
  rate.textContent = localStorage.getItem(out.value);
});
sum.addEventListener('change', function () {
  var cur = localStorage.getItem(out.value);
  var selector = "rem-".concat(out.value);
  var rem = localStorage.getItem(selector);
  var result;
  var calculation;
  var operation = {};
  var date = new Date();

  if (localStorage.getItem('data') !== null) {
    historyArr = JSON.parse(localStorage.getItem('data'));
  }

  document.querySelector('.calculations').addEventListener('submit', function (e) {
    e.preventDefault();
    result = parseFloat(sum.value) * parseFloat(cur);
    total.textContent = result.toString();
    calculation = parseFloat(rem) - parseFloat(result);
    console.log('calculation: ' + calculation);
    localStorage.setItem(selector, calculation.toString());

    if (calculation > 0) {
      total.classList.add('okay');
    } else {
      total.classList.add('error');
    }

    operatiion = {
      date: "".concat(today.getDate(), ".").concat(today.getMonth(), ".").concat(today.getFullYear()),
      from: incoming.value,
      to: out.value,
      sum: result
    };

    if (historyArr.length > 50) {
      historyArr.shift();
      historyArr.push(operation);
      localStorage.setItem('data', JSON.stringify(historyArr));
    } else {
      historyArr.push(operation);
      localStorage.setItem('data', JSON.stringify(historyArr));
    }
  });
});
clear.addEventListener('click', function () {
  total.classList.remove('error');
  total.classList.remove('okay');
  total.textContent = '00.00 ';
  rate.textContent = '00.00 ';
  sum.value = '';
  incoming.value = '';
  out.value = '';
});
document.querySelector('.main').addEventListener('click', function () {
  document.querySelector('.main').classList.add('active');
  document.querySelector('.remaining-page').classList.add('active');
  document.querySelector('.remaining-page').classList.remove('active');
  document.querySelector('.history-page').classList.remove('active');
  document.querySelector('.convert').style.display = 'grid';
  document.querySelector('.remaining').style.display = 'none';
  document.querySelector('.history').style.display = 'none';
});
document.querySelector('.remaining-page').addEventListener('click', function () {
  document.querySelector('.main').classList.remove('active');
  document.querySelector('.remaining-page').classList.add('active');
  document.querySelector('.history-page').classList.remove('active');
  document.querySelector('.convert').style.display = 'none';
  document.querySelector('.remaining').style.display = 'flex';
  document.querySelector('.history').style.display = 'none';
  var currencyArr = ['GBP', 'USD', 'EUR', 'CNY', 'RUB', 'BYN'];
  currencyArr.map(function (i) {
    var selector = "rem-".concat(i);
    document.querySelector(".".concat(i)).innerHTML = "\n      <div class=\"item\">\n      <div>".concat(i, "</div>\n      <div>").concat(localStorage.getItem(selector), "</div>\n      </div>\n      <hr>\n      ");
  });
});
document.querySelector('.history-page').addEventListener('click', function () {
  document.querySelector('.main').classList.remove('active');
  document.querySelector('.remaining-page').classList.remove('active');
  document.querySelector('.history-page').classList.add('active');
  document.querySelector('.convert').style.display = 'none';
  document.querySelector('.remaining').style.display = 'none';
  document.querySelector('.history').style.display = 'flex';
  var historyContent = document.createElement('div');
  historyArr.map(function (i) {
    historyContent.innerHTML += "\n  <div class='operation'>\n<div>".concat(i.date, "</div>\n<div>\u0418\u0441\u0445\u043E\u0434\u043D\u0430\u044F \u0432\u0430\u043B\u044E\u0442\u0430</div>\n<div>").concat(i.from, "</div>\n<div>\u0412\u044B\u0434\u0430\u043D\u043D\u0430\u044F \u0432\u0430\u043B\u044E\u0442\u0430</div>\n<div>").concat(i.to, "</div>\n<div>\u0412\u044B\u0434\u0430\u043D\u043D\u0430\u044F \u0441\u0443\u043C\u043C\u0430</div>\n<div>").concat(i.sum, "</div>\n  </div>\n  <hr>\n  ");
  });
  document.querySelector('history').children[0].replaceWith(historyContent);
}); // const out = document.querySelector('#second');

var remains = document.querySelectorAll(".rem");