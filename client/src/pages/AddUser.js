import React, { useState } from 'react';
import styled from 'styled-components';

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

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Novo usuário:', formData);
  };

  return (
    <Container>
      <FormBox>
        <h2>Adicionar Usuário</h2>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Nome</Label>
            <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </InputGroup>
          <InputGroup>
            <Label>Gênero</Label>
            <Input type="text" name="gender" value={formData.gender} onChange={handleChange} required />
          </InputGroup>
          <InputGroup>
            <Label>Idade</Label>
            <Input type="number" name="age" value={formData.age} onChange={handleChange} required />
          </InputGroup>
          <InputGroup>
            <Label>Email</Label>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </InputGroup>
          <Button type="submit">Adicionar</Button>
        </form>
      </FormBox>
    </Container>
  );
};

export default AddUser;
