window.onload = main;


function main(){
	//Calling the end function
	console.log("Testing end function: " + end("Bastian", "n"));
	
}

/**
	FreeCodeCamp Bonfire: Confirm The Ending
	A function that will look if a string ends with the following target.

	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr
	@parameters
		str - Main string that will be the string we look through
		target - The target value we want to find at str's ending

	@returns - bool
*/
function end(str, target) {
  // "Never give up and good luck will find you."
  // -- Falcor

  //making a sub string out of str that is at the end of the string and compare it with the target.
  if(str.substr(str.length - target.length, target.length) == target){
    return true;
  }
  return false;
}