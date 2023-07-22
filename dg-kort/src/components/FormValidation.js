class FormValidation {
  constructor(accountNumber, customerName, expiryDate) {
    this.accountNumber = accountNumber;
    this.customerName = customerName;
    this.expiryDate = expiryDate;
  }

  // getters and setters
  get accountNumber() {
    return this._accountNumber;
  }

  set accountNumber(value) {
    this._accountNumber = value;
  }

  get customerName() {
    return this._customerName;
  }

  set customerName(value) {
    this._customerName = value;
  }

  get expiryDate() {
    return this._expiryDate;
  }

  set expiryDate(value) {
    this._expiryDate = value;
  }

  // validation methods
  validateAccountNumber() {
    // check if it only contains numbers
    if (this.accountNumber.match(/^[0-9]+$/)) {
      return true;
    }
    return false;
  }

  validateCustomerName() {
    // check if it only contains letters, hyphens, or dots
    if (this.customerName.match(/^[a-zA-Z.'-]+$/)) {
      return true;
    }
    return false;
  }

  validateExpiryDate() {
    // check if it is a valid date
    if (this.expiryDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return true;
    }
    return false;
  }
}
