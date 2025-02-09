import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Navbar: React.FC = () => {
  return (
    <NavContainer>
      <NavItem to="/">🏠 Home</NavItem>
      <NavItem to="/notifications">🔔 Notificaciones</NavItem>
      <NavItem to="/inventory-movements">📊 Gestion de inventario</NavItem>
    </NavContainer>
  );
};

export default Navbar;

const NavContainer = styled.nav`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 15px;
  background: #007bff;;
  border-bottom: 1px solid gray;
`;

const NavItem = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-size: 18px;
  padding: 10px 15px;
  border-radius: 5px;
  
  &.active {
    background: #FFF;
    color: black
  }

  &:hover {
    background: #FFF;
    color: black
  }
`;
