/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

export default function Die(props) {
    //Variable to decide which backgrounColor should be used
    //depending whether the die is held or not
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div className="die-face" style={styles} onClick={props.holdDice}>
            <h1 className="die-num">{props.value}</h1>
        </div>
    )
}