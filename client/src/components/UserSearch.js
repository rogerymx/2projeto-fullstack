import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const SearchInput = styled.input`
  padding: 10px;
  border: 2px solid #3f51b5;
  border-radius: 8px;
  width: 300px;
  margin-bottom: 10px;
  font-size: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #3f51b5;
  color: #fff;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #303f9f;
  }
`;

const Message = styled.p`
  font-size: 16px;
  color: #333;
  margin-top: 10px;
`;

const UserSearch = () => {
  const { state, dispatch } = useContext(UserContext);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://dummyjson.com/users");
        const data = await response.json();
        dispatch({ type: "SET_USERS", payload: data.users });
        setMessage("Usuários carregados.");
      } catch (error) {
        setMessage("Erro ao carregar usuários.");
      }
    };
    fetchUsers();
  }, [dispatch]);

  const handleSearch = () => {
    if (!input.trim()) {
      setMessage("Por favor, digite algo para buscar.");
      return;
    }

    const filteredUsers = state.allUsers.filter((user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .startsWith(input.toLowerCase())
    );

    dispatch({ type: "FILTER_USERS", payload: filteredUsers });

    setMessage(
      filteredUsers.length
        ? "Usuário(s) encontrado(s)."
        : "Nenhum usuário encontrado."
    );
  };

  const handleReset = () => {
    dispatch({ type: "RESET_USERS" });
    setMessage("Exibindo todos os usuários.");
    setInput("");
  };

  return (
    <Container>
      <SearchInput
        type="text"
        placeholder="Digite o nome para buscar"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <ButtonContainer>
        <Button onClick={handleSearch}>Buscar usuários</Button>
        <Button onClick={handleReset}>Atualizar</Button>
      </ButtonContainer>
      {message && <Message>{message}</Message>}
    </Container>
  );
};

export default UserSearch;
