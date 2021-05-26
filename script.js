const question = document.querySelector('.question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('.progress-text')
const scoreText = document.querySelector('.score')
const progressBarFull = document.querySelector('.progressbar-inside')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []


let questions = [
    {
        question: 'What is the ratio of male to female calico cats?',
        choice1: '1/1000',
        choice2: '1/30',
        choice3: '1/3000',
        choice4: '1/300',
        answer: 3
        
    },
    {
        question: `In Michael Sowa's "The Broken Paw" a white kitten is portrayed, as the title suggests, with a broken paw... Which of the four?`,
        choice1: 'left front paw',
        choice2: 'left hind paw',
        choice3: 'right front paw',
        choice4: 'right hind paw',
        answer: 3
        
    },
    {
        question: 'When did the German director Michael Schaack direct the adult animated film "Felidae"?',
        choice1: '1994',
        choice2: '1989',
        choice3: '2010',
        choice4: '1973',
        answer: 1
        
    },
    {
        question: 'Which classical music piece is played by the cat Tom in the famous episode "The Cat Concerto" of the Tom & Jerry series?',
        choice1: 'Für Elise, by Ludwig van Beethoven',
        choice2: 'Nocturnes, Op. 9, by Frédéric Chopin',
        choice3: 'Prelude in C-sharp minor, by Sergei Rachmaninoff',
        choice4: 'Hungarian Rhapsody No. 2, by Franz Liszt',
        answer: 4
        
    },
    {
        question: `In the early nineteenth century, with how many lashes of Cat o'nine tails was a sailor accused of theft punished?`,
        choice1: 'Up to 50',
        choice2: 'Up to 500',
        choice3: 'Up to 100',
        choice4: 'Up to 1000',
        answer: 2
        
    },
    {
        question: `What's the name of the only cat actor to ever win two PATSY awards, an animal actor's version of an Oscar?`,
        choice1: 'Morris',
        choice2: 'Orangey',
        choice3: 'Tiki',
        choice4: 'Lucy',
        answer: 2
        
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 6

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]

        console.log(choice)
        console.log(currentQuestion)
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)

            document.querySelector('#result').innerHTML = '<h3>CORRECT!</h3>'
        } else {
            document.querySelector('#result').innerHTML = '<h3>Wrong...</h3>'
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            document.querySelector('#result').innerHTML = ''
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()