import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Heart,
  VolumeX,
  Volume2,
  Sparkles,
  ChevronDown,
  RotateCcw,
  LockKeyhole,
} from "lucide-react";
import "./styles.css";

const data = {
  herName: "Jaan",
  birthday: "24 September 2008",

  memories: [
    {
      title: "The First Meeting",
      date: "The day it all started",
      image: "/photos/first-meeting.jpg",
      fallback: "✨",
      message:
        "Our first meeting is still one of my favourite memories. I didn't know that one ordinary moment would become such a special part of my story.",
    },
    {
      title: "A Little More Us",
      date: "More memories loading…",
      image: "/photos/memory-2.jpg",
      fallback: "❤️",
      message:
        "Some of the best moments are the random ones — the talks, laughs, silly arguments and tiny things that only we understand.",
    },
    {
      title: "Still My Favourite",
      date: "Today",
      image: "/photos/memory-3.jpg",
      fallback: "🌙",
      message:
        "No matter how many new memories we make, that first meeting will always have a special place in my heart.",
    },
  ],

  questions: [
    {
      q: "Which memory started our story?",
      options: ["Our first meeting", "A random movie", "A school project"],
      answer: 0,
    },
    {
      q: "What deserves priority in this website?",
      options: ["The code", "Shireen's smile", "The animations"],
      answer: 1,
    },
    {
      q: "What's the next version?",
      options: ["Forever.1.0", "Maybe.2.0", "Loading…"],
      answer: 0,
    },
  ],
};

function Section({ children, className = "", id }) {
  const ref = useRef(null);
  const visible = useInView(ref, {
    once: true,
    amount: 0.18,
  });

  return (
    <motion.section
      id={id}
      ref={ref}
      className={`section ${className}`}
      initial={{ opacity: 0, y: 35 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.section>
  );
}

function HeartField() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        delay: `${(i % 7) * 0.8}s`,
        duration: `${8 + (i % 5) * 2}s`,
        size: `${10 + (i % 4) * 5}px`,
      })),
    []
  );

  return (
    <div className="heart-field" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          style={{
            left: h.left,
            animationDelay: h.delay,
            animationDuration: h.duration,
            fontSize: h.size,
          }}
        >
          ♡
        </span>
      ))}
    </div>
  );
}

function ImageOrFallback({ src, fallback, alt }) {
  const [failed, setFailed] = useState(false);

  return failed ? (
    <div className="photo-fallback" aria-label={alt}>
      {fallback}
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      loading="lazy"
    />
  );
}

/* =========================
   REAL MP3 MUSIC PLAYER
========================= */

function BackgroundMusic({ enabled }) {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    if (enabled) {
      audio.volume = 0.45;

      const playMusic = async () => {
        try {
          await audio.play();
          console.log("🎵 Music started");
        } catch (error) {
          console.log("Music could not start:", error);
        }
      };

      playMusic();
    } else {
      audio.pause();
    }
  }, [enabled]);

  return (
    <audio
      ref={audioRef}
      src="/music.mp3"
      loop
      preload="auto"
    />
  );
}

/* =========================
   TERMINAL INTRO
========================= */

function TerminalIntro({ onEnter }) {
  const lines = [
    "Initializing birthday.exe...",
    "✓ Loading memories...",
    "✓ Loading smiles...",
    "✓ Loading one very special person...",
    "✓ Loading a little too much love...",
  ];

  const [count, setCount] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCount((c) => Math.min(c + 1, lines.length));
    }, 650);

    return () => clearInterval(t);
  }, []);

  return (
    <div className="intro">
      <HeartField />

      <div className="terminal-card">
        <div className="terminal-top">
          <span />
          <span />
          <span />
          <b>birthday.exe</b>
        </div>

        <div className="terminal-body">
          <div className="prompt">
            shireen@love:~$ <span>./birthday.exe</span>
          </div>

          {lines.slice(0, count).map((line, i) => (
            <motion.div
              key={line}
              initial={{
                opacity: 0,
                x: -8,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              className={i === 0 ? "muted" : ""}
            >
              {line}
            </motion.div>
          ))}

          {count === lines.length && (
            <motion.div
              className="ready"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              SYSTEM READY <span>♥</span>
            </motion.div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {count === lines.length && (
          <motion.div
            className="intro-cta"
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
            }}
          >
            <p>I made something just for you.</p>

            <button
              className="primary-btn"
              onClick={onEnter}
            >
              ENTER <span>→</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* =========================
   MAIN APP
========================= */

function App() {
  const [started, setStarted] = useState(false);
  const [music, setMusic] = useState(false);

  const [quiz, setQuiz] = useState({
    index: 0,
    score: 0,
    done: false,
  });

  const [surprise, setSurprise] = useState(false);
  const [secret, setSecret] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 650);
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const answer = (i) => {
    const correct = i === data.questions[quiz.index].answer;

    if (quiz.index + 1 === data.questions.length) {
      setQuiz((q) => ({
        ...q,
        score: q.score + (correct ? 1 : 0),
        done: true,
      }));
    } else {
      setQuiz((q) => ({
        ...q,
        score: q.score + (correct ? 1 : 0),
        index: q.index + 1,
      }));
    }
  };

  const replay = () => {
    setSurprise(false);

    setQuiz({
      index: 0,
      score: 0,
      done: false,
    });

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 50);
  };

  /* =========================
     ENTER SCREEN
     MUSIC STARTS HERE
  ========================= */

  if (!started) {
    return (
      <TerminalIntro
        onEnter={() => {
          /*
           * IMPORTANT:
           * Music is enabled from the actual user click.
           * This helps browsers allow audio playback.
           */
          setMusic(true);
          setStarted(true);

          setTimeout(() => {
            window.scrollTo({
              top: 0,
            });
          }, 50);
        }}
      />
    );
  }

  return (
    <main>
      {/* REAL MP3 PLAYER */}
      <BackgroundMusic enabled={music} />

      <div
        className="ambient"
        aria-hidden="true"
      >
        <div />
        <div />
        <div />
      </div>

      <HeartField />

      {/* MUSIC BUTTON */}

      <button
        className="music-btn"
        onClick={() => setMusic((v) => !v)}
        aria-label={
          music
            ? "Turn music off"
            : "Turn music on"
        }
      >
        {music ? (
          <Volume2 size={18} />
        ) : (
          <VolumeX size={18} />
        )}

        <span>
          {music ? "Music on" : "Music"}
        </span>
      </button>

      {/* =========================
          HERO
      ========================= */}

      <Section className="hero">
        <div className="eyebrow">
          <Sparkles size={15} />
          A tiny internet corner for you
        </div>

        <h1>
          Hey, <em>{data.herName}</em>{" "}
          <span className="heart">♥</span>
        </h1>

        <p className="hero-copy">
          Today isn't just another day. It's
          the day the world got a little more
          beautiful.
        </p>

        <p className="soft">
          And somehow, I got lucky enough to
          know you.
        </p>

        <button
          className="scroll-btn"
          onClick={() =>
            document
              .getElementById("why")
              ?.scrollIntoView({
                behavior: "smooth",
              })
          }
        >
          There's more
          <ChevronDown size={18} />
        </button>
      </Section>

      {/* =========================
          WHY YOU ARE SPECIAL
      ========================= */}

      <Section id="why">
        <div className="section-head">
          <span>01 / YOU</span>

          <h2>
            Do you know why
            <br />
            <em>you're special?</em>
          </h2>
        </div>

        <div className="reason-grid">
          {[
            "Your smile 😊",
            "Your random talks 😂",
            "Your cute moments 🥹",
            "Your little anger 😤",
            "Your voice 🎧",
            "The way you make normal days special ✨",
          ].map((x, i) => (
            <motion.div
              className="reason-card"
              key={x}
              whileTap={{
                scale: 0.97,
              }}
              whileHover={{
                y: -5,
              }}
            >
              <span className="number">
                0{i + 1}
              </span>

              <h3>{x}</h3>
            </motion.div>
          ))}
        </div>

        <p className="big-line">
          Actually… I could keep writing forever.
        </p>

        <p className="center-love">
          Because the answer is simply{" "}
          <strong>YOU.</strong> ❤️
        </p>
      </Section>

      {/* =========================
          MEMORIES
      ========================= */}

      <Section
        id="memories"
        className="memories"
      >
        <div className="section-head">
          <span>02 / OUR STORY</span>

          <h2>
            One memory.
            <br />
            <em>A thousand feelings.</em>
          </h2>
        </div>

        <div className="memory-list">
          {data.memories.map((m, i) => (
            <motion.article
              className={`memory ${
                i % 2 ? "reverse" : ""
              }`}
              key={m.title}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              initial={{
                opacity: 0,
                y: 30,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
              }}
            >
              <div className="memory-photo">
                <ImageOrFallback
                  src={m.image}
                  fallback={m.fallback}
                  alt={m.title}
                />

                <span className="photo-label">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="memory-copy">
                <span>{m.date}</span>

                <h3>{m.title}</h3>

                <p>{m.message}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      {/* =========================
          MINI GAME
      ========================= */}

      <Section id="game">
        <div className="section-head">
          <span>03 / MINI GAME</span>

          <h2>
            How well do you
            <br />
            <em>know us?</em> 👀
          </h2>
        </div>

        <div className="quiz-card">
          {!quiz.done ? (
            <>
              <div className="quiz-progress">
                <span
                  style={{
                    width: `${
                      (quiz.index /
                        data.questions.length) *
                      100
                    }%`,
                  }}
                />
              </div>

              <small>
                QUESTION {quiz.index + 1} /{" "}
                {data.questions.length}
              </small>

              <h3>
                {data.questions[quiz.index].q}
              </h3>

              <div className="options">
                {data.questions[
                  quiz.index
                ].options.map((o, i) => (
                  <button
                    key={o}
                    onClick={() => answer(i)}
                  >
                    {o}

                    <span>→</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="quiz-result"
            >
              <div className="result-heart">
                ♥
              </div>

              <h3>
                {quiz.score ===
                data.questions.length
                  ? "Okay, you know us too well. 😭❤️"
                  : "Not bad… I'll give you a cute pass. 😌❤️"}
              </h3>

              <p>
                Score: {quiz.score} /{" "}
                {data.questions.length}
              </p>

              <button
                className="primary-btn"
                onClick={() =>
                  document
                    .getElementById("letter")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
              >
                One last thing →
              </button>
            </motion.div>
          )}
        </div>
      </Section>

      {/* =========================
          LOVE LETTER
      ========================= */}

      <Section
        id="letter"
        className="letter-section"
      >
        <div className="section-head">
          <span>04 / FROM ME TO YOU</span>

          <h2>
            I wanted to say
            <br />
            <em>this properly.</em>
          </h2>
        </div>

        <motion.div
          className="letter"
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          initial={{
            opacity: 0,
            y: 25,
          }}
          viewport={{
            once: true,
          }}
        >
          <div className="letter-top">
            <span>Dear Baby, ❤️</span>

            <Heart
              size={17}
              fill="currentColor"
            />
          </div>

          <p>
            Baby, pata hai... kuch log humari
            life mein bas aate hain, aur kuch
            log aake{" "}
            <strong>
              humari puri duniya ko thoda aur
              beautiful bana dete hain.
            </strong>{" "}
            Tum mere liye wahi ho. ❤️
          </p>

          <p>
            Hamari pehli mulaqat shayad uss
            waqt ek normal sa moment thi, lekin
            aaj jab main uss din ko yaad karta
            hoon, toh woh meri{" "}
            <strong>
              sabse pyaari memories mein se ek
            </strong>{" "}
            ban chuki hai. 🥹
          </p>

          <p>
            Tumhare saath bitaya hua har chhota
            sa moment mere liye special hai.
            Tumhari random baatein, tumhari
            smile, tumhara cute sa gussa... sab
            kuch. ❤️
          </p>

          <p>
            Jaan, main shayad har baar words
            mein express nahi kar pata, lekin
            tum mere liye{" "}
            <strong>
              bahut zyada special ho.
            </strong>{" "}
            Tumse baat karna, tumhari smile
            dekhna, aur tumhare saath time
            spend karna — mere favourite parts
            hain. 🫶
          </p>

          <p>
            Aaj tumhara birthday hai, toh meri
            dil se bas ek hi wish hai —{" "}
            <strong>
              tum hamesha khush raho, hamesha
              smile karti raho
            </strong>
            , aur tumhari life mein woh saari
            khushiyan aaye jo tum deserve karti
            ho. ✨
          </p>

          <p>
            Aur Jaan... main chahta hoon ki aaj
            ki ye memory bhi kal humari un
            beautiful memories mein ho jinhe
            hum saalon baad bhi smile ke saath
            yaad karein. ❤️
          </p>

          <p>
            So, once again...
            <strong>
              Happy Birthday, meri Baby. ❤️
            </strong>
          </p>

          <p className="signature">
            I love you so much. ❤️
            <br />

            <span>
              — Always yours, Jaan 🫶
            </span>
          </p>
        </motion.div>
      </Section>

      {/* =========================
          CODE SECTION
      ========================= */}

      <Section
        id="code"
        className="code-section"
      >
        <div className="code-window">
          <div className="code-top">
            <span />
            <span />
            <span />
            <b>our_story.py</b>
          </div>

          <pre>
            <code>{`class OurStory:

    love = "infinite"
    bugs = "too_many 😂"
    memories = "still_loading..."
    future = "together ❤️"

    def birthday(self):
        make_her_smile()
        celebrate()
        love_you_forever()

while True:
    love_you()`}</code>
          </pre>

          <div className="build">
            <span>BUILD SUCCESSFUL ✓</span>
            <span>LOVE: ∞</span>
            <span>VERSION: FOREVER.1.0</span>
          </div>
        </div>
      </Section>

      {/* =========================
          FINAL SURPRISE
      ========================= */}

      <Section className="final-section">
        <div className="lock-icon">
          <LockKeyhole size={22} />
        </div>

        <p className="eyebrow">
          05 / FINAL SURPRISE
        </p>

        <h2>
          Okay… one
          <br />
          <em>last surprise.</em>
        </h2>

        <p>
          You've reached the part I was most
          excited to show you.
        </p>

        <button
          className="primary-btn final-btn"
          onClick={() => {
            setSurprise(true);
            setMusic(true);
          }}
        >
          OPEN YOUR SURPRISE 🎁
        </button>

        <button
          className="secret-heart"
          onClick={() =>
            setSecret((s) => s + 1)
          }
          aria-label="Secret heart"
        >
          <Heart
            fill={
              secret >= 5
                ? "currentColor"
                : "none"
            }
          />
        </button>

        {secret >= 5 && (
          <motion.p
            className="secret-msg"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
          >
            Okay okay… you found the secret
            😂❤️
            <br />
            I love you even more.
          </motion.p>
        )}
      </Section>

      <footer>
        Made with ❤️, JavaScript & way too much
        love.
      </footer>

      {/* =========================
          BACK TO TOP
      ========================= */}

      {showTop && (
        <button
          className="top-btn"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          ↑
        </button>
      )}

      {/* =========================
          SURPRISE MODAL
      ========================= */}

      <AnimatePresence>
        {surprise && (
          <motion.div
            className="surprise"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            <Confetti />

            <div className="surprise-glow" />

            <motion.div
              className="surprise-card"
              initial={{
                scale: 0.88,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                type: "spring",
                stiffness: 120,
              }}
            >
              <div className="huge-heart">
                ♥
              </div>

              <div className="surprise-photo">
                <ImageOrFallback
                  src="/photos/best-photo.jpg"
                  fallback="❤️"
                  alt={`Best photo of ${data.herName}`}
                />
              </div>

              <p className="eyebrow">
                THE FINAL BUILD
              </p>

              <h2>
                Happy Birthday,
                <br />
                <em>{data.herName}</em> ❤️
              </h2>

              <p>
                Here's to another year of you
                being amazing, and another year
                of us making memories.
              </p>

              <strong>
                I love you. ❤️
              </strong>

              <button
                className="replay-btn"
                onClick={replay}
              >
                <RotateCcw size={16} />
                Replay
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

/* =========================
   CONFETTI
========================= */

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 65 }, (_, i) => ({
        id: i,
        left: `${(i * 17.3) % 100}%`,
        delay: `${(i % 13) * 0.11}s`,
        duration: `${
          2.8 + (i % 7) * 0.25
        }s`,
        rotate: `${(i * 37) % 360}deg`,
        size: `${5 + (i % 4) * 2}px`,
      })),
    []
  );

  return (
    <div
      className="confetti"
      aria-hidden="true"
    >
      {pieces.map((p) => (
        <i
          key={p.id}
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            width: p.size,
            height: `${
              Number.parseInt(p.size) * 1.7
            }px`,
            transform: `rotate(${p.rotate})`,
          }}
        />
      ))}
    </div>
  );
}

createRoot(
  document.getElementById("root")
).render(<App />);