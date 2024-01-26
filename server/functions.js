export const isCorrect = (questions)=>{
    if(questions.length != process.env.QUESTIONS){
        return false;
    }
}

export const formatQuestions = (questions)=>{
    let newQues = [];
    questions.forEach(element => {
        if(element != ""){
            newQues.push(element)
        }
    });
    return newQues;
}
