import CoverPage from "./components/CoverPage";
import Hero3DMenu from "./components/Hero3DMenu";
import Section from "./components/Section";

function App() {
  return (
    <div className="App">
      {/* Full Cover Page */}
      <CoverPage />

      {/* Table + 3D Menu Section */}
      <Section id="menu" bgColor="bg-softGray">
        <Hero3DMenu />
      </Section>

      {/* Experience Section */}
      <Section id="experience" bgColor="bg-beige">
        <h2 className="text-3xl font-bold">Experience</h2>
        <p>Details about your work experience...</p>
      </Section>

      {/* Projects Section */}
      <Section id="projects" bgColor="bg-softPink">
        <h2 className="text-3xl font-bold">Projects</h2>
        <p>Project details...</p>
      </Section>

      {/* About Section */}
      <Section id="about" bgColor="bg-softGreen">
        <h2 className="text-3xl font-bold">About</h2>
        <p>About you...</p>
      </Section>

      {/* Art Section */}
      <Section id="art" bgColor="bg-beige">
        <h2 className="text-3xl font-bold">Art</h2>
        <p>Hand-drawn illustrations...</p>
      </Section>

      {/* Hobbies Section */}
      <Section id="hobbies" bgColor="bg-softGray">
        <h2 className="text-3xl font-bold">Hobbies</h2>
        <p>Your hobbies...</p>
      </Section>

      {/* Contact Section */}
      <Section id="contact" bgColor="bg-softPink">
        <h2 className="text-3xl font-bold">Contact</h2>
        <p>How to reach you...</p>
      </Section>
    </div>
  );
}

export default App;
