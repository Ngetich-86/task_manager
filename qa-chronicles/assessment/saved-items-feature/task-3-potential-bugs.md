# Task 3: Potential Bugs & Issues in Saved Items Feature

## Date: December 7, 2025
## Feature: Saved Items / Wishlist
## Assessment Type: Bug Prediction & Risk Analysis

---

## 🔴 Critical Bugs (P0 - Must Fix Before Release)

### BUG-001: Data Loss on Guest-to-User Conversion
**Severity**: Critical  
**Category**: Data Integrity

**Description**:
When a guest user saves items and then creates an account, the saved items are not migrated to the new account, resulting in complete data loss.

**Steps to Reproduce**:
1. Browse as guest user
2. Save 5 items
3. Create a new account
4. Check saved items page

**Expected**: All 5 items should be migrated to the new account  
**Actual**: Saved items list is empty

**Impact**: Poor user experience, loss of user data, potential customer churn

**Root Cause**: No migration logic between session storage and database

**Suggested Fix**: Implement migration service that transfers session-based saved items to user account upon registration/login

---

### BUG-002: Race Condition on Rapid Save/Unsave
**Severity**: Critical  
**Category**: Concurrency

**Description**:
Rapidly clicking the save/unsave button causes inconsistent state between UI and backend, sometimes resulting in duplicate entries or items that appear saved but aren't.

**Steps to Reproduce**:
1. Navigate to product page
2. Rapidly click save icon 10 times in 2 seconds
3. Check saved items list
4. Refresh page and check again

**Expected**: Item should be in a consistent saved or unsaved state  
**Actual**: UI shows saved, but item doesn't appear in saved items list (or vice versa)

**Impact**: Data inconsistency, user confusion, database integrity issues

**Root Cause**: No debouncing/throttling on save action, multiple concurrent API calls

**Suggested Fix**: Implement debouncing (300ms) and optimistic UI updates with rollback on failure

---

### BUG-003: SQL Injection via Product ID
**Severity**: Critical  
**Category**: Security

**Description**:
The save item API endpoint doesn't properly sanitize the product ID parameter, making it vulnerable to SQL injection attacks.

**Steps to Reproduce**:
1. Intercept save item API request
2. Modify product_id parameter to: `123'; DROP TABLE saved_items; --`
3. Send request

**Expected**: Request should be rejected or sanitized  
**Actual**: SQL injection is executed

**Impact**: Database compromise, data loss, security breach

**Root Cause**: Lack of input validation and parameterized queries

**Suggested Fix**: Use parameterized queries, implement input validation, add WAF rules

---

### BUG-004: Unauthorized Access to Other Users' Saved Items
**Severity**: Critical  
**Category**: Security

**Description**:
By modifying the user_id parameter in the API request, users can view and modify other users' saved items.

**Steps to Reproduce**:
1. Log in as User A (user_id: 123)
2. Intercept API request to fetch saved items
3. Change user_id to 456
4. View response

**Expected**: Access denied or only User A's items returned  
**Actual**: User B's (456) saved items are returned

**Impact**: Privacy breach, unauthorized data access, GDPR violation

**Root Cause**: Insufficient authorization checks on API endpoints

**Suggested Fix**: Implement proper authentication middleware, validate user_id against session token

---

## 🟠 High Priority Bugs (P1 - Fix Before Launch)

### BUG-005: Memory Leak on Saved Items Page
**Severity**: High  
**Category**: Performance

**Description**:
The saved items page with 100+ items causes significant memory consumption and doesn't release memory when navigating away.

**Steps to Reproduce**:
1. Save 100+ items
2. Navigate to saved items page
3. Monitor memory usage in DevTools
4. Navigate to another page
5. Observe memory doesn't decrease

**Expected**: Memory should be released when leaving page  
**Actual**: Memory continues to increase, browser becomes sluggish

**Impact**: Poor performance, browser crashes on low-end devices

**Root Cause**: Event listeners not cleaned up, images not lazy-loaded

**Suggested Fix**: Implement proper cleanup in useEffect/componentWillUnmount, add lazy loading

---

### BUG-006: Saved Items Not Syncing Across Devices
**Severity**: High  
**Category**: Data Synchronization

**Description**:
Items saved on mobile device don't appear on desktop (and vice versa) for the same logged-in user.

**Steps to Reproduce**:
1. Log in on mobile device
2. Save 3 items
3. Log in on desktop with same account
4. Check saved items

**Expected**: All 3 items should appear on desktop  
**Actual**: Saved items list is empty or shows different items

**Impact**: Inconsistent user experience, data loss perception

**Root Cause**: Saved items stored in local storage instead of database

**Suggested Fix**: Migrate to server-side storage with proper sync mechanism

---

### BUG-007: Broken UI with Long Product Names
**Severity**: High  
**Category**: UI/UX

**Description**:
Products with very long names (200+ characters) break the saved items grid layout, causing horizontal scrolling and overlapping elements.

**Steps to Reproduce**:
1. Save product with 250-character name
2. Navigate to saved items page
3. Observe layout

**Expected**: Long names should be truncated with ellipsis  
**Actual**: Name overflows container, breaks grid layout

**Impact**: Poor user experience, unprofessional appearance

**Root Cause**: No CSS text truncation or max-width constraints

**Suggested Fix**: Add `text-overflow: ellipsis`, `overflow: hidden`, and `max-width` to product name elements

---

### BUG-008: Save Action Fails Silently on Network Error
**Severity**: High  
**Category**: Error Handling

**Description**:
When network is unavailable or API returns error, the save action fails but provides no user feedback. Icon appears saved but item isn't actually saved.

**Steps to Reproduce**:
1. Enable offline mode in DevTools
2. Click save icon on a product
3. Observe behavior

**Expected**: Error message displayed, icon reverts to unsaved state  
**Actual**: Icon shows saved state, no error message, item not actually saved

**Impact**: User confusion, data loss, false sense of security

**Root Cause**: Missing error handling in save action, optimistic UI update without rollback

**Suggested Fix**: Implement proper error handling, show toast notification, rollback UI state on failure

---

## 🟡 Medium Priority Bugs (P2 - Fix Post-Launch)

### BUG-009: Duplicate Items in Saved List
**Severity**: Medium  
**Category**: Data Integrity

**Description**:
Same product can be saved multiple times, creating duplicate entries in saved items list.

**Steps to Reproduce**:
1. Save a product from search results
2. Navigate to product detail page
3. Save the same product again
4. Check saved items list

**Expected**: Product should appear only once  
**Actual**: Product appears twice in the list

**Impact**: Cluttered UI, user confusion

**Root Cause**: No uniqueness constraint on (user_id, product_id)

**Suggested Fix**: Add unique constraint in database, check for existing entry before saving

---

### BUG-010: Price Not Updating on Saved Items
**Severity**: Medium  
**Category**: Data Freshness

**Description**:
Saved items display the price from when they were saved, not the current price. Users see outdated pricing information.

**Steps to Reproduce**:
1. Save a product (price: $100)
2. Wait for price to change to $80
3. View saved items

**Expected**: Current price ($80) should be displayed  
**Actual**: Old price ($100) is still shown

**Impact**: User confusion, potential lost sales, inaccurate information

**Root Cause**: Price cached at save time, not fetched dynamically

**Suggested Fix**: Fetch current product data when displaying saved items, or implement periodic refresh

---

### BUG-011: Out-of-Stock Items Not Indicated
**Severity**: Medium  
**Category**: User Experience

**Description**:
Products that become out of stock after being saved don't show any indication in the saved items list.

**Steps to Reproduce**:
1. Save an in-stock product
2. Wait for product to go out of stock
3. View saved items

**Expected**: Item should show "Out of Stock" badge  
**Actual**: Item appears as if it's still available

**Impact**: User frustration when attempting to purchase, wasted time

**Root Cause**: Stock status not checked when displaying saved items

**Suggested Fix**: Include stock status in saved items API response, add visual indicator

---

### BUG-012: No Limit on Saved Items Count
**Severity**: Medium  
**Category**: Resource Management

**Description**:
Users can save unlimited items, potentially causing performance issues and database bloat.

**Steps to Reproduce**:
1. Save 500+ items
2. Attempt to save more
3. Observe system behavior

**Expected**: Limit should be enforced (e.g., 100 items max)  
**Actual**: No limit, all items are saved

**Impact**: Database bloat, performance degradation, potential abuse

**Root Cause**: No validation on maximum saved items count

**Suggested Fix**: Implement limit (e.g., 100 items), show warning at 90%, prevent saves at limit

---

### BUG-013: Accessibility - No Keyboard Navigation
**Severity**: Medium  
**Category**: Accessibility

**Description**:
Save/unsave icons cannot be accessed via keyboard navigation, making the feature unusable for keyboard-only users.

**Steps to Reproduce**:
1. Navigate page using Tab key only
2. Attempt to reach save icon
3. Attempt to activate save action with Enter/Space

**Expected**: Save icon should be focusable and activatable via keyboard  
**Actual**: Save icon is not in tab order, cannot be activated

**Impact**: WCAG violation, excludes users with disabilities

**Root Cause**: Save icon implemented as non-interactive element (div) instead of button

**Suggested Fix**: Use semantic button element, ensure proper tab index and keyboard handlers

---

### BUG-014: Screen Reader Doesn't Announce State Change
**Severity**: Medium  
**Category**: Accessibility

**Description**:
When an item is saved or unsaved, screen readers don't announce the state change, leaving visually impaired users unaware of the action result.

**Steps to Reproduce**:
1. Enable screen reader (NVDA, JAWS)
2. Navigate to product page
3. Activate save button
4. Listen for announcement

**Expected**: Screen reader announces "Item saved" or similar  
**Actual**: No announcement, silent state change

**Impact**: Poor accessibility, WCAG violation

**Root Cause**: Missing ARIA live region or aria-label updates

**Suggested Fix**: Add aria-live="polite" region for status messages, update aria-label on state change

---

## 🟢 Low Priority Bugs (P3 - Nice to Fix)

### BUG-015: No Loading State During Save Action
**Severity**: Low  
**Category**: User Experience

**Description**:
When clicking save, there's no loading indicator during the API call, making it unclear if the action is processing.

**Steps to Reproduce**:
1. Throttle network to Slow 3G in DevTools
2. Click save icon
3. Observe behavior during API call

**Expected**: Loading spinner or disabled state during save  
**Actual**: No visual feedback until completion

**Impact**: Minor user confusion on slow connections

**Root Cause**: No loading state management

**Suggested Fix**: Add loading state, show spinner or disable button during API call

---

### BUG-016: Inconsistent Icon Styles Across Pages
**Severity**: Low  
**Category**: UI Consistency

**Description**:
Save icon appears different on product detail page vs. search results vs. saved items page (different sizes, colors, styles).

**Steps to Reproduce**:
1. Compare save icon on product detail page
2. Compare with icon on search results
3. Compare with icon on saved items page

**Expected**: Consistent icon style across all pages  
**Actual**: Icons vary in size and style

**Impact**: Inconsistent branding, unprofessional appearance

**Root Cause**: No shared component or design system

**Suggested Fix**: Create shared SaveButton component with consistent styling

---

### BUG-017: No Confirmation for Bulk Delete
**Severity**: Low  
**Category**: User Experience

**Description**:
If bulk delete feature exists, there's no confirmation dialog before deleting multiple saved items.

**Steps to Reproduce**:
1. Select 10 saved items
2. Click "Delete Selected"
3. Observe behavior

**Expected**: Confirmation dialog appears  
**Actual**: Items are immediately deleted

**Impact**: Accidental data loss, user frustration

**Root Cause**: Missing confirmation step

**Suggested Fix**: Add confirmation modal before bulk delete action

---

### BUG-018: Saved Items Page Not Mobile Optimized
**Severity**: Low  
**Category**: Responsive Design

**Description**:
Saved items page layout breaks on small mobile screens (< 375px width), with overlapping elements and horizontal scroll.

**Steps to Reproduce**:
1. Open saved items page on iPhone SE (375px width)
2. Observe layout

**Expected**: Responsive layout adapts to small screens  
**Actual**: Layout breaks, elements overlap

**Impact**: Poor mobile experience on small devices

**Root Cause**: Fixed widths instead of responsive units

**Suggested Fix**: Use flexbox/grid with responsive breakpoints, test on small devices

---

## 🔵 Edge Cases & Rare Scenarios

### EDGE-001: Saving Deleted Product
**Scenario**: User has product page open, product gets deleted from database, user clicks save

**Expected Behavior**: Error message "Product no longer available"  
**Potential Bug**: 404 error or system crash

---

### EDGE-002: Session Timeout During Save
**Scenario**: User's session expires exactly when they click save button

**Expected Behavior**: Redirect to login, then complete save action  
**Potential Bug**: Action fails silently, no redirect

---

### EDGE-003: Concurrent Saves from Multiple Devices
**Scenario**: User saves same item simultaneously from mobile and desktop

**Expected Behavior**: Single entry created, no duplicates  
**Potential Bug**: Duplicate entries or race condition

---

### EDGE-004: Product with Special Characters in Name
**Scenario**: Product name contains emojis, special Unicode characters, or HTML tags

**Expected Behavior**: Characters properly escaped and displayed  
**Potential Bug**: XSS vulnerability, broken rendering

---

### EDGE-005: Extremely Large Saved Items List
**Scenario**: User has 1000+ saved items (if no limit enforced)

**Expected Behavior**: Pagination or virtual scrolling  
**Potential Bug**: Page crash, infinite loading

---

## 🧪 Testing Recommendations

### Automated Testing
- **Unit Tests**: Save/unsave logic, data validation
- **Integration Tests**: API endpoints, database operations
- **E2E Tests**: Complete user flows (save, view, delete)
- **Performance Tests**: Load testing with 100+ items
- **Security Tests**: SQL injection, XSS, CSRF

### Manual Testing
- **Exploratory Testing**: Unusual user behaviors
- **Accessibility Testing**: Screen readers, keyboard navigation
- **Cross-Browser Testing**: Chrome, Firefox, Safari, Edge
- **Mobile Testing**: iOS, Android, various screen sizes

### Tools Recommended
- **Selenium/Cypress**: E2E automation
- **JMeter/k6**: Performance testing
- **OWASP ZAP**: Security testing
- **axe DevTools**: Accessibility testing
- **BrowserStack**: Cross-browser testing

---

## 📊 Bug Statistics & Risk Assessment

### By Severity
- **Critical (P0)**: 4 bugs
- **High (P1)**: 4 bugs
- **Medium (P2)**: 6 bugs
- **Low (P3)**: 4 bugs
- **Total**: 18 potential bugs + 5 edge cases

### By Category
- **Security**: 2 bugs (Critical)
- **Data Integrity**: 3 bugs
- **Performance**: 2 bugs
- **Accessibility**: 2 bugs
- **UI/UX**: 5 bugs
- **Error Handling**: 2 bugs
- **Synchronization**: 2 bugs

### Risk Level: **HIGH**
**Recommendation**: Address all P0 and P1 bugs before production release

---

## 🎯 Priority Action Items

1. **Immediate**: Fix BUG-001 to BUG-004 (Critical security and data loss issues)
2. **Pre-Launch**: Fix BUG-005 to BUG-008 (High priority UX and performance)
3. **Post-Launch**: Address BUG-009 to BUG-014 (Medium priority improvements)
4. **Backlog**: Fix BUG-015 to BUG-018 (Low priority polish)

---

**Last Updated**: December 7, 2025  
**Status**: Ready for Review  
**Next Step**: Prioritize bug fixes and create JIRA tickets
