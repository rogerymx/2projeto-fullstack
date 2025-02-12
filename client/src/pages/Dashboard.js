import React from "react";
import { useNavigate } from "react-router-dom";
import { UserProvider } from "../context/UserContext";
import UserSearch from "../components/UserSearch";
import UserList from "../components/UserList";
import styled from "styled-components";

// Estilo para o container principal
const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Centraliza os elementos */
  width: 100%;
  padding: 20px;
`;

// Estilo para o container dos botões
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; /* Alinha os botões ao centro */
  gap: 15px; /* Espaçamento entre os botões */
  flex-wrap: wrap; /* Permite que os botões quebrem linha em telas menores */
  width: 100%;
  margin-bottom: 20px;
`;

// Estilo dos botões
const StyledButton = styled.button`
  padding: 12px 18px;
  border: none;
  background-color: #3f51b5;
  color: #fff;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  white-space: nowrap; /* Evita quebra de linha no botão */

  &:hover {
    background-color: #303f9f;
  }
`;

const Dashboard = () => {
  const navigate = useNavigate();

  // Função para redirecionar para login
  const handleLoginRedirect = () => {
    navigate("/2projeto-fullstack/login");
  };

  // Função para redirecionar para cadastro de usuário
  const handleRegisterRedirect = () => {
    navigate("/2projeto-fullstack/register");
  };

  // Função para logout
  const handleLogoutRedirect = () => {
    localStorage.removeItem("token"); // Remove o token do localStorage
    navigate("/2projeto-fullstack"); // Redireciona para a página de login
  };

  // Verifica se o token está no localStorage
  const isLoggedIn = localStorage.getItem("token") !== null;

  return (
    <UserProvider>
      <DashboardContainer>
        <ButtonContainer>
          {!isLoggedIn ? (
            <StyledButton onClick={handleLoginRedirect}>Ir para Login</StyledButton>
          ) : (
            <>
              <StyledButton onClick={handleRegisterRedirect}>
                Cadastrar Usuário
              </StyledButton>
              <StyledButton onClick={handleLogoutRedirect}>Sair</StyledButton>
            </>
          )}
        </ButtonContainer>
        {isLoggedIn && <UserSearch />} {/* Garante que a busca só aparece após login */}
        <UserList />
      </DashboardContainer>
    </UserProvider>
  );
};

export default Dashboard;
