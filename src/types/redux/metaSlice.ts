import { MetaData } from '../meta/metaDataUtility'

export interface InitialMetaState {
  metaData: MetaData | null

  error: string | null
}
