import styled from "styled-components";

export const Progress = styled.div`
    height: 20px;
    background-color: #EADA18;
    width: ${({ width }) => width}%;
`;

export const Header = styled.div`
    padding: 10px;
    background-color: #66c;
    width: 100%;
    height: 20vh;
    position: relative;
>center{
    position: absolute;
    margin: auto;
    width: inherit;
    bottom: 25%;
    color: #EADA18;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 35px;
    font-weight: bold;
    }
`;

export const Background = styled.div`
    background-color: #fff;
    width: 90%; 
    height: 20px; 
    font-weight: bold;
    position: absolute;
    left: 5%;
    bottom: 13px;

`
export const Box = styled.div`
/* text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap; */
background-color: #dcdcdc;
`;
export const Question = styled.div`
position: relative;
margin: auto;
width: fit-content;
padding-top: 14px;

>h1{
background-color: #EADA18;
width: 65%;
height: 60px;
border-radius: 10px;
text-align: center;
display: table-cell;
vertical-align: middle;
};
`;

export const Alternatives = styled.div`
margin: auto;
display: flex;

@media only screen and (max-width: 800px) {
flex-wrap: wrap;
}
`;

export const Hexagon = styled.div`
  position: relative;
  margin-top: 150px;
  width: 150px;
  height: 77px;
  background: #fff;

  /* display: flex; */
  align-items: center;
  justify-content: center;

  color: #000;
  font-weight: bold;
  font-size: 16px;
  text-align: center;

  cursor: pointer;
  transition: opacity 0.2s;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 0px 0px;

  ::before {
    content: "";
    position: absolute;
    top: -57px;
    left: 0;
    width: 0;
    height: 0;
    border-left: 75px solid transparent;
    border-right: 75px solid transparent;
    border-bottom: 58px solid #fff;
  }

  ::after {
    content: "";
    position: absolute;
    bottom: -57px;
    left: 0;
    width: 0;
    height: 0;
    border-left: 75px solid transparent;
    border-right: 75px solid transparent;
    border-top: 58px solid #fff;
  }

  /* @media only screen and (max-width: 600px) {
    width: 95px;
    height: 59px; */

    /* margin: 80px 20px; */

    /* ::before {
      border-left: 49px solid transparent;
      border-right: 45px solid transparent;
      border-bottom: 36px solid red;

      top: -36px;
    } */

    /* ::after {
      border-left: 46px solid transparent;
      border-right: 50px solid transparent;
      border-top: 36px solid red;
      bottom: -36px;
    }
  } */

  :hover {
    opacity: 0.6;
  }
`;


export const Option = styled.div`
  margin: auto;
  display: block;
`;

export const Frame = styled.div`
margin-top: 70px;
width: 150px;
height: 110px;
background-color: rgb(255, 255, 255);
text-align: center;
cursor: pointer;
font-size: 11pt;
font-weight: bold;

:hover{
    opacity: 0.6; 
}
`;