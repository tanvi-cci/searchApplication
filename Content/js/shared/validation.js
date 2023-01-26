/*
------------------------------------
Global Validation
-------------------------------------
Created By: Tanvi Korgaonkar
Created Date: 26-09-2022
-------------------------------------
Modified By:
Modified Date:
Comments:
-------------------------------------
*/

//Validation for Age - 0 to 100
export const validationAge = function validationAge(age) {
  if (age < 0 || age > 100 || !Number.isInteger(parseFloat(age))) {
      return true;
  }
  return false;
}

//Validation to check for empty field
export const validationEmpty = function validationEmpty(value) {
  if(value){
      return true;
  }
  return false;
}

//Validation for positive integer
export const validationPositiveInteger = function validationPositiveInteger(value) {
  if(value < 0 || !Number.isInteger(parseFloat(value))) {
    return true;
  }
  return false;
}