# Poker Hand Project
## Background
You have just started work at ACME Gaming Inc and you have been tasked to complete  a digital version of 5 card poker.
This is a project that an employee that has left failed to complete.

The project simulates a deck of standard playing cards. The deck of cards consists of a group of card objects, with each
card having a rank (Ace - King) and a suite (Diamonds, hearts, clubs and spades)

You should be able to construct a hand, which can contain any number of cards, less than 52.
With a hand of 5 cards, you should be able to retrieve a hand rank and also be able to compare two hands of 5 cards
using comparators.  Details for the hand rankings can be found here: http://www.wsop.com/poker-hands/

Thankfully, a lot of the groundwork has been completed by someone before you and only a few functions require completion.
The project tests were completed first, so your task is simply to make all the tests pass.

** NB **

* You may change any part of the project you deem necessary. You may add or remove fields, method or classes.
* You may change design elements you do not like.
* You may ask clarifying question if needed.
* You may add new tests.
* Note that your solution will be evaluated against a more exhaustive list of tests, so think about missing test coverage and add tests you think are necessary.

## Task 1 - Picking from the Deck
The deck picking function in: `src/pokerhands/Deck.js` needs to be completed

## Task 2 - Ranking the Hand
The fiveCardHandRanker in: `src/pokerhands/HandRanker.js` does not do a great job of picking the correct hand rank. Please implement a better version of this.
As stated above you may change any part of the codebase that you like.

## Task 3 - Create a visualisation using React
There is a start to a user interface that is all contained in the ```src/App.js```
Use your creativity and design a visual representation for the deck, hands and the hand ranker results
As stated above you may change any part of the codebase that you like

## Task 4 - Stretch Goal
After completing tasks 1, 2 and 3, add the feature to pick multiple hands and compare them to each other and display
the winning hand

## Installing the dependencies

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

When all the tests pass, and you are happy with the state of the code, return the code to SprintHive.

## Notes
* If you find a bug or design issue with the existing code, fix it or change it as required and document this change.
* State any assumptions you make
