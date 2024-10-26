import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #94654c;
  padding: 10px;
  position: fixed;
  width: 100%;
  z-index: 5;
`;

const Logo = styled.div`
  margin-top: 5px;
`;

const Links = styled.div`
  display: flex;
  a{
    font-weight: 400;
} 
`;

const A = styled.a`
  color: white;
  text-decoration: none;
  padding: 10px;
`;

const Button = styled.button`
  background-color: grey;
  color: white;
  padding: 5px;
  width: 120px;

  @media screen and (max-width: 450px) {
    display: none;
  }
`;

function Navbar() {
  return (
    <Nav>
      <Logo>
       <A>Beauty Grow.</A>
      </Logo>
      <Links>
        <A>Home</A>
        <A>Resources</A>
        <A>About us</A>
      </Links>

    </Nav>
  );
}

export default Navbar;
