const fileName = "talk.js";
const answer = "This is a good question."
const intro = function () {
    console.log("im a node file called", fileName);
}
const goodBye = function () {
    console.log("Goodbye!");
};

const hello = function () {
    console.log("Hello");
}; 

const ask = function (question) {
    console.log(question);
    return answer;
}

module.exports = {
    intro,
    goodBye,
    greeting: hello, // greetings doesnt exist as a method, this is encapsulation,
    ask                // if we add more function we will break the separation of concerns rule
}

