import Home from '@/components/Home/Home';

import { fetchHomeData } from '@/utils/home/home-data-utility';

export default async function HomePage() {
  const homeData = await fetchHomeData();

  return <Home homeData={homeData} />;
}
