import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Books } from './types';

const GET_POSTS = gql`
  query {
    books {
      author
      title
    }
  }
`;

const BookList: React.FC = () => {
  const {
    loading,
    error,
    data,
  } = useQuery<Books>(GET_POSTS, {
    variables: { options: { paginate: { page: 1, limit: 10 } } },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <h2>Book List</h2>

      <ul>
        {data?.books.map((post) => (
          <li key={post.title}>
            <div
              style={{
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>{post.title} - </span>
              <span style={{flexGrow: 1}}>{post.author}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
