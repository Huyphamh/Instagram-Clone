import React from "react";
import HomePhone from "../components/itemsLandingPages/HomePhone";
import FormLogin from "../components/itemsLandingPages/FormLogin";
import FooterLanding from "components/itemsLandingPages/FooterLanding";

const LandingPage = () => {
  return (
    <div>
    <div className="flex justify-center mt-8 lg:mr-[74px]">
      <HomePhone></HomePhone>
      <FormLogin></FormLogin>
    </div>
      <FooterLanding></FooterLanding>
      <p className="flex justify-center text-[12px]  text-[#858a8f]">Instagram clone by Huy Pham</p>
    </div>
  );
};

export default LandingPage;
