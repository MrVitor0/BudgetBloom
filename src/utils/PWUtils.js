class PWUtils {

    static findOptionByValue(options, value) {
        return options.find(option => option.value === value);
    }

    static getCurrentDate() {
        const date = new Date();
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }

}

export default PWUtils;