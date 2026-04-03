Here’s your content cleanly converted into **Markdown**:

```markdown
# Dracula Classic Color Palette

## Core Colors

| Token           | Hex     | RGB            | HSL                | Usage                                      |
|-----------------|---------|----------------|--------------------|--------------------------------------------|
| Background      | #282A36 | 40, 42, 54     | 231°, 15%, 18%     | Main background                             |
| Current Line    | #6272A4 | 98, 114, 164   | 225°, 27%, 51%     | Comments, disabled code                     |
| Selection       | #44475A | 68, 71, 90     | 232°, 14%, 31%     | Text selection                              |
| Foreground      | #F8F8F2 | 248, 248, 242  | 60°, 30%, 96%      | Default text                                |
| Comment         | #6272A4 | 98, 114, 164   | 225°, 27%, 51%     | Comments, disabled code                     |
| Red             | #FF5555 | 255, 85, 85    | 0°, 100%, 67%      | Errors, warnings, deletion                  |
| Orange          | #FFB86C | 255, 184, 108  | 31°, 100%, 71%     | Numbers, constants, booleans                |
| Yellow          | #F1FA8C | 241, 250, 140  | 65°, 92%, 76%      | Strings, text content                       |
| Green           | #50FA7B | 80, 250, 123   | 135°, 94%, 65%     | Functions, methods, inherited classes       |
| Cyan            | #8BE9FD | 139, 233, 253  | 191°, 97%, 77%     | Classes, types, support, regex              |
| Purple          | #BD93F9 | 189, 147, 249  | 265°, 89%, 78%     | Instance reserved words, constants          |
| Pink            | #FF79C6 | 255, 121, 198  | 326°, 100%, 74%    | Keywords, storage types                     |

---

## UI Color Palette

| Context                      | Hex     | RGB          | HSL               |
|------------------------------|---------|--------------|-------------------|
| Floating interactive elements | #343746 | 52, 55, 70   | 225°, 15%, 24%    |
| Background Lighter           | #424450 | 66, 68, 80   | 231°, 10%, 29%    |
| Background Light             | #343746 | 52, 55, 70   | 225°, 15%, 24%    |
| Background Dark              | #21222C | 33, 34, 44   | 235°, 14%, 15%    |
| Background Darker            | #191A21 | 25, 26, 33   | 232°, 14%, 11%    |

---

## Functional Colors

> UI-specific colors for interactive elements, borders, and indicators.  
> Do not use in editor or terminal applications.

| Token              | Hex     | RGB           | HSL              | Usage                         |
|--------------------|---------|---------------|------------------|-------------------------------|
| Functional Red     | #DE5735 | 222, 87, 53   | 12°, 71%, 54%    | Critical actions, alerts      |
| Functional Orange  | #A39514 | 163, 149, 20  | 54°, 78%, 36%    | Warnings, notifications       |
| Functional Green   | #089108 | 8, 145, 8     | 120°, 90%, 30%   | Success states                |
| Functional Cyan    | #0081D6 | 0, 129, 214   | 204°, 100%, 42%  | Information, links            |
| Functional Purple  | #815CD6 | 129, 92, 214  | 258°, 61%, 60%   | Focus indicators              |

---

# Syntax Highlighting Rules

## Token Classification

Following TextMate scoping conventions for consistent highlighting across editors.

### Primary Tokens

#### Keywords and Storage → Pink
- Language Keywords: `if`, `else`, `return`, `function`, `class`
- Storage Modifiers: `static`, `public`, `private`, `const`, `let`, `var`
- Control Flow: `try`, `catch`, `throw`, `break`, `continue`

#### Functions and Methods → Green
- Function declarations and calls
- Method invocations
- Built-in functions

#### Classes and Types → Cyan
- Class names and constructors
- Type annotations: `int`, `string`, `boolean`
- Interfaces and enums
- Generic type parameters

#### Strings and Text → Yellow
- String literals: `"Dracula"`, `'Dracula'`, template strings
- Markup text content
- Attribute values in HTML/XML
- Escape sequences

#### Numbers and Constants → Orange
- Numeric literals: `42`, `3.14`, `0xFF`, `1e5`
- Boolean values: `true`, `false`
- Language constants: `null`, `undefined`, `NaN`

#### Comments → Comment
- Single-line: `//`, `#`, `--`
- Multi-line: `/* */`, `<!-- -->`
- Documentation blocks
- Annotations and decorators

#### Support and Built-ins → Cyan
- Built-in classes and functions
- Regular expressions
- CSS properties and units
- HTML/XML tags and attributes
- Library functions

#### Variables and Identifiers → Foreground
- Variable names and parameters
- Object properties
- Default text content

#### Instance Reserved Words → *Purple Italic*
- `this`, `self`, `super`

#### Errors and Warnings → Red
- Syntax errors
- Deprecated code
- Invalid tokens
- Diff deletions

---

## Styling Modifiers

- *Italic*: Comments, type parameters, documentation, instance reserved words  
- **Bold**: Strong emphasis (use sparingly)  
- Underline: Links, misspelled words  

---

# Special Rules

- **Braces and Parentheses**: Match foreground color of current scope  
  - Purple for headings  
  - Foreground for regular text  

- **Instance Reserved Words**:  
  Must be styled as *Purple Italic* (`this`, `self`, `super`)

- **Generic Templates**:  
  Use *Orange Italic*

---

# Implementation Guidelines

## Accessibility Standards

- Maintain **4.5:1 minimum contrast ratio** (WCAG 2.1 Level AA)  
- Do not rely on color alone to convey meaning  
- Test with common color vision deficiencies  

## Consistency Requirements

- **Priority Order**: Follow token classification hierarchy  
- **Fallback Handling**: Use foreground color for unrecognized tokens  
- **Semantic Consistency**: Same meaning = same color across languages  
- **Reference Implementation**: `dracula/cursor`

---

# UI Design Guidelines

## Visual Hierarchy

Apply colors based on importance:

- **High Priority**: Interactive elements, errors, primary actions  
- **Medium Priority**: Secondary content, navigation, labels  
- **Low Priority**: Decorative elements, dividers, backgrounds  

---

## Component Guidelines

### Borders and Separators
- Subtle borders → Current Line color  
- Interactive borders → Functional colors  
- Focus rings → Functional Purple or appropriate accent  

### Shadows and Depth
- Shadow color should harmonize with background  
- Avoid shadows darker than supporting surface  
- Use elevation sparingly  

### State Indicators
- Success → Functional Green  
- Warning → Functional Orange  
- Error → Functional Red  
- Info → Functional Cyan  
```
