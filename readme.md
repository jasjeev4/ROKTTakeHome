

# Backend - Technical Challenge

The app has been implemented as a console app.

## Usage

```bash  

## Install dependencies  

npm install 
  
## Run tests
  
npm run test

## Run the app
  
npm run start
```  

## Runtime complexity

- The application runs in O(N) time where N is the number of lines in the input file. In the worst case, output needs to be generated from all these lines.

## Space complexity

- The application uses O(1) additional space. since the output is printed on the fly.

## Notes

- The application supports multiple valid date input types apart from the obviously supported UTC time format. For example '2000' is a valid date input.

- If the output is to be generated from a partially correct input file, it will be generated if the date in the range of the input dates is valid.