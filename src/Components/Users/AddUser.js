import React, { useState, useRef } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import Wrapper from '../Helpers/Wrapper';
import classes from './AddUser.module.css';

const AddUser = (props) => {
const nameInputRef = useRef();  //ref value is generated is always is a object which have current prop and current props holds actual value at ref is connected with
const ageInputRef = useRef();
const collegeInputRef = useRef();

  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();

    //how to use useEffect- 
    
    // useEffect(() => {
    //   nameInputRef.current.focus();
    // }, []);  
    const entredName = nameInputRef.current.value;
    const entredUserAge = ageInputRef.current.value;
    const enteredCollegeName = collegeInputRef.current.value;
    if (entredName.trim().length === 0 || entredUserAge.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).',
      });
      return;
    }
    if (+entredUserAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      });
      return;
    }
    if (enteredCollegeName.trim().length === 0){
    setError({
      title: 'Invalid input',
      message: 'Form is not valid(non-empty values).'
    })
    return;
  }

    props.onAddUser(entredName, entredUserAge, enteredCollegeName);
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
    collegeInputRef.current.value = '';
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            ref={nameInputRef}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            ref={ageInputRef}
            />

            <label htmlFor="collegename">College Name</label>
          <input
            id="collegename"
            type="text"
            ref={collegeInputRef}
          />
          
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;