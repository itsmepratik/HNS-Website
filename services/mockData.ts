
import { Product } from '../types';

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Castrol EDGE 5W-30', brand: 'Castrol', price: 12.500, category: 'Oil', viscosity: '5W-30', image: 'https://images.unsplash.com/photo-1632832569501-7132a49257d0?q=80&w=400&auto=format&fit=crop', rating: 4.8, reviews: 124 },
  { id: '2', name: 'Mobil 1 Extended Performance', brand: 'Mobil 1', price: 14.200, category: 'Oil', viscosity: '0W-20', image: 'https://images.unsplash.com/photo-1626126605232-1b072834b6e5?q=80&w=400&auto=format&fit=crop', rating: 4.9, reviews: 89 },
  { id: '3', name: 'Shell Helix Ultra', brand: 'Shell', price: 11.000, category: 'Oil', viscosity: '5W-40', image: 'https://images.unsplash.com/photo-1517420879524-86d64ac2f339?q=80&w=400&auto=format&fit=crop', rating: 4.7, reviews: 210 },
  { id: '4', name: 'Bosch Premium Oil Filter', brand: 'Bosch', price: 3.500, category: 'Filter', image: 'https://m.media-amazon.com/images/I/71p0eK7+XRL._AC_SL1500_.jpg', rating: 4.6, reviews: 56 },
  { id: '5', name: 'K&N Performance Air Filter', brand: 'K&N', price: 18.500, category: 'Filter', image: 'https://m.media-amazon.com/images/I/71uKcdX-dVL._AC_SL1500_.jpg', rating: 4.9, reviews: 42 },
  { id: '6', name: 'Liqui Moly Ceratec', brand: 'Liqui Moly', price: 9.800, category: 'Additive', image: 'https://m.media-amazon.com/images/I/61kRk-Q9-dL._AC_SL1000_.jpg', rating: 4.9, reviews: 315 },
  { id: '7', name: 'Valvoline Advanced', brand: 'Valvoline', price: 10.200, category: 'Oil', viscosity: '5W-20', image: 'https://images.unsplash.com/photo-1550966871-3ed3c67e6790?q=80&w=400&auto=format&fit=crop', rating: 4.5, reviews: 78 },
  { id: '8', name: 'Royal Purple HPS', brand: 'Royal Purple', price: 15.000, category: 'Oil', viscosity: '10W-40', image: 'https://images.unsplash.com/photo-1606517723933-2866b1d440da?q=80&w=400&auto=format&fit=crop', rating: 4.8, reviews: 65 },
];

export const MOCK_BLOG_POSTS = [
  {
    id: '1',
    title: 'Synthetic vs Conventional: The Molecular Difference',
    excerpt: 'Why modern engines require molecular uniformity that nature simply cannot provide. A deep dive into PAO vs Mineral base stocks.',
    category: 'Tech',
    author: 'Mohammed Rifat',
    date: 'Oct 12, 2023',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=800&auto=format&fit=crop',
    featured: true
  },
  {
    id: '2',
    title: 'Why Your Check Engine Light Is Actually a Good Thing',
    excerpt: 'That annoying orange light is your car trying to save you thousands. Here is how to interpret its distress signals.',
    category: 'Maintenance',
    author: 'Head Technician',
    date: 'Oct 08, 2023',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'The Future of EV Maintenance in Oman',
    excerpt: 'Electric vehicles have fewer moving parts, but their maintenance needs are more critical than ever. What you need to know about EV fluids.',
    category: 'Industry',
    author: 'Mohammed Ashiq',
    date: 'Sep 25, 2023',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '4',
    title: '5 Signs Your Transmission Fluid Needs Attention',
    excerpt: 'Slipping gears? Delayed engagement? Don’t wait for a rebuild. Learn the early warning signs of transmission fluid breakdown.',
    category: 'Tips',
    author: 'Service Team',
    date: 'Sep 15, 2023',
    readTime: '3 min',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '5',
    title: 'Desert Driving: Protecting Your Air Intake',
    excerpt: 'Oman\'s fine dust is an engine killer. How high-performance filtration can extend your engine life by years.',
    category: 'Maintenance',
    author: 'Mohammed Rifat',
    date: 'Aug 30, 2023',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '6',
    title: 'Understanding Viscosity Grades: 5W-30 vs 10W-40',
    excerpt: 'What do the numbers actually mean? We demystify the SAE grading system and help you choose the right flow for your climate.',
    category: 'Tech',
    author: 'HNS Labs',
    date: 'Aug 12, 2023',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1533230408800-47867198d89e?q=80&w=800&auto=format&fit=crop'
  }
];

export const MOCK_LOCATIONS = [
  { 
    id: 1, 
    name: 'Saham Sanaiya', 
    lat: 24.1750, 
    lng: 56.8850, 
    addressKey: 'Saham Industrial Area, Main St, Saham',
    phone: '+968 9999 9999'
  },
  { 
    id: 2, 
    name: 'Abu Al Durus', 
    lat: 24.1934275, 
    lng: 56.8596748, 
    addressKey: 'Abu Al Durus Main Road',
    phone: '+968 9988 7766'
  },
  { 
    id: 3, 
    name: 'Hafeeth', 
    lat: 24.0422497, 
    lng: 57.0050221, 
    addressKey: 'Al Hafeeth Center, Main Highway',
    phone: '+968 9977 5544'
  }
];