import { Pipe, PipeTransform } from '@angular/core';

import moment from 'moment';

@Pipe({
  name: 'dateDiff',
  standalone: true
})
export class DateDiffPipe implements PipeTransform {

  transform(value: moment.Moment, diffWith: moment.Moment, unit: 'day' | 'hour' | 'minute', precise?: boolean): number {
    if (!value) {
      return 0;
    }

    let date = moment(value).clone();

    if (!precise) {
      precise = true;
    }

    // Reset time info when calculating day diff
    if (unit === 'day') {
      date = moment(value)
        .hour(0)
        .minute(0)
        .second(0);
    }

    return Math.ceil(moment(diffWith).diff(date, unit, precise));
  }

}
