import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../../features/products/productsSlice";
import styled from "styled-components";
import { AppDispatch } from "../../../store/store";

const CreateProductForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    nombre: "",
    sku: "",
    precio: "",
    stock: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.sku || !formData.precio || !formData.stock) return;
    
    dispatch(createProduct({
      ...formData,
      precio: Number(formData.precio),
      stock: Number(formData.stock),
    }));

    setFormData({ nombre: "", sku: "", precio: "", stock: "" });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>Agregar Producto</Title>
      <Input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
      <Input type="text" name="sku" placeholder="SKU" value={formData.sku} onChange={handleChange} required />
      <Input type="number" name="precio" placeholder="Precio" value={formData.precio} onChange={handleChange} required />
      <Input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required />
      <Button type="submit">Crear Producto</Button>
    </FormContainer>
  );
};

export default CreateProductForm;

// 📌 Styled Components
const FormContainer = styled.form`
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 15px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    background-color: #0056b3;
  }
`;
