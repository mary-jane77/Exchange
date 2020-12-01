const form = document.querySelector('.convert');
const rate = document.querySelector('.num-rate');
const total = document.querySelector('.num-total');
const incoming = document.querySelector('#first');
const out = document.querySelector('#second');
const clear = document.querySelector('.clear');
const sum = document.querySelector('.num-summ');
let currencies = ['GBP', 'USD', 'EUR', 'CNY', 'RUB', 'BYN']
// localStorage.setItem('rem-USD', 100000);
// localStorage.setItem('rem-EUR', 10);
// localStorage.setItem('rem-CNY', 100000);
// localStorage.setItem('rem-BYN', 100000);
// localStorage.setItem('rem-RUB', 100000);
// localStorage.setItem('rem-GBP', 100000);
currencies.map((i) => {
  if (localStorage.getItem(`rem-${i}`) == null) {
    localStorage.setItem(`rem-${i}`, 100000);
  }
})



console.log(incoming.value)
console.log(out)
// caa5bc61c6db402b959da595a864614b
async function getRate() {
  const url = "https://openexchangerates.org/api/latest.json?app_id=caa5bc61c6db402b959da595a864614b";
  const res = await fetch(url);
  const data = await res.json();
  localStorage.setItem('BYN', data.rates.BYN);
  localStorage.setItem('EUR', data.rates.EUR);
  localStorage.setItem('CNY', data.rates.CNY);
  localStorage.setItem('RUB', data.rates.RUB);
  localStorage.setItem('GBP', data.rates.GBP);
  console.log(data)
  // window.setTimeout(getRate, 60 * 60 * 1000);
}
window.addEventListener('load', getRate());
//   getRate()


let historyArr = []
document.querySelector('.calculations').addEventListener('change', () => {
  rate.textContent = localStorage.getItem(out.value);
})

if (localStorage.getItem('data') !== null) {
  historyArr = JSON.parse(localStorage.getItem('data'))
}
sum.addEventListener('change', () => {
  let cur = localStorage.getItem(out.value);
  let selector = `rem-${out.value}`
  let rem = localStorage.getItem(selector);
  let result
  let calculation
  let operation = {}

  let today = new Date();


  if (localStorage.getItem('data') !== null) {
    historyArr = JSON.parse(localStorage.getItem('data'))
  }

  document.querySelector('.calculations').addEventListener('submit', (e) => {

    e.preventDefault()
    result = parseFloat(sum.value) * parseFloat(cur)
    total.textContent = result.toString()
    calculation = parseFloat(rem) - parseFloat(result)
    console.log('calculation: ' + calculation)
    localStorage.setItem(selector, calculation.toString())
    if (calculation > 0) {
      total.classList.add('okay')
    } else {
      total.classList.add('error')
    }
    operation = {
      date: `${today.getDate()}.${today.getMonth()}.${today.getFullYear()}`,
      from: incoming.value,
      to: out.value,
      sum: result
    }

    console.log('operation' + operation)
    if (historyArr.length > 50) {
      historyArr.shift()
      historyArr.push(operation)
      localStorage.setItem('data', JSON.stringify(historyArr))
    } else {
      historyArr.push(operation)
      localStorage.setItem('data', JSON.stringify(historyArr))

    }

  })
})

clear.addEventListener('click', () => {
  total.classList.remove('error')
  total.classList.remove('okay')
  total.textContent = '00.00 '
  rate.textContent = '00.00 '
  sum.value = ''
  incoming.value = ''
  out.value = ''
})


document.querySelector('.main').addEventListener('click', () => {
  document.querySelector('.convert-wrapper').style.overflow = 'visible'
  document.querySelector('.main').classList.add('active')
  document.querySelector('.remaining-page').classList.add('active')
  document.querySelector('.remaining-page').classList.remove('active')
  document.querySelector('.history-page').classList.remove('active')
  document.querySelector('.convert').style.display = 'grid'
  document.querySelector('.remaining').style.display = 'none'
  document.querySelector('.history').style.display = 'none'
})
document.querySelector('.remaining-page').addEventListener('click', () => {
  document.querySelector('.convert-wrapper').style.overflow = 'visible'
  document.querySelector('.main').classList.remove('active')
  document.querySelector('.remaining-page').classList.add('active')
  document.querySelector('.history-page').classList.remove('active')
  document.querySelector('.convert').style.display = 'none'
  document.querySelector('.remaining').style.display = 'flex'
  document.querySelector('.history').style.display = 'none'

  let currencyArr = ['GBP', 'USD', 'EUR', 'CNY', 'RUB', 'BYN']
  currencyArr.map((i) => {
    let selector = `rem-${i}`
    document.querySelector(`.${i}`).innerHTML = `
      <div class="item">
      <div>${i}</div>
      <div>${localStorage.getItem(selector)}</div>
      </div>
      <hr>
      `
  })
})

document.querySelector('.history-page').addEventListener('click', () => {
  document.querySelector('.main').classList.remove('active')
  document.querySelector('.remaining-page').classList.remove('active')
  document.querySelector('.history-page').classList.add('active')
  document.querySelector('.convert').style.display = 'none'
  document.querySelector('.remaining').style.display = 'none'
  document.querySelector('.history').style.display = 'flex'
  let historyContent = document.createElement('div')

  console.log(historyArr)
  historyArr.map(i => {
    historyContent.innerHTML += `
  <div class='operation'>
<div class="date">${i.date}</div>
<div class="from-text">Исходная валюта</div>
<div class="from">${i.from}</div>
<div class="to-text">Выданная валюта</div>
<div class="to">${i.to}</div>
<div class="sum-text">Выданная сумма</div>
<div class="sum">${i.sum}</div>
  </div>
  <hr>
  `
  })
  document.querySelector('.history').children[0].replaceWith(historyContent)
  document.querySelector('.convert-wrapper').style.overflow = 'scroll'
})

document.querySelector('.history').children[0].replaceWith(historyContent)

// const out = document.querySelector('#second');
let remains = document.querySelectorAll(`.rem`)

document.querySelector('.exit').addEventListener('click', () => {
  window.close()
})















