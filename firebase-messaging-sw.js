import { messaging } from "./src/backend/firebaseconfig";

messaging
  .getToken({
    vapidKey:
      "BKQX3quHdbA8q3Aaf5_tMmM6JBkl2X3GYZpRD6e-r70Y1Eo2puCgluh42_xF-3hebZSKNOwTRgstaHXr1MTcOlM",
  })
  .then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      //
      console.log("token", currentToken);
    } else {
      // Show permission request UI
      console.log(
        "No registration token available. Request permission to generate one."
      );
      // ...
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
    // ...
  });
