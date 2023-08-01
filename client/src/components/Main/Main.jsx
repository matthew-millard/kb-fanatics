import React from "react";
import PropTypes from "prop-types";
// import Hero from "./Hero";
import Keyboard from "./Keyboards";
import Switches from "./Switches";
import Keycaps from "./Keycaps";
import Deskmats from "./Deskmats";
import Accessories from "./Accessories";

export default function Main({ className }) {
  return (
    <main className={className}>
      {/* <Hero /> */}
      <Keyboard />
      <Switches />
      <Keycaps />
      <Deskmats />
      <Accessories />
    </main>
  );
}

Main.propTypes = {
  className: PropTypes.string.isRequired,
};
