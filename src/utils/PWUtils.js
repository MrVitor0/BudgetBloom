class PWUtils {

    static findOptionByValue(options, value) {
        return options.find(option => option.value === value);
    }

}

export default PWUtils;