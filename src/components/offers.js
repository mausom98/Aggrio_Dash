import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { firebase } from '../firebaseConfig';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';



const db = firebase.firestore();
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(5),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

function getSteps() {
    return ['Content', 'Confirm'];
}



export default function Offers() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [name, setName] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const steps = getSteps();

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            setLoading(true);
            db.collection('Offers').add({
                CurTime: Date.now(),
                Name: name,

            }).then((e) => {
                setLoading(false);
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }).catch((error) => {
                console.log(error);
            });

        }
        else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }


    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setName('');

    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <div>
                    <TextField
                        autoComplete="off"
                        id="name"
                        label="Name"
                        style={{ margin: 8 }}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />

                </div>;
            case 1:
                return `Confirm All The Changes Made, Once Processed It Will Go For Public View`;
            default:
                return 'Unknown step';
        }

    }


    return (
        <div className={classes.root}>
            <Backdrop className={classes.backdrop} open={loading} >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            <Typography>{getStepContent(index)}</Typography>
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Back
                                    </Button>
                                    <Button

                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>All steps completed - you&apos;ve successfully uploaded</Typography>
                    <Button onClick={handleReset} className={classes.button}>Reset</Button>
                </Paper>
            )}
        </div>
    );
}
