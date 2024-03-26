function formataData(data){
    const moment = require("moment");
    const dataFormatada = moment(data, "DD/MM/YYYY").format("YYYY-MM-DD");

    return dataFormatada
}

module.exports = { formataData };