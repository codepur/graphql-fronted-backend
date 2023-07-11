import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER } from '../queries';
import { IconEdit, IconTrashX } from '@tabler/icons';
import { DELETE_USER } from '../mutations';
import { Toaster, toast } from 'react-hot-toast';
import UserCreationForm from './UserCreationForm';
export default function UserTable() {
    const { loading, error, data ,refetch} = useQuery(GET_USER);
    const [userdata,setUserData]=useState([]);
    const [deleteuser] = useMutation(DELETE_USER);
    

    useEffect(()=>{
        if(!loading)
        {setUserData(data.user)}
    },);

    const deleteUser = async (e,item)=>{
      e.preventDefault();
    
      try {
        const { data } = await deleteuser({ variables: {email: item.email} });
        if(data)
        {
          toast.error("User deleted.")
        }
        refetch();
        console.log('User deleted:', data);
      } catch (error) {
        console.error('Error creating user:', error);
      }
    }
    const updateUser =(item)=>{

    }
  return (
    <>
    <UserCreationForm refetch={refetch}/>
    <div className='mt-3'>
       <Toaster></Toaster>
        <table  className='table table-striped table-hover table-sm border'>
            <thead>
                <tr>
                 <th className='text-center'>#</th>
                 <th>First Name</th>
                 <th>Last Name</th>
                 <th>Email</th>
                 <th>Hobbies</th>
                 <th>Actions</th>
                </tr>
            </thead>
            <tbody>
               {userdata.map((item,index)=>(
                  <tr>
                    <td className='text-center'>{index+1}</td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.email}</td>
                    <td>{item.hobbies.join('  ,')}</td>
                    <td className='d-flex'>
                     <IconEdit className='me-3' onClick={(item)=>updateUser(item)}/> 
                     <IconTrashX onClick={(e)=>deleteUser(e,item)}/> 
                    </td>
                  </tr> 
               ))}
            </tbody>
        </table>
    </div>
    </>
  )
}
