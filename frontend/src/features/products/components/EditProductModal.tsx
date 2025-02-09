import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { updateProduct } from "../../../features/products/productsSlice";
import styled from "styled-components";
import { IProduct } from "../interfaces/Product.interface";

const EditProductModal: React.FC<{
  product: IProduct | null;
  onClose: () => void;
}> = ({ product, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<Partial<IProduct>>({});

  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre,
        precio: product.precio,
      });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  };

  const handleSubmit = () => {
    if (product) {
      if (product?.id) {
        dispatch(updateProduct({
          id: product.id,
          updates: {
            ...formData,
            precio: formData.precio ? parseFloat(String(formData.precio)) : 0,
          }
        }));
      }
      onClose();
    }
  };

  if (!product) return null;

  return (
    <>
      <Overlay onClick={onClose} />
      <ModalContainer>
        <h2>Editar Producto</h2>
        <Input
          type="text"
          name="nombre"
          value={formData.nombre || ""}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="precio"
          value={formData.precio || ""}
          onChange={handleChange}
        />
       
        <ButtonContainer>
          <SaveButton onClick={handleSubmit}>Guardar</SaveButton>
          <CancelButton onClick={onClose}>Cancelar</CancelButton>
        </ButtonContainer>
      </ModalContainer>
    </>
  );
};

export default EditProductModal;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  width: 300px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  z-index: 1000;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SaveButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #218838;
  }
`;

const CancelButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #c82333;
  }
`;
