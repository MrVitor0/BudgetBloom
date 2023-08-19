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
        amount = amount.toString();
        return amount.replace(/\D+/g, "");
    }
    /**
     * @description Retorna o valor formatado em moeda
     * @param {*} amount 
     * @param {*} locale 
     * @returns 
     */
    static toCurrency = (amount = 0, locale = "pt-BR") => {
        const formatter = new Intl.NumberFormat(locale, {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        return formatter.format(amount / 100);
    }
    static toDouble = (amount = 0) => {
        if (typeof amount === "string") {
            amount = amount.replace(/\D+/g, "");
            amount = parseFloat(amount);
        }
        let output = (amount / 100).toFixed(2);
        return output;
    };

    
    
    
    
    
      

}

export default BBMoney;