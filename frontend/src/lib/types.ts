
export type ISignUpType = {
    username: string;
    email: string;
    password: string;
}

export type ISignInType = {
    email: string;
    password: string;
}

export type IUser = {
    id: string;
    username: string;
    email: string;
    profile_img: string;
    signup_date: string;
}

export type INewThread = {
    content: string | null;
    quiz_id: number | null;
}
  
export type IThread = {
    id: number;
    content: string;
    created_at: string;
    modified_at: string | null;
    username: string;
    profile_img: string;
    quiz: IQuiz | null;
}

export type INewComment = {
    content: string;
    thread_id: number;
    user_id: string;
    comment_replied_to_id: number | null;
}

export type IComment = {
    id: number;
    content: string;
    created_at: string;
    modified_at: string | null;
    username: string;
    profile_img: string;
    comment_replied_to_id: number | null;
}

export type IFollowing = {
    following_user_id: string;
    username: string;
    profile_img: string;
}

export type IFollower = {
    userid: string;
    username: string;
    profile_img: string;
    isfollowing: boolean;
}

export type IUserWithFollows = {
    id: string;
    username: string;
    profile_img: string;
    isfollowing: boolean;
}

export type INewQuiz = {
    question: string;
    answer: number;
    points: number;
}

export type IQuiz = {
    id: number;
    question: string;
    answer: number;
    points: number;
}

export type IMyQuiz = {
    id: number;
    question: string;
    answer: number;
    first_got_correct: boolean;
}