import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// bootstrap imports
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
// component imports
import { Message, Loader } from 'components/common';
// action imports
import { listUsers } from 'actions';

const UserListView = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  const userDeleteHandler = (id) => {
    console.log(`delete: ${id}`);
  };

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>email</th>
              <th>admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        style={{ color: 'green' }}
                        className='fas fa-check'
                      ></i>
                    ) : (
                      <i style={{ color: 'red' }} className='fas fa-times'></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/user/${user._id}`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => userDeleteHandler(user._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <Message variant='caution'>No users</Message>
            )}
          </tbody>
        </Table>
      )}
    </>
  );
};

export { UserListView };
