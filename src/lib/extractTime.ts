export const extractTime = (timestamp: any) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes();
  
    // Determine whether it's AM or PM
    const amPm = hours >= 12 ? 'PM' : 'AM';
  
    // Convert hours to 12-hour format
    hours = hours % 12 || 12;
  
    // Formatting hours and minutes to ensure they are always two digits
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
    // Constructing the time string in HH:MM AM/PM format
    return `${formattedHours}:${formattedMinutes} ${amPm}`;
  };
  