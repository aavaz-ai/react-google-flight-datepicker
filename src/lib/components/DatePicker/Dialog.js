import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import BackIcon from '../../assets/svg/back.svg';
import DateInputGroup from './DateInputGroup';
import DialogContentMobile from './DialogContentMobile';
import DialogContentDesktop from './DialogContentDesktop';

const Dialog = ({
  toggleDialog,
  complsOpen,
  fromDate,
  toDate,
  hoverDate,
  onSelectDate,
  onHoverDate,
  handleReset,
  handleClickDateInput,
  inputFocus,
  handleChangeDate,
  startDatePlaceholder,
  endDatePlaceholder,
  startWeekDay,
  minDate,
  maxDate,
  dateFormat,
  weekDayFormat,
  monthFormat,
  isSingle,
  isMobile,
  highlightToday,
  hideDialogHeader,
  hideDialogFooter,
  dateInputSeperator,
  singleCalendar,
  customComponent,
  onSubmit,
  submitButtonLabel,
}) => {
  const [hideAnimation, setHideAnimation] = useState(false);
  const [dateChanged, setDateChanged] = useState();

  function onChangeDate(date, value) {
    setDateChanged(date);
    handleChangeDate(date, value);
  }

  function onClickSubmit() {
    onSubmit();
    toggleDialog();
  }

  useEffect(() => {
    if (complsOpen && !hideAnimation) {
      setHideAnimation(true);
    }
  }, [complsOpen]);

  return (
    <div
      className={cx('dialog-date-picker', {
        open: complsOpen,
        hide: !complsOpen && hideAnimation,
        single: singleCalendar && !isMobile,
      })}
    >
      {customComponent}
      {!hideDialogHeader && (
        <div className="dialog-header">
          <button
            type="button"
            className="btn-outline back-button"
            onClick={toggleDialog}
          >
            <BackIcon viewBox="0 0 492 492" />
          </button>
          <DateInputGroup
            inputFocus={inputFocus}
            handleClickDateInput={handleClickDateInput}
            fromDate={fromDate}
            toDate={toDate}
            minDate={minDate}
            maxDate={maxDate}
            handleChangeDate={onChangeDate}
            startDatePlaceholder={startDatePlaceholder}
            endDatePlaceholder={endDatePlaceholder}
            dateFormat={dateFormat}
            isSingle={isSingle}
            nonFocusable={!complsOpen}
            dateInputSeperator={dateInputSeperator}
          />
          <button
            type="button"
            className="btn-outline reset-button"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      )}
      <div className="dialog-content">
        {isMobile ? (
          <DialogContentMobile
            fromDate={fromDate}
            toDate={toDate}
            hoverDate={hoverDate}
            onSelectDate={onSelectDate}
            startWeekDay={startWeekDay}
            minDate={minDate}
            maxDate={maxDate}
            dateFormat={dateFormat}
            weekDayFormat={weekDayFormat}
            monthFormat={monthFormat}
            complsOpen={complsOpen}
            isSingle={isSingle}
            highlightToday={highlightToday}
          />
        ) : (
          <DialogContentDesktop
            fromDate={fromDate}
            toDate={toDate}
            hoverDate={hoverDate}
            onSelectDate={onSelectDate}
            onHoverDate={onHoverDate}
            startWeekDay={startWeekDay}
            minDate={minDate}
            maxDate={maxDate}
            dateFormat={dateFormat}
            weekDayFormat={weekDayFormat}
            monthFormat={monthFormat}
            isSingle={isSingle}
            complsOpen={complsOpen}
            dateChanged={dateChanged}
            highlightToday={highlightToday}
            singleCalendar={singleCalendar}
          />
        )}
      </div>
      {!hideDialogFooter && (
        <div className="dialog-footer">
          <button
            type="button"
            className="submit-button"
            onClick={onClickSubmit}
            tabIndex="0"
          >
            {submitButtonLabel}
          </button>
          <button
            type="button"
            className="btn-outline reset-button mobile"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

Dialog.propTypes = {
  complsOpen: PropTypes.bool,
  inputFocus: PropTypes.string,
  fromDate: PropTypes.instanceOf(Date),
  toDate: PropTypes.instanceOf(Date),
  hoverDate: PropTypes.instanceOf(Date),
  toggleDialog: PropTypes.func,
  handleClickDateInput: PropTypes.func,
  onSelectDate: PropTypes.func,
  onHoverDate: PropTypes.func,
  handleReset: PropTypes.func,
  handleChangeDate: PropTypes.func,
  startDatePlaceholder: PropTypes.string,
  endDatePlaceholder: PropTypes.string,
  startWeekDay: PropTypes.string,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  dateFormat: PropTypes.string,
  monthFormat: PropTypes.string,
  isSingle: PropTypes.bool,
  isMobile: PropTypes.bool,
  highlightToday: PropTypes.bool,
  weekDayFormat: PropTypes.string,
  hideDialogHeader: PropTypes.bool,
  hideDialogFooter: PropTypes.bool,
  dateInputSeperator: PropTypes.node,
  singleCalendar: PropTypes.bool,
  customComponent: PropTypes.func,
  onSubmit: PropTypes.func,
  submitButtonLabel: PropTypes.string,
};

Dialog.defaultProps = {
  complsOpen: false,
  inputFocus: null,
  fromDate: null,
  toDate: null,
  hoverDate: null,
  toggleDialog: () => {},
  handleClickDateInput: () => {},
  onSelectDate: () => {},
  onHoverDate: () => {},
  handleReset: () => {},
  handleChangeDate: () => {},
  startDatePlaceholder: null,
  endDatePlaceholder: null,
  startWeekDay: null,
  minDate: null,
  maxDate: null,
  dateFormat: '',
  monthFormat: '',
  isSingle: false,
  isMobile: false,
  highlightToday: false,
  weekDayFormat: '',
  hideDialogHeader: false,
  hideDialogFooter: false,
  dateInputSeperator: null,
  singleCalendar: false,
  customComponent: null,
  onSubmit: () => {},
  submitButtonLabel: 'Done',
};

export default Dialog;
