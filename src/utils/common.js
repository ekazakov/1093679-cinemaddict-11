import {VALUE_HOUR, LENGTH_DESCRIPTION} from "./const.js";

import moment from "moment";

export const formatCommentDate = (dateObj) => {
  return `${moment(dateObj).fromNow()}`;
};

export const formatShortDateMovie = (dateObj) => {
  return `${moment(dateObj).format(`yyyy`)}`;
};

export const formatFullDateMovie = (dateObj) => {
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

export const getFormatDescription = (description) => {
  if (description.length >= LENGTH_DESCRIPTION.UNACCEPTABLE) {
    return description.split(``).slice(0, LENGTH_DESCRIPTION.ACCEPTABLE).join(``) + `...`;
  }
  return description;
};
