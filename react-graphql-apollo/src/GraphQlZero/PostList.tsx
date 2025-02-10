import React, { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Posts } from './types';

const GET_POSTS = gql`
  query($options: PageQueryOptions) {
    posts(options: $options) {
      data {
        id
        title
        body
        user {
          id
          name
          username
          email
          phone
          website
        }
      }
    }
  }
`;

const DELETE_POST = gql`
  mutation($id: ID!) {
    deletePost(id: $id)
  }
`;

const PostList: React.FC = () => {
  const [search, setSearch] = useState('');
  const {
    loading: listLoading,
    error: listError,
    data,
    refetch,
  } = useQuery<Posts>(GET_POSTS, {
    variables: { options: { paginate: { page: 1, limit: 10 } } },
  });
  const handleSearch = () => {
    refetch({
      options: {
        search: { q: search },
      },
    });
  };

  const [deletePost, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_POST, {
      onCompleted: (data) => {
        if (data.deletePost) {
          alert('Post deleted successfully!');
        } else {
          alert('Failed to delete post.');
        }
      },
      onError: (error) => {
        console.error('Error deleting post:', error);
      },
    });
  const handleDelete = (id: string) => {
    deletePost({ variables: { id } });
  };

  const loading = listLoading || deleteLoading;
  const error = listError || deleteError;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <h2>Post List</h2>

      <div>
        <input
          style={{
            fontSize: '1em',
            padding: '0.6em',
            border: 'none',
            borderColor: '#1a1a1a',
            borderWidth: '1px',
            borderRadius: '8px 0 0 8px',
          }}
          placeholder="search post..."
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <button style={{ borderRadius: '0 8px 8px 0' }} onClick={handleSearch}>
          Search
        </button>
      </div>

      <ul>
        {data?.posts.data.map((post) => (
          <li key={post.id}>
            <div
              style={{
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>{post.title} - </span>
              <span style={{flexGrow: 1}}>{post.user.name}</span>
              <button onClick={() => handleDelete(post.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
