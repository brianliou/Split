{
  currentUser: {
    username: "Brian",
    email: "brian@teamleada.com"
  },

  forms: {
    signUp: {
      errors: [],
    },
    logIn: {
      errors: [],
    },
    billPay: {
      errors: [],
    },
    addFriend: {
      errors: [],
    },
    settleUp: {
      errors: [],
    }
  }

  dashboard: {
    borrowAmount: 55.55,
    loanAmount: 78.88,
    balance: 23.33
  },

  transactions: {
    borrowUsers: {
      "1": {
            username: "Nick",
            email: "nick@postmates.com",
            amount: 40.00
          },
      "2": {
            username: "Matt",
            email: "matt@gmail.com",
            amount: 32.23
          },
    },

  <!-- I'm not sure whether I need to add the keys "1", "2" or can I just return a
       pojo with a bunch of pojos in it?
  -->

    loanUsers: {
      "1": {
            username: "Dega",
            email: "dega@gmail.com",
            amount: 23.33
          },
      "2": {
            username: "Kyle",
            email: "kyle@gmail.com",
            amout: 33.33
          }
    }
  },

  friends: {
    {
      username: "Nick"
    },
    {
      username: "Matt"
    },
    {
      username: "Dega"
    }
  }
}
