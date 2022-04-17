import React from 'react';

import CommentItem from './CommentItem';

const TEST_COMMENT = [
  {
    id: 'c1',
    text: 'so lovely..',
    user: 'Sam',
  },
  {
    id: 'c2',
    text: 'Could not said better myself!',
    user: 'Jonh Doe',
  },
];

const Comments = () => {
  const CommentsList = TEST_COMMENT.map((comment) => {
    return <CommentItem key={comment.id} commentText={comment.text} commentUser={comment.user} />;
  });

  return <>{CommentsList}</>;
};
export default Comments;
