export const validationRules = {
  email: {
    required: "Email is required",
    pattern: {
      value: /@/,
      message: "Email must include @",
    },
  },

  password: {
    login: {
      required: "Password is required",
    },
    signup: {
      required: "Password must have at least 8 characters",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters",
      },
    },
  },

  fullname: {
    required: "Full name is required",
    minLength: {
      value: 2,
      message: "Name must be at least 2 characters",
    },
  },
  firstName: {
    required: "First name is required",
    minLength: {
      value: 2,
      message: "First name must be at least 2 characters",
    },
  },
  lastName: {
    required: "Last name is required",
    minLength: {
      value: 2,
      message: "Last name must be at least 2 characters",
    },
  },
};
