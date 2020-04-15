import {MONTH_NAMES} from "./const.js";
import {VALUE_HOUR} from "./const.js";

export const formatCommentDate = (dateObj) => {
  return `${dateObj.getFullYear()}/${dateObj.getMonth() + 1}/${dateObj.getDate()} ${dateObj.getHours()}:${dateObj.getMinutes()}`;
};

export const formatShortDateMovie = (dateObj) => {
  return `${dateObj.getFullYear()}`;
};

export const formatFullDateMovie = (dateObj) => {
  return `${dateObj.getDate()} ${MONTH_NAMES[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
};

export const formatTimeLengthMovie = (value) => {
  let hours = 0;
  let minutes = 0;
  for (let i = 0; i < value; i++) {
    if (value >= VALUE_HOUR) {
      hours++;
      value -= VALUE_HOUR;
    } else {
      minutes = value;
      break;
    }
  }
  return `${hours}h : ${minutes}m`;
};
