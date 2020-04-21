import {MONTH_NAMES} from "./const.js";
import {VALUE_HOUR} from "./const.js";
import {RenderPosition} from "./const.js";

export const formatCommentDate = (dateObj) => {
  const formatTime = (value) => {
    return value < 10 ? `0${value}` : String(value);
  };
  return `${dateObj.getFullYear()}/${dateObj.getMonth() + 1}/${dateObj.getDate()} ${formatTime(dateObj.getHours())}:${formatTime(dateObj.getMinutes())}`;
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
  if (!hours && minutes) {
    return `${minutes}m`;
  }
  if (hours && !minutes) {
    return `${hours}h`;
  }
  return `${hours}h ${minutes}m`;
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  // newElement.innerHTML = template;
  newElement.insertAdjacentHTML(RenderPosition.BEFOREEND, template);

  return newElement.firstChild;
};
export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};
