import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Users } from './types';

const GET_POSTS = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

const BookList: React.FC = () => {
  const {
    loading,
    error,
    data,
  } = useQuery<Users>(GET_POSTS, {
    variables: { options: { paginate: { page: 1, limit: 10 } } },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <h2>Book List</h2>

      <ul>
        {data?.users.map((user) => (
          <li key={user.id}>
            <div
              style={{
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>{user.name} - </span>
              <span style={{flexGrow: 1}}>{user.email}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
