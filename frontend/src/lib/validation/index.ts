import * as z from "zod"

export const SignUpValidation = z.object({
    username: z.string().min(3, {message: "Username must be at least 3 characters."}).max(16, {message: "Username must be less than 16 characters"}),
    email: z.string().email(),
    password: z.string().min(8, {message: "Password must be at least 8 characters."})
  });

export const SignInValidation = z.object({
  email: z.string().email(),
  password: z.string()
});

export const NewThreadValidation = z.object({
  content: z.string(),
  quiz_id: z.number()
});

export const CommentValidation = z.object({
  content: z.string().min(1, {message: "Comment shouldn't be empty."}),
  thread_id: z.number(),
  user_id: z.string(),
  comment_replied_to_id: z.union([z.number(), z.null()])
});