import Swal from 'sweetalert2';
class PWUtils {

    static formatDate(date) {
        const dateObject = new Date(date);
        return `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;
    }

    static validateInvestmentObject(investmentObject) {
        if(investmentObject?.description && investmentObject?.title && investmentObject?.icon && investmentObject?.toAport && investmentObject?.fromDate && investmentObject?.subtitle && investmentObject?.fromBudget && investmentObject?.toBudget){
            return true;
        }
        return false
    }
    /**
     * @description This method is used to get the value of a given key from the query string
     * @param {*} options 
     * @param {*} value 
     * @returns {Object}
     */
    static findOptionByValue(options, value) {
        return options.find(option => option.value === value);
    }

    /**
     * @description This method is used to get the current date
     * @returns {String}
     */
    static getCurrentDate() {
        const date = new Date();
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
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

}

export default PWUtils;