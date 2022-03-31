import moment from "moment";

const TIMESTAMP_FORMAT = "x";

export function timeStampX() {
  return moment().format(TIMESTAMP_FORMAT);
}

export function minutesSinceTime(prev) {
  let now = timeStampX();
  let momentdiff = moment().diff(moment(prev, TIMESTAMP_FORMAT), "minutes");

  return momentdiff;
}

export function convertDateFormat(date) {
  return date.toISOString().split('T')[0];
}

export function convertTimeFormat(time) {
  time = time.toISOString().replace("T", " ");
  time = time.substring(0, 19);
  var dt = moment(time).format("hh:mm a");
  return dt.toString();
}