import { phrases } from "./phrases.js"

let questionSet = []


$('#startBtn').click(starQuiz)
// $('#questionText').text(phrases[0].en)

function starQuiz() {
    $('#start-card').addClass('hidden')
    $('#question-card').removeClass('hidden')
    questionSet = shuffle(phrases.slice(0,5))
    displayQuest()
    console.log(questionSet);
}

function displayQuest() {
    $('#questionText').text(questionSet[0].es)
    $('#answerBox').text(questionSet[0].en) // To be removed
}

const shuffle = (array) => {
    let currentIndex = array.length, randomIndex
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }
    return array
}