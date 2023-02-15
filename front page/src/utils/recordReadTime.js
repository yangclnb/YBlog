function refreshTimeList() {
    if (localStorage.getItem("readingTime") === null)
        localStorage.setItem("readingTime", JSON.stringify({}));
    return JSON.parse(localStorage.getItem("readingTime"));
}

function getTime(articleID) {
    const timeList = refreshTimeList();
    return timeList[articleID] || 0;
}

function setTime(articleID, time) {
    const currentReading = getTime(articleID);
    const timeList = refreshTimeList();
    timeList[articleID] = currentReading + time;
    localStorage.setItem("readingTime", JSON.stringify(timeList));
}

export {
    getTime,
    setTime
}
