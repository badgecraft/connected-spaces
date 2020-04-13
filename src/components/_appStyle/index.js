import { Global, css } from '@emotion/core';
import emotionNormalize from 'emotion-normalize';
import { withProps } from 'recompose';
import fonts from '../../ui/fonts';

const styles = css`
    ${fonts}
    ${emotionNormalize}
    
    html, body, div, span, h1, h2, h3, h4, h5, h6 {
      font-family: 'Roboto';
      letter-spacing: 0.3pt;
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      vertical-align: baseline;
    }

    html, body {
        height: 100%;
        width: 100%;
    }
    
    html {
        scroll-behavior: smooth;
    }
    
    * {
        box-sizing: border-box;
    }

    #app {
        height: 100%;
    }

    a {
        color: inherit;
    }

    /*!
 * https://github.com/YouCanBookMe/react-datetime
 */

    .rdt {
        position: relative;
        width: 100%;
    }
    .rdtPicker {
        display: none;
        position: absolute;
        width: 250px;
        padding: 4px;
        margin-top: 1px;
        z-index: 99999 !important;
        background: #fff;
        box-shadow: 0 1px 3px rgba(0,0,0,.1);
        border: 1px solid #f9f9f9;
    }
    .rdtOpen .rdtPicker {
        display: block;
    }
    .rdtStatic .rdtPicker {
        box-shadow: none;
        position: static;
    }

    .rdtPicker .rdtTimeToggle {
        text-align: center;
    }

    .rdtPicker table {
        width: 100%;
        margin: 0;
    }
    .rdtPicker td,
    .rdtPicker th {
        text-align: center;
        height: 28px;
    }
    .rdtPicker td {
        cursor: pointer;
    }
    .rdtPicker td.rdtDay:hover,
    .rdtPicker td.rdtHour:hover,
    .rdtPicker td.rdtMinute:hover,
    .rdtPicker td.rdtSecond:hover,
    .rdtPicker .rdtTimeToggle:hover {
        background: #eeeeee;
        cursor: pointer;
    }
    .rdtPicker td.rdtOld,
    .rdtPicker td.rdtNew {
        color: #999999;
    }
    .rdtPicker td.rdtToday {
        position: relative;
        border: 1px solid #121212;
    }
    .rdtPicker td.rdtToday:before {
        content: '';
        display: inline-block;
        border-left: 7px solid transparent;
        border-bottom: 7px solid #f91942;
        border-top-color: rgba(0, 0, 0, 0.2);
        position: absolute;
        bottom: 4px;
        right: 4px;
    }
    .rdtPicker td.rdtActive,
    .rdtPicker td.rdtActive:hover {
        background-color: #f91942;
        color: #fff;
        text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
    }
    .rdtPicker td.rdtActive.rdtToday:before {
        border-bottom-color: #fff;
    }
    .rdtPicker td.rdtDisabled,
    .rdtPicker td.rdtDisabled:hover {
        background: none;
        color: #999999;
        cursor: not-allowed;
    }

    .rdtPicker td span.rdtOld {
        color: #999999;
    }
    .rdtPicker td span.rdtDisabled,
    .rdtPicker td span.rdtDisabled:hover {
        background: none;
        color: #999999;
        cursor: not-allowed;
    }
    .rdtPicker th {
        border-bottom: 1px solid #f9f9f9;
    }
    .rdtPicker .dow {
        width: 14.2857%;
        border-bottom: none;
        cursor: default;
    }
    .rdtPicker th.rdtSwitch {
        width: 100px;
    }
    .rdtPicker th.rdtNext,
    .rdtPicker th.rdtPrev {
        font-size: 21px;
        vertical-align: top;
    }

    .rdtPrev span,
    .rdtNext span {
        display: block;
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none;   /* Chrome/Safari/Opera */
        -khtml-user-select: none;    /* Konqueror */
        -moz-user-select: none;      /* Firefox */
        -ms-user-select: none;       /* Internet Explorer/Edge */
        user-select: none;
    }

    .rdtPicker th.rdtDisabled,
    .rdtPicker th.rdtDisabled:hover {
        background: none;
        color: #999999;
        cursor: not-allowed;
    }
    .rdtPicker thead tr:first-child th {
        cursor: pointer;
    }
    .rdtPicker thead tr:first-child th:hover {
        background: #eeeeee;
    }

    .rdtPicker tfoot {
        border-top: 1px solid #f9f9f9;
    }

    .rdtPicker button {
        border: none;
        background: none;
        cursor: pointer;
    }
    .rdtPicker button:hover {
        background-color: #eee;
    }

    .rdtPicker thead button {
        width: 100%;
        height: 100%;
    }

    td.rdtMonth,
    td.rdtYear {
        height: 50px;
        width: 25%;
        cursor: pointer;
    }
    td.rdtMonth:hover,
    td.rdtYear:hover {
        background: #eee;
    }

    .rdtCounters {
        display: inline-block;
    }

    .rdtCounters > div {
        float: left;
    }

    .rdtCounter {
        height: 100px;
    }

    .rdtCounter {
        width: 40px;
    }

    .rdtCounterSeparator {
        line-height: 100px;
    }

    .rdtCounter .rdtBtn {
        height: 40%;
        line-height: 40px;
        cursor: pointer;
        display: block;
        color: #f91942;

        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none;   /* Chrome/Safari/Opera */
        -khtml-user-select: none;    /* Konqueror */
        -moz-user-select: none;      /* Firefox */
        -ms-user-select: none;       /* Internet Explorer/Edge */
        user-select: none;
    }
    .rdtCounter .rdtBtn:hover {
        background: #eee;
    }
    .rdtCounter .rdtCount {
        height: 20%;
        font-size: 1.2em;
    }

    .rdtMilli {
        vertical-align: middle;
        padding-left: 8px;
        width: 48px;
    }

    .rdtMilli input {
        width: 100%;
        font-size: 1.2em;
        margin-top: 37px;
    }

    .rdtTime td {
        cursor: default;
    }

    /* React Select */
    .Select {
        position: relative;
        border: none;
        outline: none;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }
    .Select input::-webkit-contacts-auto-fill-button,
    .Select input::-webkit-credentials-auto-fill-button {
        display: none !important;
    }
    .Select input::-ms-clear {
        display: none !important;
    }
    .Select input::-ms-reveal {
        display: none !important;
    }
    .Select,
    .Select div,
    .Select input,
    .Select span {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .Select.is-disabled .Select-arrow-zone {
        cursor: default;
        pointer-events: none;
        opacity: 0.35;
    }
    .Select.is-disabled > .Select-control {
        /* background-color: #f9f9f9; */
        color: rgba(0,0,0,0.3);
        cursor: not-allowed;
    }
    .Select.is-disabled > .Select-control:hover {
        box-shadow: none;
    }
    .Select.is-open > .Select-control {
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
        background-color: rgba(0,0,0,0);
    }
    .Select.is-open > .Select-control .Select-arrow {
        top: -2px;
        border-color: transparent transparent #999;
        border-width: 0 5px 5px;
    }
    .Select.is-searchable.is-open > .Select-control {
        cursor: text;
    }
    .Select.is-searchable.is-focused:not(.is-open) > .Select-control {
        cursor: text;
    }
    .Select.is-focused > .Select-control {
        background-color: rgba(0,0,0,0);
    }
    .Select.is-focused:not(.is-open) > .Select-control {
    /*    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 0 3px rgba(0, 126, 255, 0.1); */
        background-color: rgba(0,0,0,0);
    }
    .Select.has-value.is-clearable.Select--single > .Select-control .Select-value {
        padding-right: 42px;
    }
    .Select.has-value.Select--single > .Select-control .Select-value .Select-value-label,
    .Select.has-value.is-pseudo-focused.Select--single > .Select-control .Select-value .Select-value-label {
        color: #333;
    }
    .Select.has-value.Select--single > .Select-control .Select-value a.Select-value-label,
    .Select.has-value.is-pseudo-focused.Select--single > .Select-control .Select-value a.Select-value-label {
        cursor: pointer;
        text-decoration: none;
    }
    .Select.has-value.Select--single > .Select-control .Select-value a.Select-value-label:hover,
    .Select.has-value.is-pseudo-focused.Select--single > .Select-control .Select-value a.Select-value-label:hover,
    .Select.has-value.Select--single > .Select-control .Select-value a.Select-value-label:focus,
    .Select.has-value.is-pseudo-focused.Select--single > .Select-control .Select-value a.Select-value-label:focus {
        outline: none;
        text-decoration: underline;
    }
    .Select.has-value.Select--single > .Select-control .Select-value a.Select-value-label:focus,
    .Select.has-value.is-pseudo-focused.Select--single > .Select-control .Select-value a.Select-value-label:focus {
        background-color: rgba(0,0,0,0);
    }
    .Select.has-value.is-pseudo-focused .Select-input {
        opacity: 0;
    }
    .Select.is-open .Select-arrow,
    .Select .Select-arrow-zone:hover > .Select-arrow {
        border-top-color: #666;
    }
    .Select.Select--rtl {
        direction: rtl;
        text-align: right;
    }
    .Select-control {
        background-color: rgba(0,0,0,0);
        border: none;
        outline: none;
        border-bottom: 1px solid #b9bbbb;
        color: rgba(0, 0, 0, 0.87);
        cursor: default;
        display: table;
        border-spacing: 0;
        border-collapse: separate;
        height: 36px;
        font-size: 15px;
        overflow: hidden;
        position: relative;
        width: 100%;
    }
    .Select-control:hover {
        /* box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);*/
    }
    .Select-control .Select-input:focus {
        outline: none;
    }
    .Select-placeholder,
    .Select--single > .Select-control .Select-value {
        bottom: 0;
        color: rgba(0, 0, 0, 0.87);
        left: 0;
        line-height: 34px;
        padding-right: 10px;
        position: absolute;
        right: 0;
        top: 0;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .Select-input {
        height: 34px;
        padding-right: 10px;
        vertical-align: middle;
    }
    .Select-input > input {
        width: 100%;
        background: none transparent;
        border: 0 none;
        box-shadow: none;
        cursor: default;
        display: inline-block;
        font-family: inherit;
        font-size: inherit;
        margin: 0;
        outline: none;
        line-height: 17px;
        /* For IE 8 compatibility */
        padding: 8px 0 12px;
        /* For IE 8 compatibility */
        -webkit-appearance: none;
    }
    .is-focused .Select-input > input {
        cursor: text;
    }
    .has-value.is-pseudo-focused .Select-input {
        opacity: 0;
    }
    .Select-control:not(.is-searchable) > .Select-input {
        outline: none;
    }
    .Select-loading-zone {
        cursor: pointer;
        display: table-cell;
        position: relative;
        text-align: center;
        vertical-align: middle;
        width: 16px;
    }
    .Select-loading {
        -webkit-animation: Select-animation-spin 400ms infinite linear;
        -o-animation: Select-animation-spin 400ms infinite linear;
        animation: Select-animation-spin 400ms infinite linear;
        width: 16px;
        height: 16px;
        box-sizing: border-box;
        border-radius: 50%;
        border: 2px solid #ccc;
        border-right-color: #333;
        display: inline-block;
        position: relative;
        vertical-align: middle;
    }
    .Select-clear-zone {
        -webkit-animation: Select-animation-fadeIn 200ms;
        -o-animation: Select-animation-fadeIn 200ms;
        animation: Select-animation-fadeIn 200ms;
        color: #999;
        cursor: pointer;
        display: table-cell;
        position: relative;
        text-align: center;
        vertical-align: middle;
        width: 17px;
    }
    .Select-clear-zone:hover {
        color: #D0021B;
    }
    .Select-clear {
        display: inline-block;
        font-size: 18px;
        line-height: 1;
    }
    .Select--multi .Select-clear-zone {
        width: 17px;
    }
    .Select-arrow-zone {
        cursor: pointer;
        display: table-cell;
        position: relative;
        text-align: center;
        vertical-align: middle;
        width: 25px;
        padding-right: 5px;
    }
    .Select--rtl .Select-arrow-zone {
        padding-right: 0;
        padding-left: 5px;
    }
    .Select-arrow {
        border-color: #999 transparent transparent;
        border-style: solid;
        border-width: 5px 5px 2.5px;
        display: inline-block;
        height: 0;
        width: 0;
        position: relative;
    }
    .Select-control > *:last-child {
        padding-right: 5px;
    }
    .Select--multi .Select-multi-value-wrapper {
        display: inline-block;
    }
    .Select .Select-aria-only {
        position: absolute;
        display: inline-block;
        height: 1px;
        width: 1px;
        margin: -1px;
        clip: rect(0, 0, 0, 0);
        overflow: hidden;
        float: left;
    }
    @-webkit-keyframes Select-animation-fadeIn {
        from {
        opacity: 0;
        }
        to {
        opacity: 1;
        }
    }
    @keyframes Select-animation-fadeIn {
        from {
        opacity: 0;
        }
        to {
        opacity: 1;
        }
    }
    .Select-menu-outer {
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
        background-color: #fff;
        border: 1px solid #ccc;
        border-top-color: #e6e6e6;
        box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
        box-sizing: border-box;
        margin-top: -1px;
        max-height: 200px;
        position: absolute;
        left: 0;
        top: 100%;
        width: 100%;
        z-index: 1;
        -webkit-overflow-scrolling: touch;
    }
    .Select-menu {
        max-height: 198px;
        overflow-y: auto;
    }
    .Select-option {
        box-sizing: border-box;
        background-color: #fff;
        color: #888888;
        cursor: pointer;
        display: block;
        padding: 8px 10px;
    }
    .Select-option:last-child {
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
    }
    .Select-option.is-selected {
        color: #f91942;
    }
    .Select-option.is-focused {
        background-color: #ebf5ff;
        /* Fallback color for IE 8 */
        background-color: rgba(0, 0, 0, 0.1);
        color: #121212;
    }
    .Select-option.is-disabled {
        color: rgba(0,0,0,0.3)!important;
        cursor: not-allowed;
    }
    .Select.is-disabled .Select-value-label {
        color: rgba(0,0,0,0.3)!important;
        cursor: not-allowed;
    }
    .Select-noresults {
        box-sizing: border-box;
        color: #999999;
        cursor: default;
        display: block;
        padding: 8px 10px;
    }
    .Select--multi .Select-input {
        vertical-align: middle;
        margin-left: 10px;
        padding: 0;
    }
    .Select--multi.Select--rtl .Select-input {
        margin-left: 0;
        margin-right: 10px;
    }
    .Select--multi.has-value .Select-input {
        margin-left: 5px;
    }
    .Select--multi .Select-value {
        background-color: #ebf5ff;
        /* Fallback color for IE 8 */
        background-color: rgba(0, 126, 255, 0.08);
        border-radius: 2px;
        border: 1px solid #c2e0ff;
        /* Fallback color for IE 8 */
        border: 1px solid rgba(0, 126, 255, 0.24);
        display: inline-block;
        font-size: 0.9em;
        line-height: 1.4;
        margin-left: 5px;
        margin-top: 5px;
        vertical-align: top;
    }
    .Select--multi .Select-value-icon,
    .Select--multi .Select-value-label {
        display: inline-block;
        vertical-align: middle;
    }
    .Select--multi .Select-value-label {
        border-bottom-right-radius: 2px;
        border-top-right-radius: 2px;
        cursor: default;
        padding: 2px 5px;
    }
    .Select--multi a.Select-value-label {
        cursor: pointer;
        text-decoration: none;
    }
    .Select--multi a.Select-value-label:hover {
        text-decoration: underline;
    }
    .Select--multi .Select-value-icon {
        cursor: pointer;
        border-bottom-left-radius: 2px;
        border-top-left-radius: 2px;
        border-right: 1px solid #c2e0ff;
        /* Fallback color for IE 8 */
        border-right: 1px solid rgba(0, 126, 255, 0.24);
        padding: 1px 5px 3px;
    }
    .Select--multi .Select-value-icon:hover,
    .Select--multi .Select-value-icon:focus {
        background-color: #d8eafd;
        /* Fallback color for IE 8 */
        background-color: rgba(0, 113, 230, 0.08);
        color: #0071e6;
    }
    .Select--multi .Select-value-icon:active {
        background-color: #c2e0ff;
        /* Fallback color for IE 8 */
        background-color: rgba(0, 126, 255, 0.24);
    }
    .Select--multi.Select--rtl .Select-value {
        margin-left: 0;
        margin-right: 5px;
    }
    .Select--multi.Select--rtl .Select-value-icon {
        border-right: none;
        border-left: 1px solid #c2e0ff;
        /* Fallback color for IE 8 */
        border-left: 1px solid rgba(0, 126, 255, 0.24);
    }
    .Select--multi.is-disabled .Select-value {
        background-color: #fcfcfc;
        border: 1px solid #e3e3e3;
        color: #333;
    }
    .Select--multi.is-disabled .Select-value-icon {
        cursor: not-allowed;
        border-right: 1px solid #e3e3e3;
    }
    .Select--multi.is-disabled .Select-value-icon:hover,
    .Select--multi.is-disabled .Select-value-icon:focus,
    .Select--multi.is-disabled .Select-value-icon:active {
        background-color: #fcfcfc;
    }
    @keyframes Select-animation-spin {
        to {
        transform: rotate(1turn);
        }
    }
    @-webkit-keyframes Select-animation-spin {
        to {
        -webkit-transform: rotate(1turn);
        }
    }
    
    .cluster > div {
        padding-top: 2px;
        padding-left: 1px;
    }
`;

export default withProps({ styles })(Global);
