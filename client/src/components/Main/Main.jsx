import React from "react";
import PropTypes from "prop-types";
import Hero from "./Hero";
import Keyboard from "./Keyboards";

export default function Main({ className }) {
  return (
    <main className={className}>
      {/* <Hero /> */}
      <Keyboard />
    </main>
  );
}

Main.propTypes = {
  className: PropTypes.string.isRequired,
};
