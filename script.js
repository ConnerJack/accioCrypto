const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')
const gridContainer = document.getElementById("gridContainer")

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.tabTarget)
    tabContents.forEach(tabContent => {
      tabContent.classList.remove('active')
    })
    tabs.forEach(tab => {
      tab.classList.remove('active')
    })
    tab.classList.add('active')
    target.classList.add('active')
  })
})


var data = []

const fetchData = async () => {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en")
    data = await res.json()
    var table = document.getElementById("cur_table");
    for (let index = 0; index < data.length; index++) {
      
     var cardDiv = document.createElement("div")
     cardDiv.innerHTML = ` <div class="card">
     <div class="cardimgcont">
         <div><img src=${data[index].image}></div>
         <div><p>${data[index].symbol.toUpperCase()}</p><p class="curname">${data[index].name}</p>
         </div>
     </div>
     <div class ="percentage">
     <div class=${Math.sign(data[index].price_change_percentage_24h)>0 ? "green" : "red"}>
     <p>${data[index].price_change_percentage_24h}%</p>
     </div>
     
     </div>
    
     <p class="volume">Total Volume: $${data[index].total_volume}</p>
     <p>Market Cap: $${data[index].market_cap}</p>
 </div>`
 gridContainer.appendChild(cardDiv)





    






        var row = table.insertRow(index);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);

        cell1.innerHTML = `<div class="detailCont"><div><img src=${data[index].image}></div><div><p>${data[index].symbol.toUpperCase()}</p><p class="curname">${data[index].name}</p></div></div>`;
        cell2.innerHTML = `<p >${data[index].price_change_percentage_24h}%</p>`
        var classname = Math.sign(data[index].price_change_percentage_24h)>0 ? "green" : "red"
        cell2.classList.add(classname);
        cell3.innerHTML = `<p>$${data[index].current_price}</p>`
        cell4.innerHTML = `<p>Mkt Cap : $${data[index].market_cap}</p>`
        cell5.innerHTML = `<p>$${data[index].total_volume}</p>`
       
        


    }

}



fetchData()