import React, {useState,forwardRef,useImperativeHandle } from "react";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 
import { getMonth, getYear } from 'date-fns';
import range from "lodash/range"; 
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";


const VoterDOB2 = forwardRef((props, _ref) => {

    const [dob, setDob] = useState("");
    /*
    const handleDobChange = () => {
        setDob(dob);
    }
    */
  
    useImperativeHandle(_ref, () => ({
      getDob: () => {
        return dob;
      },
    }));

    //const years = range(1980, getYear(new Date("January 1, 2005 00:00:00")) + 1, 1);
    const years = range(1980, getYear(new Date()) + 1, 1);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  
    return (
        <DatePicker
        className ="form-control"
        id="dob"
        autoComplete="off"
        selected={dob}
        onChange={(date) => setDob(date)}
        maxDate={new Date()}
        renderCustomHeader={({
           date,
           changeYear,
           changeMonth,
           decreaseMonth,
           increaseMonth,
           prevMonthButtonDisabled,
           nextMonthButtonDisabled,
         }) => (
           <div
             style={{
               margin: 10,
               display: "flex",
               justifyContent: "center",
             }}
           >
             <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
               {"<"}
             </button>
             <select
               value={getYear(date)}
               onChange={({ target: { value } }) => changeYear(value)}
             >
               {years.map((option) => (
                 <option key={option} value={option}>
                   {option}
                 </option>
               ))}
             </select>
   
             <select
               value={months[getMonth(date)]}
               onChange={({ target: { value } }) =>
                 changeMonth(months.indexOf(value))
               }
             >
               {months.map((option) => (
                 <option key={option} value={option}>
                   {option}
                 </option>
               ))}
             </select>
   
             <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
               {">"}
             </button>
           </div>
         )}
       />
    );
  });
  
  export default React.memo(VoterDOB2);