import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchMovements, fetchProducts } from "../features/inventory/inventorySlice";
import styled from "styled-components";


const InventoryMovementsTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movements, status, error, products} = useSelector((state: RootState) => state.inventory);

  useEffect(() => {
    dispatch(fetchMovements());
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <TableContainer>
      <h2>📦 Movimientos de Inventario</h2>
      {status === "loading" && <p>Cargando movimientos...</p>}
      {status === "failed" && <p className="text-red-500">Error: {error}</p>}

      <StyledTable>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Producto</Th>
            <Th>Tipo</Th>
            <Th>Cantidad</Th>
            <Th>Fecha</Th>
          </tr>
        </thead>
        <tbody>
          {movements.map((movement) => (
            <tr key={movement.id}>
              <Td>{movement.id}</Td>
              <Td>{products[movement.productId]?.nombre || "Desconocido"}</Td>
              <Td>{movement.tipo === "entrada" ? "🟢 Entrada" : "🔴 Salida"}</Td>
              <Td>{movement.cantidad}</Td>
              <Td>{new Date(movement.fecha).toLocaleDateString()}</Td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default InventoryMovementsTable;

const TableContainer = styled.div`
  padding: 16px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`;

const Th = styled.th`
  background-color: #4caf50;
  color: white;
  padding: 8px;
  text-align: left;
`;

const Td = styled.td`
  padding: 8px;
  border-bottom: 1px solid #ddd;
`;