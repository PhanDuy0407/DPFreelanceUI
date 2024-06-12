export const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

export const removeKeys = (obj1, obj2) => {
    for (const key in obj2) {
      if (obj1.hasOwnProperty(key)) {
        delete obj1[key];
      }
    }
    return obj1;
  }