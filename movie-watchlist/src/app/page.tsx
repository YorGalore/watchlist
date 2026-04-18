import { redirect } from 'next/navigation';

export default function Home() {
  // Langsung navigasikan setiap turis pangkalan (root) ke laman dashboard
  redirect('/watchlist');
}
