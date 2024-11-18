export interface ISendSurveyOpinionRequest {
    surveyId: number;
    answers: ISurveyOpinionAnswer[];
}
export interface ISurveyOpinionAnswer {
    questionId: number;
    answerType: string;
    answers: any;
}
