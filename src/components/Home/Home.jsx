import React from "react";
import ContentContainer from "../UI/ContentContainer";
import ImgContainer from "../UI/ImgContainer";
import FontCheck from "./FontCheck";

import HomeImg from "../../assets/img/home.jpg";

const Home = () => {
  return (
    <div className="Home">
      <ImgContainer>
        {/* <img className="Img" src={home} alt="home" /> */}
        <img className="Img" src={HomeImg} alt="top" />
      </ImgContainer>
      <ContentContainer>
        <FontCheck />
      </ContentContainer>
    </div>
  );
};

export default Home;
