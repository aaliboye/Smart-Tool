
#define wait 5000

void setup(){
  // Init serial port (115200 bauds)  
  Serial.begin(9600);


}

void loop() {
 // put your main code here, to run repeatedly:
 int captZone1 = analogRead(A1);  //humidité sol zone 1
 int captZone2 = analogRead(A2);  //humidité sol zone 2
 int captZone3 = analogRead(A3);  //humidité sol zone 2
 int lumiere = analogRead(A4);  //luminosité tool bi


 Serial.print("{\"CaptZone1\":");
 Serial.print(captZone1);
 Serial.print(",\"CaptZone2\":");
 Serial.print(captZone2);
 Serial.print(",\"CaptZone3\":");
 Serial.print(captZone3);
 Serial.print(",\"Luminosite\":");
 Serial.print(lumiere);

 Serial.println("}");
 delay(wait);

 if(captZone1 >1000){
    digitalWrite(11, LOW);
 }
  if(captZone2 >1000){
    digitalWrite(12, LOW);
 }
  if(captZone3 >1000){
    digitalWrite(13, LOW);
 }


  if (Serial.available()) {  
      String command = Serial.readString();
      if (command == "ON" && captZone1 < 980) {  
         digitalWrite(11, HIGH);
      }
      else if (command == "OFF" && captZone1 > 300) { 
         digitalWrite(11, LOW);
      }
      else if (command == "ON2") { 
         digitalWrite(12, HIGH);
      }
      else if (command == "OFF2") { 
         digitalWrite(12, LOW);
      }
      else if (command == "ON3") { 
         digitalWrite(13, HIGH);
      }
      else if (command == "OFF3") { 
         digitalWrite(13, LOW);
      }

   }
}
