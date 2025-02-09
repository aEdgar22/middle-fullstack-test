import React from "react";
import CreateProductForm from "../features/products/components/CreateProductForm";
import ProductList from "../features/products/components/ProductList";
import styled from "styled-components";

const ProductsPage: React.FC = () => {
  return (
    <Container>
      <Title>Gestión de Productos</Title>
      <CreateProductForm />
      <ProductList />
    </Container>
  );
};

export default ProductsPage;

// 📌 Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;
