function setup(){
    canvas = createCanvas(380,380)
    canvas.center()
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Detecting Objects"
}

img = ""
status = ""
object = [];

function preload(){
    img=loadImage("tv and ac.jpg")
}

function draw(){
    image(img,0,0,380,380)
    if (status != "") {
       r = random(255)
       g = random(255)
       b = random(255)
       objectDetector.detect(img, gotResult)
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Objects detected"
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : " + object.length
            
            fill(r,g,b);
            percent = floor(object[i].confidence * 100)
            text(object[i].label + " " + percent + "%" , object[i].x, object[i].y)
            noFill()
            stroke(r,g,b)
            rect(object[i].x, object[i].y, object[i].width, object[i].height)
            

        }
    }
   
}

function modelLoaded() {
    console.log('Model loaded')
    status = true
    objectDetector.detect(img, gotResult)
}

function gotResult(error, results) {
    if (error) {
        console.log(error)
    }
    else {
        console.log(results)
        object = results;
    }
}

function back(){
    window.location= 'index.html'
}