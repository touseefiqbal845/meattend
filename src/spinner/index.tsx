import React from "react";
import { BallTriangle } from "react-loader-spinner";

class SpinnerComponent extends React.Component {
  state = {
    loading: true,
  };
  render() {
    return (
      <div className="loader-container">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#FFC000"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }
}

export default SpinnerComponent;
