
export const parseDateToString = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
}

export const parseStringToDate = (dateString: string): Date => {
    const [month, day, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day);
}
