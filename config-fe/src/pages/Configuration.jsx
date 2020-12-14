import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography, Card, TextField, FormGroup, FormControlLabel, Checkbox, Button, Chip, CardContent, FormControl, MenuItem, InputLabel, Box } from "@material-ui/core";
import Editor from "../features/custom/Editor";
import axios from 'api/axios';
import { SaveConfig, LoadConfig } from "../store/modules/configuration/configSlice";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const useStyles = (theme) => ({
    formControl: {
        margin: theme.spacing(1),
        width: "100%",
        display: "flex"
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    },
    title: {
        color: "#4D9D2A",
        marginBottom: "20px"
    },
    title2: {
        color: "#4D9D2A",
        marginBottom: "20px",
        width: "100%",
        display: "inline-block",
        marginRight: 40
    },
    inputTitle: {
        marginTop: "30px",
        width: "40%"
    },
    Buttons: {
        marginTop: "10px",
        width: "100%"
    },
    chipControl: {
        display: "flex",
        justifyContent: "left",
        flexWrap: "wrap",
        listStyle: "none",
        marginTop: 10,
        maxWidth: 300,
        padding: 0
    },
    chip: {
        margin: theme.spacing(0.5)
    },
    inputField: {
        height: 80
    },
    box: {
        margin: "10px",
        width: "100%"
    },
    root: {
        width: "100%"
    },
    textField: {
        width: "100%"
    },
    comboField: {
        width: "50%"
    },
    cardContent: {
        display: "flex"
    }
});


// const configuration = {
//     feed_id: this.props.id,
//     name: "jemoeder",
//     resolution: "8k Mega HD",
//     detection_types: ["person"],
//     drawables: ""
// };


const mapStateToProps = state => ({
    config: state.sources.config
});

const mapDispatch = { LoadConfig, SaveConfig }

class Configuration extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.saveConfiguration = this.saveConfiguration.bind(this);

        this.configuration = {
            feed_id: this.props.match.params.id,
            name: "",
            resolution: "",
            detection_types: [],
            drawables: ""
        };

        this.state = {
            D: false,
            BB: false,
            CLC: false,
            CO: false,
            SOS: false,
            VC: false
            //chipData: [],
            //setChipData: []
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.checked
        });
        this.configuration.detection_types.push(event.target.name)
    };

    handleSelect = (e) => {
        this.setChipData([this.state.chipData, { key: e.target.value, label: e.target.value }]);
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.configuration.name);
        console.log(this.configuration.detection_types);

        this.props.SaveConfig(this.configuration)
        console.log(this.configuration)

    }

    saveConfiguration = (event) => {
        event.preventDefault()
        this.props.SaveConfig(this.configuration)
        console.log(this.configuration)
    };

    render() {
        const { classes } = this.props;

        //Directions, boundary boxes, calculate line cross, count objects, show object speed, visualize centers
        const { D, BB, CLC, CO, SOS, VC } = this.state;

        const id = this.props.match.params.id;
        const detectionOptions = [
            { key: 1, label: "Person" },
            { key: 2, label: "Car" }
        ];
        return (
            <div>
                <Grid container spacing={3} style={{ margin: "1%" }}>
                    <Grid item xs={6}>
                        <Typography variant="h3" className={classes.title}>
                            Configuratie - Camera X
                        </Typography>
                        <Card className={classes.root}>
                            <CardContent className={classes.cardContent}>
                                <form onSubmit={this.handleSubmit} >
                                    <Box className={classes.box}>
                                        <div style={{ display: "inline-block" }}>
                                            <InputLabel className={classes.inputTitle}>
                                                <b>Naam:</b>
                                            </InputLabel>
                                            <Typography
                                                className={classes.title2}
                                                color="textSecondary"
                                                gutterBottom
                                            >
                                                <TextField
                                                    size="normal"
                                                    id="standard-basic"
                                                    value={this.state.value}
                                                    onInput={e => this.configuration.name = e.target.value}
                                                />
                                            </Typography>
                                        </div>
                                        <div style={{ display: "inline-block" }}>
                                            <InputLabel className={classes.inputTitle}>
                                                <b>Locatie:</b>
                                            </InputLabel>
                                            <Typography
                                                className={classes.title2}
                                                color="textSecondary"
                                                gutterBottom
                                            >
                                                <TextField
                                                    size="normal"
                                                    id="standard-basic"
                                                    value={this.state.value}

                                                />
                                            </Typography>
                                        </div>
                                        <div style={{ display: "inline-block" }}>
                                            <InputLabel className={classes.inputTitle}>
                                                <b>Type:</b>
                                            </InputLabel>
                                            <Typography
                                                className={classes.title2}
                                                color="textSecondary"
                                                gutterBottom
                                            >
                                                <TextField
                                                    size="normal"
                                                    id="standard-basic"
                                                    value={this.state.value}
                                                    onInput={e => this.configuration.type = e.target.value}
                                                    disabled
                                                />
                                            </Typography>
                                        </div>
                                        <div style={{ display: "inline-block" }}>
                                            <InputLabel className={classes.inputTitle}>
                                                <b>Resolutie:</b>
                                            </InputLabel>
                                            <Typography
                                                className={classes.title2}
                                                color="textSecondary"
                                                gutterBottom
                                            >
                                                <TextField
                                                    size="normal"
                                                    id="standard-basic"
                                                    value={this.state.value}
                                                    onInput={e => this.configuration.resolution = e.target.value}
                                                    disabled
                                                />
                                            </Typography>
                                        </div>
                                        <div style={{ display: "inline-block" }}>
                                            <InputLabel className={classes.inputTitle}>
                                                <b>Framerate:</b>
                                            </InputLabel>
                                            <Typography
                                                className={classes.title2}
                                                color="textSecondary"
                                                gutterBottom
                                            >
                                                <TextField
                                                    size="normal"
                                                    id="standard-basic"
                                                    value={this.state.value}
                                                    onChange={this.handleChange}
                                                    disabled
                                                />
                                            </Typography>
                                        </div>
                                        <InputLabel className={classes.inputTitle}>
                                            <b>Url:</b>
                                        </InputLabel>
                                        <Typography
                                            className={classes.title}
                                            color="textSecondary"
                                            gutterBottom
                                        >
                                            <TextField
                                                className={classes.textField}
                                                size="normal"
                                                id="standard-basic"
                                                value={this.state.value}
                                                onChange={this.handleChange}
                                                disabled
                                            />
                                        </Typography>
                                        <InputLabel className={classes.inputTitle}>
                                            <b>Selecteer Detecties</b>
                                        </InputLabel>
                                        <TextField
                                            className={classes.comboField}
                                            select
                                            size="normal"
                                            value=""
                                            onChange={(e) => this.handleSelect(e)}
                                        >
                                            {detectionOptions.map((option) => (
                                                <MenuItem key={option.key} value={option.label}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        {/* <ul className={classes.chipControl}>
                                            {this.state.chipData.map((data, index) => {
                                                return (
                                                    <Chip
                                                        className={classes.chip}
                                                        key={data.key + index}
                                                        label={data.label}
                                                        onDelete={this.handleDelete(data)}
                                                        color="primary"
                                                    />
                                                );
                                            })}
                                        </ul> */}
                                        <InputLabel className={classes.inputTitle}>
                                            <b>Detectie Opties</b>
                                        </InputLabel>
                                        <FormControl
                                            component="fieldset"
                                            className={classes.formControl}
                                        >
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={D}
                                                            onChange={this.handleChange}
                                                            name="D"
                                                            style={{
                                                                color: "#4D9D2A"
                                                            }}
                                                        />
                                                    }
                                                    label="Directions"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={BB}
                                                            onChange={this.handleChange}
                                                            name="BB"
                                                            style={{
                                                                color: "#4D9D2A"
                                                            }}
                                                        />
                                                    }
                                                    label="Boundary Boxes"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={CLC}
                                                            onChange={this.handleChange}
                                                            name="CLC"
                                                            style={{
                                                                color: "#4D9D2A"
                                                            }}
                                                        />
                                                    }
                                                    label="Calculate Line Cross"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={CO}
                                                            onChange={this.handleChange}
                                                            name="CO"
                                                            style={{
                                                                color: "#4D9D2A"
                                                            }}
                                                        />
                                                    }
                                                    label="Count Objects"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={SOS}
                                                            onChange={this.handleChange}
                                                            name="SOS"
                                                            style={{
                                                                color: "#4D9D2A"
                                                            }}
                                                        />
                                                    }
                                                    label="Show object speed"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={VC}
                                                            onChange={this.handleChange}
                                                            name="VC"
                                                            style={{
                                                                color: "#4D9D2A"
                                                            }}
                                                        />
                                                    }
                                                    label="Visualize Centers"
                                                />
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.Buttons}
                                                >
                                                    Save
                                        </Button>
                                                <Button
                                                    variant="contained"
                                                    color="default"
                                                    className={classes.Buttons}
                                                >
                                                    Cancel
                                        </Button>
                                            </FormGroup>
                                        </FormControl>
                                    </Box>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h3" className={classes.title}>
                            Camera Preview
                    </Typography>
                        <img src="https://static.dw.com/image/47113704_303.jpg" />
                        <Editor />
                    </Grid>
                </Grid>
            </div>
        );
    };
}

export default withRouter(connect(mapStateToProps, mapDispatch)(withStyles(useStyles)(Configuration)))

