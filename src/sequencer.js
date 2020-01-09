import React, { useState, useEffect } from "react";
import Grid from "./grid";
import Tone from "tone";
import PlayerProvider from "./player-provider";
import Bar from "./nav-bar";
import PlayButton from "./play-button";

const steps = 32;
const initialCellState = { triggered: false, activated: false };
const lineMap = ["BD", "CP", "CH", "OH"];
const initialState = [
  new Array(32).fill(initialCellState),
  new Array(32).fill(initialCellState),
  new Array(32).fill(initialCellState),
  new Array(32).fill(initialCellState),
  new Array(32).fill(initialCellState),
  new Array(32).fill(initialCellState),
  new Array(32).fill(initialCellState),
  new Array(32).fill(initialCellState)
];

const Sequencer = ({ player }) => {
  const [sequence, setSequence] = useState(initialState);
  const [playing, setPlaying] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  const toggleStep = (line, step) => {
    const sequenceCopy = [...sequence];
    const { triggered, activated } = sequenceCopy[line][step];
    sequenceCopy[line][step] = { triggered, activated: !activated };
    console.log("toggled | " + line + " | " + step);
    setSequence(sequenceCopy);
  };

  const nextStep = time => {
    for (let i = 0; i < sequence.length; i++) {
      for (let j = 0; j < sequence[i].length; j++) {
        const { triggered, activated } = sequence[i][j];
        sequence[i][j] = { activated, triggered: j === time };
        if (triggered && activated) {
          player.get(lineMap[i]).start();
        }
      }
    }
    setSequence(sequence);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (playing) {
        setCurrentStep((currentStep + 1) % steps);
        nextStep(currentStep);
      }
    }, 70 + Math.random() * 25);
    return () => {
      clearTimeout(timer);
    };
  }, [currentStep, playing]);

  return (
    <>
      <Bar>
        <PlayButton playing={playing} onClick={() => setPlaying(!playing)} />
      </Bar>
      <Grid sequence={sequence} toggleStep={toggleStep} />
    </>
  );
};

export default Sequencer;
