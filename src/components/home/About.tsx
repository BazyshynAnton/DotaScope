import ContentHeader from './ContentHeader'

import styles from '@/styles/home/Home.module.scss'

export default function About() {
  return (
    <div className={styles.about}>
      <ContentHeader headerTitle='About' />
      <div className={styles.about__content}>
        <p>
          DotaScope is an minimalistic Dota2 data platform with many features:
          <br />
          &bull; full statistic about your match.
          <br />
          &bull; accout authorization only by steam ID.(this feature under development)
          <br />
          &bull; current meta heroes with their winrates and builds.(this feature under development)
          <br />
          &bull; world{"'"}s leaderboard.(this feature under development)
          <br />
          <br />
          This project was motivated by the distractions on the same Dota2 data platforms, such as
          DotaBuff, Opendota, etc. The main goal is to show users only important statistics and
          respect their time.
          <br />
          I created DotaScope because I have a passion for developing applications that can help
          people solve various problems.
          <br />
        </p>
        <br />
        <h4>Warning:</h4>
        <p>
          I am not responsible for profanity. <br />
          We all need to understand that no one can stop players from using profanity. Therefore,
          all nicknames have now been replaced with the word
          {' "'}Player{'"'}, and if a player has hidden match data, his nickname will be displayed
          as {'"'}Anonymous{'"'}.
          <br />
          <br />
          Bug report.
          <br />
          If you find an error, please let me know{' - '}
          <a href='mailto:dota.scope@gmail.com'>dota.scope@gmail.com</a>
          <br />
        </p>
      </div>
    </div>
  )
}
