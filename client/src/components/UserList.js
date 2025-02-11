import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import styled from "styled-components";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 20px;
  justify-items: center;
`;

const UserCard = styled.div`
  width: 250px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #f4f4f9;
  text-align: center;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const UserName = styled.h3`
  font-size: 18px;
  color: #333;
  margin: 5px 0;
`;

const UserDetails = styled.p`
  font-size: 14px;
  color: #555;
`;

const UserList = () => {
  const { state } = useContext(UserContext);
  const { users } = state;

  return (
    <GridContainer>
      {users.map((user) => (
        <UserCard key={user.id}>
          <Avatar src={user.image} alt={`${user.firstName} ${user.lastName}`} />
          <UserName>
            {user.firstName} {user.lastName}
          </UserName>
          <UserDetails>
            Gênero: {user.gender}, Idade: {user.age}
          </UserDetails>
          <UserDetails>Email: {user.email}</UserDetails>
        </UserCard>
      ))}
    </GridContainer>
  );
};

export default UserList;
