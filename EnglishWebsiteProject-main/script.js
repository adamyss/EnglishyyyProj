
const questions = [
    {
        question: "Your ideal Saturday just opened up. What are you doing?",
        answers: [
            { text: "Helping out with a project that makes life better for someone", values: { Abnegation: 1 } },
            { text: "Going down a rabbit hole about something I just discovered", values: { Erudite: 1 } },
            { text: "Trying something new that gets my heart racing", values: { Dauntless: 1 } },
            { text: "Having a sunny, no-drama day with my favorite people", values: { Amity: 1 } },
            { text: "Having a real conversation where nobody has to pretend", values: { Candor: 1 } },
        ],
    },
    {
        question: "The group chat has a tiny misunderstanding and it is getting BIG. You…",
        answers: [
            { text: "Check in with the person who seems most hurt", values: { Abnegation: 1 } },
            { text: "Scroll back, find the facts, and figure out where it went sideways", values: { Erudite: 1 } },
            { text: "Say what needs saying before the whole thing gets worse", values: { Dauntless: 1 } },
            { text: "Drop the temperature and help everyone reset", values: { Amity: 1 } },
            { text: "Ask everyone to say what they actually mean", values: { Candor: 1 } },
        ],
    },
    {
        question: "You get to plan a totally free afternoon. What sounds most like you?",
        answers: [
            { text: "Doing someone a favor they have been needing", values: { Abnegation: 1 } },
            { text: "Learning a skill or finally solving a question I have had", values: { Erudite: 1 } },
            { text: "Going somewhere I have never been, with no overthinking", values: { Dauntless: 1 } },
            { text: "Making snacks and getting everyone together", values: { Amity: 1 } },
            { text: "Catching up with someone who always tells it straight", values: { Candor: 1 } },
        ],
    },
    {
        question: "Your team is stuck on a big decision. What role do you naturally take?",
        answers: [
            { text: "Make sure the people affected most are looked after", values: { Abnegation: 1 } },
            { text: "Lay out the options and work out which one makes the most sense", values: { Erudite: 1 } },
            { text: "Get everyone moving and test an idea", values: { Dauntless: 1 } },
            { text: "Find the compromise the whole team can live with", values: { Amity: 1 } },
            { text: "Point out the trade-offs nobody is saying out loud", values: { Candor: 1 } },
        ],
    },
    {
        question: "A friend asks for your honest opinion about something they made. You…",
        answers: [
            { text: "Start with what they need to hear to feel supported", values: { Abnegation: 1 } },
            { text: "Give thoughtful feedback with specific reasons", values: { Erudite: 1 } },
            { text: "Tell them clearly, even if it is a little awkward", values: { Dauntless: 1 } },
            { text: "Keep it kind and focus on what is already working", values: { Amity: 1 } },
            { text: "Say exactly what I think—kindly, but no sugar-coating", values: { Candor: 1 } },
        ],
    },
    {
        question: "Plans suddenly change at the last minute. Your first thought is…",
        answers: [
            { text: "Who needs help adjusting to the new plan?", values: { Abnegation: 1 } },
            { text: "What changed, and what is the best new option?", values: { Erudite: 1 } },
            { text: "Okay, let's go—what is the next move?", values: { Dauntless: 1 } },
            { text: "How do we keep this fun for everyone?", values: { Amity: 1 } },
            { text: "Let's be clear about what is and is not happening", values: { Candor: 1 } },
        ],
    },
    {
        question: "Pick the compliment you would secretly love to hear.",
        answers: [
            { text: "You always show up when people need you", values: { Abnegation: 1 } },
            { text: "You always know how to figure things out", values: { Erudite: 1 } },
            { text: "You are the bravest person in the room", values: { Dauntless: 1 } },
            { text: "Everything feels better when you are around", values: { Amity: 1 } },
            { text: "I can always count on you to tell me the truth", values: { Candor: 1 } },
        ],
    },
];
const factionColorOrder = ["abnegation", "erudite", "dauntless", "amity", "candor"];
function shuffleAnswers(answers) {
    const shuffled = [...answers];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
    }
    return shuffled;
}
const shuffledQuestionAnswers = questions.map((question) => shuffleAnswers(question.answers));
const selectedAnswers = Array(questions.length).fill(null);
let currentQuestionIndex = 0;

function triviaShow() {
    const triviaSection = document.getElementById("trivia");
    const quizHeader = document.createElement("header");
    quizHeader.className = "quiz-header";
    quizHeader.innerHTML = `
        <p class="eyebrow">THE DIVERGENT PERSONALITY QUIZ</p>
        <h1>Which faction are you????</h1>
        <p>Find out what faction you would belong in!!!!!!!!</p>
        <div class="progress-label"><span id="progress-text">Question 1 of ${questions.length}</span></div>
    `;
    triviaSection.appendChild(quizHeader);

    const questionContainer = document.createElement("div");
    questionContainer.id = "question-container";
    triviaSection.appendChild(questionContainer);
    const resultsDiv = document.createElement("div");
    resultsDiv.id = "results";
    resultsDiv.className = "results-card";
    triviaSection.appendChild(resultsDiv);
    renderQuestion();
}

function renderQuestion() {
    const question = questions[currentQuestionIndex];
    const questionDiv = document.createElement("article");
    questionDiv.className = `question-card faction-${factionColorOrder[currentQuestionIndex % factionColorOrder.length]}`;
    questionDiv.setAttribute("aria-labelledby", "current-question-title");

    const questionText = document.createElement("h2");
    questionText.className = "question-title";
    questionText.id = "current-question-title";
    questionText.textContent = question.question;
    questionDiv.appendChild(questionText);

    const questionHint = document.createElement("p");
    questionHint.className = "question-hint";
    questionHint.textContent = "Pick the answer that feels most like you.";
    questionDiv.appendChild(questionHint);

    const answersList = document.createElement("div");
    answersList.className = "answer-list";
    shuffledQuestionAnswers[currentQuestionIndex].forEach((answer) => {
        const answerButton = document.createElement("button");
        answerButton.type = "button";
        answerButton.className = "answer-option";
        answerButton.setAttribute("aria-pressed", String(selectedAnswers[currentQuestionIndex] === answer));
        if (selectedAnswers[currentQuestionIndex] === answer) {
            answerButton.classList.add("selected");
        }

        const answerText = document.createElement("span");
        answerText.textContent = answer.text;
        answerButton.append(answerText);
        answerButton.onclick = () => {
            selectedAnswers[currentQuestionIndex] = answer;
            answersList.querySelectorAll(".answer-option").forEach((option) => {
                const isSelected = option === answerButton;
                option.classList.toggle("selected", isSelected);
                option.setAttribute("aria-pressed", String(isSelected));
            });
            questionDiv.querySelector(".quiz-next").disabled = false;
            updateProgress();
        };
        answersList.appendChild(answerButton);
    });
    questionDiv.appendChild(answersList);

    const navigation = document.createElement("nav");
    navigation.className = "quiz-navigation";
    navigation.setAttribute("aria-label", "Quiz questions");

    if (currentQuestionIndex > 0) {
        const backButton = document.createElement("button");
        backButton.type = "button";
        backButton.className = "quiz-back";
        backButton.textContent = "← Back";
        backButton.onclick = () => {
            currentQuestionIndex -= 1;
            renderQuestion();
            updateProgress();
        };
        navigation.appendChild(backButton);
    } else {
        const stepLabel = document.createElement("span");
        stepLabel.className = "quiz-step-label";
        stepLabel.textContent = `${String(currentQuestionIndex + 1).padStart(2, "0")} / ${String(questions.length).padStart(2, "0")}`;
        navigation.appendChild(stepLabel);
    }

    const nextButton = document.createElement("button");
    nextButton.type = "button";
    nextButton.className = "quiz-next";
    nextButton.textContent = currentQuestionIndex === questions.length - 1 ? "Show my faction →" : "Next question →";
    nextButton.disabled = selectedAnswers[currentQuestionIndex] === null;
    nextButton.onclick = () => {
        if (selectedAnswers[currentQuestionIndex] === null) return;
        if (currentQuestionIndex === questions.length - 1) {
            resulties();
            return;
        }
        currentQuestionIndex += 1;
        renderQuestion();
        updateProgress();
    };
    navigation.appendChild(nextButton);
    questionDiv.appendChild(navigation);

    const questionContainer = document.getElementById("question-container");
    questionContainer.replaceChildren(questionDiv);
    document.getElementById("results").classList.remove("is-visible");
}

function updateProgress() {
    const progressText = document.getElementById("progress-text");
    progressText.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}

function resulties() {
    const scores = {
        Abnegation: 0,
        Erudite: 0,
        Dauntless: 0,
        Amity: 0,
        Candor: 0,
    };
    selectedAnswers.forEach((answer) => {
        if (!answer) return;
        for (const faction in answer.values) {
            scores[faction] += answer.values[faction];
        }
    });

    let highest = 0;
    let resultyyy = "";
    for (const key in scores) {
        if (scores[key] > highest) {
            highest = scores[key];
            resultyyy = key;
        }
    }
    let num = 0;
    for(const key2222 in scores){
        if(scores[key2222] >= highest -1 ){
          num += 1;
        }
    }
    if (num >= 2){
        resultyyy = "Divergent";
    }

    const resultsDiv = document.getElementById("results");
    document.getElementById("question-container").hidden = true;
    const resultHeading = resultyyy === "Divergent"
        ? "You are <span>Divergent</span>!"
        : `You belong in <span>${resultyyy}</span>!`;
    resultsDiv.classList.add("is-visible");
    resultsDiv.innerHTML = `
        <p class="eyebrow">YOUR FACTION IS IN</p>
        <h2>${resultHeading}</h2>
        <p class="result-description">${resultyyy === "Divergent"
            ? "You have a little bit of everything. Rules were never going to fit you neatly."
            : `Your answers point to ${resultyyy}: the faction that best matches what matters most to you.`}</p>
        <div class="score-list">
            <p><span>Abnegation</span><strong>${scores.Abnegation}</strong></p>
            <p><span>Erudite</span><strong>${scores.Erudite}</strong></p>
            <p><span>Dauntless</span><strong>${scores.Dauntless}</strong></p>
            <p><span>Amity</span><strong>${scores.Amity}</strong></p>
            <p><span>Candor</span><strong>${scores.Candor}</strong></p>
        </div>
        <button class="quiz-restart" type="button">Retake the quiz ↻</button>
    `;
    resultsDiv.querySelector(".quiz-restart").addEventListener("click", () => {
        selectedAnswers.fill(null);
        currentQuestionIndex = 0;
        document.getElementById("question-container").hidden = false;
        renderQuestion();
        updateProgress();
        resultsDiv.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    resultsDiv.scrollIntoView({ behavior: "smooth", block: "center" });
}

triviaShow();

document.getElementById("take-quiz").addEventListener("click", () => {
    document.getElementById("trivia").hidden = false;
    document.getElementById("trivia").scrollIntoView({ behavior: "smooth", block: "start" });
});