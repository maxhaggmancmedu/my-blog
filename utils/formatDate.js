import { parseISO, parseJSON, format } from "date-fns";

export const formatDate = (date) => {
    const dateString = date;
    const newDate = parseISO(dateString);
    const formattedDate = format(newDate, 'yyyy-MM-dd HH:mm');
  
    
    return { formattedDate }
}