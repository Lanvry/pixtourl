import { useState, useEffect, React } from "react";
import Aurora from "../components/Aurora";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { motion } from "framer-motion";
import {
  faLock,
  faPlus,
  faRocket,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import GlassSurface from "../components/GlassSurface";
import CircularGallery from "../components/CircularGallery";
import SpotlightCard from "../components/SpotlightCard";
import Navbar from "../components/Navbar";
import StackScroll from "../components/StackScroll";
import Footer from "../components/Footer";
import TargetCursor from "../components/TargetCursor";

function Home() {
  const [fade, setFade] = useState(false);
  const [show, setShow] = useState(false);
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  function handleupload() {
    setFade(true);
    setTimeout(() => {
      setShow(true);
    }, 500);
  }

  return (
    <>
      <main className="mainHero">
        <Aurora
          colorStops={["#e0e0e0", "#d6d6d6", "#e0e0e0"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
        <div className={`mainHero-content ${fade ? "fadeOut" : ""}`}>
          <GlassSurface
            width={"fit-content"}
            height={"fit-content"}
            borderRadius={100}
            className="badge cursor-target"
          >
            <FontAwesomeIcon icon={faImages} className="icon" /> PICTURE TO URL
          </GlassSurface>
          <h1>Turn Your Images Into Shareable URLs — Instantly</h1>
          <p>
            Upload gambar kamu dan dapatkan URL siap pakai dalam hitungan detik.
          </p>
          <div className="gridMain-content">
            <a href="#about" className="readmore cursor-target">
              Read More
            </a>
            <GlassSurface
              width={"fit-content"}
              height={"fit-content"}
              borderRadius={100}
              className="uploadnow cursor-target"
            >
              <a onClick={handleupload}>Upload Now</a>
            </GlassSurface>
          </div>
        </div>
        <div className={`container-circularGallery ${fade ? "fadeOut" : ""}`}>
          <CircularGallery
            bend={3}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.02}
          />
        </div>

        <div className={`uploadContainer ${show ? "show" : ""}`}>
          <div className="uploadContent cursor-target">
            <div>
              <FontAwesomeIcon className="icon" icon={faPlus}></FontAwesomeIcon>
              <h3 className="title">Drag & Drop Here</h3>
            </div>
          </div>
        </div>
      </main>

      <section className="about" id="about">
        <div className="about-content">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: false, margin: "-20px" }}
          >
            <SpotlightCard
              className="custom-spotlight-card"
              spotlightColor="#d6d6d6"
            >
              <motion.div variants={contentVariants}>
                <FontAwesomeIcon
                  icon={faLock}
                  className="icon"
                ></FontAwesomeIcon>
                <div className="custom-spotlight-card-content">
                  <h2>100% SECURE</h2>
                  <p>
                    Data Anda dilindungi dengan enkripsi tingkat militer dan
                    sistem keamanan berlapis
                  </p>
                </div>
              </motion.div>
            </SpotlightCard>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: false, margin: "-20px" }}
          >
            <SpotlightCard
              className="custom-spotlight-card"
              spotlightColor="#d6d6d6"
            >
              <motion.div variants={contentVariants}>
                <FontAwesomeIcon
                  icon={faRocket}
                  className="icon"
                ></FontAwesomeIcon>
                <div className="custom-spotlight-card-content">
                  <h2>HIGH SPEED</h2>
                  <p>
                    Performa ultra-cepat dengan teknologi terbaru untuk
                    pengalaman terbaik
                  </p>
                </div>
              </motion.div>
            </SpotlightCard>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: false, margin: "-20px" }}
          >
            <SpotlightCard
              className="custom-spotlight-card"
              spotlightColor="#d6d6d6"
            >
              <motion.div variants={contentVariants}>
                <FontAwesomeIcon
                  icon={faShieldAlt}
                  className="icon"
                ></FontAwesomeIcon>
                <div className="custom-spotlight-card-content">
                  <h2>PREMIUM PROTECTION</h2>
                  <p>
                    Perlindungan 24/7 terhadap semua ancaman dengan monitoring
                    real-time
                  </p>
                </div>
              </motion.div>
            </SpotlightCard>
          </motion.div>
        </div>
      </section>

      <StackScroll />

      <Footer />
    </>
  );
}

export default Home;
