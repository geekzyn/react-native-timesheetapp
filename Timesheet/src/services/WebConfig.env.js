// Environment URLs
export const devBaseURL = 'https://facebook.github.io/react-native';

/*This is just and example how to handle multiple server staging enviroment.
Can comment out the below enviroment as its same.
*/
export const intBaseURL = 'https://facebook.github.io/react-native';
export const uatBaseURL = 'https://facebook.github.io/react-native';
export const preProdBaseURL = 'https://facebook.github.io/react-native';
export const prodBaseURL = 'https://facebook.github.io/react-native';

//Incase if you have multiple Software deveploment stages/environment.
export const getBaseURL = (ENVIRONMENT) => {
    switch (ENVIRONMENT) {
      case DEV:
        return devBaseURL;
  
      case INT:
        return intBaseURL;
  
      case UAT:
        return uatBaseURL;
  
      case PRE_PROD:
        return preProdBaseURL;
  
      default:
        return prodBaseURL;
    }
  };