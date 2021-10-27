document.addEventListener("DOMContentLoaded", function() {
    var d = document;



    // Quiz
    var quizForm = d.querySelector( ".quiz" ),
    quizFieldset = quizForm.querySelectorAll( "fieldset" ),
    btnPrev = d.querySelectorAll( ".quiz-btn-prev" ),
    quizQuestNumber = d.querySelector( "#question-number" ),
    quizQuestNumberCount = d.querySelector( "#question-number-count" ),
    quizBoxQuestion = d.querySelector( ".quiz-box__question" ),
    quizLine = d.querySelector('.quiz-box__motion-line'),
    quizCountQuest = 0;
        
    // Кнопка назад
    btnPrev.forEach((btn, btnIndex) => {
        btn.addEventListener( "click", event => {
            event.preventDefault();

            quizQuestNumber.innerHTML = btnIndex + 1;
            quizFieldset[btnIndex + 1].classList.remove('active');    
            quizFieldset[btnIndex].classList.add('active');
            lineProcenter();
        });
    });

    //Переключение шага при выборе ответа
    quizFieldset.forEach((fieldset, fieldsetIndex) => {
        let fieldsetLabels = fieldset.querySelectorAll('.quiz-wrapper__label');
        quizCountQuest++;   
        fieldsetLabels.forEach((label) => {
            label.addEventListener( "click", event => {
        
                quizFieldset[fieldsetIndex].classList.remove('active');
                
                quizFieldset[fieldsetIndex + 1].classList.add('active');
                quizQuestNumber.innerHTML = fieldsetIndex + 2;
                lineProcenter();
            });
        });
    });

    // Функция обновления номера вопроса
    function quizData(){
        quizQuestNumberCount.innerHTML = quizCountQuest;
    }

    // Функция обновления процентной полосы
    function lineProcenter(){
        var quizQuestNumberForLine = d.querySelector( "#question-number").innerHTML,
            lineProcent = quizQuestNumberForLine * (100/quizCountQuest);
        
        quizLine.style.width = lineProcent + '%';
    }

    quizData()
    lineProcenter();

})