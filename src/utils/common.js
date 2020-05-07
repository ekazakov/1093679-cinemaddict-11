import {VALUE_HOUR} from "./const.js";

import moment from "moment";

export const formatCommentDate = (dateObj) => {
  /* const formatTime = (value) => {
    return value < 10 ? `0${value}` : String(value);
  };
  return `${dateObj.getFullYear()}/${dateObj.getMonth() + 1}/${dateObj.getDate()} ${formatTime(dateObj.getHours())}:${formatTime(dateObj.getMinutes())}`;*/
  return `${moment(dateObj).fromNow()}`;
};

export const formatShortDateMovie = (dateObj) => {
  // return `${dateObj.getFullYear()}`;
  return `${moment(dateObj).format(`yyyy`)}`;
};

export const formatFullDateMovie = (dateObj) => {
  // return `${dateObj.getDate()} ${MONTH_NAMES[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
  return `${moment(dateObj).format(`d MMMM yyyy`)}`;
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
  if (!hours && minutes) {
    return `${minutes}m`;
  }
  if (hours && !minutes) {
    return `${hours}h`;
  }
  return `${hours}h ${minutes}m`;
};
