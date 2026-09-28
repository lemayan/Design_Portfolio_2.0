'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, ArrowUpRight, RotateCcw } from 'lucide-react';
import { usePreferences } from '@/components/site';
import styles from './not-found-experience.module.css';

export default function NotFoundExperience() {
  const [take, setTake] = useState(0);
  const { reduced, tick } = usePreferences();

  function replay() {
    tick();
    setTake(value => value + 1);
  }

  return (
    <main id="main" className={styles.page}>
      <div className={styles.topline}>
        <span>UNEXPECTED ENCOUNTER / 404</span>
        <span className={styles.status}><i /> A LITTLE OFF THE MAP</span>
      </div>

      <div className={styles.stage} role="img" aria-label="A fluffy turquoise monster pulls a paper card marked 404 onto the screen with a rope.">
        <div className={styles.orbit} aria-hidden="true" />
        <span className={styles.sparkOne} aria-hidden="true">+</span>
        <span className={styles.sparkTwo} aria-hidden="true">+</span>
        <div key={take} className={styles.scene} aria-hidden="true">
          <div className={styles.assembly}>
            <svg className={styles.rope} viewBox="0 0 1000 470" fill="none">
              <path className={styles.ropeShadow} d="M 376 193 Q 416 216 477 213" />
              <path d="M 376 189 Q 416 212 477 209" />
              <path className={styles.ropeFiber} d="M 376 189 Q 416 212 477 209" />
            </svg>

            <div className={styles.sheet}>
              <div className={styles.sheetTop}><span>NOMAD / PLAY</span><span>LOST & FOUND DEPT.</span></div>
              <span className={styles.punchHole} />
              <span className={styles.errorCode}>404<span className={styles.codeDot}>.</span></span>
              <div className={styles.sheetBottom}><span>PAGE NOT FOUND</span><ArrowUpRight /></div>
              <span className={styles.stamp}>WRONG<br />CARTRIDGE</span>
              <span className={styles.fold} />
            </div>

            <div className={styles.monster}>
              <img src="/illustrations/404-monster.png" alt="" width="374" height="358" fetchPriority="high" draggable={false} />
            </div>
            <span className={styles.speech}>Found it. <em>Sort of.</em></span>
            <svg className={styles.effort} viewBox="0 0 1000 470" fill="none">
              <path d="m 79 316 -23 -5 M 77 338 H 42 m 39 19 -21 8" />
            </svg>
            <span className={styles.dustOne} />
            <span className={styles.dustTwo} />
          </div>
        </div>
        <span className={styles.stageCaption}>FIG. 404 — A VERY SMALL RESCUE MISSION</span>
      </div>

      <div className={styles.copy}>
        <span className={styles.eyebrow}>SMALL MONSTER. WRONG PAGE.</span>
        <h1>Well, this is awkward<span>.</span></h1>
        <p>He pulled pretty hard. Still couldn’t find that page. <br />Let’s get you back to something that exists.</p>
        <div className={styles.actions}>
          <Link className={styles.home} href="/" prefetch={false}><ArrowLeft size={17} /> Back to the collection</Link>
          <button className={styles.replay} onClick={replay} disabled={reduced} title={reduced ? 'Enable motion in the footer to replay' : 'Replay the monster’s rescue mission'}><RotateCcw size={15} /> Pull it again</button>
        </div>
      </div>
      <div className={styles.bottomline}><span>NO PAGES WERE HARMED. PROBABLY.</span><Link href="/contact" prefetch={false}>Something broken? Let me know <ArrowUpRight size={13} /></Link></div>
    </main>
  );
}
