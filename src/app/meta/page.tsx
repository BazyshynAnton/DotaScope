// import InDevelopment from '@/components/inDevelopment/InDevelopment'
import Meta from '@/components/Meta/Meta';

import { fetchMetaData } from '@/utils/meta/meta-data-utility';

export default async function MetaPage() {
  const metaData = await fetchMetaData();

  return <Meta metaData={metaData} />;
  // return <InDevelopment />
}
