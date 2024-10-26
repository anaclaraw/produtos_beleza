import styled from "styled-components";
import ImageCapa from '/capa.png'


const CapaConteiner = styled.div`
  display: flex;
   width: 100%;
   margin: 0 auto;
   padding-top: 2%;
    img{
    width: 100%;
    filter: drop-shadow(0px 2px 2px #0000001e);
    border-bottom: 8px solid #f89fa165 ;
    border-top: 8px solid #5b3d0664 ;
    
    }
`;

const CapaArticle = styled.article`
  padding-left: 10%;
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

function Capa() {
    return (
        <>
        <CapaConteiner>
           <img src={ImageCapa} alt="" />

        </CapaConteiner>
        </>
    );
}

export default Capa;
