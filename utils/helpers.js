// one helper we will need is to add all the posts into main based on how many are in the database
module.exports = {
  isEqual: (current) => {
    const button = document.getElementsByClassName("filter")[0];
    return current == genre;
  },
//  format_date: (date) => {
//    return date.toLocaleDateString();
//  },
  format_date: (date) => {
    if (typeof date === 'string') return date;
    if (!(date instanceof Date) || isNaN(date)) {
      console.error('Invalid date:', date);
      return 'Invalid Date';
    }
    return date.toLocaleDateString();
  },
  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }
    return word;
  },
};
