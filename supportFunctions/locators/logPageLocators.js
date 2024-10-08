export const logPageLocators = {
    loginLink: ".login-internal-link",
    submitButton: 'button[type="submit"]:has-text("Login")',
    logsMenuLink: '[data-test="menu-link-\\/logs-item"]',
    noStreamSelectedText: '[data-test="logs-search-no-stream-selected-text"]',
    dateTimeButton: '[data-test="date-time-btn"]',
    refreshButton: '[data-test="logs-search-bar-refresh-btn"]',
    logTableTimestamp: '[data-test="log-table-column-0-_timestamp"]',
    logTableSource: '[data-test="log-table-column-0-source"]',
    logSelection: '[data-test="log-search-index-list-select-stream"]',
    logSelectionOptionList: '[data-test="logs-search-index-list"]',
    logErrorMessageLocator: '[data-test="logs-search-error-message"]',
    day4SelectorLocator: '[data-test="date-time-relative-4-d-btn"]',
    rangeSection: '[data-test="date-time-btn"] .q-btn__content span',
    barChartLocator: '[data-test="logs-search-result-bar-chart"]',
    timeStampSectionLocator: '[data-test="log-table-column-0-_timestamp"]',
    jsonLogSectionLocator: '[data-test="log-table-column-0-source"]',
    logTypeSelectionSection: ".q-select--multiple",
}
