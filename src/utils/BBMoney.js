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
      return (amount / 100).toFixed(2);
    };
      

}

export default BBMoney;