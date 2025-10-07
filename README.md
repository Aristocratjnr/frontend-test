# Syst POS - Modern Point of Sale System

A modern, responsive Point of Sale (POS) system built with Next.js 15, React 19, TypeScript, and Tailwind CSS. This application provides a complete solution for managing products, orders, and generating reports in a restaurant or retail environment.

## Features

- **Product Management**: Add, edit, and manage product inventory with variants
- **Order Processing**: Create and track customer orders with real-time status updates
- **Report Generation**: Generate sales reports and analytics
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with glassmorphism effects
- **Local Storage**: Persistent data storage using browser localStorage
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **React**: Version 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React Context API with useReducer
- **Icons**: Lucide React
- **Notifications**: react-hot-toast
- **Charts**: Recharts
- **Containerization**: Docker

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm**, **yarn**, **pnpm**, or **bun** package manager
- **Git** (for cloning the repository)

## Getting Started

### Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd frontend-test
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```
**Important**
To run the docker: 
Use: docker compose up --build -d

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

### Available Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── Syst/                     # Main POS system pages
│   │   ├── home/                 # Dashboard/Home page
│   │   ├── products/             # Product management
│   │   ├── orders/               # Order management
│   │   ├── reports/              # Reports and analytics
│   │   ├── sidebar.tsx           # Navigation sidebar
│   │   └── navbar.tsx            # Top navigation bar
│   ├── contexts/                 # React Context providers
│   │   ├── AuthContext.tsx       # Authentication state
│   │   ├── OrdersContext.tsx     # Orders state management
│   │   ├── ProductsContext.tsx   # Products state management
│   │   └── ReportsContext.tsx    # Reports state management
│   ├── lib/                      # Utility libraries
│   │   └── storage.ts            # Local storage utilities
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── public/                       # Static assets
│   ├── fonts/                    # Custom fonts
│   └── images/                   # Image assets
└── ... (config files)
```

## State Management

This application uses **React Context API** with **useReducer** pattern for state management instead of external libraries like Redux. This approach provides:

- **Lightweight**: No external dependencies
- **Type-safe**: Full TypeScript support
- **Predictable**: Centralized state updates through reducers
- **Performant**: Minimal re-renders with proper context optimization

### Context Structure

#### 1. OrdersContext

Manages all order-related state and operations.

**State Interface:**
```typescript
interface OrdersState {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
}
```

**Available Actions:**
- `SET_LOADING` - Update loading state
- `SET_ERROR` - Set error messages
- `SET_ORDERS` - Load orders from storage
- `ADD_ORDER` - Add new order
- `UPDATE_ORDER` - Update existing order
- `DELETE_ORDER` - Remove order

**Usage Example:**
```tsx
import { useOrders } from '@/contexts/OrdersContext';

function OrderList() {
  const { state, addOrder, updateOrder, deleteOrder } = useOrders();

  return (
    <div>
      {state.orders.map(order => (
        <div key={order.id}>{order.customerName}</div>
      ))}
    </div>
  );
}
```

#### 2. ProductsContext

Manages product inventory and operations.

**Key Features:**
- Product CRUD operations
- Variant management (size, price variations)
- Image upload handling
- Category management

#### 3. AuthContext

Handles user authentication and session management.

#### 4. ReportsContext

Manages report generation and analytics data.

### Storage Layer

Data persistence is handled through a custom storage utility that uses browser localStorage:

```typescript
import { storage } from '@/lib/storage';

// Save data
const success = storage.set('pos_orders', orders);

// Retrieve data
const orders = storage.get<Order[]>('pos_orders');

// Remove data
storage.remove('pos_orders');
```

## Docker Deployment

### Building and Running with Docker

1. **Build the Docker image**:
   ```bash
   docker build -t syst-pos .
   ```

2. **Run the container**:
   ```bash
   docker run -p 3000:3000 syst-pos
   ```

### Using Docker Compose (Recommended)

For production deployment with proper configuration:

```bash
# Start the application
docker-compose up -d

# View logs
docker-compose logs -f syst-pos

# Stop the application
docker-compose down
```

### Docker Configuration

The `dockerfile` includes:
- **Multi-stage build** for optimized production image
- **Non-root user** for security
- **Health checks** for container monitoring
- **Production optimizations**

The `docker-compose.yml` provides:
- **Environment configuration**
- **Health monitoring** with curl checks
- **Optional reverse proxy setup** (nginx)
- **Optional database integration** (PostgreSQL)

## Data Models

### Order
```typescript
interface Order {
  id: string;
  customerName?: string;
  customerPhone?: string;
  items: OrderItem[];
  total: number;
  tax: number;
  discount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  paymentMethod: 'cash' | 'card' | 'mobile';
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}
```

### Product
```typescript
interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image?: string;
  variants: ProductVariant[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}
```

### ProductVariant
```typescript
interface ProductVariant {
  id: string;
  name: string;
  price: number;
  size?: string;
  stock: number;
  sku?: string;
}
```

## API Reference

### Context Methods

#### OrdersContext
- `addOrder(orderData)` - Create new order
- `updateOrder(id, updates)` - Update existing order
- `deleteOrder(id)` - Remove order
- `getOrderById(id)` - Retrieve specific order
- `getOrdersByStatus(status)` - Filter orders by status
- `getOrdersByDateRange(start, end)` - Filter orders by date range

#### ProductsContext
- `addProduct(productData)` - Create new product
- `updateProduct(id, updates)` - Update existing product
- `deleteProduct(id)` - Remove product
- `getProductById(id)` - Retrieve specific product

## Development Guidelines

### Code Style

- Use **TypeScript** for all new code
- Follow **ESLint** configuration
- Use **functional components** with hooks
- Implement **proper error handling**
- Write **descriptive commit messages**

### Adding New Features

1. **Create/update context** if needed
2. **Add types** to `lib/storage.ts`
3. **Implement reducer** logic
4. **Create/update pages** in `src/app/Syst/`
5. **Update this README** with new features

### Testing

Currently uses manual testing. Consider adding:
- **Jest** for unit tests
- **React Testing Library** for component tests
- **Cypress** for E2E tests

## Troubleshooting

### Common Issues

1. **Port 3000 already in use**:
   ```bash
   # Kill process using port 3000
   npx kill-port 3000
   ```

2. **Node modules issues**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **TypeScript errors**:
   ```bash
   npm run lint
   ```

### Docker Issues

1. **Build fails**:
   ```bash
   docker system prune -a
   docker build --no-cache -t syst-pos .
   ```

2. **Container won't start**:
   ```bash
   docker-compose logs syst-pos
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is Public for One Africa Market.

## Support

For support and questions, please contact the development team.
