import Sakura from "../Sakura";
import Footer from "./Footer";
import Hero from "./Hero";
import Workbench from "./Workbench";

export default function RecipesLanding() {
  return (
    <>
      <Sakura count={10} layer="back" />
      <div className="recipes-wrap">
        <Hero />
        <Workbench />
        <Footer />
      </div>
    </>
  );
}
