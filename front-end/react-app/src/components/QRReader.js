import { Html5QrcodeScanner } from "html5-qrcode";
import React from 'react';

const qrcodeRegionId = "html5qr-code-full-region";

//reader code from https://github.com/mebjas/html5-qrcode
//WE DO NOT CLAIM THIS CODE TO BE OURS
//ALL CODE BELOW IS REQUIRED FOR QR SCANNING TO WORK. WE HAVE IMPLEMENTED IT FROM A LIBRARY
class QRReader extends React.Component {
    render() {
        return <div id={qrcodeRegionId} />;
    }

    componentWillUnmount() {
    
        this.html5QrcodeScanner.clear().catch(error => {
            console.error("Failed to clear html5QrcodeScanner. ", error);
        });
    }

    componentDidMount() {
        // Creates the configuration object for Html5QrcodeScanner.
        function createConfig(props) {
            //set the config variables
            var config = {};
            if (props.fps) {
                config.fps = props.fps;
            }
            if (props.qrbox) {
                config.qrbox = props.qrbox;
            }
            if (props.aspectRatio) {
                config.aspectRatio = props.aspectRatio;
            }
            if (props.disableFlip !== undefined) {
                config.disableFlip = props.disableFlip;
            }
            return config;
        }

        //create the cibfug
        var config = createConfig(this.props);
        var verbose = this.props.verbose === true;

        //callback is required.
        if (!(this.props.qrCodeSuccessCallback )) {
            throw "qrCodeSuccessCallback is required callback.";
        }

        //create new reader
        this.html5QrcodeScanner = new Html5QrcodeScanner(
            qrcodeRegionId, config, verbose);

            //renders the component
        this.html5QrcodeScanner.render(
            this.props.qrCodeSuccessCallback,
            this.props.qrCodeErrorCallback);
    }

};

export default QRReader;