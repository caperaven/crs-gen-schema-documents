# waitWait for a expected element, attribute, property or value. Fail if value does not appear before timeout
## Actions

**0. time** - wait for a given amount of time
- timeout -   
	- required: false  
	- default: 30  

**1. is_ready** - wait until the defined element's dataset has a ready property set to true

**2. element** - wait until element exists and is visible

**3. attribute** - wait for attribute to have a particular value

**4. attributes** - wait for multiple attributes to have their defined values

**5. style_property** - wait for element's style to have the defined property value

**6. element_properties** - wait for element's style properties to be set to defined values

**7. text_content** - wait until element's text content equals defined text

**8. text_value** - wait until element's value property equals defined value

**9. selected** - wait for checkbox or radio buttons to be selected

**10. child_count** - wait until defined element has a defined number of children

**11. element_count** - wait until queried elements equal defined count

**12. window_count** - wait until window count equals defined

**13. idle** - wait for cpu idel

**14. has_attribute** - wait until a element has the defined attribute

**15. has_not_attribute** - wait until the defined attribute is no longer on element