import React from 'react';
import styled from 'styled-components';
import './RightSidebar.css';

const RightSidebar = () => {
  return (
    <div>
      <ul>
        <li className="RightSidebar-header">The Overflow Blog</li>
        <li>연필 아이콘</li>
        <li>
          <a href="https://stackoverflow.blog/2022/10/24/how-hardware-and-software-can-maximize-your-flow-states/?cb=1">
            How hardware and software can maximize your flow states
          </a>
        </li>
        <li>
          <a href="https://stackoverflow.blog/2022/10/25/a-flight-simulator-for-developers-to-practice-real-world-challenges-and-surprises-ep-500/?cb=1">
            A flight simulator for developers to practice real world challenges
            and surprises (Ep. 500)
          </a>
        </li>
      </ul>
      <li className="RightSidebar-header">Featured on Meta</li>
      <li>
        <a href="https://meta.stackexchange.com/questions/383022/the-2022-community-a-thon-has-begun?cb=1">
          The 2022 Community-a-thon has begun!
        </a>
      </li>
      <li>
        <a href="https://meta.stackexchange.com/questions/383026/mobile-app-infrastructure-being-decommissioned?cb=1">
          Mobile app infrastructure being decommissioned
        </a>
      </li>
      <li>
        <a href="https://meta.stackoverflow.com/questions/420897/staging-ground-workflow-canned-comments?cb=1">
          Staging Ground Workflow: Canned Comments
        </a>
      </li>
      <li>
        <a href="https://meta.stackoverflow.com/questions/406928/the-script-tag-is-being-burninated?cb=1">
          The [script] tag is being burninated{' '}
        </a>
      </li>
      <li>
        <a href="https://meta.stackoverflow.com/questions/421038/ask-wizard-test-graduation?cb=1">
          Ask Wizard Test Graduation
        </a>
      </li>
      <li className="RightSidebar-header">Hot Meta Posts</li>
      <li>
        <a href="https://meta.stackoverflow.com/questions/421007/should-i-edit-questions-to-tidy-code-snippets?cb=1">
          Should I edit questions to tidy code snippets?
        </a>
      </li>
    </div>
  );
};
export default RightSidebar;
