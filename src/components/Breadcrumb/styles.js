import styled from "styled-components";

export const BreadcrumbWrapper = styled.nav`
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
  padding: 8px 0;
`;

export const BreadcrumbList = styled.ol`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 13px;
  color: #666;
`;

export const BreadcrumbItem = styled.li`
  display: flex;
  align-items: center;

  &:not(:last-child)::after {
    content: "›";
    margin: 0 8px;
    color: #999;
  }

  a {
    color: #6666cc;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  &:last-child {
    color: #333;
    font-weight: 500;
  }
`;
