class BBMoney {
    
    _amount = 0;

    constructor(value) {
        this._amount = value;
    }

    get value() {
        return this._amount;
    }
    set value(value) {
        this._amount = value;
    }

    static toRaw = (amount = 0) => {
        if(typeof amount === "number"){
            amount = amount.toFixed(2);
        }
        return (amount.toString()).replace(/\D+/g, "");
    }
   
    /**
     * @description Retorna o valor formatado em moeda
     * @param {*} amount 
     * @param {*} locale 
     * @returns 
     */
    static toCurrency = (amount = 0, locale = "pt-BR") => {
        amount = this.toRaw(amount);
        const formatter = new Intl.NumberFormat(locale, {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        return formatter.format(amount / 100);
    }
    static toDouble = (amount = 0) => {
        amount = this.toRaw(amount);
        let output = (amount / 100).toFixed(2);
        return parseFloat(output);
    };

}

export default BBMoney;