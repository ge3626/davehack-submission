const getAllThreads = 'SELECT * FROM threads_quiz';
const getThreadsByUserID = 'SELECT * FROM threads_quiz WHERE user_id = $1';
const getAllThreadsInFormat= `
SELECT 
  t.id,
  t.content,
  t.quiz_id,
  TO_CHAR(t.created_at, 'Mon DD, YYYY, HH12:MI AM') AS created_at,
  CASE 
    WHEN t.modified_at IS NOT NULL THEN TO_CHAR(t.modified_at, 'Mon DD, YYYY, HH12:MI AM')
    ELSE NULL
  END AS modified_at,
  u.username,
  u.profile_img,
  CASE
    WHEN q.id IS NOT NULL THEN
      json_build_object(
        'question', q.question,
        'answer', q.answer,
        'points', q.points
      )
    ELSE
      NULL
  END AS quiz
FROM 
  threads_quiz t
JOIN 
  users u ON t.user_id = u.id
LEFT JOIN 
  quizs q ON t.quiz_id = q.id;
 `;
const getThreadById = 'SELECT * FROM threads_quiz WHERE id = $1';
const addNewThread = 'INSERT INTO threads_quiz (quiz_id, content, user_id) VALUES ($1, $2, $3)';
const updateThread = `UPDATE threads_quiz SET content = COALESCE($1, content), quiz_id = COALESCE($2, quiz_id) WHERE id = $3`;
const deleteThreadById = 'DELETE FROM threads_quiz WHERE id = $1';

module.exports = {
    getAllThreads,
    getThreadsByUserID,
    getAllThreadsInFormat,
    getThreadById,
    addNewThread,
    updateThread,
    deleteThreadById
}