#include <WiFiNINA.h>
#include "Firebase_Arduino_WiFiNINA.h"
#include <ArduinoJson.h>

char ssid[] = "Moksh";
char pass[] = "1234567890";

// Firebase project details
const String firebase_host = "embedded-system-6f5ea-default-rtdb.asia-southeast1.firebasedatabase.app";
const String firebase_auth = "AIzaSyBTCay-m3qsx28sYzNAR_Wl-bW1Btw096c";

// LED pins
const int led1 = 12;
const int led2 = 11;
const int led3 = 10;

FirebaseData firebaseData;

String led1p = "button-Data/led1";
String led2p = "button-Data/led2";
String led3p = "button-Data/led3";
WiFiClient wifiClient;




void setup() {
  Serial.begin(9600);

  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);
  pinMode(led3, OUTPUT);

  connectToWiFi();

  Firebase.begin(firebase_host, firebase_auth, ssid, pass);
  Firebase.reconnectWiFi(true);

  SetLEDState(led1p, "0");
  SetLEDState(led2p, "0");
  SetLEDState(led3p, "0");

}

void loop() {
  String led1state = getLEDState(led1p);
  String led2state = getLEDState(led2p);
  String led3state = getLEDState(led3p); 

  controlLED(1, led1state);
  controlLED(2, led2state);
  controlLED(3, led3state);

}

void connectToWiFi() {
  Serial.print("Attempting to connect to ");
  Serial.println(ssid);

  while (WiFi.begin(ssid, pass) != WL_CONNECTED) {
    Serial.print(".");
    delay(1000);
  }

  Serial.println("Connected to WiFi!");
}

void SetLEDState(String path, String state){
  if(Firebase.setString(firebaseData, path, state)){
    Serial.print("Firebase State set to :");
    Serial.println(state);
  }
  else{
    Serial.print("Error: ");
    Serial.println(firebaseData.errorReason());
  }
}

String getLEDState(String path){
  if(Firebase.getString(firebaseData, path)){
    return firebaseData.stringData();
  }
  else{
    Serial.print("Error: ");
    Serial.println(firebaseData.errorReason());
    return "Error";
  }
}

void controlLED(int var, String state){
  int s;
  if(state == "1"){
    s = 1;
  }
  else{
    s = 0;
  }
  if (var == 1){
    digitalWrite(led1, s);
  }
  else if (var == 2){
    digitalWrite(led2, s);
  }
  else if (var == 3){
    digitalWrite(led3, s);
  }
}
