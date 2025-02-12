import React from "react";
import { useNavigate } from "react-router-dom";
import { UserProvider } from "../context/UserContext";
import UserSearch from "../components/UserSearch";
import UserList from "../components/UserList";
import styled from "styled-components";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 20px;
`;

const StyledButton = styled.button`
  padding: 12px 18px;
  border: none;
  background-color: #3f51b5;
  color: #fff;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  white-space: nowrap;

  &:hover {
    background-color: #303f9f;
  }
`;

const Dashboard = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token") !== null;

  return (
    <UserProvider>
      <DashboardContainer>
        <ButtonContainer>
          {!isLoggedIn ? (
            <StyledButton onClick={() => navigate("/2projeto-fullstack/login")}>Ir para Login</StyledButton>
          ) : (
            <>
              <StyledButton onClick={() => navigate("/2projeto-fullstack/register")}>Cadastrar Usuário</StyledButton>
              <StyledButton onClick={() => {
                localStorage.removeItem("token");
                navigate("/2projeto-fullstack");
              }}>Sair</StyledButton>
            </>
          )}
        </ButtonContainer>
        {isLoggedIn && <UserSearch />}
        <UserList />
      </DashboardContainer>
    </UserProvider>
  );
};

export default Dashboard;
