import moment from "moment/moment.js";

export function formatDateTime(datetime) {
    return moment(datetime).format('DD/MM/YYYY h:mm:ss A')
}