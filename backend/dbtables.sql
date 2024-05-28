/*database schemas*/
CREATE TABLE users(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  signup_date DATE NOT NULL DEFAULT CURRENT_DATE,
  profile_img TEXT
)

CREATE TABLE threads_quiz(
  id SERIAL PRIMARY KEY,
  content TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  modified_at TIMESTAMP DEFAULT NULL,
  quiz_id INTEGER REFERENCES quizs(id) ON DELETE SET NULL,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
)

CREATE TABLE likes_quiz(
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  thread_id INTEGER NOT NULL REFERENCES threads_quiz(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(user_id, thread_id)
)

CREATE TABLE comments_quiz(
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  modified_at TIMESTAMP DEFAULT NULL,
  comment_replied_to_id INTEGER REFERENCES comments_quiz(id) ON DELETE CASCADE,
  thread_id INTEGER NOT NULL REFERENCES threads_quiz(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
)

CREATE TABLE follows(
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  following_user_id UUID,
  followed_user_id UUID,
  CONSTRAINT pk_follow PRIMARY KEY (following_user_id, followed_user_id),
  FOREIGN KEY (following_user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (followed_user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE quizs (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer FLOAT,
  points FLOAT NOT NULL,
  first_got_correct BOOLEAN,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE quiz_total_points (
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  highest_points FLOAT
)