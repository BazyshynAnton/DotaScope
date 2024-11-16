import { ChangeEvent, FormEvent } from "react"

import { useState } from "@/shared/reactImports"
import { useAppDispatch, useAppSelector } from "@/shared/reduxImports"
import { setMatchData, setSearch } from "@/store/statisticSlice"

import { MatchDataUtility } from "@/utils/statistic/MatchDataUtility"

import styles from "@/styles/statistic/Search.module.scss"

export default function Search() {
  const [isLoading, setIsLoading] = useState(false)
  const { search } = useAppSelector((store) => store.statisticSlice)
  const dispatch = useAppDispatch()

  const handleInputChange =
    (type: string) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      dispatch(setSearch({ type, value }))
    }

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoading(true)

    const mID = Number(search.matchID)
    const uMatchData = MatchDataUtility.getInstance()
    const matchData = await uMatchData.fetchMatchData(mID)
    dispatch(setMatchData(matchData))

    setIsLoading(false)
  }

  const isDisabled = search.matchID.length < 10

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <span>Search for match:</span>
      <div className={styles.search}>
        <input
          className={styles.search__input}
          type="number"
          value={search.matchID}
          placeholder="Match ID"
          onChange={handleInputChange("matchID")}
        />
        {!isLoading ? (
          <button
            type="submit"
            disabled={isDisabled}
            className={
              isDisabled
                ? styles.search__button_disabled
                : styles.search__button_enabled
            }
          >
            search
          </button>
        ) : (
          <div className={styles.search__button_disabled}>
            <div className={styles.search__loader} />
          </div>
        )}
      </div>
    </form>
  )
}