import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { motion } from "framer-motion";
import {
  faLock,
  faRocket,
  faShieldAlt,
  faEnvelope,
  faEye,
  faEyeSlash,
  faArrowLeft,
  faSignInAlt,
  faKey
} from "@fortawesome/free-solid-svg-icons";
import GlassSurface from "../../components/GlassSurface";
import SpotlightCard from "../../components/SpotlightCard";
import LightRays from "../../components/LightRays";
import "../../css/SignIn.css";
import "../../css/SignUp.css";

function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulasi proses login
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <>
      <div className="signUp-container">
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
        
        {/* Back Button */}
        <motion.button
          className="back-button cursor-target"
          onClick={() => navigate(-1)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back
        </motion.button>

        <div className="signUp-content">
          {/* Left Side - Brand/Info Section */}
          <motion.div 
            className="brand-section"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="brand-content">
              {/* Logo Hitam Putih */}
              <motion.div
                className="logo-monochrome"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="logo-text">PIXTOURL</span>
              </motion.div>

              {/* Hero Text */}
              <div className="brand-hero">
                <h1 className="brand-title">
                  Welcome Back to Your Image Hub
                </h1>
                <p className="brand-subtitle">
                  Access your unlimited cloud storage, manage your images, 
                  and continue sharing instantly.
                </p>
              </div>

              {/* Features List */}
              <div className="brand-features">
                <div className="feature-item">
                  <FontAwesomeIcon icon={faShieldAlt} className="feature-icon" />
                  <div className="feature-text">
                    <h4>Secure Access</h4>
                    <p>Your data is protected with enterprise-grade security</p>
                  </div>
                </div>
                <div className="feature-item">
                  <FontAwesomeIcon icon={faRocket} className="feature-icon" />
                  <div className="feature-text">
                    <h4>Instant Access</h4>
                    <p>Get back to your files in seconds</p>
                  </div>
                </div>
                <div className="feature-item">
                  <FontAwesomeIcon icon={faKey} className="feature-icon" />
                  <div className="feature-text">
                    <h4>Always Available</h4>
                    <p>Your files are waiting for you, 24/7</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="brand-stats">
                <div className="stat">
                  <div className="stat-number">50K+</div>
                  <div className="stat-label">Happy Users</div>
                </div>
                <div className="stat">
                  <div className="stat-number">99.9%</div>
                  <div className="stat-label">Uptime</div>
                </div>
                <div className="stat">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Support</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form Section */}
          <motion.div 
            className="form-section"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SpotlightCard className="custom-spotlight-card" spotlightColor="#d2d2d285">
              <motion.div
                className="signup-form-container"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Header */}
                <motion.div className="signup-header" variants={itemVariants}>
                  <h1 className="signup-title">Welcome Back</h1>
                  <p className="signup-subtitle">
                    Sign in to continue your journey
                  </p>
                </motion.div>

                {/* Form */}
                <motion.form
                  className="signup-form"
                  onSubmit={handleSubmit}
                  variants={itemVariants}
                >
                  {/* Email Field */}
                  <motion.div className="form-group cursor-target" variants={itemVariants}>
                    <div className="input-container">
                      <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-input"
                      />
                    </div>
                  </motion.div>

                  {/* Password Field */}
                  <motion.div className="form-group cursor-target" variants={itemVariants}>
                    <div className="input-container">
                      <FontAwesomeIcon icon={faLock} className="input-icon" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="form-input"
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <FontAwesomeIcon
                          icon={showPassword ? faEyeSlash : faEye}
                        />
                      </button>
                    </div>
                  </motion.div>

                  {/* Remember Me & Forgot Password */}
                  <motion.div className="form-options" variants={itemVariants}>
                    <label className="remember-me">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <span>Remember me</span>
                    </label>
                    <Link to="/forgot-password" className="forgot-password link cursor-target">
                      Forgot password?
                    </Link>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    className={`signup-button cursor-target readmore ${isLoading ? "loading" : ""}`}
                    disabled={isLoading}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading ? (
                      <motion.div
                        className="loading-spinner"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faSignInAlt} className="button-icon" />
                        Sign In
                      </>
                    )}
                  </motion.button>

                  {/* Divider */}
                  <motion.div className="divider" variants={itemVariants}>
                    <span>or</span>
                  </motion.div>

                  {/* Sign Up Link */}
                  <motion.div className="login-link" variants={itemVariants}>
                    <p>
                      Don't have an account?{" "}
                      <Link to="/auth/signup" className="link cursor-target">
                        Sign Up
                      </Link>
                    </p>
                  </motion.div>

                  {/* Terms Notice */}
                  <motion.div className="terms-notice" variants={itemVariants}>
                    <p>
                      By signing in, you agree to our{" "}
                      <Link to="/terms" className="link">Terms</Link> and{" "}
                      <Link to="/privacy" className="link">Privacy Policy</Link>
                    </p>
                  </motion.div>
                </motion.form>
              </motion.div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default SignIn;