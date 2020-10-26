const form = document.querySelector('.convert');
const rate = document.querySelector('.num-rate');
const total = document.querySelector('.num-total');
const incoming = document.querySelector('#first');
const out = document.querySelector('#second');
const sum = document.querySelector('.num-summ');
localStorage.setItem('rem-USD', 100000);
localStorage.setItem('rem-EUR', 10);
localStorage.setItem('rem-CNY', 100000);
localStorage.setItem('rem-BYN', 100000);
localStorage.setItem('rem-RUB', 100000);
localStorage.setItem('rem-GBP', 100000);



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



out.addEventListener('change', ()=>{
  total.classList.remove('error')
  total.classList.remove('okay')
    rate.textContent = localStorage.getItem(out.value);
})
sum.addEventListener('change', ()=>{
    let cur = localStorage.getItem(out.value);
    let result = parseFloat(sum.value)*parseFloat(cur)
    total.textContent = result.toString()
    let selector = `rem-${out.value}`
    let rem = localStorage.getItem(selector);
    
    let calculation = parseFloat(rem)-parseFloat(result)
    if(calculation>0){
      localStorage.setItem(selector, calculation.toString())
      total.classList.add('okay')
    }else{
      total.classList.add('error')
    }
    console.log('rem: '+ rem)
    console.log('calculation: '+ calculation)
    console.log('rem: '+ rem)
})







    

    


 
  
  