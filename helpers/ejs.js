const moment = require('moment');

module.exports = {
    truncate(str, len){
        if(str.length > len && str.length > 0){
            let newStr = str + " ";
            newStr = str.substr(0, len);
            newStr = str.substr(0, newStr.lastIndexOf(" "));
            newStr = (newStr.length > 0) ? newStr : str.substr(0, len);
            return newStr + '...';
        }
        return str;
    },
    formatDate(date, format){
        return moment(date).format(format);
    },
    select(selected, options){
        return options.fn(this).replace(new RegExp(' value=\"' + selected + '\"'), '$& selected="selected"').replace( new RegExp('>' + selected + '</option>'), 'selected="selected"$&');
    }
}