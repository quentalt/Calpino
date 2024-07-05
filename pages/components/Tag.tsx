import styled from 'styled-components';

export const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  background-color: #fef2f2; // Tailwind's bg-red-50
  padding: 0.25rem 0.5rem;   // Tailwind's px-2 py-1
  font-size: 0.75rem;        // Tailwind's text-xs
  font-weight: 500;          // Tailwind's font-medium
  color: #b91c1c;            // Tailwind's text-red-700
  border-radius: 0.375rem;   // Tailwind's rounded-md
  border: 1px solid rgba(239, 68, 68, 0.1); // Tailwind's ring-1 ring-inset ring-red-600/10
`;
