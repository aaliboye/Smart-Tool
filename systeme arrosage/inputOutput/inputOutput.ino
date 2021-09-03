
#define capt1 A1
#define capt2 A2
#define capt3 A3

#define vanne1 11
#define vanne2 12
#define vanne3 13

void setup(){

  pinMode(capt1, INPUT);
  pinMode(capt2, INPUT);
  pinMode(capt3, INPUT);
  pinMode(vanne1, OUTPUT);
  digitalWrite(vanne1, LOW);
  pinMode(vanne2, OUTPUT);
  digitalWrite(vanne2, LOW);
  pinMode(vanne3, OUTPUT);
  digitalWrite(vanne3, LOW);
}

void loop(){
  int sensorValue1 = analogRead(capt1);
  int sensorValue2= analogRead(capt2);
  int sensorValue3 = analogRead(capt3);
  int min = 500;
  int max =1023;
  bool etat1 = etatSol(min, max, sensorValue1);
  bool etatZ = etatSol(min, max, sensorValue2);
  bool etat3 = etatSol(min, max, sensorValue3);

  action(etat1);
  action(etat1);
  action(etat1);
  
}

bool etatSol(int min, int max, int sensorValue)
{
  if(sensorValue <= min){
   //terre a soif 
    return true;
  }
  else if(sensorValue >= max)
  {
   //terre humide  
    return false;
  }
  else{
   //terre moins humide
    return true;
  }
}

void action(bool etat)
{
  if(etat){
    //action par l'utilisateur
  }
  else
  {
    //Arret de l'arrosage
  }
}
