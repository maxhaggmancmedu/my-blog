export const createUsername = (email) => {
    email.split(" ").join("-");
    const username = email.split('@')[0];
    const formattedUsername = username.replace(/\./g, ' ');
    return formattedUsername
  };