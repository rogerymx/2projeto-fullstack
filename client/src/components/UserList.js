import React, { useContext, useEffect } from "react";
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

const Message = styled.p`
  font-size: 16px;
  color: #888;
  margin-top: 20px;
`;

const UserList = () => {
  const { state, dispatch } = useContext(UserContext);
  const { users } = state;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/pessoas");
        if (!response.ok) {
          throw new Error(`Erro ao buscar usuários: ${response.status}`);
        }
        const data = await response.json();

        // Verifica se a resposta é um array válido
        if (Array.isArray(data)) {
          dispatch({ type: "SET_USERS", payload: data });
        } else {
          console.error("Resposta da API não é um array:", data);
          dispatch({ type: "SET_USERS", payload: [] }); // Garante que `users` será sempre um array
        }
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        dispatch({ type: "SET_USERS", payload: [] });
      }
    };

    // Busca usuários apenas se a lista atual estiver vazia
    if (users.length === 0) {
      fetchUsers();
    }
  }, [dispatch, users]);

  // Mensagem enquanto os usuários estão sendo carregados
  if (users.length === 0) {
    return <Message>Carregando usuários ou nenhum usuário encontrado.</Message>;
  }

  // Renderiza a lista de usuários
  return (
    <GridContainer>
      {users.map((user) => (
        <UserCard key={user._id}>
          <Avatar
            src={user.imagem || "https://via.placeholder.com/100"}
            alt={user.nome}
          />
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
