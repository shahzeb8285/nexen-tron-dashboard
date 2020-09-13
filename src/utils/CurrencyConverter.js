
export default class CurrencyConverter {
    static myInstance = null;
    rate = 0;
    

    static  getInstance() {
        if (CurrencyConverter.myInstance == null) {
            CurrencyConverter.myInstance = new CurrencyConverter();
            //  CurrencyConverter.myInstance.init();
        }

        return this.myInstance;
    }

    async fetchCurrency(){
        var res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tron&vs_currencies=usd')
        // .then(response => response.json())
        // .then(data => {
        //     this.rate = data.tron.usd
        //     callback(this.rate,false);
        // });
        var rate =await  res.json();
        rate = rate.tron.usd
        console.log("usd",rate)
        return rate;
    }
    
}