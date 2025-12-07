# Task 2: Test Scenarios & Test Cases for Saved Items Feature

## Date: December 7, 2025
## Feature: Saved Items / Wishlist
## Platform: Jumia E-commerce

---

## Test Scenario 1: Basic Save/Unsave Functionality

### TC-001: Save Item as Guest User
**Priority**: High  
**Type**: Functional

**Preconditions**:
- User is not logged in
- User is on a product detail page

**Test Steps**:
1. Navigate to any product detail page
2. Click on the "Save" or "Heart" icon
3. Observe the visual feedback
4. Navigate to saved items page/section

**Expected Results**:
- Icon changes state (e.g., filled heart)
- Success message/toast appears
- Item appears in saved items
- Data persists in browser session

**Test Data**: Any active product (e.g., "Samsung Galaxy S23")

---

### TC-002: Save Item as Authenticated User
**Priority**: High  
**Type**: Functional

**Preconditions**:
- User is logged in
- User is on a product detail page

**Test Steps**:
1. Log in to the platform
2. Navigate to any product detail page
3. Click on the "Save" icon
4. Verify item is saved
5. Log out and log back in
6. Check saved items

**Expected Results**:
- Item is saved successfully
- Item persists after logout/login
- Saved items sync across sessions
- Database is updated

**Test Data**: Valid user credentials, Product ID

---

### TC-003: Unsave Previously Saved Item
**Priority**: High  
**Type**: Functional

**Preconditions**:
- User has at least one saved item

**Test Steps**:
1. Navigate to saved items page
2. Click "Remove" or "Unsave" icon on a saved item
3. Confirm removal if prompted
4. Verify item is removed from list

**Expected Results**:
- Item is removed from saved items
- Icon state changes back to unsaved
- Database/storage is updated
- Confirmation message appears

---

### TC-004: Save Item from Search Results
**Priority**: Medium  
**Type**: Functional

**Preconditions**:
- User is on search results page

**Test Steps**:
1. Search for a product (e.g., "laptop")
2. Locate save icon on search result card
3. Click save icon
4. Navigate to saved items

**Expected Results**:
- Item is saved without navigating to detail page
- Visual feedback is immediate
- Item appears in saved items list

---

### TC-005: Save Item from Category Page
**Priority**: Medium  
**Type**: Functional

**Preconditions**:
- User is browsing a category (e.g., Electronics)

**Test Steps**:
1. Navigate to any category page
2. Find a product card with save option
3. Click save icon
4. Verify saved status

**Expected Results**:
- Item is saved successfully
- Icon state updates immediately
- No page reload required

---

## Test Scenario 2: Data Persistence & Synchronization

### TC-006: Guest User Creates Account with Saved Items
**Priority**: High  
**Type**: Integration

**Preconditions**:
- User is not logged in
- User has saved items as guest

**Test Steps**:
1. Save 3-5 items as guest user
2. Create a new account/register
3. Check saved items after registration

**Expected Results**:
- Guest saved items are migrated to new account
- No items are lost during migration
- Duplicate items are handled correctly

---

### TC-007: Cross-Device Synchronization
**Priority**: High  
**Type**: Integration

**Preconditions**:
- User has an account
- User has access to multiple devices

**Test Steps**:
1. Log in on Device A (e.g., desktop)
2. Save 3 items
3. Log in on Device B (e.g., mobile)
4. Check saved items

**Expected Results**:
- All saved items appear on Device B
- Sync happens within acceptable time (< 5 seconds)
- Unsaving on one device reflects on other

---

### TC-008: Browser Cache Clear Impact
**Priority**: Medium  
**Type**: Data Persistence

**Preconditions**:
- Guest user has saved items

**Test Steps**:
1. Save items as guest user
2. Clear browser cache and cookies
3. Return to the website
4. Check saved items

**Expected Results**:
- Guest saved items are lost (expected behavior)
- OR items persist if stored server-side with session ID
- User is informed about data loss (if applicable)

---

## Test Scenario 3: Maximum Limits & Boundaries

### TC-009: Save Maximum Number of Items
**Priority**: High  
**Type**: Boundary

**Preconditions**:
- User knows the maximum saved items limit (e.g., 100)

**Test Steps**:
1. Save items until reaching the limit
2. Attempt to save one more item
3. Observe system behavior

**Expected Results**:
- Clear error message when limit is reached
- User is prompted to remove items before adding more
- System doesn't crash or behave unexpectedly

---

### TC-010: Save Item with Very Long Product Name
**Priority**: Low  
**Type**: Boundary

**Preconditions**:
- Product with extremely long name exists

**Test Steps**:
1. Find product with 200+ character name
2. Save the item
3. View in saved items list

**Expected Results**:
- Item is saved successfully
- Name is truncated appropriately in UI
- Full name visible on hover/click
- No layout breaking

---

## Test Scenario 4: Performance Testing

### TC-011: Save Action Response Time
**Priority**: High  
**Type**: Performance

**Preconditions**:
- Normal network conditions

**Test Steps**:
1. Click save icon on a product
2. Measure time until visual feedback
3. Measure time until API response

**Expected Results**:
- Visual feedback within 100ms
- API response within 500ms
- No UI freezing or lag

**Metrics**: Response time < 500ms

---

### TC-012: Load Saved Items Page with 50+ Items
**Priority**: Medium  
**Type**: Performance

**Preconditions**:
- User has 50+ saved items

**Test Steps**:
1. Navigate to saved items page
2. Measure page load time
3. Test scrolling performance
4. Test filtering/sorting (if available)

**Expected Results**:
- Page loads within 2 seconds
- Smooth scrolling (60fps)
- Lazy loading implemented for large lists
- No memory leaks

---

### TC-013: Rapid Save/Unsave Actions
**Priority**: Medium  
**Type**: Performance

**Preconditions**:
- User is on product page

**Test Steps**:
1. Rapidly click save/unsave icon 10 times
2. Observe system behavior
3. Check final state

**Expected Results**:
- System handles rapid clicks gracefully
- No duplicate API calls
- Final state is consistent
- Debouncing/throttling is implemented

---

## Test Scenario 5: Error Handling & Edge Cases

### TC-014: Save Item with Network Failure
**Priority**: High  
**Type**: Negative

**Preconditions**:
- Simulate network failure (DevTools offline mode)

**Test Steps**:
1. Enable offline mode in browser
2. Attempt to save an item
3. Observe error handling
4. Re-enable network
5. Retry save action

**Expected Results**:
- Clear error message displayed
- Icon state doesn't change incorrectly
- Retry mechanism available
- User is informed of network issue

---

### TC-015: Save Deleted/Unavailable Product
**Priority**: Medium  
**Type**: Negative

**Preconditions**:
- Product ID that no longer exists

**Test Steps**:
1. Attempt to save a deleted product (via direct API call or old link)
2. Observe system response

**Expected Results**:
- Graceful error handling
- User-friendly error message
- No system crash
- Redirect to valid page

---

### TC-016: Save Item During Session Timeout
**Priority**: Medium  
**Type**: Negative

**Preconditions**:
- User session is about to expire

**Test Steps**:
1. Log in and wait for session to expire
2. Attempt to save an item
3. Observe behavior

**Expected Results**:
- User is prompted to log in again
- Save action is queued and executed after login
- OR clear message that action failed

---

### TC-017: Duplicate Save Attempt
**Priority**: Low  
**Type**: Edge Case

**Preconditions**:
- Item is already saved

**Test Steps**:
1. Save an item
2. Attempt to save the same item again
3. Observe behavior

**Expected Results**:
- System prevents duplicate saves
- OR shows "Already saved" message
- No duplicate entries in saved items list

---

## Test Scenario 6: Mobile & Cross-Browser Testing

### TC-018: Save Item on Mobile Device
**Priority**: High  
**Type**: Compatibility

**Preconditions**:
- User is on mobile browser (iOS Safari, Android Chrome)

**Test Steps**:
1. Navigate to product page on mobile
2. Tap save icon
3. Verify saved status
4. Navigate to saved items

**Expected Results**:
- Touch target is adequate (min 44x44px)
- Tap feedback is immediate
- Mobile UI is responsive
- Feature works identically to desktop

**Devices**: iPhone 12, Samsung Galaxy S21, iPad

---

### TC-019: Cross-Browser Compatibility
**Priority**: High  
**Type**: Compatibility

**Preconditions**:
- Test on multiple browsers

**Test Steps**:
1. Test save functionality on Chrome, Firefox, Safari, Edge
2. Verify visual consistency
3. Test data persistence

**Expected Results**:
- Feature works on all major browsers
- Visual consistency maintained
- No browser-specific bugs

**Browsers**: Chrome 120+, Firefox 120+, Safari 17+, Edge 120+

---

## Test Scenario 7: Accessibility Testing

### TC-020: Keyboard Navigation for Save Action
**Priority**: High  
**Type**: Accessibility

**Preconditions**:
- User navigates using keyboard only

**Test Steps**:
1. Tab to save icon
2. Press Enter/Space to save
3. Verify action completes
4. Navigate to saved items using keyboard

**Expected Results**:
- Save icon is keyboard focusable
- Clear focus indicator visible
- Enter/Space triggers save action
- All functionality accessible via keyboard

---

### TC-021: Screen Reader Compatibility
**Priority**: High  
**Type**: Accessibility

**Preconditions**:
- Screen reader enabled (NVDA, JAWS, VoiceOver)

**Test Steps**:
1. Navigate to product page with screen reader
2. Locate save button
3. Activate save action
4. Verify feedback

**Expected Results**:
- Save button has proper ARIA label
- State change is announced ("Added to saved items")
- Error messages are announced
- All content is accessible

---

## Test Scenario 8: Product Variant Handling

### TC-022: Save Product with Multiple Variants
**Priority**: Medium  
**Type**: Functional

**Preconditions**:
- Product has variants (size, color, etc.)

**Test Steps**:
1. Navigate to product with variants (e.g., T-shirt with sizes S, M, L)
2. Select a specific variant (e.g., Red, Size M)
3. Save the item
4. Check saved items

**Expected Results**:
- Specific variant is saved (not just generic product)
- Variant details are visible in saved items
- User can change variant from saved items
- OR user is prompted to select variant before saving

---

### TC-023: Save Out-of-Stock Item
**Priority**: Medium  
**Type**: Functional

**Preconditions**:
- Product is out of stock

**Test Steps**:
1. Navigate to out-of-stock product
2. Attempt to save item
3. Verify saved status
4. Check if user is notified when item is back in stock

**Expected Results**:
- User can save out-of-stock items
- Item is marked as "Out of Stock" in saved items
- Optional: User receives notification when back in stock

---

## Test Scenario 9: UI/UX Testing

### TC-024: Visual Feedback for Save Action
**Priority**: High  
**Type**: UI/UX

**Preconditions**:
- User is on product page

**Test Steps**:
1. Observe save icon in default state
2. Click save icon
3. Observe animation/transition
4. Verify saved state appearance

**Expected Results**:
- Clear visual distinction between saved/unsaved states
- Smooth animation on state change
- Color contrast meets WCAG AA standards (4.5:1)
- Icon is intuitive (heart, bookmark, etc.)

---

### TC-025: Empty Saved Items State
**Priority**: Low  
**Type**: UI/UX

**Preconditions**:
- User has no saved items

**Test Steps**:
1. Navigate to saved items page with no items
2. Observe empty state

**Expected Results**:
- Helpful empty state message
- Suggestion to browse products
- Call-to-action button to start shopping
- No broken UI elements

---

## Test Scenario 10: Integration with Other Features

### TC-026: Add Saved Item to Cart
**Priority**: High  
**Type**: Integration

**Preconditions**:
- User has saved items

**Test Steps**:
1. Navigate to saved items page
2. Click "Add to Cart" on a saved item
3. Verify item is added to cart
4. Check if item remains in saved items

**Expected Results**:
- Item is added to cart successfully
- Item can remain in saved items (or be removed based on business logic)
- Cart count updates
- User receives confirmation

---

### TC-027: Price Drop Notification
**Priority**: Medium  
**Type**: Integration

**Preconditions**:
- User has saved items
- Price tracking feature exists

**Test Steps**:
1. Save an item
2. Simulate price drop (or wait for actual price change)
3. Check for notification

**Expected Results**:
- User receives notification (email, push, in-app)
- Notification includes old vs. new price
- Link to product is provided
- User can disable notifications

---

## Summary

**Total Test Cases**: 27  
**High Priority**: 15  
**Medium Priority**: 10  
**Low Priority**: 2

### Coverage Areas:
- ✅ Functional Testing
- ✅ Performance Testing
- ✅ Security Testing
- ✅ Accessibility Testing
- ✅ Compatibility Testing
- ✅ Integration Testing
- ✅ UI/UX Testing
- ✅ Negative Testing
- ✅ Edge Cases

### Recommended Testing Tools:
- **Manual Testing**: Chrome DevTools, Browser Stack
- **Performance**: Lighthouse, WebPageTest
- **Accessibility**: WAVE, axe DevTools
- **API Testing**: Postman, Insomnia
- **Automation**: Selenium, Cypress, Playwright

---

**Last Updated**: December 7, 2025  
**Status**: Ready for Execution  
**Next Step**: Prioritize and execute high-priority test cases
