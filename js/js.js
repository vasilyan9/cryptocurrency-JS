const byId = (id, value) => {
    document.getElementById(id).innerHTML = value;
};
const qS = (item) => {
    return document.querySelector(item);
};
const creatE = (item) => {
    return document.createElement(item);
};
const elem = (elem, item) => {
    if (item.percentChange24h > 0) {
        elem.innerHTML = item.percentChange24h + `<span><i class="fas fa-long-arrow-alt-up"></i></span>`;
        elem.style.color = '#048D63';
    } else {
        elem.innerHTML = item.percentChange24h + `<span><i class="fas fa-long-arrow-alt-down"></i></span>`;
        elem.style.color = '#5D2860';
    }
};

async function getBitcoin(x){
    try{
        const resp = await fetch(`https://api.udilia.com/coins/v1/cryptocurrencies?page=${x}&perPage=20`);
        const data = await resp.json();
            qS('table').innerHTML = ''
            data.currencies.map(item => {
                let tr = creatE('tr');
                let name = creatE('td');
                let price = creatE('td');
                let marketCap = creatE('td');
                let percentChange24h = creatE('td');    
                let nameItem =  item.name;
                
                name.innerHTML  = `<span>${item.rank}</span> ${item.name}`;
                price.innerHTML = `<span>$</span>` + item.price;
                marketCap.innerHTML = `<span>$</span>` + item.marketCap;
                elem(percentChange24h, item);
            
                tr.appendChild(name);
                tr.appendChild(price);
                tr.appendChild(marketCap);
                tr.appendChild(percentChange24h);
                qS('table').appendChild(tr);

                // ------------------------- idFetch ----------------------
                name.addEventListener('click',()=> {
                    if(nameItem == item.name) {
                        fetch(`https://api.udilia.com/coins/v1/cryptocurrencies/${item.id}`).then((resp) => resp.json())
                        .then((data)=> {

                        byId('name', `${data.name} (${data.symbol})`);
                        byId('price', data.price);
                        byId('marketCap', data.marketCap);
                        byId('rank', data.rank);
                        byId('volume', data.volume24h);
                        byId('totalSuplay', data.totalSupply);
                        elem(change, data);

                        qS('#section').style.display = 'flex';
                        qS('table').style.display = 'none';  
                        qS('#x').addEventListener('click',()=> {
                            qS('#section').style.display = 'none';
                            qS('table').style.display = 'table';
                        });
                    });
                }
                });
            });
        }      
    catch(error) {
   
    };
};

async function search(){
    try{
        const input = qS('#search').value;
        const resp = await fetch(`https://api.udilia.com/coins/v1/autocomplete?searchQuery=${input}`);
        const data = await resp.json();
        qS('#input').innerHTML ='';

        data.map(item => {
            qS('#input').style.display = 'flex';
            let span = creatE('span');
            span.innerHTML = item.name;
            qS('#input').appendChild(span);
        
            span.addEventListener('click',()=> {
                qS('#input').style.display = 'none';
                byId('name', `${item.name} (${item.symbol})`);
                byId('price', item.price);
                byId('marketCap', item.marketCap);
                byId('rank', item.rank);
                byId('volume', item.volume24h);
                byId('totalSuplay', item.totalSupply);
                elem(change, item);

                qS('#section').style.display = 'flex';
                qS('table').style.display = 'none';
                qS('#x').addEventListener('click',()=> {
                    qS('#section').style.display = 'none';
                    qS('table').style.display = 'table';
                });
            })
        });

    }
    catch(error) {
        qS('#input').style.display = 'none';
    }
}

getBitcoin(1)
let x = 1

qS('footer > span:first-of-type').addEventListener('click',()=> {
    if (x <= 5 && x >= 2){
        x--
        getBitcoin(x)
        qS('footer span>span').innerHTML = x;
    }
})
qS('footer > span:last-of-type').addEventListener('click',()=> {
  
    if (x <= 4 && x >= 1) {
        x++
        getBitcoin(x)
        qS('footer span>span').innerHTML = x;  
    }
})