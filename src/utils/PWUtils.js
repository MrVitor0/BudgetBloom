import Swal from 'sweetalert2';
import BBMoney from './BBMoney';
class PWUtils {

    static formatDate(date) {
        const dateObject = new Date(date);
        const month = dateObject.getMonth() + 1;
        const day = dateObject.getDate();
        const year = dateObject.getFullYear();
        const hours = dateObject.getHours();
        const minutes = dateObject.getMinutes().toString().padStart(2, '0');
        return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year} ${hours}:${minutes}`;
    }   


    /**
     * @description This method returns a custom date in ISO_8601 format
     * @param {*} d_month 
     * @param {*} d_year 
     * @param {*} d_day 
     * @returns 
     */
    static toISO_8601(d_year, d_month, d_day = 1, useTime = false){
        try {
            let date = new Date();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            if(month != d_month || year != d_year){
              if(useTime){
                date = new Date(d_year, d_month, d_day, date.getHours(), date.getMinutes(), date.getSeconds());
              }else{
                date = new Date(d_year, d_month, d_day);
              }
            }
            return date.toISOString();
        } catch (error) {
            throw new Error('Invalid date');
        }
    }


    static validateInvestmentObject(investmentObject) {
        if(investmentObject?.description && investmentObject?.name && investmentObject?.aport && investmentObject?.subtitle && investmentObject?.objective){
            return true;
        }
        return false
    }

    static progressPercentage(aport, objective) {
        let result = (BBMoney.toDouble(aport) / BBMoney.toDouble(objective)) * 100
        result = Math.round(result * 100) / 100;
        if(isNaN(result)) return 0;
        //check if result is greater than 100
        if(result > 100) return 100;
        return result.toFixed(2);
    }

    /**
     * @description This method is used to get the value of a given key from the query string
     * @param {*} options 
     * @param {*} value 
     * @returns {Object}
     */
    static findOptionByValue(options, value) {
        let result = options.find(option => option.value === value)
        if (!result) {
            result = { value: 'N/A', label: value }
        }
        return result;
    }

    static getCurrentMonth() {
        //return the name of the current month
        const date = new Date();
        const month = date.getMonth();
        //portuguese months
        const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
        return months[month];
    }

    /**
     * @description This method is used to get the current date
     * @returns {String}
     */
    static getCurrentDate(type = false, _date = false) {
        const date = !_date ? new Date() : _date;
        switch (type) {
            case 'credit':
                return new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
            case 'credit-last':
                return new Date(date.getFullYear(), date.getMonth(), 0).toISOString();
            default:
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        }
    }

    /**
     * @description This method is used to format a date
     * @param {*} month 
     * @param {*} year 
     * @returns 
     */
    static createNewBillDate(month, year){
        try {
            month = parseInt(month);
            year = parseInt(year);
            if(month < 1 || month > 12 || year < 2000 || year > 2100){
                return false;
            }
            return new Date(year, month, 0).toISOString();
        } catch (error) {
            throw new Error('Invalid month or year');
        }
    }

    /**
     * @description This method is used to show a notification
     * @param {*} title 
     * @param {*} type 
     * @returns {void}
     */
    static PWNotification(type, title) {
        Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        }).fire({
                icon: type,
                title: title
        })
    }


    /**
     * @description This method is used to show a popup
     * @param {*} title 
     * @param {*} type 
     * @returns {void}
     */
    static async PWPopup(title, message, type = "warning", confirmButtonText = 'Yes!', cancelButtonText = 'No :(') {
       const response = await Swal.fire({
            icon: type,
            title: title,
            html: message,
            showConfirmButton: true,
            confirmButtonText: confirmButtonText,
            showCancelButton: true,
            cancelButtonText: cancelButtonText,
        })
        return response.isConfirmed;
    }
}

export default PWUtils;