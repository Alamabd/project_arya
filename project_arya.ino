#include <SPI.h>
#include <MFRC522.h>
#include <Servo.h>
#include <LiquidCrystal.h>

#define SS_PIN 10
#define RST_PIN 9

LiquidCrystal lcd(14, 15, 16, 17, 18, 19);

MFRC522 rfid(SS_PIN, RST_PIN);  // Instance

Servo servo3;
Servo servo4;
const int buttonPin = 2;
int buttonState = 0;

const int trigPin = 5;
const int echoPin = 6;

void setup() {
  Serial.begin(9600);   // Serial monitor
  SPI.begin();          // Init SPI bus
  rfid.PCD_Init();      // Init RC522

  pinMode(buttonPin, INPUT_PULLUP);
  Serial.begin(9600);
  servo3.attach(3);
  servo4.attach(4);
  servo3.write(0);
  servo4.write(180);

  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

  lcd.begin(16, 2);
  lcd.print("Arya Project");
}

void loop() {
  
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  long duration = pulseIn(echoPin, HIGH);
  int distance = duration * 0.034 / 2;
  delay(50);

//  Serial.println(distance);
  
  if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()) {
    String uuid = "";
    for (byte i = 0; i < rfid.uid.size; i++) {
      uuid += (rfid.uid.uidByte[i] < 0x10 ? "0" : "");
      uuid += (rfid.uid.uidByte[i], HEX);
    }
    Serial.print(uuid);
    Serial.println();  // Kirim UID ke serial
    servo4.write(90);
    lcd.clear();
    lcd.print("Hati2 dijalan");
    lcd.setCursor(0, 1);
    lcd.print("cantikk");
    delay(5000);
    servo4.write(180);
    delay(2000);
    lcd.clear();
    lcd.print("Lakukan");
    lcd.setCursor(0, 1);
    lcd.print("Pembayaran");
  }

  buttonState = digitalRead(buttonPin);
  if(buttonState == LOW) {
    if(distance <= 5) {
      servo3.write(90);
    }
  } else {
    if(distance >= 10) {
      delay(1000);
      servo3.write(0);
    }
  }


  if (Serial.available()) {
    String cmd = Serial.readStringUntil('\n');
    lcd.clear();
    lcd.print(cmd);
    if(cmd == "PAYMENT_SUCCESS") {
      servo4.write(90);
      delay(3000);
      servo4.write(180);
    }
    delay(2000);
    lcd.clear();
    lcd.print("Lakukan");
    lcd.setCursor(0, 1);
    lcd.print("Pembayaran");
  }
}
