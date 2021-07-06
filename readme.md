

# Backend - Technical Challenge

The app has been implemented as a console app.


## Usage - Using Docker


```bash  

docker run --rm -it  jasjeev4/rokt-takehome:latest

```
## Usage - Locally

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
- If there's no data in a valid date range, an empty array will displayed to indicate no data was found within the range.
