import React, { useState } from "react";
import Wrapper from "./Components/Wrapper";
import Screen from "./Components/Screen";
import ButtonBox from "./Components/ButtonBox";
import Button from "./Components/Button";

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

let memory = Number(0);

const btnValues = [
  ["C","del",  "mc", "mr","/"],
  [7, 8, 9, "m+","X"],
  [4, 5, 6,"%", "-"],
  [1, 2, 3,"+-", "+"],
  [0, ".","sci", "="],
];

const assignClass=(i)=>{
  if(i%5 === 4 || i === 23){
    return ("operator");
  }
  else if(i === 20){
    return ("zero");
  }
  else if(i===0 || i===1 || i===2 || i===3){
    return ("function");
  }
}

const App = () => {

  let [calculate, setCalculate] = useState({
    sign: "", //operator sign
    value: 0, //entered number
    result: 0, //calculated value
    sci: 0, //scientific number
  });

  let calculate0 = {
    sign: "", //operator sign
    value: 0, //entered number
    result: 0, //calculated value
    sci: 0, //scientific number
  };

  const deletClickHandler =() =>{

    setCalculate(calculate0);

  }

  const mcClickHandler =() =>{
    memory=Number(0);
  }

  const mrClickHandler =() =>{

    if (removeSpaces(calculate.value).length < 16) {
      setCalculate({
        ...calculate,
        value:
        /* 0 is the initialized value */
        calculate.value === 0 && Number(memory) === "0"? "0":
         /* the  value must be a number */
         removeSpaces(calculate.value) % 1 === 0? toLocaleString(Number(removeSpaces(calculate.value + Number(memory)))):toLocaleString(calculate.value + Number(memory)),
        
        result: !calculate.sign ? 0 : calculate.result,
      });
      
    }
    else{
      setCalculate({
        ...calculate,
        value: "overfloat",
      })
    }
  }

  const sciClickHandler =() =>{
    
    let power =0;
    let valueCopy = calculate.value?calculate.value:calculate.result;

    if(valueCopy>10){
      while(valueCopy>10){
        valueCopy=valueCopy/10;
        power=power+1;
      }
    }
    else if(valueCopy<1){
      while(valueCopy<1){
        valueCopy=valueCopy*10;
        power=power-1;
      }
    }
    alert(valueCopy+"e"+power);
    power=0;
    valueCopy=0;

  }

  const mPlusClickHandler =() =>{
    memory += Number(calculate.value);
  }

  const numClickHandler = (e) => {
    e.preventDefault();
    const input = e.target.innerHTML;

    let calculate0 = JSON.parse(JSON.stringify(calculate));

    if (removeSpaces(calculate.value).length < 16) {
      setCalculate({
        ...calculate,
        value:
        /* 0 is the initialized value */
        calculate.value === 0 && input === "0"? "0":
         /* the  value must be a number */
         removeSpaces(calculate.value) % 1 === 0? toLocaleString(Number(removeSpaces(calculate.value + input))):toLocaleString(calculate.value + input),
        
        result: !calculate.sign ? 0 : calculate.result,
      });
    }
    else{
      setCalculate({
        ...calculate,
        value: "overfloat",
      })
    }
  };

  const commaClickHandler = (e) => {
    e.preventDefault();
    const input = e.target.innerHTML;
   //no multiple decimal points are possible
    setCalculate({
      ...calculate,
      value: !calculate.value.toString().includes(".") ? calculate.value + input : calculate.value,
    });
  };

  const signClickHandler = (e) => {
    e.preventDefault();
    const input = e.target.innerHTML;
  
    setCalculate({
      ...calculate,
      sign: input,
      //no effect on repeated calls
      result: !calculate.result && calculate.value ? calculate.value : calculate.result,
      value: 0,
    });
  };

  const equalsClickHandler = () => {
    if (calculate.sign && calculate.value) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "X"
          ? a * b
          : a / b;
  
      setCalculate({
        ...calculate,
        result:
        calculate.value === "0" && calculate.sign === "/"
            ? "Divided by 0"
            : toLocaleString(math(Number(removeSpaces(calculate.result)), Number(removeSpaces(calculate.value)), calculate.sign)),
        sign: "",
        value: 0,
      });
    }
  };

  const invertClickHandler = () => {
    setCalculate({
      ...calculate,
      value: calculate.value ? toLocaleString(removeSpaces(calculate.value) * (-1)) : 0,
      result: calculate.result ? toLocaleString(removeSpaces(calculate.result) * (-1)) : 0,
      sign: "",
    });
  };

  const percentClickHandler = () => {
    let value = calculate.value ? parseFloat(removeSpaces(calculate.value)) : 0;
    let result = calculate.result ? parseFloat(removeSpaces(calculate.result)) : 0;
  
    setCalculate({
      ...calculate,
      value: (value = value/ Math.pow(100, 1)),
      result: (result = result/ Math.pow(100, 1)),
      sign: "",
    });
  };

  const resetClickHandler = () => {
    setCalculate({
      ...calculate,
      sign: "",
      value: 0,
      result: 0,
      sci:0,  
    });
  };

  return (
    <Wrapper>
      {/* screen shows input or calculation result */}
      <Screen value={calculate.value ? calculate.value : calculate.result} /> 
      <ButtonBox>
{btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={assignClass(i)}
                value={btn}
                onClick={
                  btn === "C"? resetClickHandler : 
                  btn === "+-" ? invertClickHandler:
                  btn === "%"? percentClickHandler:
                  btn === "="? equalsClickHandler:
                  btn === "/" || btn === "X" || btn === "-" || btn === "+"?signClickHandler:
                  btn === "."? commaClickHandler:
                  btn === "del"? deletClickHandler:
                  btn === "mc"? mcClickHandler:
                  btn ==="mr"? mrClickHandler:
                  btn ==="sci"? sciClickHandler:
                  btn ==="m+"? mPlusClickHandler:numClickHandler}
              />
            );
          })}
      </ButtonBox>
    </Wrapper>
  );
};

export default App;