import {
  AccountCircle,
  AttachMoneyTwoTone,
  BusinessCenterTwoTone,
  BusinessSharp,
  CallToActionTwoTone,
  DeckTwoTone,
  GpsFixedTwoTone,
  LoyaltyTwoTone,
  MonetizationOnTwoTone,
  ReceiptTwoTone,
} from '@material-ui/icons'

export default Object.freeze([
  {
    pathname: '/dashboard',
    slug: 'dashboard',
    prettyName: 'Dashboard',
    includeInNav: true,
    icon: AccountCircle,
  },
  {
    pathname: '/employees',
    slug: 'employees',
    prettyName: 'Employees',
    includeInNav: true,
    icon: BusinessCenterTwoTone,
  },
  {
    pathname: '/suppliers',
    slug: 'suppliers',
    prettyName: 'Suppliers',
    includeInNav: true,
    icon: BusinessSharp,
  },
  {
    pathname: '/inventory',
    slug: 'inventory',
    prettyName: 'Inventory',
    includeInNav: true,
    icon: LoyaltyTwoTone,
  },
  {
    pathname: '/products',
    slug: 'products',
    prettyName: 'Products',
    includeInNav: true,
    icon: DeckTwoTone,
  },
  {
    pathname: '/product-order',
    slug: 'product-order',
    prettyName: 'Product Order',
    includeInNav: true,
    icon: ReceiptTwoTone,
  },
  {
    pathname: '/locations',
    slug: 'locations',
    prettyName: 'Locations',
    includeInNav: true,
    icon: GpsFixedTwoTone,
  },
  {
    pathname: '/jobs',
    slug: 'jobs',
    prettyName: 'Jobs',
    includeInNav: true,
    icon: CallToActionTwoTone,
  },
  {
    pathname: '/bids',
    slug: 'bids',
    prettyName: 'Bids',
    includeInNav: true,
    icon: AttachMoneyTwoTone,
  },
  {
    pathname: '/customer-orders',
    slug: '/customer-orders',
    prettyName: 'Customer Orders',
    includeInNav: true,
    icon: MonetizationOnTwoTone,
  },
])