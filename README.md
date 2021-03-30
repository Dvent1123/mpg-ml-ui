# Machine Learning API FrontEnd

## Usage
This is a very simple user interface that uses the API created in this repo https://github.com/Dvent1123/mpg-ml-api. The API holds a machine learning model to predict mpg for a car within the years 1970 to 1982. Upon loading the user will see a form where they which will need to be filled out and looks like the picture below. They have the parameters listed above and inside the text fields and there is some minimal validation in place. If the user fails to give an input, is outside of the range, or gives an invalid input than an alert popup will let them know. 

![image](https://user-images.githubusercontent.com/58802270/113039524-9cd9e600-914c-11eb-9161-a434bfc8437f.png)

After filling out all the fields than the user can submit the request using the submit button at the bottom which will send a post request to the API and return a prediction. The prediction will be sent via an alert just for simplicities sake. 

## Development
Clone this repo and cd into the project directory, install dependencies by running:
`<npm i>`

Start the project on port 3000 by using:
`<npm start>`

Build the project using
`<npm build>`

