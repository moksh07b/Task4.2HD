import { database } from "./firebase";
import { useEffect, useState } from "react";
import Circle from "./Circle";
import { onValue, ref, set } from "firebase/database";

export default function ChangeButton() {
  const [led1val, setLED1] = useState("0");
  const [led2val, setLED2] = useState("0");
  const [led3val, setLED3] = useState("0");

  // Fetching current values from Firebase on component mount
  useEffect(() => {
    const dataRef = ref(database, "button-Data");

    onValue(dataRef, (snapshot) => {
      const firebaseData = snapshot.val();

      if (firebaseData) {
        setLED1(firebaseData.led1);
        setLED2(firebaseData.led2);
        setLED3(firebaseData.led3);
      }
    });
  }, []);

  // Function to update Firebase with the current state values
  function updateFirebase(newLed1, newLed2, newLed3) {
    const buttonData = {
      led1: newLed1,
      led2: newLed2,
      led3: newLed3,
    };

    const dataRef = ref(database, "button-Data");
    set(dataRef, buttonData);
  }

  // Handling the LED changes and updating both state and Firebase
  function handleLEDChange(ledName, newValue) {
    let newLed1 = led1val;
    let newLed2 = led2val;
    let newLed3 = led3val;

    switch (ledName) {
      case "Red LED":
        newLed1 = newValue ? "1" : "0";
        setLED1(newLed1);
        break;
      case "Green LED":
        newLed2 = newValue ? "1" : "0";
        setLED2(newLed2);
        break;
      case "Yellow LED":
        newLed3 = newValue ? "1" : "0";
        setLED3(newLed3);
        break;
      default:
        break;
    }    
    updateFirebase(newLed1, newLed2, newLed3);
}

  return (
    <div>
      <Circle 
        color="red" 
        size="100px" 
        onClick={() => handleLEDChange("Red LED", led1val === "0")} 
        isGlowing={led1val === "1"} 
      />
      <Circle 
        color="green" 
        size="100px" 
        onClick={() => handleLEDChange("Green LED", led2val === "0")} 
        isGlowing={led2val === "1"} 
      />
      <Circle 
        color="yellow" 
        size="100px" 
        onClick={() => handleLEDChange("Yellow LED", led3val === "0")} 
        isGlowing={led3val === "1"} 
      />
    </div>
  );
}
