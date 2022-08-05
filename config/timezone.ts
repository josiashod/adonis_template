import {default as tz} from "./timezones/timezones.json"
  


export const out = tz.reduce((acc, val) => {
  acc[val.abbr] = {
    text: val.text,
    abbr: val.abbr,
    offset: val.offset
  };

  return acc
})

