window.onload = function(){

  const display =
  document.getElementById("display");

  const operators =
  ['+','-','*','/','%'];

  /* =========================
     AUTO FONT SIZE
  ========================== */

  function adjustFont(){

    const length =
    display.value.length;

    if(length > 26){

      display.style.fontSize =
      "0.75rem";

    }

    else if(length > 22){

      display.style.fontSize =
      "0.9rem";

    }

    else if(length > 18){

      display.style.fontSize =
      "1.1rem";

    }

    else if(length > 14){

      display.style.fontSize =
      "1.35rem";

    }

    else if(length > 10){

      display.style.fontSize =
      "1.7rem";

    }

    else{

      display.style.fontSize =
      "2rem";

    }

  }

  /* =========================
     APPEND VALUE
  ========================== */

  window.appendValue = function(value){

    let current =
    display.value;

    let lastChar =
    current.slice(-1);

    /* REMOVE ERROR TEXT */

    if(
      current === "Error" ||
      current === "Cannot divide by zero"
    ){

      display.value = "";

      current = "";

    }

    /* BLOCK OPERATOR AT START */

    if(
      current === "" &&
      operators.includes(value)
    ){
      return;
    }

    /* BLOCK DOUBLE OPERATORS */

    if(
      operators.includes(lastChar) &&
      operators.includes(value)
    ){
      return;
    }

    /* BLOCK MULTIPLE DOTS */

    if(value === "."){

      let parts =
      current.split(/[\+\-\*\/%]/);

      let lastNumber =
      parts[parts.length - 1];

      if(lastNumber.includes(".")){
        return;
      }

      /* AUTO 0 BEFORE DOT */

      if(lastNumber === ""){

        display.value += "0";

      }

    }

    /* LIMIT LENGTH */

    if(current.length >= 35){
      return;
    }

    display.value += value;

    adjustFont();

  }

  /* =========================
     CLEAR DISPLAY
  ========================== */

  window.clearDisplay = function(){

    display.value = "";

    adjustFont();

  }

  /* =========================
     DELETE LAST
  ========================== */

  window.deleteLast = function(){

    if(
      display.value === "Error" ||
      display.value === "Cannot divide by zero"
    ){

      display.value = "";

    }

    else{

      display.value =
      display.value.slice(0,-1);

    }

    adjustFont();

  }

  /* =========================
     CALCULATE
  ========================== */

  window.calculate = function(){

    try{

      let expression =
      display.value;

      if(expression === ""){
        return;
      }

      let lastChar =
      expression.slice(-1);

      if(
        operators.includes(lastChar)
      ){

        expression =
        expression.slice(0,-1);

      }

      /* PERCENT SUPPORT */

      expression =
      expression.replace(
        /(\d+)%/g,
        "($1/100)"
      );

      /* CALCULATE */

      let result =
      Function(
        "return " + expression
      )();

      /* DIVIDE BY ZERO */

      if(
        result === Infinity ||
        result === -Infinity
      ){

        display.value =
        "Cannot divide by zero";

        adjustFont();

        return;

      }

      /* INVALID RESULT */

      if(isNaN(result)){

        display.value =
        "Error";

        adjustFont();

        return;

      }

      /* ROUND DECIMALS */

      if(
        typeof result === "number"
      ){

        result =
        parseFloat(
          result.toFixed(10)
        );

      }

      display.value = result;

      adjustFont();

    }

    catch{

      display.value =
      "Error";

      adjustFont();

    }

  }

  /* =========================
     KEYBOARD SUPPORT
  ========================== */

  document.addEventListener(
    "keydown",
    (e)=>{

      const key = e.key;

      /* NUMBERS */

      if(
        key >= '0' &&
        key <= '9'
      ){

        appendValue(key);

      }

      /* OPERATORS */

      else if(
        operators.includes(key)
      ){

        appendValue(key);

      }

      /* DOT */

      else if(key === "."){

        appendValue(".");

      }

      /* ENTER */

      else if(key === "Enter"){

        e.preventDefault();

        calculate();

      }

      /* BACKSPACE */

      else if(key === "Backspace"){

        deleteLast();

      }

      /* ESCAPE */

      else if(key === "Escape"){

        clearDisplay();

      }

    }
  );

  adjustFont();

}
