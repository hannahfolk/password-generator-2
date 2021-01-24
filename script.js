// Assignment Code
const generateBtn = document.querySelector("#generate");

// Write password to the #password input
const writePassword = () => {
  const password = generatePassword();
  const passwordText = document.querySelector("#password");

  passwordText.value = password;
};

const promptForLength = () => {
  return parseInt(
    prompt(
      "How long do you want your password to be? Please enter a number between 8 and 128."
    )
  );
};

const confirmCriteria = (criteria) => {
  return confirm(`Do you want ${criteria} in your password?`);
};

const generateRandomCharacter = (criteria) => {
  const randomNumber = Math.floor(Math.random() * criteria.length);
  const randomCharacter = criteria[randomNumber];
  return randomCharacter;
};

const generatePassword = () => {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const special = "!@#$%^&*()";

  let userChoices = "";
  let guaranteedChars = "";
  let password = "";

  let length = promptForLength();

  while (length < 8 || length > 128 || isNaN(length)) {
    length = promptForLength();
  }

  let wantsLowercase = confirmCriteria("lowercase characters");
  let wantsUppercase = confirmCriteria("uppercase characters");
  let wantsNumbers = confirmCriteria("numbers");
  let wantsSpecial = confirmCriteria("special characters");

  while (!wantsLowercase && !wantsUppercase && !wantsNumbers && !wantsSpecial) {
    wantsLowercase = confirmCriteria("lowercase characters");
    wantsUppercase = confirmCriteria("uppercase characters");
    wantsNumbers = confirmCriteria("numbers");
    wantsSpecial = confirmCriteria("special characters");
  }

  if (wantsLowercase) {
    guaranteedChars += generateRandomCharacter(lowercase);
    userChoices += lowercase;
  }

  if (wantsUppercase) {
    guaranteedChars += generateRandomCharacter(uppercase);
    userChoices += uppercase;
  }

  if (wantsNumbers) {
    guaranteedChars += generateRandomCharacter(numbers);
    userChoices += numbers;
  }

  if (wantsSpecial) {
    guaranteedChars += generateRandomCharacter(special);
    userChoices += special;
  }

  password += guaranteedChars;

  for (let i = 0; i < length - guaranteedChars.length; i++) {
    const randomNumber = Math.floor(Math.random() * userChoices.length);
    const randomCharacter = userChoices[randomNumber];
    password += randomCharacter;
  }

  const passwordArr = password.split("");

  let currentIndex = passwordArr.length;
  let randomIndex;
  let temp;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temp = passwordArr[currentIndex];
    passwordArr[currentIndex] = passwordArr[randomIndex];
    passwordArr[randomIndex] = temp;
  }
  return passwordArr.join("");
};

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
