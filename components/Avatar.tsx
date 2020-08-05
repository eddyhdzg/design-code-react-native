import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { connect } from "react-redux";

// const defaultAvatar =
//   "https://ramcotubular.com/wp-content/uploads/default-avatar.jpg";

// const uinamesPath = "https://uinames.com/api/?ext&gender=female&region=japan";

const mapStateToProps = (state: any) => {
  return {
    name: state.name,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateName: (name: string) =>
      dispatch({
        type: "UPDATE_NAME",
        name,
      }),
  };
};

interface Avatar {
  updateName: (name: string) => void;
}

const Avatar: React.FC<Avatar> = ({ updateName }) => {
  const [photo] = useState(require("../assets/eddy.jpg"));

  useEffect(() => {
    updateName("Eddy");
  }, []);
  return <Image source={photo} />;
};

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);

const Image = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
`;
