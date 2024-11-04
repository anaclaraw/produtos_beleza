import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
    background-color: #fabdbd;
    padding: 20px;
    text-align: center;
`;

const FooterText = styled.p`
    margin: 0;
    font-size: 14px;
`;

const Footer = () => {
    return (
        <FooterContainer>
            <FooterText>Todos os direitos reservados © T-Beauty</FooterText>
           
           
        </FooterContainer>

    );
};

export default Footer;