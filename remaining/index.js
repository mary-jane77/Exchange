const out = document.querySelector('#second');
// let remains = document.querySelectorAll(`.rem`)
let currencies = ['GBP','USD','EUR','CNY','RUB','BYN',]
currencies.map((i)=>{
    let selector = `rem-${i}`
    document.querySelector(`.${i}`).innerHTML = `
    <div class="item">
    <div>${i}</div>
    <div>${localStorage.getItem(selector)}</div>
    </div>
    <hr>
    `
})


