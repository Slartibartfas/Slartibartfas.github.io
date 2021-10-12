/*
Instrumentennummern:
 0  - Violine 1
 1  - Violine 2
 2  - Viola
 3  - Violoncello
 4  - Flöte
 5  - Oboe
 6  - Klarinette
 7  - Fagott
 8  - Horn
 9  - Trompete
 10 - Posaune
 11 - Tuba
 12 - Harfe
 13 - Trommel
 14 - Pauken
 15 - Kontrabass
 */

// Variablen

// Sound
var amp;

// Anzahl benötigter lebender Nachbarn, um eine tote Zelle wiederzubeleben
var livingNeighborsForDeadCell;
// Mindestanzahl lebender Nachbarn, um zu überleben
var leastLivingNeighbors;
// Maximalzahl lebender Nachbarn, um zu überleben
var mostLivingNeighbors;

// Festlegung der Nachbarn jedes Instruments
var neighbors;

// Anzeige, ob das jeweilige Instrument aktiv ist
var alive, alive_update;

// Zeigt an, wie viele Instrumente aktiv sind
var aliveSum;

// Bilder
var img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15;

// Anzeige, ob gestartet wurde
var started;

// Längen der einzelnen Abschnitte in ms
var sectionLengths;
var section;

// Sound-Dateien
var violin1FileNames, violin2FileNames, violaFileNames, violoncelloFileNames, fluteFileNames, oboeFileNames, clarinetFileNames, bassoonFileNames, hornFileNames, trumpetFileNames, tromboneFileNames, tubaFileNames, harpFileNames, drumFileNames, timpaniFileNames, doublebassFileNames;
var violin1Sounds, violin2Sounds, violaSounds, violoncelloSounds, fluteSounds, oboeSounds, clarinetSounds, bassoonSounds, hornSounds, trumpetSounds, tromboneSounds, tubaSounds, harpSounds, drumSounds, timpaniSounds, doublebassSounds;

// Gewählter Abschnitt
var chosenPassage;

// Wartezeit
var startingTime;
var startingTimeChosen;

// Buttons
var startStopButtonFlashCounter;
var resetButtonFlashCounter;



function preload() {  
  print("Loading...");
  
  // Laden der Bilder
  img2 = loadImage("Bilder/violin.png");
  img3 = loadImage("Bilder/cello.png");
  img4 = loadImage("Bilder/flute.png");
  img5 = loadImage("Bilder/oboe.png");
  img6 = loadImage("Bilder/clarinet.png");
  img7 = loadImage("Bilder/bassoon.png");
  img8 = loadImage("Bilder/horn.png");
  img9 = loadImage("Bilder/trumpet.png");
  img10 = loadImage("Bilder/trombone.png");
  img11 = loadImage("Bilder/tuba.png");
  img12 = loadImage("Bilder/harp.png");
  img13 = loadImage("Bilder/snare_top.png");
  img14 = loadImage("Bilder/timpani.png");
  img15 = loadImage("Bilder/double_bass.png");

  // Laden der Sounds
  violin1FileNames = ["A_1_1", "A_1_2", "A_1_3", "A_2_1", "A_2_2", "A_2_3", "B_1_1", "B_1_2", "B_1_3", "B_2_1", "B_2_2", "B_2_3", "Z_1"];
  violin1Sounds = [];
  violin2FileNames = ["A_1_1", "A_1_2", "A_1_3", "A_2_1", "A_2_2", "A_2_3", "B_1_1", "B_1_2", "B_1_3", "B_2_1", "B_2_2", "B_2_3", "Z_1", "Z_2", "Z_3", "Z_4"];
  violin2Sounds = [];
  violaFileNames = ["A_1_1", "A_1_2", "A_2_1", "A_2_2", "B_1_1", "B_1_2", "B_1_3", "B_2_1", "B_2_2", "B_2_3", "Z_1", "Z_2", "Z_3"];
  violaSounds = [];
  violoncelloFileNames = ["A_1_1", "A_1_2", "A_1_3", "A_2_1", "A_2_2", "A_2_3", "B_1_1", "B_1_2", "B_2_1", "B_2_2", "Z_1", "Z_2"];
  violoncelloSounds = [];
  fluteFileNames = ["A_1_1", "A_1_2", "A_2_1", "A_2_2", "B_1_1", "B_1_2", "B_2_1", "B_2_2", "Z_1", "Z_2"];
  fluteSounds = [];
  oboeFileNames = ["A_1_1", "A_1_2", "A_1_3", "A_2_1", "A_2_2", "A_2_3", "B_1_1", "B_1_2", "B_1_3", "B_2_1", "B_2_2", "B_2_3", "Z_1", "Z_2"];
  oboeSounds = [];
  clarinetFileNames = ["A_1_1", "A_1_2", "A_1_3", "A_2_1", "A_2_2", "A_2_3", "B_1_1", "B_1_2", "B_2_1", "B_2_2", "Z_1", "Z_2"];
  clarinetSounds = [];
  bassoonFileNames = ["A_1_1", "A_1_2", "A_2_1", "A_2_2", "B_1_1", "B_1_2", "B_1_3", "B_2_1", "B_2_2", "B_2_3", "Z_1", "Z_2"];
  bassoonSounds = [];
  hornFileNames = ["A_1_1", "A_1_2", "A_2_1", "A_2_2", "B_1_1", "B_1_2", "B_2_1", "B_2_2", "Z_1", "Z_2"];
  hornSounds = [];
  trumpetFileNames = ["A_1_1", "A_1_2", "A_2_1", "A_2_2", "B_1_1", "B_1_2", "B_2_1", "B_2_2", "Z_1", "Z_2"];
  trumpetSounds = [];
  tromboneFileNames = ["A_1", "A_2", "B_1_1", "B_1_2", "B_2_1", "B_2_2", "Z_1", "Z_2"];
  tromboneSounds = [];
  tubaFileNames = ["A_1", "A_2", "B_1_1", "B_1_2", "B_2_1", "B_2_2", "Z_1", "Z_2"];
  tubaSounds = [];
  harpFileNames = ["A_1_1", "A_1_2", "A_2_1", "A_2_2", "B_1_1", "B_1_2", "B_2_1", "B_2_2", "Z_1", "Z_2"];
  harpSounds = [];
  drumFileNames = ["A_B", "Z"];
  drumSounds = [];
  timpaniFileNames = ["A_B", "Z"];
  timpaniSounds = [];
  doublebassFileNames = ["A_B", "Z"];
  doublebassSounds = [];
  
  amp = [0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.5, 0.4, 0.5, 0.5, 0.7, 1.0, 0.5, 0.6];

  for (var i = 0; i < violin1FileNames.length; i++) {
    violin1Sounds[i] = loadSound("Sound/Violine1/Violine1_" + violin1FileNames[i] + ".mp3");
    violin1Sounds[i].setVolume(amp[0]);
  }
  for (var i = 0; i < violin2FileNames.length; i++) {
    violin2Sounds[i] = loadSound("Sound/Violine2/Violine2_" + violin2FileNames[i] + ".mp3");
    violin2Sounds[i].setVolume(amp[1]);
  }
  for (var i = 0; i < violaFileNames.length; i++) {
    violaSounds[i] = loadSound("Sound/Viola/Viola_" + violaFileNames[i] + ".mp3");
    violaSounds[i].setVolume(amp[2]);
  }
  for (var i = 0; i < violoncelloFileNames.length; i++) {
    violoncelloSounds[i] = loadSound("Sound/Violoncello/Violoncello_" + violoncelloFileNames[i] + ".mp3");
    violoncelloSounds[i].setVolume(amp[3]);
  }
  for (var i = 0; i < fluteFileNames.length; i++) {
    fluteSounds[i] = loadSound("Sound/Floete/Floete_" + fluteFileNames[i] + ".mp3");
    fluteSounds[i].setVolume(amp[4]);
  }
  for (var i = 0; i < oboeFileNames.length; i++) {
    oboeSounds[i] = loadSound("Sound/Oboe/Oboe_" + oboeFileNames[i] + ".mp3");
    oboeSounds[i].setVolume(amp[5]);
  }
  for (var i = 0; i < clarinetFileNames.length; i++) {
    clarinetSounds[i] = loadSound("Sound/Klarinette/Klarinette_" + clarinetFileNames[i] + ".mp3");
    clarinetSounds[i].setVolume(amp[6]);
  }
  for (var i = 0; i < bassoonFileNames.length; i++) {
    bassoonSounds[i] = loadSound("Sound/Fagott/Fagott_" + bassoonFileNames[i] + ".mp3");
    bassoonSounds[i].setVolume(amp[7]);
  }
  for (var i = 0; i < hornFileNames.length; i++) {
    hornSounds[i] = loadSound("Sound/Horn/Horn_" + hornFileNames[i] + ".mp3");
    hornSounds[i].setVolume(amp[8]);
  }
  for (var i = 0; i < trumpetFileNames.length; i++) {
    trumpetSounds[i] = loadSound("Sound/Trompete/Trompete_" + trumpetFileNames[i] + ".mp3");
    trumpetSounds[i].setVolume(amp[9]);
  }
  for (var i = 0; i < tromboneFileNames.length; i++) {
    tromboneSounds[i] = loadSound("Sound/Posaune/Posaune_" + tromboneFileNames[i] + ".mp3");
    tromboneSounds[i].setVolume(amp[10]);
  }
  for (var i = 0; i < tubaFileNames.length; i++) {
    tubaSounds[i] = loadSound("Sound/Tuba/Tuba_" + tubaFileNames[i] + ".mp3");
    tubaSounds[i].setVolume(amp[11]);
  }
  for (var i = 0; i < harpFileNames.length; i++) {
    harpSounds[i] = loadSound("Sound/Harfe/Harfe_" + harpFileNames[i] + ".mp3");
    harpSounds[i].setVolume(amp[12]);
  }
  for (var i = 0; i < drumFileNames.length; i++) {
    drumSounds[i] = loadSound("Sound/Trommel/Trommel_" + drumFileNames[i] + ".mp3");
    drumSounds[i].setVolume(amp[13]);
  }
  for (var i = 0; i < timpaniFileNames.length; i++) {
    timpaniSounds[i] = loadSound("Sound/Pauken/Pauken_" + timpaniFileNames[i] + ".mp3");
    timpaniSounds[i].setVolume(amp[14]);
  }
  for (var i = 0; i < doublebassFileNames.length; i++) {
    doublebassSounds[i] = loadSound("Sound/Kontrabass/Kontrabass_" + doublebassFileNames[i] + ".mp3");
    doublebassSounds[i].setVolume(amp[15]);
  }
  
  print("Finished loading Sounds");
}



function setup() {
  print("Starting Setup...");
  
  createCanvas(1200, 1000);
  frameRate(30);
  textSize(40);
  textAlign(CENTER, CENTER);

  // Festlegung von Parametern
  
  livingNeighborsForDeadCell = 2;
  leastLivingNeighbors = 1;
  mostLivingNeighbors = 2;

  neighbors = [ [1, 3, 4, 5, 6, 11], 
                [0, 2, 5, 6, 7, 8], 
                [1, 3, 7, 8, 9, 10], 
                [0, 2, 4, 9, 10, 11], 
                [0, 3, 5, 11, 12, 15], 
                [0, 1, 4, 6, 12, 13], 
                [0, 1, 5, 7, 12, 13], 
                [1, 2, 6, 8, 13, 14], 
                [1, 2, 7, 9, 13, 14], 
                [2, 3, 8, 10, 14, 15], 
                [2, 3, 9, 11, 14, 15], 
                [0, 3, 4, 10, 12, 15], 
                [4, 5, 6, 11, 13, 15], 
                [5, 6, 7, 8, 12, 14], 
                [7, 8, 9, 10, 13, 15], 
                [4, 9, 10, 11, 12, 14]  ];
                
  // Die Zeitverzögerung steht am Anfang der Schleife, somit muss ein siebter Abschnitt
  // von 0ms eingefügt werden, um direkt zum ersten Abschnitt zu springen
  // Tempo 80 Bpm -> 1 Schlag = 750ms
  // Abschnitte: 2 Takte - 8 Takte - 8 Takte - 2 Takte - 8 Takte - 8 Takte (3/4-Takt)
  sectionLengths = [4500, 18000, 18000, 4500, 18000, 18000, 0];
  section = 6;

  // Startwerte für Variablen

  alive = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  alive_update = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  aliveSum = 0;

  started = false;

  startingTime = 0;
  startingTimeChosen = false;

  startStopButtonFlashCounter = 6;
  resetButtonFlashCounter = 6;
  
  print("Finished Setup.");
}



function draw() {
  
  // Zeichnen von Start/Stopp- und Reset-Button
  
  startStopButtonFlashCounter += 1;
  resetButtonFlashCounter += 1;
  
  // Buttons sollen nach Betätigung für 5 frames aufleuchten
  if (startStopButtonFlashCounter <= 5) {
    fill("red");
  } else {
    fill(255);
  }
  rect((width - (width - height)) + 50, height / 2 - 100, 150, 50);
  
  if (resetButtonFlashCounter <= 5) {
    fill("red");
  } else {
    fill(255);
  }
  rect((width - (width - height)) + 50, height / 2 + 50, 150, 50);
  
  // Beschriftung der Buttons
  fill(0);
  text("Reset", (width - (width - height)) + 125, height / 2 + 75);
  if (started) {
    text("Stopp", (width - (width - height)) + 125, height / 2 - 75);
  } else {
    text("Start", (width - (width - height)) + 125, height / 2 - 75);
  }

  if (startingTimeChosen == false) {
    // Algorithmus ist fertig mit warten, braucht also eine neue Anfangszeit
    startingTime = millis();
    startingTimeChosen = true;
  } else {
    // Überprüfung, ob aktuell gültige Wartezeit vorbei ist
    if (millis() >= (startingTime + sectionLengths[section])) {
      
      fill(255);
      
      // Grundstruktur zeichnen
      circle((width - (width - height)) / 2, height / 2, 800);
      circle((width - (width - height)) / 2, height / 2, 550);
      circle((width - (width - height)) / 2, height / 2, 300);
      circle((width - (width - height)) / 2, height / 2, 50);
    
      image(img2, 400, 540); // Violine 1
      image(img2, 400, 396); // Violine 2
      image(img2, 530, 396, 70, 70); // Viola
      image(img3, 530, 540); // Violoncello
      image(img4, 380, 660); // Flöte
      image(img5, 290, 540); // Oboe
      image(img6, 290, 380); // Klarinette
      image(img7, 400, 250); // Fagott
      image(img8, 550, 270); // Horn
      image(img9, 660, 390); // Trompete
      image(img10, 660, 560); // Posaune
      image(img11, 550, 660); // Tuba
      image(img12, 236, 700); // Harfe
      image(img13, 236, 235); // Trommel
      image(img14, 700, 235); // Pauken
      image(img15, 700, 700); // Kontrabass
    
      translate((width - (width - height)) / 2, height / 2);
    
      // Zeichnen der Trennlinien
      for (var i = 0; i < 4; i++) {
        line(0, -25, 0, -400);
        rotate(PI / 4);
        line(0, -150, 0, -275);
        rotate(PI / 4);
      }
    
      // Markierung der jeweiligen Zelle, wenn ein Instrument aktiv ist
      if (alive[0] == 1) {
        createRingSegment(90, 180, 26, 150);
        aliveSum += 1;
      }
      if (alive[1] == 1) {
        createRingSegment(180, 270, 26, 150);
        aliveSum += 1;
      }
      if (alive[2] == 1) {
        createRingSegment(270, 360, 26, 150);
        aliveSum += 1;
      }
      if (alive[3] == 1) {
        createRingSegment(0, 90, 26, 150);
        aliveSum += 1;
      }
      if (alive[4] == 1) {
        createRingSegment(90, 135, 151, 275);
        aliveSum += 1;
      }
      if (alive[5] == 1) {
        createRingSegment(135, 180, 151, 275);
        aliveSum += 1;
      }
      if (alive[6] == 1) {
        createRingSegment(180, 225, 151, 275);
        aliveSum += 1;
      }
      if (alive[7] == 1) {
        createRingSegment(225, 270, 151, 275);
        aliveSum += 1;
      }
      if (alive[8] == 1) {
        createRingSegment(270, 315, 151, 275);
        aliveSum += 1;
      }
      if (alive[9] == 1) {
        createRingSegment(315, 360, 151, 275);
        aliveSum += 1;
      }
      if (alive[10] == 1) {
        createRingSegment(0, 45, 151, 275);
        aliveSum += 1;
      }
      if (alive[11] == 1) {
        createRingSegment(45, 90, 151, 275);
        aliveSum += 1;
      }
      if (alive[12] == 1) {
        createRingSegment(90, 180, 276, 400);
        aliveSum += 1;
      }
      if (alive[13] == 1) {
        createRingSegment(180, 270, 276, 400);
        aliveSum += 1;
      }
      if (alive[14] == 1) {
        createRingSegment(270, 360, 276, 400);
        aliveSum += 1;
      }
      if (alive[15] == 1) {
        createRingSegment(0, 90, 276, 400);
        aliveSum += 1;
      }
    
      // Eigentlicher Algorithmus (nur aktiv, wenn gestartet wurde und noch Instrumente aktiv sind)
      if (started) {
        
        // gehe zum nächsten Abschnitt
        section += 1;
        if (section > 5) {
          section = 0;
        }
    
        if (aliveSum > 0) {
          // Abspielen der Sounds
    
          print("---------------------------");
          print("Abschnitt " + (section + 1));
          print("---------------------------");
    
          if (alive[0] == 1) {
            chosenPassage = calcChosenPassage(section, violin1FileNames);
            violin1Sounds[chosenPassage].play();
            print("Violine 1 spielt");
          }
          if (alive[1] == 1) {
            chosenPassage = calcChosenPassage(section, violin2FileNames);
            violin2Sounds[chosenPassage].play();
            print("Violine 2 spielt");
          }
          if (alive[2] == 1) {
            chosenPassage = calcChosenPassage(section, violaFileNames);
            violaSounds[chosenPassage].play();
            print("Viola spielt");
          }
          if (alive[3] == 1) {
            chosenPassage = calcChosenPassage(section, violoncelloFileNames);
            violoncelloSounds[chosenPassage].play();
            print("Violoncello spielt");
          }
          if (alive[4] == 1) {
            chosenPassage = calcChosenPassage(section, fluteFileNames);
            fluteSounds[chosenPassage].play();
            print("Flöte spielt");
          }
          if (alive[5] == 1) {
            chosenPassage = calcChosenPassage(section, oboeFileNames);
            oboeSounds[chosenPassage].play();
            print("Oboe spielt");
          }
          if (alive[6] == 1) {
            chosenPassage = calcChosenPassage(section, clarinetFileNames);
            clarinetSounds[chosenPassage].play();
            print("Klarinette spielt");
          }
          if (alive[7] == 1) {
            chosenPassage = calcChosenPassage(section, bassoonFileNames);
            bassoonSounds[chosenPassage].play();
            print("Fagott spielt");
          }
          if (alive[8] == 1) {
            chosenPassage = calcChosenPassage(section, hornFileNames);
            hornSounds[chosenPassage].play();
            print("Horn spielt");
          }
          if (alive[9] == 1) {
            chosenPassage = calcChosenPassage(section, trumpetFileNames);
            trumpetSounds[chosenPassage].play();
            print("Trompete spielt");
          }
          if (alive[10] == 1) {
            chosenPassage = calcChosenPassage(section, tromboneFileNames);
            tromboneSounds[chosenPassage].play();
            print("Posaune spielt");
          }
          if (alive[11] == 1) {
            chosenPassage = calcChosenPassage(section, tubaFileNames);
            tubaSounds[chosenPassage].play();
            print("Tuba spielt");
          }
          if (alive[12] == 1) {
            chosenPassage = calcChosenPassage(section, harpFileNames);
            harpSounds[chosenPassage].play();
            print("Harfe spielt");
          }
          if (alive[13] == 1) {
            // Sonderbehandlung, da weniger Material vorhanden
            if ((section == 0) || (section == 3)) {
              chosenPassage = 1;
            } else {
              chosenPassage = 0;
            }
            drumSounds[chosenPassage].play();
            print("Trommel spielt");
          }
          if (alive[14] == 1) {
            // Sonderbehandlung, da weniger Material vorhanden
            if ((section == 0) || (section == 3)) {
              chosenPassage = 1;
            } else {
              chosenPassage = 0;
            }
            timpaniSounds[chosenPassage].play();
            print("Pauke spielt");
          }
          if (alive[15] == 1) {
            // Sonderbehandlung, da weniger Material vorhanden
            if ((section == 0) || (section == 3)) {
              chosenPassage = 1;
            } else {
              chosenPassage = 0;
            }
            doublebassSounds[chosenPassage].play();
            print("Kontrabass spielt");
          }
          
          // nächsten Iterationsschritt ausführen
          checkNeighbors();
        
        } else {
          // Beenden, falls keine Instrumente mehr aktiv sind
          started = false;
          // Reset
          for (var i = 0; i < alive.length; i++) {
            alive[i] = 0;
            alive_update[i] = 0;
          }
          section = 6;
        }
        
        startingTimeChosen = false;
      }
    }
  }
}



// Erstellt ein Ring-Segment, das gelb markiert wird
function createRingSegment(phi1, phi2, r1, r2) {
  beginShape();
  fill(255, 255, 0, 150);

  for (var i = phi1; i <= phi2; i++) {
    vertex(r1 * cos(radians(i)), r1 * sin(radians(i)));
  }

  for (var i = phi2; i >= phi1; i--) {
    vertex(r2 * cos(radians(i)), r2 * sin(radians(i)));
  }

  endShape(CLOSE);
}



// Aktivierung eines Instruments, wenn darauf geklickt wird
function mouseClicked() {
  if (started == false) {

    // Umrechnung der Mouseposition in Polarkoordinaten
    var r = sqrt(pow(mouseX - (width - (width - height)) / 2, 2) + pow(mouseY - height / 2, 2));
    var phi = acos((mouseX - (width - (width - height)) / 2) / r);

    // Eingrenzung des Klick-Bereichs und Aktivierung des entsprechenden Instruments
    if ((r >= 25) && (r < 150)) {
      if ((phi >= PI / 2) &&  (phi <= PI)) {
        if (mouseY > height / 2) {
          alive[0] = 1;
        } else {
          alive[1] = 1;
        }
      } else {
        if (mouseY > height / 2) {
          alive[3] = 1;
        } else {
          alive[2] = 1;
        }
      }
    } else {
      if ((r >= 150) && (r < 275)) {
        if ((phi >= PI / 2) && (phi < (3 * PI / 4))) {
          if (mouseY > height / 2) {
            alive[4] = 1;
          } else {
            alive[7] = 1;
          }
        } else {
          if ((phi >= (3 * PI / 4)) &&  (phi <= PI)) {
            if (mouseY > height / 2) {
              alive[5] = 1;
            } else {
              alive[6] = 1;
            }
          } else {
            if ((phi >= 0) &&  (phi < (PI / 4))) {
              if (mouseY > height / 2) {
                alive[10] = 1;
              } else {
                alive[9] = 1;
              }
            } else {
              if (mouseY > height / 2) {
                alive[11] = 1;
              } else {
                alive[8] = 1;
              }
            }
          }
        }
      } else {
        if ((r >= 275) && (r <= 400)) {
          if ((phi >= PI / 2) &&  (phi <= PI)) {
            if (mouseY > height / 2) {
              alive[12] = 1;
            } else {
              alive[13] = 1;
            }
          } else {
            if (mouseY > height / 2) {
              alive[15] = 1;
            } else {
              alive[14] = 1;
            }
          }
        }
      }
    }
    
    // Reset-Button
    if ((mouseX >= (width - (width - height)) + 50) && (mouseX <= (width - (width - height)) + 200) && (mouseY >= height / 2 + 50) && (mouseY <= height / 2 + 100)) {
      alive = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      alive_update = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      resetButtonFlashCounter = 0;
    }
    
    // Start-Button
    if ((mouseX >= (width - (width - height)) + 50) && (mouseX <= (width - (width - height)) + 200) && (mouseY >= height / 2 - 100) && (mouseY <= height / 2 - 50)) {
      started = true;
      startStopButtonFlashCounter = 0;
    }
    
  } else {
    // Stopp-Button
    if ((mouseX >= (width - (width - height)) + 50) && (mouseX <= (width - (width - height)) + 200) && (mouseY >= height / 2 - 100) && (mouseY <= height / 2 - 50)) {
      started = false;
      alive = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      alive_update = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      section = 6;
      startStopButtonFlashCounter = 0;
    }
  }
  
  return false;
}



// Untersuchung der Nachbarn jeder Zelle
function checkNeighbors() {
  var neighborSum;

  // Überschreiben auf alive_update, um alle Änderungen später gleichzeitig durchführen zu können
  for (var i = 0; i < alive.length; i++) {
    alive_update[i] = alive[i];
  }

  // Durchgehen der einzelnen Instrumente
  for (i = 0; i < neighbors.length; i ++) {
    neighborSum = 0;
    // Zählen der aktiven Nachbarn
    for (var j = 0; j < neighbors[0].length; j++) {
      neighborSum += alive[neighbors[i][j]];
    }
    // Tote Zelle mit einer bestimmten Zahl lebender Nachbarn wird wiederbelebt
    if ((alive[i] == 0) && (neighborSum == livingNeighborsForDeadCell)) {
      alive_update[i] = 1;
    } else {
      if (alive[i] == 1) {
        // Lebende Zelle mit lebenden Nachbarn unter einer bestimmten Schwelle stirbt
        if (neighborSum < leastLivingNeighbors) {
          alive_update[i] = 0;
        } else {
          // Lebende Zelle mit lebenden Nachbarn über einer bestimmten Stelle stirbt
          if (neighborSum > mostLivingNeighbors) {
            alive_update[i] = 0;
          }
        }
      }
    }
  }

  // Überschreiben auf alive
  aliveSum = 0;
  for (var i = 0; i < alive.length; i++) {
    alive[i] = alive_update[i];
    aliveSum += alive_update[i];
  }
}



// Bestimmen der abzuspielenden Datei per Zufallsprinzip
function calcChosenPassage(passageNum, passageNames) {

  var result = 0;

  // Zwischenteil
  if ((passageNum == 0) || (passageNum == 3)) {
    var i = 0;
    while (passageNames[i].includes("Z_") == false) {
      i = i + 1;
    }
    result = int(random(i, passageNames.length));
  } else {
    // A1
    if (passageNum == 1) {
      var i = 0;
      while (passageNames[i].includes("A_1")) {
        i = i + 1;
      }
      result = int(random(i));
    } else {
      // A2
      if (passageNum == 2) {
        var i = 0;
        while (passageNames[i].includes("A_2") == false) {
          i = i + 1;
        }
        var j = i;
        while (passageNames[j].includes("A_2")) {
          j = j + 1;
        }
        result = int(random(i, j));
      } else {
        // B1
        if (passageNum == 4) {
          var i = 0;
          while (passageNames[i].includes("B_1") == false) {
            i = i + 1;
          }
          var j = i;
          while (passageNames[j].includes("B_1")) {
            j = j + 1;
          }
          result = int(random(i, j));
        } else {
          // B2
          if (passageNum == 5) {
            var i = 0;
            while (passageNames[i].includes("B_2") == false) {
              i = i + 1;
            }
            var j = i;
            while (passageNames[j].includes("B_2")) {
              j = j + 1;
            }
            result = int(random(i, j));
          }
        }
      }
    }
  }

  return result;
}
