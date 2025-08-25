# Testing – RepX Gym

This document outlines the testing carried out for the **RepX Gym** website to ensure functionality, responsiveness, and accessibility.

---

## Code Validation

### HTML Validation
- All pages were run through the [W3C Markup Validator](https://validator.w3.org/).
- **Result:** Document checking completed. No errors or warnings to show.
![404.html](assets/images/testing/404.html-tested.jpg)
![equipment.html](assets/images/testing/equipment.html-tested.jpg)
![index.html](assets/images/testing/index.html-tested.jpg)
![sucess.html](assets/images/testing/sucess.html-tested.jpg)  
![terms.html](assets/images/testing/terms.html-tested.jpg)  

### CSS Validation
- Stylesheets were tested with the [W3C CSS Validator](https://jigsaw.w3.org/css-validator/).
- **Result:** No errors found.
![style.css](assets/images/testing/style.css-tested.jpg)  

## Accessibility Testing

- The site was tested using [WAVE Web Accessibility Tool](https://wave.webaim.org/).
- All content is accessible with proper semantic HTML, form labels, and alt attributes.
- Colour contrast passes WCAG AA standards (dark blue background with white text).

## Responsiveness

- Tested using Chrome DevTools across breakpoints:
  - Mobile (iPhone SE, Pixel 5)
  - Tablet (iPad, Samsung Galaxy Tab)
  - Desktop (1920x1080, 1440x900)
- Layout adapts using **Bootstrap’s grid system**.
- Navigation bar collapses to burger menu on smaller screens.


### Screenshots
| Device | Screenshot |
|--------|------------|
| Mobile Navigation | ![Mobile nav](assets/images/testing/mobile-nav-tested.jpg) |
| Tablet Success Page | ![Tablet success](assets/images/testing/sucess-tablet.jpg) |
| Desktop Memberships | ![Memberships](assets/images/testing/membership-desktop.jpg) |

## Browser Compatibility

| Browser   | Result |
|-----------|--------|
| Chrome    | ✅ Works as expected |
| Firefox   | ✅ Works as expected |
| Edge      | ✅ Works as expected |
| Safari    | ✅ Works as expected |
| Opera     | ✅ Works as expected |

## Manual Testing

### Navigation
- **Desktop:** Navbar links correctly scroll to the appropriate sections.  
- **Mobile:** Burger menu opens and links work.  

### Membership Section
- All three membership cards display correctly with price, text, and image.  

### Equipment Section
- Each card loads image and description.  
- Responsive two-column layout collapses into one-column on mobile.
![Equipment Page](assets/images/testing/equipment-mobile.jpg)

### Contact Form
- Required fields (`First Name`, `Last Name`, `Email`, `Membership Type`, `Eircode`) prevent empty submission.  
- “Agree to Terms and Conditions” checkbox must be ticked.  
- **Bug Found:** Originally the form used an `<a>` tag instead of a `<button>`, bypassing validation.  
  - **Fix:** Replaced with `<button type="submit">Submit form</button>`. Validation now works.
![Contact Form](assets/images/testing/contact-form.jpg)


### Success Page
- Displays confirmation message after submission.
![Sucess Page](assets/images/testing/sucess-tablet.jpg)

### 404 Page
- Custom error page loads with navigation back to Home.
![404 Page](assets/images/testing/404-page.jpg)

### Footer
- Contact details and opening times visible across all screen sizes.  
- Social media icons open in new tabs.
![Footer Page](assets/images/testing/footer.jpg)

---

## Known Issues

- Form submission currently redirects to `success.html` but does not store or send form data (future feature: backend integration).  
- Equipment images are static; carousel/interactive feature could be added later.  

---

## Lighthouse Testing (Chrome DevTools)

Lighthouse audits were run on the deployed site using **Chrome DevTools**.

| Category        | Score |
|-----------------|-------|
| Performance     | 75%   |
| Accessibility   | 94%   |
| Best Practices  | 100%  |
| SEO             | 100%  |

## User Story Testing

### New Users
- Can easily see membership options ✅  
- Can browse equipment details ✅  
- Can find contact info and opening hours ✅  

### Returning Users
- Can check gym opening hours ✅  
- Can review available equipment ✅  
- Can use contact form for updates ✅  

---

## Conclusion

The RepX Gym site performs well across devices, browsers, and accessibility standards.  
All critical bugs have been fixed and only future enhancements (class booking system, backend form handling) remain.
