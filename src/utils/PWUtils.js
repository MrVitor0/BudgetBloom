import Swal from 'sweetalert2';
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