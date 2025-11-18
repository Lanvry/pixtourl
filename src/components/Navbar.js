import { useState, useEffect } from "react";
import "../App.css";
import GlassSurface from "./GlassSurface";
import StaggeredMenu from "./StaggeredMenu";

function Navbar() {
  const [isMobile, setIsMobile] = useState(false);

  // Menu items untuk StaggeredMenu
  const menuItems = [
    { label: "Home", ariaLabel: "Go to home page", link: "/" },
    { label: "Upload", ariaLabel: "Upload your images", link: "/upload" },
    {
      label: "Create Account",
      ariaLabel: "Create new account",
      link: "/signup",
    },
  ];

  const socialItems = [
    { label: "Twitter", link: "https://twitter.com" },
    { label: "GitHub", link: "https://github.com" },
    { label: "LinkedIn", link: "https://linkedin.com" },
  ];

  // Check screen size untuk menentukan mobile/desktop
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check initial screen size
    checkScreenSize();

    // Add event listener untuk resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      {!isMobile && (
        <GlassSurface
          width={"60%"}
          height={"fit-content"}
          borderRadius={24}
          className="navbar"
        >
          <nav className="navbar-content">
            <span className="application-title">PIXTOURL</span>
            <ul>
              <li>
                <a href="/" className="cursor-target">Home</a>
              </li>
              <li>
                <a href="/upload" className="cursor-target">Upload</a>
              </li>
              <li>
                <a href="/auth/signup" className="btn-create cursor-target">
                  Create Account
                </a>
              </li>
            </ul>
          </nav>
        </GlassSurface>
      )}

      {/* Mobile Navigation - StaggeredMenu */}
      {isMobile && (
        <div className="mobile-menu-container">
          <StaggeredMenu
            position="right"
            items={menuItems}
            socialItems={socialItems}
            displaySocials={true}
            displayItemNumbering={true}
            menuButtonColor="#fff"
            openMenuButtonColor="#fff"
            changeMenuColorOnOpen={true}
            colors={["#B19EEF", "#5227FF"]}
            logoUrl="/path-to-your-logo.svg"
            accentColor="#ff6b6b"
            onMenuOpen={() => console.log("Menu opened")}
            onMenuClose={() => console.log("Menu closed")}
            // Custom styling untuk menghilangkan background hitam
            menuBackgroundColor="transparent"
            overlayColor="rgba(6, 0, 16, 0.8)" // Sesuai dengan background-color utama
            menuItemBackground="rgba(255, 255, 255, 0.1)"
            menuItemHoverBackground="rgba(255, 255, 255, 0.2)"
          />
        </div>
      )}
    </>
  );
}

export default Navbar;
