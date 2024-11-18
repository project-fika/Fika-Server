export interface ISurveyResponseData {
    locale: Record<string, Record<string, string>>;
    survey: ISurvey;
}
export interface ISurvey {
    id: number;
    welcomePageData: IWelcomePageData;
    farewellPageData: IFarewellPageData;
    pages: number[][];
    questions: ISurveyQuestion[];
    isNew: boolean;
}
export interface IWelcomePageData {
    titleLocaleKey: string;
    timeLocaleKey: string;
    descriptionLocaleKey: string;
}
export interface IFarewellPageData {
    textLocaleKey: string;
}
export interface ISurveyQuestion {
    id: number;
    sortIndex: number;
    titleLocaleKey: string;
    hintLocaleKey: string;
    answerLimit: number;
    answerType: string;
    answers: ISurveyAnswer[];
}
export interface ISurveyAnswer {
    id: number;
    questionId: number;
    sortIndex: number;
    localeKey: string;
}
