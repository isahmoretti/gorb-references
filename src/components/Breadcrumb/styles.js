import styled from "styled-components";

export const BreadcrumbWrapper = styled.nav`
  background-color: #f8f7ff;
  border-bottom: 1px solid #e8e4ff;
  padding: 10px 0;
`;

export const BreadcrumbList = styled.ol`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0 16px;
  font-size: 13px;
  color: #666;

  @media (min-width: 576px) {
    padding: 0 24px;
  }
`;

export const BreadcrumbItem = styled.li`
  display: flex;
  align-items: center;

  &:not(:last-child)::after {
    content: "›";
    margin: 0 6px;
    color: #aaa9cc;
    font-size: 15px;
  }

  a {
    color: #6666cc;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;

    &:hover {
      color: #4d4daa;
      text-decoration: underline;
    }

    &:focus {
      outline: 2px solid #6666cc;
      outline-offset: 2px;
      border-radius: 2px;
    }
  }

  &:last-child span {
    color: #444;
    font-weight: 400;
  }

  &:first-child a {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;
