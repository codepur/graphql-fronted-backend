import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../mutations/index'; 

const UserCreationForm = (props) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    hobbies: [],
  });

  const [createUser, { loading, error }] = useMutation(CREATE_USER);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createUser({ variables: user });
      console.log('User created:', data);
      setUser({ firstName: '', lastName: '', email: ' ',  hobbies: [] });
      props.refetch();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div >
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <div className='col-md-6'>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={user.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={user.lastName}
              onChange={handleChange}
            />
          </div>
          <div className='col-md-6'>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
            />

            <input
              type="text"
              name="hobbies"
              placeholder="Hobbies (comma-separated)"
              value={user.hobbies.join(',')}
              onChange={(e) =>
                setUser({ ...user, hobbies: e.target.value.split(',') })
              }
            />
          </div>
        </div>

        <button type="submit" disabled={loading}>
          Create User
        </button>
        {error && <p>Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default UserCreationForm;
