import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import styles from './MyAccount.module.css'; // If you are using CSS modules
import SIGNUP_MUTATION from './signup';


function MyAccount() {
  const [signup] = useMutation(SIGNUP_MUTATION);
  const [fName, setFName] = useState("");
  const [LName, setLName] = useState("");
  const [eMail, setEMail] = useState("");
  const [password, setPassword] = useState("");
  const [address1, setAddress1] = useState("");
  const [city, setCity] = useState("");
  const [stateProvince, setStateProvince] = useState("");
  const [country, setCountry] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup({ 
        variables: { 
          fName, 
          LName, 
          eMail, 
          password, 
          address1, 
          city, 
          stateProvince, // changed from stateProvince
          country 
        } 
      });
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div>
      <h1 className={styles.h1}>Create Account</h1>
      <form onSubmit={handleSignup} className={styles.form}>
        <input
          type="text"
          value={fName}
          onChange={(e) => setFName(e.target.value)}
          placeholder="First Name"
          className={styles.input}
        />
        <input
          type="text"
          value={LName}
          onChange={(e) => setLName(e.target.value)}
          placeholder="Last Name"
          className={styles.input}
        />
        <input
          type="email"
          value={eMail}
          onChange={(e) => setEMail(e.target.value)}
          placeholder="Email"
          className={styles.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={styles.input}
        />
        <input
          type="text"
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
          placeholder="Address"
          className={styles.input}
        />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          className={styles.input}
        />
        <input
          type="text"
          value={stateProvince}
          onChange={(e) => setStateProvince(e.target.value)}
          placeholder="State/Province"
          className={styles.input}
        />
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Create Account
        </button>
      </form>
    </div>
  );
}

export default MyAccount;
