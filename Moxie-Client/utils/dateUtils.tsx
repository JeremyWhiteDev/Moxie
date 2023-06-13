const dateUtils = {
    formatDistance: (date: string) => {
        const msPerMinute = 1000 * 60
        const msPerHour = msPerMinute * 60
        const msPerDay = msPerHour * 24;
        const msPerWeek = msPerDay * 7;
        const msPerMonth = msPerWeek * 4;
        const msPerYear = msPerWeek * 52;
        const diffTime = Math.abs(new Date().valueOf() - new Date(date).valueOf())



        if (diffTime > msPerYear) {
            return resolveString("year", diffTime, msPerYear)
        }
        else if (diffTime > msPerMonth) {
            return resolveString("month", diffTime, msPerMonth)
        }
        else if (diffTime > msPerWeek) {
            return resolveString("week", diffTime, msPerWeek)
        }
        else if (diffTime > msPerDay) {
            return resolveString("day", diffTime, msPerDay)
        }
        else if (diffTime > msPerHour) {
            return resolveString("hour", diffTime, msPerHour)
        }
        else if (diffTime > msPerMinute) {
            return resolveString("minute", diffTime, msPerMinute)
        } else {
            return "a few moments ago"
        }

    },

}

const resolveString = (timeMeasurment: string, diffTime: number, msMeasurement: number) => {
    const timeUnits = Math.floor(diffTime / msMeasurement);
    return timeUnits === 1 ? `${timeUnits} ${timeMeasurment} ago` : `${timeUnits} ${timeMeasurment}s ago`
}
export default dateUtils