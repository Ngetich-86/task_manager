# Scrum in QA

## Introduction

**Scrum** is the most popular Agile framework for managing software development. For QA professionals, understanding Scrum is essential as it defines how testing integrates into the development process. This guide explains Scrum from a QA perspective.

---

## What is Scrum?

Scrum is an Agile framework that uses fixed-length iterations called **Sprints** to deliver working software incrementally. It emphasizes teamwork, accountability, and iterative progress.

### Scrum Framework Overview

```plaintext
┌─────────────────────────────────────────────────────┐
│                  PRODUCT BACKLOG                    │
│  (Prioritized list of features/user stories)       │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│              SPRINT PLANNING                        │
│  Select items for Sprint Backlog                   │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│         SPRINT (1-4 weeks, typically 2)            │
│  ┌──────────────────────────────────────┐          │
│  │  Daily Scrum (15 min standup)        │          │
│  │  Development + Testing                │          │
│  │  Continuous Integration               │          │
│  └──────────────────────────────────────┘          │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│              SPRINT REVIEW                          │
│  Demo completed work to stakeholders               │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│           SPRINT RETROSPECTIVE                      │
│  Team reflects and plans improvements              │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│            INCREMENT (Potentially                   │
│            Shippable Product)                       │
└─────────────────────────────────────────────────────┘
```

---

## Scrum Roles

### 1. **Product Owner**
**Responsibilities:**
- Manages product backlog
- Prioritizes features
- Defines acceptance criteria
- Makes business decisions

**QA Interaction:**
- Clarifies requirements
- Reviews acceptance criteria
- Provides feedback on testability
- Participates in backlog refinement

### 2. **Scrum Master**
**Responsibilities:**
- Facilitates Scrum ceremonies
- Removes impediments
- Coaches the team
- Ensures Scrum practices

**QA Interaction:**
- Reports blockers (e.g., environment issues)
- Seeks help with testing challenges
- Participates in process improvements

### 3. **Development Team**
**Responsibilities:**
- Develops features
- Tests code
- Delivers working software
- Self-organizes

**QA Role in Team:**
- **QA is part of the development team**
- Not a separate entity
- Collaborates with developers
- Shares responsibility for quality

---

## Scrum Ceremonies (Events)

### 1. Sprint Planning

**Duration**: 2-4 hours (for 2-week sprint)

**Purpose**: Plan the sprint work

**QA Activities:**

#### Part 1: What will we deliver?
```markdown
Product Owner presents top priority items:
- User Story 1: Implement password reset
- User Story 2: Add product filtering
- User Story 3: Improve checkout UX

QA Questions:
- What are the acceptance criteria?
- Are there any dependencies?
- What test data is needed?
- Any known risks?
```

#### Part 2: How will we do it?
```markdown
Team breaks down stories into tasks:

User Story: Implement password reset

Development Tasks:
- Create reset password API endpoint
- Build email service integration
- Design reset password UI
- Implement password validation

QA Tasks:
- Write test cases for happy path
- Write test cases for edge cases
- Set up test email account
- Prepare test data
- Plan exploratory testing session
```

**QA Deliverables:**
- Test approach for each story
- Testing effort estimates
- Identified testability concerns
- Test environment needs

---

### 2. Daily Scrum (Standup)

**Duration**: 15 minutes

**Purpose**: Synchronize team, identify blockers

**Format**: Each team member answers:
1. What did I do yesterday?
2. What will I do today?
3. Any impediments?

**QA Example:**
```markdown
Yesterday:
- Tested user registration feature
- Found and reported 2 bugs
- Automated login test cases

Today:
- Verify bug fixes
- Start testing password reset
- Review test automation PR

Blockers:
- Staging environment is down
- Need test credit cards for payment testing
```

**Tips for QA:**
- Be concise (15 min total for whole team)
- Focus on testing progress
- Raise blockers immediately
- Coordinate with developers

---

### 3. Sprint Review (Demo)

**Duration**: 1-2 hours

**Purpose**: Demo completed work, gather feedback

**QA Role:**

#### Before Review:
- Ensure all features are tested
- Verify acceptance criteria met
- Prepare demo environment
- Document test results

#### During Review:
```markdown
QA Presentation:

1. Features Tested:
   - Password reset: ✅ All tests passing
   - Product filtering: ✅ All tests passing
   - Checkout UX: ⚠️ 1 minor issue (documented)

2. Test Coverage:
   - 45 test cases executed
   - 42 passed, 3 failed (2 fixed, 1 deferred)
   - 15 automated tests added

3. Quality Metrics:
   - 5 bugs found and fixed
   - 0 critical bugs
   - 1 low-priority bug deferred to next sprint

4. Risks:
   - Payment gateway integration needs more testing
   - Performance testing pending
```

#### After Review:
- Gather feedback
- Note improvement suggestions
- Update test documentation

---

### 4. Sprint Retrospective

**Duration**: 1-1.5 hours

**Purpose**: Reflect and improve

**Format**: Discuss:
1. What went well?
2. What didn't go well?
3. What can we improve?

**QA Perspective:**

```markdown
What Went Well:
✅ Good collaboration with developers
✅ Caught bugs early through unit tests
✅ Automated tests saved time in regression

What Didn't Go Well:
❌ Environment was unstable
❌ Late requirement changes affected testing
❌ Some tests were flaky

Action Items:
1. Set up dedicated test environment (Owner: DevOps)
2. Freeze requirements 2 days before sprint end (Owner: PO)
3. Fix flaky tests in next sprint (Owner: QA)
4. Pair with developers on unit tests (Owner: QA + Dev)
```

---

### 5. Backlog Refinement (Grooming)

**Duration**: 1-2 hours per sprint

**Purpose**: Prepare upcoming stories

**QA Activities:**

```markdown
Story: Implement two-factor authentication

QA Input:
1. Testability Review:
   - Can we test with test phone numbers?
   - How to test email/SMS delivery?
   - What about time-based codes?

2. Acceptance Criteria Suggestions:
   - User receives code within 30 seconds
   - Code expires after 10 minutes
   - User can request new code
   - Invalid code shows error message

3. Test Data Needs:
   - Test phone numbers
   - Test email accounts
   - Various user scenarios

4. Risks:
   - Third-party SMS service dependency
   - Time zone handling
   - Code generation security
```

---

## Scrum Artifacts

### 1. Product Backlog

**What**: Prioritized list of all desired features

**QA Involvement:**
- Review for testability
- Suggest quality-related stories
- Identify technical debt

**Example:**
```markdown
Product Backlog (Top 10):

1. User authentication (Priority: High)
   QA Note: Need test accounts for different roles

2. Shopping cart (Priority: High)
   QA Note: Test with various product types

3. Payment integration (Priority: High)
   QA Note: Requires test payment gateway

4. Performance optimization (Priority: Medium)
   QA Note: Need performance testing tools

5. Accessibility improvements (Priority: Medium)
   QA Note: Need screen reader testing
```

---

### 2. Sprint Backlog

**What**: Stories selected for current sprint + tasks

**QA Tasks Example:**
```markdown
Sprint 15 Backlog:

Story 1: Password Reset
├── Dev Task: Create API endpoint
├── Dev Task: Build email service
├── Dev Task: Create UI
├── QA Task: Write test cases (3h)
├── QA Task: Execute functional tests (4h)
├── QA Task: Exploratory testing (2h)
└── QA Task: Automate happy path (5h)

Story 2: Product Filtering
├── Dev Task: Backend filtering logic
├── Dev Task: Frontend UI
├── QA Task: Test filter combinations (4h)
├── QA Task: Cross-browser testing (3h)
└── QA Task: Performance testing (2h)
```

---

### 3. Increment

**What**: Sum of all completed backlog items

**QA Perspective:**
- Must meet Definition of Done
- All tests passing
- No critical bugs
- Potentially shippable

**Example:**
```markdown
Sprint 15 Increment:

Completed Stories:
✅ Password reset (fully tested)
✅ Product filtering (fully tested)
✅ Checkout UX improvements (fully tested)

Quality Status:
- 120 automated tests (all passing)
- 0 critical bugs
- 1 low-priority bug (documented)
- Code coverage: 85%
- Performance: All benchmarks met
```

---

## QA in Scrum: Day-by-Day Example

### 2-Week Sprint Timeline

#### Week 1

**Monday: Sprint Planning**
```markdown
9:00 AM - Sprint Planning
- Review 8 user stories
- QA estimates testing effort
- Identify testability concerns
- Commit to 5 stories

Afternoon:
- Write test cases for Story 1
- Set up test data
- Review acceptance criteria with PO
```

**Tuesday-Wednesday: Development + Testing**
```markdown
Daily Standup: 9:00 AM

Tuesday:
- Developers start Story 1
- QA writes automated tests
- QA prepares test environment
- QA reviews Story 2 requirements

Wednesday:
- Story 1 development 70% complete
- QA starts exploratory testing
- QA pairs with developer on unit tests
- Found 1 bug, reported and fixed same day
```

**Thursday-Friday: Testing Intensifies**
```markdown
Thursday:
- Story 1 complete, QA testing
- Story 2 development starts
- Regression tests running
- 2 bugs found in Story 1

Friday:
- Story 1 bugs fixed and verified
- Story 1 marked as Done
- Story 2 development continues
- QA writes tests for Story 3
```

#### Week 2

**Monday-Wednesday: Mid-Sprint**
```markdown
Monday:
- Story 2 testing complete
- Story 3 development + testing
- Story 4 development starts
- Automation tests added to CI/CD

Tuesday:
- Stories 2 & 3 Done
- Story 4 & 5 in progress
- Cross-browser testing
- Performance testing

Wednesday:
- Story 4 Done
- Story 5 testing
- Regression suite running
- Bug verification
```

**Thursday: Sprint Review Prep**
```markdown
- All 5 stories Done
- Final regression testing
- Prepare demo
- Document test results
- Update test metrics
```

**Friday: Review + Retrospective**
```markdown
Morning - Sprint Review:
- Demo all 5 features
- Present test results
- Stakeholder feedback

Afternoon - Retrospective:
- Discuss what went well
- Identify improvements
- Plan action items
```

---

## Definition of Done (DoD)

A critical Scrum artifact for QA:

```markdown
# Definition of Done

A user story is "Done" when:

**Code Quality:**
- [ ] Code reviewed and approved
- [ ] Unit tests written (coverage > 80%)
- [ ] No critical code smells
- [ ] Merged to main branch

**Functional Testing:**
- [ ] All acceptance criteria met
- [ ] Functional tests passing
- [ ] Edge cases tested
- [ ] Exploratory testing completed

**Regression Testing:**
- [ ] Regression suite passing
- [ ] No new bugs in existing features
- [ ] Automated tests updated

**Non-Functional Testing:**
- [ ] Performance acceptable
- [ ] Security scan completed
- [ ] Accessibility checked (if applicable)

**Bug Status:**
- [ ] No critical bugs
- [ ] No high-priority bugs
- [ ] Medium/low bugs documented

**Documentation:**
- [ ] Test cases documented
- [ ] User documentation updated
- [ ] API documentation updated (if applicable)

**Deployment:**
- [ ] Deployed to staging
- [ ] Smoke tests passing
- [ ] Demo-ready
```

---

## Common QA Challenges in Scrum

### Challenge 1: Not Enough Time for Testing

**Problem**: Sprint ends, testing incomplete

**Solutions:**
```markdown
1. Test earlier:
   - Start testing as soon as development begins
   - Don't wait for "code complete"

2. Automate:
   - Automate regression tests
   - Use CI/CD for continuous testing

3. Prioritize:
   - Test critical paths first
   - Use risk-based testing

4. Collaborate:
   - Pair with developers
   - Developers write unit tests
```

---

### Challenge 2: Changing Requirements

**Problem**: Requirements change mid-sprint

**Solutions:**
```markdown
1. Sprint commitment:
   - Protect sprint scope
   - Changes go to next sprint

2. Flexible testing:
   - Keep tests maintainable
   - Use BDD for living documentation

3. Communication:
   - Daily standups to catch changes early
   - Quick re-planning if needed
```

---

### Challenge 3: Technical Debt

**Problem**: Quality degrades over time

**Solutions:**
```markdown
1. Allocate time:
   - Reserve 20% of sprint for technical debt
   - Include test maintenance in sprint

2. Track debt:
   - Log technical debt items
   - Prioritize in backlog

3. Definition of Done:
   - Enforce quality standards
   - Don't compromise DoD
```

---

### Challenge 4: Integration Testing

**Problem**: Features work individually but not together

**Solutions:**
```markdown
1. Continuous Integration:
   - Integrate code frequently
   - Run integration tests automatically

2. End-to-end testing:
   - Test complete user journeys
   - Automate critical paths

3. Early integration:
   - Don't wait until sprint end
   - Integrate and test daily
```

---

## QA Best Practices in Scrum

### 1. **Be Proactive**
```markdown
Don't wait for:
❌ Complete code before testing
❌ Bugs to be reported
❌ Sprint end for regression

Instead:
✅ Test as code is developed
✅ Prevent bugs through collaboration
✅ Run regression continuously
```

### 2. **Collaborate Constantly**
```markdown
- Attend all ceremonies
- Pair with developers
- Communicate with Product Owner
- Share knowledge with team
- Help others understand quality
```

### 3. **Automate Wisely**
```markdown
Automate:
✅ Regression tests
✅ Smoke tests
✅ API tests
✅ Critical user paths

Keep Manual:
❌ Exploratory testing
❌ Usability testing
❌ New feature validation
```

### 4. **Shift Left**
```markdown
Traditional: Dev → QA → Deploy
Scrum: Dev + QA → Deploy

Start testing:
- During sprint planning (review stories)
- During development (pair testing)
- Immediately after code commit (CI/CD)
```

### 5. **Provide Fast Feedback**
```markdown
- Report bugs immediately (same day)
- Share test results daily
- Use dashboards for visibility
- Communicate blockers in standup
```

---

## Scrum Metrics for QA

### Sprint Metrics

```markdown
Sprint 15 Metrics:

Velocity:
- Planned: 40 story points
- Completed: 38 story points
- Velocity: 95%

Quality:
- Bugs found: 8
- Bugs fixed: 7
- Bugs deferred: 1
- Defect density: 0.2 bugs/story point

Testing:
- Test cases executed: 156
- Pass rate: 97%
- Automation coverage: 72%
- Regression time: 45 minutes (automated)

Escaped Defects:
- Production bugs: 0
```

### Burndown Chart

```plaintext
Story Points
40 │●
   │ ╲
30 │  ●
   │   ╲●
20 │     ●
   │      ╲●
10 │        ●
   │         ╲●
 0 │          ●
   └─────────────────
   D1 D3 D5 D7 D9 D10
   
● = Actual
╲ = Ideal
```

---

## Tools for Scrum QA

### Project Management:
- **Jira**: Most popular for Scrum
- **Azure DevOps**: Microsoft ecosystem
- **Trello**: Simple boards

### Test Management:
- **Zephyr**: Jira integration
- **TestRail**: Dedicated test management
- **qTest**: Enterprise solution

### Automation:
- **Selenium**: Web testing
- **Cypress**: Modern web testing
- **Playwright**: Cross-browser
- **Jest/Mocha**: Unit testing

### CI/CD:
- **Jenkins**: Popular automation server
- **GitHub Actions**: Integrated with GitHub
- **GitLab CI**: Integrated with GitLab

---

## Real-World Example: Sprint 15

### Sprint Goal
Improve user authentication and security

### Team
- 1 Product Owner
- 1 Scrum Master
- 3 Developers
- 2 QA Engineers

### Sprint Backlog

```markdown
Story 1: Implement two-factor authentication (13 points)
Story 2: Add password strength meter (5 points)
Story 3: Session timeout after inactivity (8 points)
Story 4: Security audit logging (8 points)
Story 5: Bug fixes from previous sprint (6 points)

Total: 40 story points
```

### QA Activities

**Week 1:**
```markdown
Day 1: Sprint Planning
- Reviewed all 5 stories
- Defined test approach
- Estimated 32 hours of testing

Day 2-3:
- Wrote test cases for 2FA
- Set up test phone numbers
- Tested password strength meter
- Found 2 bugs

Day 4-5:
- 2FA testing in progress
- Session timeout testing
- Automated login tests
- 3 more bugs found
```

**Week 2:**
```markdown
Day 6-7:
- All stories in testing
- Cross-browser testing
- Security testing
- Performance testing

Day 8-9:
- Bug verification
- Regression testing
- Final testing
- Demo preparation

Day 10:
- Sprint Review: Demoed all features
- Sprint Retrospective: Identified improvements
```

### Results

```markdown
Completed:
✅ All 5 stories Done
✅ 8 bugs found and fixed
✅ 45 test cases executed (100% pass)
✅ 12 automated tests added
✅ 0 critical bugs

Metrics:
- Velocity: 100% (40/40 points)
- Defect density: 0.2 bugs/point
- Test automation: 75%
- Sprint goal: Achieved
```

---

## Key Takeaways

1. **QA is part of the team** - not a separate phase
2. **Test continuously** - throughout the sprint
3. **Collaborate actively** - with everyone
4. **Attend all ceremonies** - full participation
5. **Definition of Done** - enforce quality standards
6. **Automate regression** - free up time for exploratory
7. **Provide fast feedback** - report bugs immediately
8. **Shift left** - test early and often
9. **Embrace change** - adapt quickly
10. **Focus on value** - deliver working software

---

## Further Reading
- [Agile in QA](./agile-in-qa.md)
- [Testing Pyramid](./testing-pyramid.md)
- [Exploratory Testing](../testing-fundamentals/exploratory-testing.md)
- [Test Plans](../testing-fundamentals/test-plans/index.md)

## Recommended Resources
- **Book**: "Scrum: The Art of Doing Twice the Work in Half the Time" by Jeff Sutherland
- **Book**: "Agile Testing" by Lisa Crispin and Janet Gregory
- **Website**: [Scrum.org](https://www.scrum.org/)
- **Guide**: [Scrum Guide](https://scrumguides.org/) (Official)
- **Certification**: Professional Scrum Master (PSM) or Certified Scrum Master (CSM)
