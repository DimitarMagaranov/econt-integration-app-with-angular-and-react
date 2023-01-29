export const loadOfficeWorkingTime = (selectedOffice) => {
    const officeNormalBusinessHoursFrom = new Date(selectedOffice.normalBusinessHoursFrom);
    const officeNormalBusinessHoursTo = new Date(selectedOffice.normalBusinessHoursTo);
    const officeHalfDayBusinessHoursFrom = new Date(selectedOffice.halfDayBusinessHoursFrom);
    const officeHalfDayBusinessHoursTo = new Date(selectedOffice.halfDayBusinessHoursTo);

    const normalBusinessHoursFrom = padTo2Digits(officeNormalBusinessHoursFrom.getHours());
    const normalBusinessMinutesFrom = padTo2Digits(officeNormalBusinessHoursFrom.getMinutes());
    const normalBusinessHoursTo = padTo2Digits(officeNormalBusinessHoursTo.getHours());
    const normalBusinessMinutesTo = padTo2Digits(officeNormalBusinessHoursTo.getMinutes());

    const halfDayBusinessHoursFrom = padTo2Digits(officeHalfDayBusinessHoursFrom.getHours());
    const halfDayBusinessMinutesFrom = padTo2Digits(officeHalfDayBusinessHoursFrom.getMinutes());
    const halfDayBusinessHoursTo = padTo2Digits(officeHalfDayBusinessHoursTo.getHours());
    const halfDayBusinessMinutesTo = padTo2Digits(officeHalfDayBusinessHoursTo.getMinutes());

    return {
        mondayToFriday: `Monday - Friday: ${normalBusinessHoursFrom}:${normalBusinessMinutesFrom}-${normalBusinessHoursTo}:${normalBusinessMinutesTo}`,
        saturday: `Saturday: ${halfDayBusinessHoursFrom}:${halfDayBusinessMinutesFrom}-${halfDayBusinessHoursTo}:${halfDayBusinessMinutesTo}`,
    };
};

const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
};