import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
  deleteProduct,
  fetchProducts,
} from "../../../features/products/productsSlice";
import styled from "styled-components";
import { IProduct } from "../interfaces/Product.interface";
import EditProductModal from "./EditProductModal";
import { useNavigate } from "react-router-dom";

const ProductList: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.items);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const navigate = useNavigate();

  const handleEdit = (product: IProduct) => {
    setSelectedProduct(product);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  const handleMovement = (product: IProduct) => {
    navigate(`/inventory/${product.id}`, { state: product });
  };

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
                  <EditButton onClick={() => handleEdit(product)}>
                    Editar
                  </EditButton>
                </Td>

                <Td>
                  <MovementButton onClick={() => handleMovement(product)}>
                    Registrar Movimiento
                  </MovementButton>
                </Td>

                <Td>
                  <DeleteButton
                    onClick={() => {
                      if (product.id) {
                        dispatch(deleteProduct(product.id));
                      }
                    }}
                  >
                    Eliminar
                  </DeleteButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </ListContainer>
  );
};

export default ProductList;

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

const EditButton = styled.button`
  background-color: #ffc107;
  color: white;
  border: none;
  padding: 6px 10px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #e0a800;
  }
`;

const MovementButton = styled.button`
  background-color: #17a2b8;
  color: white;
  border: none;
  padding: 6px 10px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #138496;
  }
`;