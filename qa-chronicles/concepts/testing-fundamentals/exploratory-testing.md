# Exploratory Testing

## Introduction

**Exploratory Testing** is a hands-on approach to software testing where test design and test execution happen simultaneously. Unlike scripted testing where test cases are pre-defined, exploratory testing relies on the tester's creativity, intuition, and experience to discover defects.

> "Exploratory testing is simultaneous learning, test design, and test execution." - James Bach

---

## What is Exploratory Testing?

Exploratory testing is an unscripted testing approach where testers actively explore the application, learn about it, design tests, and execute them in real-time. It's like being a detective investigating the software for bugs and unexpected behaviors.

### Key Characteristics:
- **Simultaneous**: Learning, designing, and executing happen at the same time
- **Unscripted**: No predefined test cases (though there may be a charter)
- **Tester-driven**: Relies heavily on tester's skills and intuition
- **Adaptive**: Tests evolve based on what the tester discovers
- **Creative**: Encourages thinking outside the box

---

## Exploratory Testing vs Scripted Testing

| Aspect | Exploratory Testing | Scripted Testing |
|--------|-------------------|------------------|
| **Approach** | Freestyle, adaptive | Predefined, structured |
| **Test Cases** | Created during execution | Created before execution |
| **Documentation** | Minimal, session notes | Detailed test cases |
| **Flexibility** | High | Low |
| **Best For** | Finding unexpected bugs | Regression testing |
| **Skill Required** | High (experience, intuition) | Medium (follow instructions) |
| **Coverage** | Unpredictable | Predictable |
| **Time** | Time-boxed sessions | Depends on test suite size |

---

## When to Use Exploratory Testing?

**Use Exploratory Testing when:**
- Testing new features with limited documentation
- Time is limited and you need quick feedback
- Looking for edge cases and unexpected behaviors
- Complementing scripted testing
- Evaluating usability and user experience
- Requirements are unclear or changing
- You want to leverage tester expertise

### Best Scenarios:
- **New feature releases**
- **Critical bug fixes** (verify the fix and look for related issues)
- **Usability testing**
- **Security testing** (finding vulnerabilities)
- **Before major releases** (sanity check)

---

## The Exploratory Testing Process

### 1. **Charter Definition**
Define the mission for your testing session:
```plaintext
Charter: Explore the login functionality to discover security vulnerabilities
Time Box: 60 minutes
Focus Areas: Authentication, authorization, session management
```

### 2. **Time-Boxing**
Set a specific time limit (typically 45-90 minutes) for focused testing.

### 3. **Exploration**
- Navigate through the application
- Try different inputs and scenarios
- Look for unexpected behaviors
- Document findings in real-time

### 4. **Debriefing**
- Summarize what was tested
- Document bugs found
- Note areas for further investigation
- Share insights with the team

---

## Session-Based Test Management (SBTM)

SBTM is a structured approach to exploratory testing:

### Session Charter Template:
```plaintext
┌─────────────────────────────────────────────┐
│ EXPLORATORY TESTING SESSION                 │
├─────────────────────────────────────────────┤
│ Date: 2024-01-15                            │
│ Tester: [Your Name]                         │
│ Duration: 90 minutes                        │
├─────────────────────────────────────────────┤
│ CHARTER:                                    │
│ Explore the shopping cart functionality     │
│ to discover calculation and state issues    │
├─────────────────────────────────────────────┤
│ AREAS TO EXPLORE:                           │
│ • Adding/removing items                     │
│ • Price calculations                        │
│ • Discount codes                            │
│ • Cart persistence                          │
├─────────────────────────────────────────────┤
│ RISKS:                                      │
│ • Incorrect total calculations              │
│ • Lost cart data                            │
│ • Security vulnerabilities                  │
└─────────────────────────────────────────────┘
```

---

## Exploratory Testing Techniques

### 1. **Tours** (Whittaker's Testing Tours)

Different "tours" to explore an application:

#### **The Guidebook Tour**
Follow the user manual or help documentation and verify everything works as documented.

#### **The Money Tour**
Test the most important features that generate revenue or are most critical to users.

#### **The Landmark Tour**
Visit every major feature at least once to get an overview.

#### **The Intellectual Tour**
Challenge the application with complex, sophisticated inputs.

#### **The FedEx Tour**
Follow data through the entire system from input to output.

#### **The Bad Neighborhood Tour**
Focus on areas known to have bugs or be error-prone.

#### **The Saboteur Tour**
Try to break the application intentionally with malicious inputs.

### 2. **Heuristics**

Use testing heuristics to guide exploration:

**SFDPOT** (San Francisco Depot):
- **S**tructure: Test the architecture and design
- **F**unction: Test what it does
- **D**ata: Test with various data inputs
- **P**latform: Test on different environments
- **O**perations: Test different user operations
- **T**ime: Test timing and sequencing

**CRUD**:
- **C**reate
- **R**ead
- **U**pdate
- **D**elete

Test all CRUD operations for any data entity.

### 3. **Mind Mapping**

Create visual maps of:
- Features to explore
- Test ideas
- Relationships between components
- Risks and concerns

```plaintext
        Login Feature
             |
    ┌────────┴────────┐
    │                 │
Valid Login      Invalid Login
    │                 │
┌───┴───┐         ┌───┴───┐
│       │         │       │
Email  Social   Wrong   Empty
       Media    Password Fields
```

---

## Example: Exploratory Testing Session

### Scenario: Testing a Task Management App

**Charter**: Explore task creation and editing to find data validation issues  
**Time**: 60 minutes

**Session Notes**:

```plaintext
00:00 - Started testing task creation
00:05 - Created task with normal data - works fine
00:10 - Tried creating task with empty title - no validation! BUG #1
00:15 - Created task with 1000 character title - accepted but UI breaks BUG #2
00:20 - Tested special characters in title (@#$%^&*) - works
00:25 - Tried SQL injection in description field - properly sanitized ✓
00:30 - Created task with future due date - works
00:35 - Created task with past due date - accepted but no warning BUG #3
00:40 - Tested task editing - changes save correctly
00:45 - Edited task and immediately closed browser - changes lost! BUG #4
00:50 - Tested concurrent editing (two tabs) - last save wins, no conflict warning BUG #5
00:55 - Tested task with emoji in title - displays correctly ✓
00:60 - Session complete

BUGS FOUND: 5
AREAS FOR FURTHER TESTING: Concurrent editing, auto-save functionality
```

---

## Best Practices for Exploratory Testing

### 1. **Prepare Before Testing**
- Understand the application and its purpose
- Review requirements and user stories
- Identify high-risk areas
- Prepare test data

### 2. **Use a Charter**
- Define clear objectives
- Set time limits
- Focus on specific areas

### 3. **Take Notes**
- Document what you test
- Record bugs immediately
- Note interesting observations
- Track time spent

### 4. **Think Like Different Users**
- Novice user
- Power user
- Malicious user
- Accessibility user

### 5. **Vary Your Inputs**
- Boundary values
- Invalid data
- Special characters
- Large datasets
- Empty fields

### 6. **Look for Patterns**
- Similar bugs in similar features
- Consistent error handling
- UI inconsistencies

### 7. **Debrief and Share**
- Summarize findings
- Share insights with team
- Update test documentation
- Plan follow-up sessions

---

## Tools for Exploratory Testing

### Note-Taking Tools:
- **Rapid Reporter**: Session-based testing tool
- **OneNote/Evernote**: General note-taking
- **Mind mapping tools**: XMind, MindMeister

### Screen Recording:
- **OBS Studio**: Free screen recording
- **Loom**: Quick video recording
- **Windows Game Bar**: Built-in Windows recorder

### Bug Tracking:
- **Jira**: Issue tracking
- **Azure DevOps**: Microsoft's platform
- **GitHub Issues**: For open source projects

---

## Documenting Exploratory Testing

### Session Report Template:

```markdown
# Exploratory Testing Session Report

**Date**: 2024-01-15  
**Tester**: Jane Doe  
**Duration**: 90 minutes  
**Build**: v2.3.1

## Charter
Explore the payment processing flow to identify security and data validation issues.

## Areas Covered
- Credit card input validation
- Payment confirmation flow
- Error handling
- Receipt generation

## Test Approach
- Tested with valid and invalid card numbers
- Tried different payment amounts (boundary values)
- Tested error scenarios (declined cards, network issues)
- Verified data encryption

## Bugs Found
1. **BUG-123**: Credit card number accepts letters
2. **BUG-124**: Negative payment amounts accepted
3. **BUG-125**: Receipt shows unmasked card number

## Observations
- Payment flow is generally smooth
- Error messages are clear
- Need more testing on refund functionality

## Risks Identified
- Credit card data may not be properly encrypted
- No rate limiting on payment attempts

## Follow-up Actions
- Create test cases for bugs found
- Schedule security-focused session
- Test refund functionality
```

---

## Common Mistakes to Avoid

❌ **Don't:**
- Test without any plan or charter
- Ignore documentation of findings
- Continue beyond time-box
- Test the same things repeatedly
- Forget to report bugs immediately

✅ **Do:**
- Have a clear charter and focus
- Document as you go
- Respect time limits
- Vary your testing approach
- Report bugs promptly

---

## Exploratory Testing in Agile

Exploratory testing fits perfectly in Agile environments:

- **Sprint Testing**: Quick exploratory sessions on new features
- **Story Acceptance**: Explore user stories before marking them done
- **Bug Verification**: Explore around fixed bugs
- **Release Testing**: Final exploratory pass before release
- **Continuous Learning**: Learn the product incrementally

---

## Key Takeaways

1. **Exploratory testing is not random testing** - it's structured and purposeful
2. **It complements scripted testing** - use both for comprehensive coverage
3. **Tester skill matters** - experience and intuition are crucial
4. **Documentation is important** - record your findings and approach
5. **Time-boxing helps** - keeps sessions focused and productive
6. **Charters provide direction** - know what you're exploring and why
7. **It's a learning process** - you learn about the application while testing

---

## Further Reading
- [Manual vs Automation Testing](./manual-vs-automation.md)
- [Test Plans](./test-plans/index.md)
- [Agile in QA](../methodologies/agile-in-qa.md)

## Recommended Resources
- **Book**: "Explore It!" by Elisabeth Hendrickson
- **Book**: "Lessons Learned in Software Testing" by Cem Kaner
- **Website**: [Satisfice.com](https://www.satisfice.com) - James Bach's resources
