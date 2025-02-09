import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { updateStock } from "../features/inventory/inventorySlice";
import styled from "styled-components";
import { IProduct } from "../features/products/interfaces/Product.interface";

const InventoryPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const product = location.state as IProduct | undefined;
  if (!product) {
    return <p>Error: No hay información del producto.</p>;
  }

  const [tipo, setTipo] = useState<"entrada" | "salida">("entrada");
  const [cantidad, setCantidad] = useState(0);

  const handleSubmit = async () => {
    if (cantidad <= 0) return alert("La cantidad debe ser mayor a 0");
    if (tipo === "salida" && cantidad > (product.stock ?? 0)) {
      return alert("No puedes sacar más stock del disponible.");
    }

    if (!product.id) {
      return alert("Error: Producto inválido.");
    }

    await dispatch(updateStock({ productId: product.id, tipo, cantidad }));

    navigate("/");
  };

  return (
    <Container>
      <h2>Registrar Movimiento para {product.nombre}</h2>
      <p>Stock actual: {product.stock}</p>

      <Label>Tipo de Movimiento</Label>
      <Select
        value={tipo}
        onChange={(e) => setTipo(e.target.value as "entrada" | "salida")}
      >
        <option value="entrada">Entrada</option>
        <option value="salida">Salida</option>
      </Select>

      <Label>Cantidad</Label>
      <Input
        type="text"
        value={cantidad}
        onChange={(e) => setCantidad(Number(e.target.value))}
      />

      <ButtonContainer>
        <Button onClick={handleSubmit}>Registrar</Button>
        <CancelButton onClick={() => navigate("/")}>Cancelar</CancelButton>
      </ButtonContainer>
    </Container>
  );
};

export default InventoryPage;

const Container = styled.div`
  width: 400px;
  margin: 50px auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

const Label = styled.label`
  display: block;
  margin-top: 10px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #218838;
  }
`;

const CancelButton = styled.button`
  background-color: #dc3545;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #c82333;
  }
`;
