import mongoose from 'mongoose';

export const User = mongoose.model('User', {
  first_name: String,
  last_name: String,
  email: String,
  hobbies: [String],
});

export const Address = mongoose.model('Address', {
  flat_no: Number,
  address_field: String,
});


export const resolvers = {
  Query: {
    address: async () => {
      try {
        const users = await Address.find();
        return users;
      } catch (error) {
        throw new Error("Failed to fetch Address");
      }
    },
    user: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        throw new Error("Failed to fetch users");
      }
    },
  },

  Mutation: {
    createUser: (parent, args) => {
      const { first_name, last_name, email,hobbies } = args;
      const user = new User({ first_name, last_name,email, hobbies });
      return user.save();
    },
    createAddress:(parent,args) => {
      const { flat_no, address_field } = args;
      const address = new Address({ flat_no, address_field});
      return address.save();
    },
    deleteUser: async (parent, args) => {
      try {
        const { email } = args;
        const user = await User.findOneAndDelete({email});
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (error) {
        throw new Error("Failed to delete user");
      }
    },
    updateUser: async (parent, args) => {
      try {
        const { email,first_name, last_name } = args;
        const user = await User.findOneAndUpdate({email},{first_name, last_name ,hobbies});
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (error) {
        throw new Error("Failed to delete user");
      }
    },
     
  },
};
