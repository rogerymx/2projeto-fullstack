import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

const FormBox = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 350px;
  text-align: center;
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;

  &:hover {
    background-color: #218838;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 1rem;
`;

const SuccessMessage = styled.div`
  color: green;
  margin-top: 1rem;
`;

const AddUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    idade: "",
    genero: "",
    email: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token"); // Obtenha o token salvo no localStorage para autenticação
      const response = await axios.post(
        "http://localhost:8080/pessoas",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Envia o token no cabeçalho para a API
          },
        }
      );

      setSuccess(response.data.message); // Exibe a mensagem de sucesso
      navigate("/2projeto-fullstack");
    } catch (err) {
      // Exibe a mensagem de erro recebida da API
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Erro ao adicionar pessoa. Tente novamente.");
      }
    }
  };

  return (
    <Container>
      <FormBox>
        <h2>Cadastrar Pessoa</h2>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Nome</Label>
            <Input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label>Idade</Label>
            <Input
              type="number"
              name="idade"
              value={formData.idade}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label>Gênero</Label>
            <Select
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
            </Select>
          </InputGroup>
          <InputGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <Button type="submit">Cadastrar</Button>
        </form>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
      </FormBox>
    </Container>
  );
};

export default AddUser;