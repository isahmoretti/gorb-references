import styled from "styled-components";

import { FacebookCircle } from "styled-icons/boxicons-logos";
import { TwitterWithCircle } from "styled-icons/entypo-social";
import { LinkedinWithCircle } from "styled-icons/entypo-social";

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

export const FacebookIcon = styled(FacebookCircle)`
  width: 40px;
  height: 40px;

  color: #3b5998;
`;

export const TwitterIcon = styled(TwitterWithCircle)`
  width: 40px;
  height: 40px;

  color: #00acee;
`;

export const LinkedinIcon = styled(LinkedinWithCircle)`
  width: 40px;
  height: 40px;

  color: #0e76a8;
`;

export const Title = styled.p`
  margin: 0;
  padding: 0;

  font-size: 16px;

  color: #000;
`;
