import React from 'react';
import styled from 'styled-components';

import { FaStackOverflow } from 'react-icons/fa';
import { BiMessageAlt } from 'react-icons/bi';

const Sidebar = styled.div`
  border: 1px solid hsl(47, 65%, 84%);
  background-color: hsl(47, 83%, 91%);
  color: #525960;
  box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05),
    0 2px 8px hsla(0, 0%, 0%, 0.05);

  header {
    padding: 12px 1px;
    border-bottom: 1px solid #efe5c5;
    background-color: #faf3d6;
    font-size: 13px;
    font-weight: 700;
  }

  ul {
    margin: 0;
    padding: 12px 15px;
    background-color: #fdf7e1;
  }

  li {
    margin: 12px 0;
    font-size: 13px;
    list-style: none;
  }
`;

const RightSidebar = () => {
  return (
    <Sidebar>
      <ul>
        <header className="header">The Overflow Blog</header>
        <li>
          <svg
            aria-hidden="true"
            className="va-text-top svg-icon iconPencilSm"
            width="14"
            height="14"
            viewBox="0 0 14 14"
          >
            <path d="m11.1 1.71 1.13 1.12c.2.2.2.51 0 .71L11.1 4.7 9.21 2.86l1.17-1.15c.2-.2.51-.2.71 0ZM2 10.12l6.37-6.43 1.88 1.88L3.88 12H2v-1.88Z"></path>
          </svg>
          <a href="https://stackoverflow.blog/2022/10/24/how-hardware-and-software-can-maximize-your-flow-states/?cb=1">
            How hardware and software can maximize your flow states
          </a>
        </li>
        <li>
          <svg
            aria-hidden="true"
            className="va-text-top svg-icon iconPencilSm"
            width="14"
            height="14"
            viewBox="0 0 14 14"
          >
            <path d="m11.1 1.71 1.13 1.12c.2.2.2.51 0 .71L11.1 4.7 9.21 2.86l1.17-1.15c.2-.2.51-.2.71 0ZM2 10.12l6.37-6.43 1.88 1.88L3.88 12H2v-1.88Z"></path>
          </svg>
          <a href="https://stackoverflow.blog/2022/10/25/a-flight-simulator-for-developers-to-practice-real-world-challenges-and-surprises-ep-500/?cb=1">
            A flight simulator for developers to practice real world challenges
            and surprises (Ep. 500)
          </a>
        </li>
      </ul>
      <ul>
        <header className="header">Featured on Meta</header>
        <li>
          <BiMessageAlt color="#45a2d9" />
          <a href="https://meta.stackexchange.com/questions/383022/the-2022-community-a-thon-has-begun?cb=1">
            The 2022 Community-a-thon has begun!
          </a>
        </li>
        <li>
          <BiMessageAlt color="#45a2d9" />

          <a href="https://meta.stackexchange.com/questions/383026/mobile-app-infrastructure-being-decommissioned?cb=1">
            Mobile app infrastructure being decommissioned
          </a>
        </li>
        <li>
          <FaStackOverflow />
          <a href="https://meta.stackoverflow.com/questions/420897/staging-ground-workflow-canned-comments?cb=1">
            Staging Ground Workflow: Canned Comments
          </a>
        </li>
        <li>
          <FaStackOverflow />
          <a href="https://meta.stackoverflow.com/questions/406928/the-script-tag-is-being-burninated?cb=1">
            The [script] tag is being burninated{' '}
          </a>
        </li>
        <li>
          <FaStackOverflow />
          <a href="https://meta.stackoverflow.com/questions/421038/ask-wizard-test-graduation?cb=1">
            Ask Wizard Test Graduation
          </a>
        </li>
      </ul>
      <ul>
        <header className="header">Hot Meta Posts</header>
        <li>
          <a href="https://meta.stackoverflow.com/questions/421007/should-i-edit-questions-to-tidy-code-snippets?cb=1">
            Should I edit questions to tidy code snippets?
          </a>
        </li>
      </ul>
    </Sidebar>
  );
};
export default RightSidebar;
