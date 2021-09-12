import serial
import os
import time
import sys
import paho.mqtt.client as mqtt
import json


SERVEUR = '192.168.1.16'
# ACCESS_TOKEN = 'DHT22_DEMO_TOKEN'

# Data capture and upload interval in seconds. Less interval will eventually hang the DHT22.
INTERVAL=5

sensor_data = {'humidity': 0}

next_reading = time.time()

client = mqtt.Client()

# Set access token
# client.username_pw_set(ACCESS_TOKEN)

# Connect to ThingsBoard using default MQTT port and 60 seconds keepalive interval
client.connect(SERVEUR, 1883, 60)

client.loop_start()

if __name__ == '__main__':

    ser = serial.Serial('/dev/ttyACM1', 9600, timeout=1)
    ser.flush()

    while True:
        if ser.in_waiting > 0:
            sensorValue = ser.readline().decode('utf-8').rstrip()
             # on envoie la valeur vers le broker
             sensor_data['humidity'] = float(sensorValue)

             client.publish('test_channel', json.dumps(sensor_data), 1)

             #le broker doit l'envoie vers le cloud

            next_reading += INTERVAL
            sleep_time = next_reading-time.time()
            if sleep_time > 0:
                time.sleep(sleep_time)


            # if user demande a aroose:
             
                if float(sensorValue < 300):
                    ser.write(b"arroser\n")
    
                else if float(sensorValue > 600):
                    ser.write(b"humide\n")
            
                else:
                    ser.write(b"arroser\n")

            client.loop_stop()
            client.disconnect()
                
