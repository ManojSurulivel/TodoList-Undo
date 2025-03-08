import React, { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import "./PassWordCheck.css"; // Import styles

const PASSWORD_REQUIREMENTS = {
  isUpperCase: "Should have one uppercase letter",
  isLowerCase: "Should have one lowercase letter",
  isNumber: "Should have one number",
  noSpecialChar: "Should not have special characters except @",
};

const PassWordCheck = ({ isLoading }) => {
  const [text, setText] = useState("");
  const [passWord, setPassWord] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState({});
  const [message, setMessage] = useState(""); // Submission message

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassWord(value);

    setPasswordValidation({
      isUpperCase: /[A-Z]/.test(value),
      isLowerCase: /[a-z]/.test(value),
      isNumber: /\d/.test(value),
      noSpecialChar: /[@]/.test(value) && !value.match(/[!$&^%#)(]/g),
    });
  };

  const isFormValid =
    Object.values(passwordValidation).every((valid) => valid) &&
    passWord === confirmPassword &&
    passWord.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text || !passWord || !confirmPassword) {
      setMessage("Please fill in all fields!");
      return;
    }

    if (!isFormValid) {
      setMessage("Password does not meet the requirements or does not match.");
      return;
    }

    setMessage("Form Submitted Successfully!");
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="form-container">
      <h2>Form Validation</h2>
      <form onSubmit={handleSubmit}>
        {/* <label>Name</label> */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter Username"
          required
        />

        {/* <label>Password</label> */}
        <input
          type="password"
          value={passWord}
          onChange={handlePasswordChange}
          placeholder="Enter Password"
          required
        />

        {/* <label>Confirm Password</label> */}
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />
         
       {passWord.length === 0 ? "" : <div className="validation-list">
          {Object.entries(PASSWORD_REQUIREMENTS).map(([key, message]) => (
            <div key={key} className="validation-item">
              {passwordValidation[key] ? (
                <CheckIcon className="check-icon" />
              ) : (
                <ClearIcon className="clear-icon" />
              )}
              <span>{message}</span>
            </div>
          ))}

          {/* Confirm Password Validation */}
          <div className="validation-item">
            {confirmPassword && confirmPassword === passWord ? (
              <CheckIcon className="check-icon" />
            ) : (
              <ClearIcon className="clear-icon" />
            )}
            <span>Passwords must match</span>
          </div>
        </div>
        } 

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default PassWordCheck;


//Functional Components

// import React, { useState } from "react";
// import ClearIcon from "@mui/icons-material/Clear";
// import CheckIcon from "@mui/icons-material/Check";

// const PASSWORD_REQUIREMENTS = {
//   isUpperCase: "Should have one uppercase letter",
//   isLowerCase: "Should have one lowercase letter",
//   isNumber: "Should have one number",
//   noSpecialChar: "Should not have special characters except @",
// };

// const PassWordCheck = ({ isLoading }) => {
//   const[text, setText] = useState("");
//   const [passWord, setPassWord] = useState("");
//   const [passwordValidation, setPasswordValidation] = useState({});

//   const handleChange = (e) => {
//     const value = e.target.value;
//     setPassWord(value);

//     setPasswordValidation({
//       isUpperCase: /[A-Z]/.test(value),
//       isLowerCase: /[a-z]/.test(value),
//       isNumber: /\d/.test(value),
//       noSpecialChar: /[@]/.test(value) && !value.match(/[!$&^%#)(]/g),
//     });
//   };

//   console.log("PassWordCheck Props:", { isLoading });

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//     <label htmlFor="">Name</label>
//     <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter Username..."/>
    
//     <label htmlFor="">Password</label>
//       <input
//         type="password"
//         value={passWord}
//         onChange={handleChange}
//         placeholder="Enter Password"
//       />
//       {Object.entries(PASSWORD_REQUIREMENTS).map(([key, message]) => (
//         <div key={key} style={{ display: "flex", gap: "5px", alignItems: "center" }}>
//           {passwordValidation[key] ? <CheckIcon style={{ color: "green" }} /> : <ClearIcon style={{ color: "red" }} />}
//           <span>{message}</span>
//         </div>
//       ))}

//       <button type="submit">Submit</button>
//     </>
//   );
// };

// export default PassWordCheck;




// //Class Component ⬇️

// // import React from "react";
// // import ClearIcon from "@mui/icons-material/Clear";
// // import CheckIcon from "@mui/icons-material/Check"; // ✅ Added missing import

// // const PASSWORD_REQUIREMENTS = {
// //   isUpperCase: "Should have one uppercase letter",
// //   isLowerCase: "Should have one lowercase letter",
// //   isNumber: "Should have one number",
// //   noSpecialChar: "Should not have special characters except @",
// // };

// // class PassWordCheck extends React.Component {
// //   state = {
// //     passWord: "",
// //     passwordValidation: {},
// //   };

// //   handleChange = (e) => {
// //     const { value } = e.target;
// //     this.setState({
// //       passWord: value,
// //       passwordValidation: {
// //         isUpperCase: /[A-Z]/.test(value),
// //         isLowerCase: /[a-z]/.test(value),
// //         isNumber: /\d/.test(value),
// //         noSpecialChar: /[@]/.test(value) && !value.match(/[!$&^%#)(]/g),
// //       },
// //     });
// //   };

// //   render() {
// //     const { passWord, passwordValidation } = this.state;
// //     console.log("PassWordCheck", this.props); // ✅ Fixed props reference

// //     if (this.props.isLoading) {
// //       return <div>Loading...</div>;
// //     }

// //     return (
// //       <>
// //         <input
// //           type="password"
// //           value={passWord}
// //           onChange={this.handleChange}
// //           placeholder="Enter Password"
// //         />
// //         {Object.entries(PASSWORD_REQUIREMENTS).map(([key, message]) => (
// //           <div key={key} style={{ display: "flex", gap: "5px", alignItems: "center" }}>
// //             {passwordValidation[key] ? <CheckIcon style={{ color: "green" }} /> : <ClearIcon style={{ color: "red" }} />}
// //             <span>{message}</span>
// //           </div>
// //         ))}
// //       </>
// //     );
// //   }
// // }

// // export default PassWordCheck;
