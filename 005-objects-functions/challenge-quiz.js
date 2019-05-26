(questionData => {
  /*eslint no-console: 0*/

  let score = 0;

  function QuestionGenerator(question, answers, correctIndex) {
    this.check = function(answer) {
      return parseInt(answer) === parseInt(correctIndex);
    };
    this.displayChoice = function() {
      console.log(question);
      console.log('Please enter the number you think is the correct answer');
      answers.forEach((answer, i) => {
        console.log(`${i}: ${answer}`);
      });
    };
    this.exit = function(exit) {
      return exit === 'exit';
    };
    this.ask = function() {
      return prompt(question);
    };
  }

  const questions = questionData.map(
    ({ question, answers, answer }) =>
      new QuestionGenerator(question, answers, answer),
  );

  for (let index = 0; index < questions.length; index++) {
    const question = questions[index];

    question.displayChoice();
    const answer = question.ask();
    if (question.exit(answer)) break;

    const result = question.check(answer);
    score += result ? 1 : 0;
  }

  console.log({ score });
})([
  {
    question: 'What color is the sky',
    answers: ['blue', 'red', 'orange'],
    answer: 0,
  },
  {
    question: 'What color is the sun',
    answers: ['blue', 'yellow', 'orange'],
    answer: 1,
  },
]);
