let currency_name={};
let currency_symbol={};
let currency_code=[];
let curr_rate=0;
let getdata=async function(url){
    try{
        let data=await fetch(url);
        data=await data.json();
        return data;
    }
    catch(err)
    {
        console.log(err);
    }
    
}
let setbutton=(button,currency_code,num,name,symbol)=>{
    button.setAttribute('class','btn btn-outline-info dropdown_item');
    button.setAttribute('id',`${currency_code+num}`);
    button.style.width="100%";
    button.style.border="0px";
    button.style.color="black";
    button.innerText=name;

    button.onclick=async()=>{
        try{
            document.getElementById('dropdownMenuButton'+num).innerText=name;
            document.getElementById('code'+num).innerText=currency_code;
            document.getElementById('symbol'+num).innerText=symbol;
            document.getElementById('value1').value=0;
            document.getElementById('value2').value=0;

            let code1=document.getElementById('code1').innerText;
            let code2=document.getElementById('code2').innerText;

            let exchange_rate_data=await fetch(`https://api.exchangeratesapi.io/v1/latest?access_key=e077d4aaed97856fbd6b59219914797c`);
            exchange_rate_data=await exchange_rate_data.json();
            
            let rate1=1,rate2=1;
            if(code1!='EUR')
            {
               rate1=curr_rate=exchange_rate_data['rates'][code1];
            }
            if(code2!='EUR')
            {
                rate2=curr_rate=exchange_rate_data['rates'][code2];
            }
            curr_rate=rate2/rate1;
            
        }
        catch(err)
        {
            console.log(err);
        }
        
    }

}

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
    return getdata(`https://api.exchangeratesapi.io/v1/latest?access_key=e077d4aaed97856fbd6b59219914797c`);
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
    document.getElementById('value1').onkeyup=()=>{
        let amount=document.getElementById('value1').value;
        let converted_data=curr_rate*amount;

        document.getElementById('value2').value=converted_data;        

    }
    document.getElementById('value1').onclick=()=>{
        let amount=document.getElementById('value1').value;
        let converted_data=curr_rate*amount;
        
        document.getElementById('value2').value=converted_data;        

    }

})
.catch(err=>console.log(err));
