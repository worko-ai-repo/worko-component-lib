# Micro UI Kit

A comprehensive, modular component library designed for microfrontend architectures. This library provides reusable components, hooks, utilities, and services that can be shared across different microfrontends.

## Installation

bash
npm install micro-ui-kit


## Quick Start

1. Install the package in your React application:
   
bash
   npm install micro-ui-kit


2. Import and use components:
   
tsx
   import { Button, Card, useMediaQuery } from 'micro-ui-kit';

   function App() {
     const isMobile = useMediaQuery('(max-width: 768px)');

     return (
       <Card>
         <Button variant="primary">Click me</Button>
       </Card>
     );
   }


## Project Structure

src/
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI components (Button, Card, etc.)
│   ├── layout/          # Layout components (Container, Grid, etc.)
│   ├── feedback/        # User feedback components (Toast, Alert, etc.)
│   └── form/            # Form-related components (Input, Select, etc.)
├── hooks/               # Custom React hooks
├── contexts/            # React context providers
├── services/            # API and storage services
├── utils/               # Utility functions
├── types/              # TypeScript types and interfaces
└── styles/             # Global styles and theme definitions


## Available Components

### UI Components

- Button: Customizable button component with different variants
  
tsx
  import { Button } from 'micro-ui-kit';
  
  <Button 
    variant="primary" 
    size="md" 
    onClick={() => console.log('clicked')}
  >
    Click me
  </Button>


- Card: Container component for content grouping
  
tsx
  import { Card } from 'micro-ui-kit';
  
  <Card padding="lg" shadow="md">
    <h2>Card Title</h2>
    <p>Card content</p>
  </Card>


### Form Components

- Input: Text input component with built-in validation
  
tsx
  import { Input } from 'micro-ui-kit';
  
  <Input
    type="email"
    placeholder="Enter email"
    onChange={(value) => console.log(value)}
    validation={{
      required: true,
      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    }}
  />


### Layout Components

- Container: Responsive container with customizable max-width
  
tsx
  import { Container } from 'micro-ui-kit';
  
  <Container maxWidth="lg" padding="md">
    {/* Content */}
  </Container>


### Feedback Components

- Toast: Notification component for user feedback
  
tsx
  import { Toast, useNotification } from 'micro-ui-kit';
  
  function App() {
    const { showNotification } = useNotification();
    
    return (
      <button onClick={() => showNotification('Success!', 'success')}>
        Show Toast
      </button>
    );
  }


## Custom Hooks

### useMediaQuery
Hook for responsive design:
tsx
import { useMediaQuery } from 'micro-ui-kit';

function Component() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return isMobile ? <MobileView /> : <DesktopView />;
}


### useLocalStorage
Hook for persistent storage:
tsx
import { useLocalStorage } from 'micro-ui-kit';

function Component() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme
    </button>
  );
}


### useDebounce
Hook for debouncing values:
tsx
import { useDebounce } from 'micro-ui-kit';

function SearchComponent() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  
  useEffect(() => {
    // API call with debouncedSearch
  }, [debouncedSearch]);
}


## Context Providers

### Theme Provider
tsx
import { ThemeProvider } from 'micro-ui-kit';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}


### Notification Provider
tsx
import { NotificationProvider } from 'micro-ui-kit';

function App() {
  return (
    <NotificationProvider>
      <YourApp />
    </NotificationProvider>
  );
}


## Utility Functions

### Format Utilities
tsx
import { formatDate, formatCurrency } from 'micro-ui-kit/utils';

const date = formatDate(new Date(), 'yyyy-MM-dd');
const price = formatCurrency(1000, 'USD');


### Validation Utilities
tsx
import { validateEmail, validatePassword } from 'micro-ui-kit/utils';

const isValidEmail = validateEmail('user@example.com');
const isValidPassword = validatePassword('password123');


## Development

To contribute to this library:

1. Clone the repository
2. Install dependencies:
   
bash
   npm install

3. Start development server:
   
bash
   npm run dev

4. Run tests:
   
bash
   npm test

5. Build the library:
   
bash
   npm run build


## Testing

Each component and utility includes comprehensive tests. Run the test suite:

bash
npm test           # Run tests once
npm run test:watch # Run tests in watch mode


## Storybook Documentation

View component documentation and examples:

bash
npm run storybook


## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
