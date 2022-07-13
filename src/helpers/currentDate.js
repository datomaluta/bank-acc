const currentDate = (ifHour = false) => {
  const now = new Date();
  const day = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
  const month =
    now.getMonth() < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
  const year = now.getFullYear();

  const hour = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
  const min = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();

  let date;

  if (ifHour) {
    date = `As of ${day}/${month}/${year}, ${hour}:${min}`;
    return date;
  } else {
    date = `${day}/${month}/${year}`;
    return date;
  }
};

export default currentDate;
