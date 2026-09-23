import Footer from "./Footer";
import Install from "./Install";
import JunjiFaq from "./JunjiFaq";
import JunjiHero from "./JunjiHero";
import TechnicalOverview from "./TechnicalOverview";
import TutorialBoard from "./TutorialBoard";
import VerbDeck from "./VerbDeck";
import YokaiBonus from "./YokaiBonus";

export default function JunjiLanding() {
  return (
    <>
      <JunjiHero />
      <TechnicalOverview />
      <TutorialBoard />
      <JunjiFaq />
      <VerbDeck />
      <YokaiBonus />
      <Install />
      <Footer />
    </>
  );
}
