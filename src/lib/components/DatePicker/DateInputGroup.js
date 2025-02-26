import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import DateInput from './DateInput';
import CalendarIcon from '../../assets/svg/calendar.svg';

const DateInputGroup = ({
  inputFocus,
  handleClickDateInput,
  fromDate,
  toDate,
  minDate,
  maxDate,
  handleChangeDate,
  startDatePlaceholder,
  endDatePlaceholder,
  dateFormat,
  isSingle,
  onFocus,
  nonFocusable,
  dateInputSeperator,
  customInputLabel,
}) => {
  function getDateFromValue(action, value) {
    if (action === 'prev') {
      return dayjs(value).subtract(1, 'day');
    }

    return dayjs(value).add(1, 'day');
  }

  function handleChangeFromDate(action, value) {
    const date = getDateFromValue(action, value);
    handleChangeDate(date, 'from');
  }

  function handleChangeToDate(action, value) {
    const date = getDateFromValue(action, value);
    handleChangeDate(date, 'to');
  }

  return (
    <div className="date-picker-input" onClick={handleClickDateInput}>
      {customInputLabel.trim() !== '' && (
        <div className="custom-input-wrapper">
          <CalendarIcon className="icon-calendar" viewBox="0 0 24 24" />
          <div>{customInputLabel}</div>
        </div>
      )}
      {customInputLabel.trim() === '' && (
        <div className="date-picker-date-group">
          <DateInput
            showIcon
            tabIndex={nonFocusable ? '-1' : '0'}
            isFocus={inputFocus === 'from'}
            value={fromDate}
            placeholder={startDatePlaceholder}
            handleChangeDate={handleChangeFromDate}
            dateFormat={dateFormat}
            isSingle={isSingle}
            name="START_DATE"
            onFocus={onFocus}
            nonFocusable={nonFocusable}
            minDate={minDate}
            maxDate={maxDate}
          />
          {!isSingle && dateInputSeperator && (
            <div className="date-input-separator">{dateInputSeperator}</div>
          )}
          {!isSingle && (
            <DateInput
              tabIndex="0"
              isFocus={inputFocus === 'to'}
              value={toDate}
              placeholder={endDatePlaceholder}
              handleChangeDate={handleChangeToDate}
              dateFormat={dateFormat}
              name="END_DATE"
              nonFocusable={nonFocusable}
              minDate={minDate}
              maxDate={maxDate}
              fromDate={fromDate}
            />
          )}
        </div>
      )}
    </div>
  );
};

DateInputGroup.propTypes = {
  handleClickDateInput: PropTypes.func,
  inputFocus: PropTypes.string,
  fromDate: PropTypes.instanceOf(Date),
  toDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  handleChangeDate: PropTypes.func,
  startDatePlaceholder: PropTypes.string,
  endDatePlaceholder: PropTypes.string,
  dateFormat: PropTypes.string,
  isSingle: PropTypes.bool,
  onFocus: PropTypes.func,
  nonFocusable: PropTypes.bool,
  dateInputSeperator: PropTypes.node,
  customInputLabel: PropTypes.string,
};

DateInputGroup.defaultProps = {
  handleClickDateInput: () => {},
  inputFocus: null,
  fromDate: null,
  toDate: null,
  minDate: null,
  maxDate: null,
  handleChangeDate: () => {},
  startDatePlaceholder: null,
  endDatePlaceholder: null,
  dateFormat: '',
  isSingle: false,
  onFocus: () => {},
  nonFocusable: false,
  dateInputSeperator: null,
  customInputLabel: '',
};

export default DateInputGroup;
