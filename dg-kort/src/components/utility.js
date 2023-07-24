// create static class
export default class Utility {
  /**
   * This method formats the name by capitalizing the first letter of each part of the name.
   * @param {String} name : The name to be formatted
   * @returns : The formatted name in the format "Firstname Lastname"
   * @example
   * formatName("john doe") // returns "John Doe"
   * formatName("JOHN DOE") // returns "John Doe"
   * formatName("jOHN dOE") // returns "John Doe"
   * formatName("jOhN dOe") // returns "John Doe"
   */
  static formatName(name) {
    const nameArray = name.split(" ");
    const firstName = nameArray[0];
    const lastName = nameArray[1];
    const formattedName = firstName[0].toUpperCase() + firstName.slice(1);
    return formattedName + " " + lastName[0].toUpperCase() + lastName.slice(1);
  }

  /**
   * This method formats the date by adding a leading zero to the month and day if they are less than 10.
   * @param {String} date : The date to be formatted
   * @returns : The formatted date in the format YYYY-MM-DD
   * @example
   * formatDate("2021-1-1") // returns "2022-01-01"
   **/
  static nextYearDate() {
    const today = new Date();
    const nextYear = new Date(
      today.getFullYear() + 1,
      today.getMonth(),
      today.getDate()
    );
    nextYear.setMinutes(nextYear.getMinutes() - nextYear.getTimezoneOffset());
    const formattedDate = nextYear.toISOString().split("T")[0];
    return formattedDate;
  }

  /**
   * Checks whether a customer number is a valid one or not
   * @param {String} date : The date to be formatted
   * @returns : The formatted date in the format YYYY-MM-DD
   * @example
   * formatDate("2021-1-1") // returns "2021-01-01"
   * formatDate("2021-10-1") // returns "2021-10-01"
   * */
  static isValidAccountNumber(input) {
    // Check if the input is not empty
    if (input.trim() === "") {
      return false;
    }

    // Check if the input contains only digits
    if (!/^\d+$/.test(input)) {
      return false;
    }

    return true;
  }

  /**
   * Checks if the name is valid. A valid name must have exactly two parts, each part must contain only letters, hyphens, or dots.
   * @param {String} name : The name to be validated
   * @returns  : True if the name is valid, false otherwise
   */
  static isValidName(name) {
    // Check if the name is empty or null
    if (!name || name.trim() === "") {
      return false;
    }
    // Split the name into parts using space as a delimiter
    const nameParts = name.trim().split(" ");

    // Check if there are exactly two parts
    if (nameParts.length !== 2) {
      return false;
    }

    // Regular expression to check if each part contains only letters, hyphens, or dots
    const validPattern = /^[a-zA-Z.'-]+$/;

    // Check if each part is valid
    return nameParts.every((part) => validPattern.test(part));
  }

  /**
   * Checks the expiry date. A valid expiry date must be in the future and in the format YYYY-MM-DD.
   * The expiry date can only contain digits and two hyphens.
   *
   * @param {String} input : The input to be validated
   * @returns : True if the input is a valid expiry date, false otherwise
   */
  static isValidExpiryDate(input) {
    // Check if the input is not empty
    if (input.trim() === "") {
      return false;
    }

    // Check if the input contains only digits and two hyphens
    if (!/^\d{4}-\d{2}-\d{2}$/.test(input)) {
      return false;
    }

    // Check if the input is a valid date in the future
    const currentDate = new Date();
    const inputDate = new Date(input);
    if (inputDate <= currentDate) {
      return false;
    }

    return true;
  }
}
