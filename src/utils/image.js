import React from "react";
import One from 'assets/images/1.jpg';
import Two from 'assets/images/2.jpg';
import Three from 'assets/images/3.jpg';
import Four from 'assets/images/4.jpg';
import Five from 'assets/images/5.jpg';
import Six from 'assets/images/6.jpg';
import Seven from 'assets/images/7.jpg';
import Eight from 'assets/images/8.jpg';


const imgIdToPicMapping = (id) => {
    let icon;
    switch (id) {
        case 1:
            icon = One;
        break;
        case 2:
            icon = Two;
        break;
        case 3:
            icon = Three;
        break;
        case 4:
            icon = Four;
        break;
        case 5:
            icon = Five;
        break;
        case 6:
            icon = Six;
        break;
        default:
            icon = "IMG";
        break;
    }
    return icon;
};

export {
  imgIdToPicMapping,
};
