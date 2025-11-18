import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Aurora from "../components/Aurora";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { motion } from "framer-motion";
import {
  faLock,
  faPlus,
  faRocket,
  faShieldAlt,
  faCloudUpload,
} from "@fortawesome/free-solid-svg-icons";
import GlassSurface from "../components/GlassSurface";
import CircularGallery from "../components/CircularGallery";
import SpotlightCard from "../components/SpotlightCard";
import StackScroll from "../components/StackScroll";
import LightRays from "../components/LightRays";

function Home() {
  const [fade, setFade] = useState(false);
  const [show, setShow] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();

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

  // Fungsi untuk handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Fungsi untuk handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFiles(e.dataTransfer.files);
    }
  };

  // Fungsi untuk handle click upload
  const handleUploadClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = "image/*";
    input.onchange = (e) => {
      if (e.target.files) {
        processFiles(e.target.files);
      }
    };
    input.click();
  };

  // Fungsi untuk memproses files dan convert ke base64
  const processFiles = async (files) => {
    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (imageFiles.length === 0) {
      alert("Please upload image files only");
      return;
    }

    try {
      // Convert files to base64 and store temporarily
      const filesWithData = await Promise.all(
        imageFiles.map(async (file) => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              resolve({
                name: file.name,
                type: file.type,
                size: file.size,
                data: e.target.result, // base64 data
                lastModified: file.lastModified,
              });
            };
            reader.readAsDataURL(file);
          });
        })
      );

      // Simpan ke localStorage sementara
      localStorage.setItem("tempUploadedFiles", JSON.stringify(filesWithData));

      // Redirect ke halaman upload
      navigate("/upload", {
        state: {
          files: filesWithData,
          fileCount: filesWithData.length,
        },
      });
    } catch (error) {
      console.error("Error processing files:", error);
      alert("Error processing files. Please try again.");
    }
  };

  // Prevent default behavior untuk drag events
  useEffect(() => {
    const preventDefault = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    document.addEventListener("dragenter", preventDefault);
    document.addEventListener("dragover", preventDefault);
    document.addEventListener("dragleave", preventDefault);
    document.addEventListener("drop", preventDefault);

    return () => {
      document.removeEventListener("dragenter", preventDefault);
      document.removeEventListener("dragover", preventDefault);
      document.removeEventListener("dragleave", preventDefault);
      document.removeEventListener("drop", preventDefault);
    };
  }, []);

  return (
    <>
      <main className="mainHero">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
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
          <div
            className={`uploadContent cursor-target ${
              dragActive ? "drag-active" : ""
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={handleUploadClick}
          >
            <div>
              <FontAwesomeIcon
                className="icon"
                icon={dragActive ? faCloudUpload : faPlus}
              ></FontAwesomeIcon>
              <h3 className="title">
                {dragActive ? "Drop Your Images Here" : "Drag & Drop Here"}
              </h3>
              <p className="upload-subtitle">or click to select files</p>
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
              className="custom-spotlight-card cursor-target"
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
              className="custom-spotlight-card cursor-target"
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
              className="custom-spotlight-card cursor-target"
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
    </>
  );
}

export default Home;
