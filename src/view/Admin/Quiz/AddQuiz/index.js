import { useState, Fragment } from "react";

import GeneralData from "./GeneralData";
import Questions from "./Questions";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const steps = ["Général", "Questions", "Resumé"];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [dataQuiz, setDataQuiz] = useState({});

  const isStepOptional = (step) => step === 1;

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = (dataStep) => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setDataQuiz((prevData) => ({ ...prevData, [activeStep]: dataStep }));
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleReset = () => setActiveStep(0);

  const renderStep = (step) => {
    switch (step) {
      case 0:
        return <GeneralData handleNext={handleNext} />;
      case 1:
        return <Questions dataQuiz={dataQuiz} />;
      case 2:
        return;
      default:
        return <GeneralData handleNext={handleNext} />;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </Fragment>
      ) : (
        renderStep(activeStep)
      )}
    </Box>
  );
}
