import Meta from '@/components/meta/Meta'

import { fetchMetaData } from '@/utils/meta/MetaDataUtility'

export default async function MetaPage() {
  const metaData = await fetchMetaData()

  return <Meta metaData={metaData} />
}
