import React from "react";
import PropTypes from "prop-types";
import Hero from "./Hero";

export default function Main({ className }) {
  return (
    <main className={className}>
      <Hero />
    </main>
  );
}

Main.propTypes = {
  className: PropTypes.string.isRequired,
};
