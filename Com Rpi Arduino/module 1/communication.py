import serial

if __name__ == '__main__':

    ser = serial.Serial('/dev/ttyACM1', 9600, timeout=1)
    ser.flush()

    while True:
        if ser.in_waiting > 0:
            sensorValue = ser.read().decode('utf-8').rstrip()
             # on envoie la valeur dans le cloud
             
            if float(sensorValue < 300):
               
                # if user demande a arooser: ser.write(b"soif")
    
            else if float(sensorValue > 600):
                ser.write(b"humide")
            
            else:
                # if user demande a arooser: ser.write(b"intermediaire")
                
