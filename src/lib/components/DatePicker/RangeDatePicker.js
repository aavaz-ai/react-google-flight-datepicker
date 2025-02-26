/* eslint-disable indent */
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import dayjs from 'dayjs';
import { debounce } from '../../helpers';
import './styles.scss';
import DateInputGroup from './DateInputGroup';
import DialogWrapper from './DialogWrapper';
import Dialog from './Dialog';

const RangeDatePicker = ({
  startDate,
  endDate,
  startDatePlaceholder,
  endDatePlaceholder,
  className,
  disabled,
  onChange,
  onFocus,
  startWeekDay,
  minDate,
  maxDate,
  dateFormat,
  weekDayFormat,
  monthFormat,
  highlightToday,
  hideDialogHeader,
  hideDialogFooter,
  dateInputSeperator,
  hideDialogAfterSelectEndDate,
  isOpen,
  onCloseCalendar,
  customComponent,
  onSubmit,
  submitButtonLabel,
  customInputLabel,
}) => {
  const [complsOpen, setComplsOpen] = useState(false);
  const containerRef = useRef(null);
  const [inputFocus, setInputFocus] = useState('from');
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const fromDateRef = useRef();
  const toDateRef = useRef();
  const [hoverDate, setHoverDate] = useState();
  const [isFirstTime, setIsFirstTime] = useState(false);

  function handleDocumentClick(e) {
    if (
      containerRef.current &&
      containerRef.current.contains(e.target) === false
    ) {
      setComplsOpen(false);
    }
  }

  function notifyChange() {
    const _startDate = fromDateRef.current
      ? fromDateRef.current.toDate()
      : null;
    const _endDate = toDateRef.current ? toDateRef.current.toDate() : null;
    onChange(_startDate, _endDate);
  }

  const debounceNotifyChange = debounce(notifyChange, 20);

  function updateFromDate(dateValue, shouldNotifyChange = false) {
    setFromDate(dateValue);
    fromDateRef.current = dateValue;
    if (shouldNotifyChange) {
      debounceNotifyChange();
    }
  }

  function updateToDate(dateValue, shouldNotifyChange = false) {
    setToDate(dateValue);
    toDateRef.current = dateValue;
    if (shouldNotifyChange) {
      debounceNotifyChange();
    }
  }

  useEffect(() => {
    setIsFirstTime(true);
    document.addEventListener('click', handleDocumentClick);

    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  useEffect(() => {
    const _startDateJs = startDate ? dayjs(startDate) : null;
    fromDateRef.current = _startDateJs;
    updateFromDate(_startDateJs, false);
  }, [startDate]);

  useEffect(() => {
    const _endDateJs = endDate ? dayjs(endDate) : null;
    toDateRef.current = _endDateJs;
    updateToDate(_endDateJs, false);
  }, [endDate]);

  useEffect(() => {
    if (!complsOpen && isFirstTime) {
      onCloseCalendar(startDate, endDate);
    }
  }, [complsOpen]);

  useEffect(() => {
    setComplsOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (isFirstTime) {
      const input =
        inputFocus === 'from'
          ? 'Start Date'
          : inputFocus === 'to'
          ? 'End Date'
          : '';
      onFocus(input);
    }
  }, [inputFocus]);

  function toggleDialog() {
    setComplsOpen(!complsOpen);
  }

  function handleClickDateInput() {
    if (disabled) {
      return;
    }

    toggleDialog();
  }

  function onSelectDate(date) {
    if (inputFocus) {
      if (
        inputFocus === 'from' ||
        (fromDate && date.isBefore(fromDate, 'date'))
      ) {
        updateFromDate(date, true);
        if (toDate && date.isAfter(toDate, 'date')) {
          updateToDate(null, true);
        }
        setInputFocus('to');
      } else {
        updateToDate(date, true);
        setInputFocus(null);
        if (hideDialogAfterSelectEndDate) {
          setTimeout(() => {
            setComplsOpen(false);
          }, 50);
        }
      }
    } else {
      updateFromDate(date, true);
      setInputFocus('to');
      if (toDate && date.isAfter(toDate, 'date')) {
        updateToDate(null, true);
      }
    }
  }

  function onHoverDate(date) {
    setHoverDate(date);
  }

  function handleReset() {
    setInputFocus('from');
    setHoverDate(null);
    updateFromDate(null, true);
    updateToDate(null, true);
  }

  function handleChangeDate(value, input) {
    if (
      (minDate && dayjs(minDate).isAfter(value, 'date')) ||
      (maxDate && dayjs(maxDate).isBefore(value, 'date'))
    ) {
      return;
    }

    if (input === 'from') {
      setInputFocus('from');
      updateFromDate(value, true);
      if (value > toDate) {
        updateToDate(null, true);
      }
    } else {
      setInputFocus('to');
      updateToDate(value, true);
    }
  }

  return (
    <div className="react-google-flight-datepicker">
      <div
        className={cx(
          'date-picker',
          className,
          {
            disabled,
          },
          { 'custom-input-label': customInputLabel.trim() !== '' }
        )}
        ref={containerRef}
      >
        <DateInputGroup
          handleClickDateInput={handleClickDateInput}
          fromDate={fromDate}
          toDate={toDate}
          minDate={minDate}
          maxDate={maxDate}
          handleChangeDate={handleChangeDate}
          startDatePlaceholder={startDatePlaceholder}
          endDatePlaceholder={endDatePlaceholder}
          dateFormat={dateFormat}
          onFocus={() => null}
          nonFocusable={complsOpen}
          dateInputSeperator={dateInputSeperator}
          inputFocus={inputFocus}
          customInputLabel={customInputLabel}
        />
        <DialogWrapper isMobile={false}>
          <Dialog
            complsOpen={complsOpen}
            toggleDialog={toggleDialog}
            handleClickDateInput={handleClickDateInput}
            inputFocus={inputFocus}
            setInputFocus={setInputFocus}
            onSelectDate={onSelectDate}
            onHoverDate={onHoverDate}
            fromDate={fromDate}
            toDate={toDate}
            hoverDate={hoverDate}
            handleReset={handleReset}
            handleChangeDate={handleChangeDate}
            startDatePlaceholder={startDatePlaceholder}
            endDatePlaceholder={endDatePlaceholder}
            startWeekDay={startWeekDay}
            minDate={minDate}
            maxDate={maxDate}
            weekDayFormat={weekDayFormat}
            dateFormat={dateFormat}
            monthFormat={monthFormat}
            isMobile={false}
            highlightToday={highlightToday}
            hideDialogHeader={hideDialogHeader}
            hideDialogFooter={hideDialogFooter}
            dateInputSeperator={dateInputSeperator}
            customComponent={customComponent}
            onSubmit={onSubmit}
            submitButtonLabel={submitButtonLabel}
          />
        </DialogWrapper>
      </div>
    </div>
  );
};

RangeDatePicker.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  startDatePlaceholder: PropTypes.string,
  endDatePlaceholder: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  startWeekDay: PropTypes.oneOf(['monday', 'sunday']),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  dateFormat: PropTypes.string,
  monthFormat: PropTypes.string,
  highlightToday: PropTypes.bool,
  dateInputSeperator: PropTypes.node,
  hideDialogHeader: PropTypes.bool,
  hideDialogFooter: PropTypes.bool,
  weekDayFormat: PropTypes.string,
  hideDialogAfterSelectEndDate: PropTypes.bool,
  isOpen: PropTypes.bool,
  onCloseCalendar: PropTypes.func,
  customComponent: PropTypes.func,
  onSubmit: PropTypes.func,
  submitButtonLabel: PropTypes.string,
  customInputLabel: PropTypes.string,
};

RangeDatePicker.defaultProps = {
  startDate: null,
  endDate: null,
  className: '',
  disabled: false,
  startDatePlaceholder: 'Start date',
  endDatePlaceholder: 'End date',
  onChange: () => {},
  onFocus: () => {},
  startWeekDay: 'monday',
  minDate: null,
  maxDate: null,
  weekDayFormat: 'dd',
  dateFormat: '',
  monthFormat: '',
  highlightToday: false,
  dateInputSeperator: null,
  hideDialogHeader: false,
  hideDialogFooter: false,
  hideDialogAfterSelectEndDate: false,
  isOpen: false,
  onCloseCalendar: () => {},
  customComponent: null,
  hideInputLabels: false,
  onSubmit: () => {},
  submitButtonLabel: 'Done',
  customInputLabel: '',
};

export default RangeDatePicker;
