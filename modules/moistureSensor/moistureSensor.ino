#include <Serial.h>

#define capt1 A1
#define capt2 A2
#define capt3 A3

#define vanne1 11

String data;


void setup(){
  Serial.begin(9600);

  pinMode(capt1, INPUT);

  pinMode(vanne1, OUTPUT);
  digitalWrite(vanne1, LOW);
}

void loop()
{
  float sensorValue1 = analogRead(capt1);

  senData();

  if(Serial.avaible())
  {
    receiveData();
  }
  
}

void senData()
{
  Serial.println(sensorValue1);
}

void receiveData()
{
  data = Serial.read();
  // selon la valeur de data on active la sortie vanne1
  if (data.equals("arroser")){
    digitalWrite(vanne1, HIGH);
  }
  if (data.equals("Humide")){
    digitalWrite(vanne1, LOW);
  }
}
