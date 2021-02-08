let getdata=async function(url){
    let data=await fetch(url);
    data=await data.json();
    return data;
}
let setbutton=(button,currency_code,num,name,symbol)=>{
    button.setAttribute('class','btn btn-outline-info dropdown_item');
    button.setAttribute('id',`${currency_code+num}`);
    button.style.width="100%";
    button.style.border="0px";
    button.style.color="black";
    button.innerText=name;

    button.onclick=()=>{
        document.getElementById('dropdownMenuButton'+num).innerText=name;
        document.getElementById('code'+num).innerText=currency_code;
        document.getElementById('symbol'+num).innerText=symbol;
        document.getElementById('value1').value=0;
        document.getElementById('value2').value=0;
    }

}
let currency_name={};
let currency_symbol={};
let currency_code=[];
getdata("https://restcountries.eu/rest/v2/all").then((data)=>{
    
    for(let i=0;i<data.length;i++)
    {
        for(let j=0;j<data[i].currencies.length;j++)
        {
            let code=data[i].currencies[j].code;
            if(!currency_name[`${code}`] && code!="(none)" && code!=null)
            {
                currency_name[`${code}`]=data[i].currencies[j].name;
                currency_symbol[`${code}`]=data[i].currencies[j].symbol;
            }
        }
    }
    return getdata(`https://api.exchangeratesapi.io/latest`);
}).then((data)=>{
    currency_code=Object.keys(data['rates']);
    currency_code.push("EUR");
    for(let i=0;i<currency_code.length;i++)
    {
        let name=document.getElementById('names1');
        let list=document.createElement('li');
        let button=document.createElement('button');
        setbutton(button,currency_code[i],'1',currency_name[currency_code[i]],currency_symbol[currency_code[i]]);
        list.append(button);
        name.append(list);

        name=document.getElementById('names2');
        list=document.createElement('li');
        button=document.createElement('button');
        setbutton(button,currency_code[i],'2',currency_name[currency_code[i]],currency_symbol[currency_code[i]]);
        list.append(button);
        name.append(list);
    }
    document.getElementById('INR1').click();
    document.getElementById('USD2').click();
    document.getElementById('value1').onkeyup=async()=>{
        let amount=document.getElementById('value1').value;
        let code1=document.getElementById('code1').innerText;
        let code2=document.getElementById('code2').innerText;

        let exchange_rate_data=await fetch(`https://api.exchangeratesapi.io/latest?base=${code1}&symbols=${code2}`);
        exchange_rate_data=await exchange_rate_data.json();

        let rate=exchange_rate_data['rates'][code2];
        let converted_data=rate*amount;

        document.getElementById('value2').value=converted_data;        

    }
    document.getElementById('value1').onclick=async()=>{
        let amount=document.getElementById('value1').value;
        let code1=document.getElementById('code1').innerText;
        let code2=document.getElementById('code2').innerText;

        let exchange_rate_data=await fetch(`https://api.exchangeratesapi.io/latest?base=${code1}&symbols=${code2}`);
        exchange_rate_data=await exchange_rate_data.json();

        let rate=exchange_rate_data['rates'][code2];
        let converted_data=rate*amount;
        
        document.getElementById('value2').value=converted_data;        

    }

})
.catch(err=>console.log(err));