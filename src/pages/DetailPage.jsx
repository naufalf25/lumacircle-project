import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  asyncDownvoteThreadDetail,
  asyncNeutralizeThreadDetailVote,
  asyncReceiveThreadDetail,
  asyncUpvoteThreadDetail,
  asyncDownvoteComment,
  asyncNeutralizeCommentVote,
  asyncUpvoteComment,
  asyncCreateComment,
} from '../states/threadDetail/action';
import { Link } from 'react-router-dom';
import ThreadItem from '../components/homepage/ThreadItem';
import Loading from '../components/Loading';
import CommentLists from '../components/detailpage/CommentLists';
import CreateComment from '../components/detailpage/CreateComment';

function DetailPage() {
  const { id } = useParams();
  const {
    threadDetail = {},
    loading,
    authUser,
  } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onUpvote = (id) => {
    if (!authUser) {
      alert('You must login to upvote a thread');
      return;
    }

    if (threadDetail.upVotesBy.includes(authUser.id)) {
      alert('You have already upvoted this thread');
      return;
    }

    if (threadDetail.downVotesBy.includes(authUser.id)) {
      dispatch(asyncNeutralizeThreadDetailVote(id));
      return;
    }

    dispatch(asyncUpvoteThreadDetail(id));
  };

  const onDownvote = (id) => {
    if (!authUser) {
      alert('You must login to downvote a thread');
      return;
    }

    if (threadDetail.upVotesBy.includes(authUser.id)) {
      dispatch(asyncNeutralizeThreadDetailVote(id));
      return;
    }

    if (threadDetail.downVotesBy.includes(authUser.id)) {
      alert('You have already downvoted this thread');
      return;
    }

    dispatch(asyncDownvoteThreadDetail(id));
  };

  const onUpvoteComment = (id) => {
    if (!authUser) {
      alert('You must login to upvote a thread');
      return;
    }

    const targetComment = threadDetail.comments.find(
      (comment) => comment.id === id,
    );

    if (targetComment.upVotesBy.includes(authUser.id)) {
      alert('You have already upvoted this thread');
      return;
    }

    if (targetComment.downVotesBy.includes(authUser.id)) {
      dispatch(asyncNeutralizeCommentVote(id));
      return;
    }

    dispatch(asyncUpvoteComment(id));
  };

  const onDownvoteComment = (id) => {
    if (!authUser) {
      alert('You must login to downvote a thread');
      return;
    }

    const targetComment = threadDetail.comments.find(
      (comment) => comment.id === id,
    );

    if (targetComment.upVotesBy.includes(authUser.id)) {
      dispatch(asyncNeutralizeCommentVote(id));
      return;
    }

    if (targetComment.downVotesBy.includes(authUser.id)) {
      alert('You have already downvoted this thread');
      return;
    }

    dispatch(asyncDownvoteComment(id));
  };

  const createCommandHandler = (content) => {
    if (!authUser) {
      alert('You must login to add a new comment!');
    }

    if (!content) {
      alert('Form must be not empty!');
    }

    dispatch(asyncCreateComment({ content, threadId: id }));
  };

  return (
    <section className="font-poppins flex min-h-[92.8vh] items-start justify-center gap-10 bg-[#F5EEDC] px-4 py-20 lg:p-20">
      {loading && (
        <div className="fixed top-10 right-10 z-10">
          <Loading />
        </div>
      )}
      {!loading && !threadDetail && (
        <section className="font-poppins flex min-h-[92.8vh] items-start justify-center gap-10 bg-[#F5EEDC] p-4 lg:p-20">
          <div className="w-full rounded-lg bg-white p-4 shadow-md md:p-6 lg:p-10">
            <p className="text-center text-lg font-semibold md:text-xl lg:text-2xl">
              Thread #{id} not found!
            </p>
            <div className="mt-10 flex items-center justify-center">
              <Link
                to="/"
                className="bg-primary border-primary hover:text-primary rounded-lg border px-8 py-2 text-lg font-semibold text-white hover:bg-transparent"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      )}
      {threadDetail && (
        <div className="w-full">
          <ThreadItem
            thread={threadDetail}
            onUpvote={onUpvote}
            onDownvote={onDownvote}
          />
          <CommentLists
            comments={threadDetail.comments}
            onUpvote={onUpvoteComment}
            onDownvote={onDownvoteComment}
          />
          <CreateComment
            authUser={authUser}
            createCommentHandler={createCommandHandler}
          />
        </div>
      )}
    </section>
  );
}

export default DetailPage;
