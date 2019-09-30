export default {
  methods: {
    debounce(func, delay) {
      let debounceTimer;
      return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
      };
    },
    validateEmail(email) {
      let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      return re.test(email);
    },
    validatePassword(password) {
      let re = /\w{6,}/;
      return re.test(password);
    },
    validateRePassword(password, rePassword) {
      return password === rePassword;
    },
    validateFullName(fullName) {
      let re = /\w+/;
      return re.test(fullName);
    },
    validatePhone(phone) {
      let re = /^[0-9-]+$/;
      return re.test(phone);
    },
    validateAddress(address) {
      let re = /\w+/;
      return re.test(address);
    }
  }
};
