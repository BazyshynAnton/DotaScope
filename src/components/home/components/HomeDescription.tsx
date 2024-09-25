import styles from "@/styles/home/Home.module.scss"
import WhatAndWhy from "./WhatAndWhy"
import FutureUpdates from "./FuturePlans"

export default function HomeDescription() {
  return (
    <>
      <div className={styles.homeWrapper__description}>
        <h3>Dota 2 data platform</h3>
      </div>
      <WhatAndWhy />
      <FutureUpdates />
    </>
  )
}
