import React from "react";
import Navbar from "./components/Navbar/navbar";
import About from "./components/About/about";
import Skills from "./components/Skills/skills";
import Project from "./components/Project/project";
import Contact from "./components/Contact/contact";
import Footer from "./components/Footer/footer";
import { ThemeProvider } from "./context/ThemeContext";
import useGithubData from "./hooks/useGithubData";
import profile from "./data/profile";

function App() {
  const { repos, profile: githubProfile, status } = useGithubData(profile.githubUsername);

  return (
    <ThemeProvider>
      <Navbar />
      <About githubProfile={githubProfile} status={status} />
      <Skills />
      <Project repos={repos} status={status} />
      <Contact />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
