
export const convertTOAMPM = (time) => {
    const [hourse, minutes] = time.split(":");
    let h = hourse % 12 || 12;  // 12 hour format
    let ampm = hourse < 12 ? "AM" : "PM";
    return `${h}:${minutes} ${ampm}`;
};


export const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.toLocaleString('default', { month: 'short' });
    const day = d.getDate();
    return `${month} ${day}, ${year}`;
};


