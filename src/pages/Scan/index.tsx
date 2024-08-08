import { useEffect, useRef, useState } from "react";

// Styles
import "./QrStyles.css";

// Qr Scanner
import QrScanner from "qr-scanner";
import { WithLayout } from "../../components/Wrapper/WithLayout";
import QrFrame from "../../assets/icons/qr-frame.svg";
import QrFrameError from "../../assets/icons/qr-frame-error.svg";

import { Option } from "../../services/model";
import MRegisterApiService from "../../services/MRegisterApiService";

const QrReader = () => {
  // QR States
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);
  const [scannerError, setScannerError] = useState(false);
  const [values, setValues] = useState<{
    id: number | undefined;
    companyName: string;
    companyGovernmentNumber: string;
    emailAddress: string;
    industry: Option[];
    categories: Option[];
    directorsName: string;
    directorsEmail: string;
    description: string;
    password: string;
    confirmPassword: string;
    masterPassword: string;
    profilePicture: ArrayBuffer | string | undefined;
  }>({
    id: undefined,
    companyName: "",
    companyGovernmentNumber: "",
    emailAddress: "",
    industry: [],
    categories: [],
    directorsName: "",
    directorsEmail: "",
    description: "",
    password: "",
    confirmPassword: "",
    masterPassword: "",
    profilePicture: "",
  });
  // Result
  const [scannedResult, setScannedResult] = useState<string | undefined>("");

  // Success
  const onScanSuccess = (result: QrScanner.ScanResult) => {
    setScannedResult(result?.data);
  };

  const onScanFail = (err: string | Error) => {
    console.log(err);

    // setScannerError(true);
  };
  useEffect(() => {
    (async () => {
      MRegisterApiService.getCompanyProfile()
        .then((res) => {
          setValues({
            ...values,
            id: res.data.id,
            companyName: res.data.company_name,
            companyGovernmentNumber: res.data.company_government_number,
            emailAddress: res.data.email,
            directorsName: res.data.directors_name,
            directorsEmail: res.data.director_email,
            description: res.data.description,
            profilePicture: `https://staging-resources.meattend.com/${res.data.address_proof_image}`,
          });
        })
        .catch((e) => console.log(e));
    })();
  }, []);
  useEffect(() => {
    console.log(scannedResult, "....");

    const data = {
      discount_code: scannedResult,
    };
    if (!scannedResult) return;

    (async () => {
      MRegisterApiService.getScannerCode(data)
        .then((res: any) => {
          if (res?.data?.success) {
            saveDiscountCode();
            setScannerError(false);
          } else {
            setScannerError(true);
          }
        })
        .catch((e) => {
          console.log(e);
          setScannerError(true);
        });
    })();
  }, [scannedResult]);
  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      // 👉 Instantiate the QR Scanner
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        // 📷 This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
        preferredCamera: "environment",
        // 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
        highlightScanRegion: true,
        // 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
        highlightCodeOutline: true,
        // 📦 A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
        overlay: qrBoxEl?.current || undefined,
      });

      // 🚀 Start QR Scanner
      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    // 🧹 Clean up on unmount.
    // 🚨 This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  // ❌ If "camera" is not allowed in browser permissions, show an alert.
  useEffect(() => {
    if (!qrOn)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
  }, [qrOn]);
  function saveDiscountCode() {
    const data = {
      discount_code: scannedResult,
      company_id: values.id,
    };
    MRegisterApiService.saveDiscountCode(data)
      .then((res: any) => {
        if (res.status === 200) {
          alert("successfully saved discount code");
        }
      })
      .catch((e) => console.log(e));
  }
  return (
    <div className="qr-reader">
      {/* QR */}
      <video ref={videoEl}></video>
      <div ref={qrBoxEl} className="qr-box">
        <img
          src={scannerError ? QrFrameError : QrFrame}
          alt="Qr Frame"
          width={256}
          height={256}
          className="qr-frame"
          style={{ fill: "red" }}
        />
      </div>

      {/* Show Data Result if scan is success */}
      {/* {scannedResult && (
        <p
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            zIndex: 99999,
            color: "white",
          }}
        >
          Scanned Result: {scannedResult}
        </p>
      )} */}
    </div>
  );
};

export default WithLayout(QrReader);
