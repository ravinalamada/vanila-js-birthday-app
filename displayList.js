import {
	differenceInCalendarDays,
  isPast,
  addYears,
  setYear,
  isToday,
} from 'date-fns';

const getAge = (date1, date2) => {
  // This is a condition like if statement
  date2 = date2 || new Date();
  //Calculation
  const diff = date2.getTime() - date1.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

function calculateDaysToBirhtday(personToCalculate) {
  const birthday = new Date(personToCalculate.birthday);
  const today = new Date();
  let nextBirthday = setYear(birthday, today.getFullYear())

  // if the date is already behind us, we add + 1 to the year
  if (isPast(nextBirthday)) {
    nextBirthday = addYears(nextBirthday, 1);
  }
  if (isToday(nextBirthday)) {
    return `<li class="items" id="${person.id}">
              <img class="image" src="${person.picture}" alt="">
              <div class="birthdaay-wrapper">
                <h2>Happy birthady <span class="birthday">${person.firstName}  ${person.lastName}<span></h2>
                <p class="person-ages-desc">You turn <span class="birthday">${ages}</span> years old today</p>
              </div>
              <div>
                <div class="btn--wrapper">
                  <button class="edit" value="${person.id}">edit</button>
                  <button class="delete" value="${person.id}">delete</button>
                </div>
              </div>
              </li>`;
  }

  const numberOfDays = differenceInCalendarDays(nextBirthday, today)
  return numberOfDays;
}

export const displayPerson = (people) => {
  //Display the date
  const sortedPeople = people.sort(function(person1, person2) {
  return calculateDaysToBirhtday(person1) - calculateDaysToBirhtday(person2)});
  return sortedPeople.map(person => {
    const ages = getAge(new Date(person.birthday));
    const birthday = new Date(person.birthday);
    let newDay = birthday.getDay() + 1;
    const month =  birthday.toLocaleString('en-us', { month: 'long' });

    if (newDay == 1 || newDay == 21 || newDay == 31) {
      newDay += "st";
    }
    else if (newDay == 2 || newDay == 22) {
      newDay += "nd";
    }
    else {
      newDay += "th";
    }

    const numberOfDays = calculateDaysToBirhtday(person);

    //Generate html
    return `
              <li class="items" id="${person.id}">
                <img class="image" src="${person.picture}" alt="">
                <div class="wrapper">
                  <div class="name-wrapper">
                    <span class="first-name">${person.firstName}</span>
                    <span class="last-name">${person.lastName}</span>
                  </div>
                  <p class="birth_date">Turns <span class="age">${ages}</span> on ${month} ${newDay}</p>
                </div>
                <div>
                  <span class="days">${numberOfDays} days</span>
                  <div class="btn--wrapper">
                    <button class="edit" value="${person.id}">edit</button>
                    <button class="delete" value="${person.id}">delete</button>
                  </div>
                </div>
                </li>
          `;
  }).join('');
};