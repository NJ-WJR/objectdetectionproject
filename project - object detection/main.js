function setup(){
    canvas = createCanvas(700,500)
    canvas.center()
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Detecting Objects"
}

function bottle() {
    window.location = "index2.html"
}

function fruits() {
    window.location = "index3.html"
}

function tv() {
    window.location = "index4.html"
}


img = ""
status = ""
object = [];


function draw(){
    image(img,0,0,700,500)
    if (status != "") {
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Objects detected"
            
            fill("#0000FF");
            percent = floor(object[i].confidence * 100)
            text(object[i].label + " " + percent + "%" , object[i].x, object[i].y)
            noFill()
            stroke("#FF0000")
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
        console.error(error)
    }
    else {
        console.log(results)
        object = results;
    }
}