import { parseISO, parseJSON, format } from "date-fns";

export const formatDate = async (date) => {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    const time = date.slice(11, 19);
  
    // Create a new Date object
    const dateObject = new Date(`${year}-${month}-${day}T${time}`);
  
    // Format the date object
    const formattedDate = format(dateObject, 'EEE MMM dd yyyy HH:mm:ss');
  
    
    return { formattedDate }
}