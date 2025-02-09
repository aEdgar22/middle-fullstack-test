import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { deleteProduct, fetchProducts } from "../../../features/products/productsSlice";
import styled from "styled-components";

const ProductList: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.items);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <ListContainer>
      <Title>Lista de Productos</Title>
      {products.length === 0 ? (
        <Message>No hay productos registrados.</Message>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>SKU</Th>
              <Th>Nombre</Th>
              <Th>Precio</Th>
              <Th>Stock</Th>
              <Th>Acciones</Th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.sku}>
                <Td>{product.sku}</Td>
                <Td>{product.nombre}</Td>
                <Td>${product.precio}</Td>
                <Td>{product.stock}</Td>
                <Td>
                  {/* <DeleteButton onClick={() => dispatch(deleteProduct(product.id))}>
                    Eliminar
                  </DeleteButton> */}
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </ListContainer>
  );
};

export default ProductList;

// 📌 Styled Components
const ListContainer = styled.div`
  margin-top: 20px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 10px;
`;

const Message = styled.p`
  text-align: center;
  color: gray;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: #007bff;
  color: white;
  padding: 10px;
  text-align: left;
`;

const Td = styled.td`
  border-bottom: 1px solid #ddd;
  padding: 10px;
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 6px 10px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #c82333;
  }
`;
