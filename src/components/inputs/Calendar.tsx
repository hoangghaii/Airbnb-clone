import { FC } from 'react';
import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

type Props = {
  value: Range;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
};

const Calendar: FC<Props> = ({ value, onChange, disabledDates }: Props) => {
  return (
    <DateRange
      rangeColors={['#262626']}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  );
};

export default Calendar;
