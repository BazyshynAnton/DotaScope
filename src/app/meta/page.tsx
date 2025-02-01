import InDevelopment from '@/components/inDevelopment/InDevelopment'
import Meta from '@/components/meta/Meta'

import { fetchMetaData } from '@/utils/meta/metaDataUtility'

export default async function MetaPage() {
  const metaData = await fetchMetaData()

  // return <Meta metaData={metaData} />
  return <InDevelopment />
}
