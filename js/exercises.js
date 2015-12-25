window.onload = main;


function main(){
	//Calling the end function
	console.log("Testing end function: " + end("Bastian", "n"));
	console.log("Testing repeat function: " + repeat("abc", 3));	
  console.log(truncate("A-tisket a-tasket A green and yellow basket", 11));
}

/**
	Confirm The Ending
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

/**
	Repeat a string repeat a string
	A function which will repeat a string x times and return it.

	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
	@parameters
		str - Main string that will be repeated
		num - The number of times it should be repeated

	@returns string
*/
function repeat(str, num) {
  // repeat after me

  //Creating a new variable to hold the original value so we can use it to append our str variable
  //each loop.
  var originalStr = str;

  //Setting the str variable to an empty string incase a negative number would be added in the parameters
  str = "";

  //Looping through x ammount of times depending on the num entered in the functions parameters
  for(var x = 0; x < num; x++){
  	//appending the str that we will return with the original string entered into the function
    str += originalStr;
  }
  
  //return the repeated value
  return str;
}

function truncate(str, num) {
  // Clear out that junk in your trunk
  if(str.length > num){
    str = str.slice(0, num);
    if(num <= 3){
      str += "...";
    }else{
      str = str.slice(0, str.length - 3);
      str += "...";
    }
  }
  
  return str; //Comment
}


