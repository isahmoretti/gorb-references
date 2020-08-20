import styled from "styled-components";

export const Container = styled.section`
  height: 200px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Social = styled.div`
  display: flex;
`;

export const FacebookIcon = styled.img`
  width: 30px;
  height: 30px;

  color: #3b5998;
`;

export const TwitterIcon = styled.img`
  width: 30px;
  height: 30px;

  margin: 0 10px;

  color: #00acee;
`;

export const LinkedinIcon = styled.img`
  width: 30px;
  height: 30px;

  color: #0e76a8;
`;

export const Title = styled.p`
  margin: 0;
  padding: 0;

  font-size: 16px;

  color: #000;

  @media (max-width: 992px) {
    text-align: center;

    margin-top: 20px;
  }
`;
