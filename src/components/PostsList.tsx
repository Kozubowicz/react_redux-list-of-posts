/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import React from 'react';
import { Post } from '../types/Post';
import { useDispatch } from 'react-redux';
import { clearSelectedPost, setSelectedPost } from '../features/selectedPost';

type Props = {
  posts: Post[];
  selectedPostId?: number;
};

export const PostsList: React.FC<Props> = ({ posts, selectedPostId = 0 }) => {
  const dispatch = useDispatch();

  const handleSelectPost = (post: Post | null) => {
    if (post) {
      dispatch(setSelectedPost(post));
    } else {
      dispatch(clearSelectedPost());
    }
  };

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button', 'is-link', {
                    'is-light': post.id !== selectedPostId,
                  })}
                  onClick={() =>
                    handleSelectPost(post.id === selectedPostId ? null : post)
                  }
                >
                  {post.id === selectedPostId ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
