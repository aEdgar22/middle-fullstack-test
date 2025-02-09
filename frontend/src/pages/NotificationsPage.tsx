import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
  fetchNotifications,
  fetchProductById,
} from "../features/notifications/notificationsSlice";
import styled from "styled-components";

const NotificationsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, status, error, products } = useSelector(
    (state: RootState) => state.notifications
  );

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  useEffect(() => {
    list.forEach((notification) => {
      if (!products[notification.productId]) {
        dispatch(fetchProductById(notification.productId));
      }
    });
  }, [list, dispatch, products]);

  return (
    <Container>
      <h2>Notificaciones de Stock Bajo</h2>

      {status === "loading" && <p>Cargando notificaciones...</p>}
      {status === "failed" && <ErrorMessage>Error: {error}</ErrorMessage>}

      {status === "succeeded" && list.length === 0 && (
        <p>No hay notificaciones.</p>
      )}

      {status === "succeeded" && list.length > 0 && (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Nombre</th>
              <th>Cantidad Restante</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {list.map((notification) => (
              <tr key={notification.id}>
                <td>{notification.id}</td>
                <td>
                  {products[notification.productId]?.sku || "Cargando..."}
                </td>
                <td>
                  {products[notification.productId]?.nombre || "Cargando..."}
                </td>

                <td>{notification.cantidadRestante}</td>
                <td>
                  {new Date(notification.fechaRegistro).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default NotificationsPage;

const Container = styled.div`
  width: 80%;
  margin: 50px auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
  }

  th {
    background-color: #f4f4f4;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
`;
