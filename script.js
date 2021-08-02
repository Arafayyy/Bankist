'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Abdul Sami',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Wajeeha Rashid',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Samad Khawaja',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Abdur Rafay',
  movements: [430, 1000, 700, -50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div> 
          <div class="movements__value">${mov}€</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov);
  labelSumIn.textContent = `${income}€`;
  const outcome = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = `${Math.abs(outcome)}€`;
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposits => (deposits * acc.interestRate) / 100)
    .filter(int => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsername = function (accs) {
  accs.forEach(function (accs) {
    accs.username = accs.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsername(accounts);
const updateUI = function (acc) {
  displayMovements(acc.movements);
  calcDisplaySummary(acc);
  calcDisplayBalance(acc);
};

//Events Handlers
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();
    //UPDATE UI
    updateUI(currentAccount);
  }
});
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    recieverAcc &&
    currentAccount.balance >= amount &&
    recieverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);
    //UPDATE UI
    updateUI(currentAccount);
  }
});
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputClosePin.value = inputCloseUsername.value = '';
});
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
  // displayMovements(currentAccount.movements, false);
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// const arr = ['a', 'b', 'c', 'd', 'e'];
// // console.log(arr.slice(2, 3));
// console.log([...arr]);
// // arr.splice(1, 4);
// console.log(arr);
// // arr.reverse(2, 3);
// // console.log(arr.reverse());
// console.log(arr);
// const arr2 = ['f', 'g', 'h', 'i', 'j'];
// const letters = arr.concat(arr2);
// for (const items of letters) {
//   console.log(items);
// }
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// movements.forEach(function (movement, index) {
//   if (movement > 0) {
//     console.log(`Movement is ${index + 1}:  You deposited ${movement}`);
//   } else {
//     console.log(
//       `Movement is ${index + 1}:  You withdrew ${Math.abs(movement)}`
//     );
//   }
// });
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);
// currencies.forEach(function (value, key) {
//   console.log(`The currency of ${value} is ${key}`);
// });
// const currenciesUnique = new Set(['USD', 'GBP', 'EUR']);
// currenciesUnique.forEach(function (value, key) {
//   console.log(`The currency of ${value} is ${key}`);
// });

//Challenge1
// const julieDogs = [3, 5, 2, 12, 7];
// const kateDogs = [9, 16, 6, 8, 3];

// const julieCorrected = julieDogs.slice(1, -2);
// console.log(julieCorrected);

// julieCorrected.forEach(function (dog, i) {
//   if (dog > 3) {
//     console.log(`Your dog ${i + 1} is an adult , and is ${dog} years old `);
//   } else {
//     console.log(`Your dog ${i + 1} is a puppy , and is ${dog} years old `);
//   }
// });
// console.log('---------------------');
// kateDogs.forEach(function (dog, i) {
//   if (dog > 3) {
//     console.log(`Your dog ${i + 1} is an adult , and is ${dog} years old `);
//   } else {
//     console.log(`Your dog ${i + 1} is a puppy , and is ${dog} years old `);
//   }
// });

// const euroToUSD = 1.1;
// const movementUSD = movements.map(mov => mov * euroToUSD);

// console.log(movementUSD);
// for (const items of movements) {
//   console.log(Math.abs(items * euroToUSD));
// }
// const movementDescrip = movements.map(function (mov, i) {
//   const y = mov * euroToUSD;
//   return ` Your value ${i + 1}: ${mov} is equal to ${y} in euros`;
// });
// console.log(movementDescrip);
// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });
// console.log(deposits);
// const depositArr = [];
// for (const mov of movements) if (mov > 0) depositArr.push(mov);
// console.log(depositArr);
// const withdrawalArr = [];
// for (const mov of movements) if (mov < 0) withdrawalArr.push(mov);
// console.log(withdrawalArr);

// const balance = movements.reduce((acc, cur) => acc + cur, 0);
// console.log(balance);

// const max = movements.reduce((acc, mov) => (acc > mov ? acc : (acc = mov)));
// console.log(max);

// const euroToUSD = 1.1;
// const totaltoUSD = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * euroToUSD)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totaltoUSD);

// const find = movements.find(mov => mov < 0);
// console.log(find);
// console.log(movements);
// const findAccount = accounts.find(acc => acc.owner === 'Abdul Sami');
// console.log(findAccount);
// for (const acc of accounts) acc => acc.owner === 'Abdul Sami';
// console.log(acc);
// console.log(movements.every(mov => mov > 0));
// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);
// const deeperArr = accountMovements.flat();
// console.log(deeperArr);
// const numbers = [2, 3, 6, 8, 9, 31, 82];
// console.log(numbers.sort());
console.log(movements.sort());
// console.log(`Anas\nRafay`);

// const number = 0;
// if (number > 0) {
//   console.log('Positve');
// } else if (number === 0) {
//   console.log('Zero');
// } else {
//   console.log('Negative');
// }
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });
// movements.sort((a, b) => a - b);
// console.log(movements);
// movements.sort((a, b) => b - a);
// console.log(movements);

// const arr = [2, 4, 5, 6, 7, 8];
// arr.fill(381, 2, 3);
// console.log(arr);
// const z = Array.from({ length: 6 }, () => Math.trunc(Math.random() * 6) + 1);
// console.log(z);

const arr1 = [2, 3, 4];
const arr2 = [5, 6, 7];
console.log(arr1.concat(arr2));
