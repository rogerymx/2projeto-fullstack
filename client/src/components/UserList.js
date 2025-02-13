import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import styled from "styled-components";

// Ajuste o espaço entre os cards
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); /* Colunas flexíveis */
  gap: 40px; /* Aumentei o espaçamento entre os cards */
  margin: 20px;
  justify-items: center;
  width: 100%;
  max-width: 100%;  
`;

const UserCard = styled.div`
  width: 100%;
  max-width: 320px; /* Limitando o tamanho do card */
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #f4f4f9;
  text-align: center;
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: scale(1.05);
  }
`;

const Avatar = styled.img`
  width: 120px; /* Tamanho do avatar ajustado */
  height: 120px;
  border-radius: 50%;
  margin-bottom: 15px; /* Aumento do espaçamento abaixo da imagem */
`;

const UserName = styled.h3`
  font-size: 18px;
  color: #333;
  margin: 5px 0;
  text-align: center;
`;

const UserDetails = styled.p`
  font-size: 14px;
  color: #555;
  margin: 3px 0; /* Ajuste no espaçamento entre os textos */
`;

const Message = styled.p`
  font-size: 16px;
  color: #888;
`;

const UserList = () => {
  const { state, dispatch } = useContext(UserContext);
  const { users } = state;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/pessoas");
        const data = await response.json();
        if (Array.isArray(data)) {
          dispatch({ type: "SET_USERS", payload: data });
        } else {
          console.error("Resposta da API não é um array");
          dispatch({ type: "SET_USERS", payload: [] });
        }
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        dispatch({ type: "SET_USERS", payload: [] });
      }
    };

    if (users.length === 0) {
      fetchUsers();
    }
  }, [dispatch, users]);

  if (users.length === 0) {
    return <Message>Nenhum usuário cadastrado.</Message>;
  }

  return (
    <GridContainer>
      {users.map((user) => (
        <UserCard key={user._id}>
          <Avatar src={user.imagem || "https://via.placeholder.com/100"} alt={user.nome} />
          <UserName>{user.nome}</UserName>
          <UserDetails>
            Gênero: {user.genero}, Idade: {user.idade}
          </UserDetails>
          <UserDetails>Email: {user.email}</UserDetails>
        </UserCard>
      ))}
    </GridContainer>
  );
};

export default UserList;
