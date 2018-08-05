import moment from 'moment';

export const tValueOf = (t) =>
   moment(t, 'm:ss.SSS').valueOf();

export const tStringOf = (t) =>
  moment(t).format('m:ss.SSS');
