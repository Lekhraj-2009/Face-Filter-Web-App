filter_item = "";

//Moustache & Lipstick
itemX = 0;
itemY = 0;

//Bangles & Eye Liner
itemX_Left = 0;
itemY_Left = 0;
itemX_Right = 0;
itemY_Right = 0;

function preload(){
    moustache = loadImage('https://i.postimg.cc/B6sHdVBp/Filter-Moustache.png');

    lipstick = loadImage('https://i.postimg.cc/DwLWncZM/Filter-Lips.png');

    bangle = loadImage('https://i.postimg.cc/Bn0F8zd0/Filter-Wrist.png');

    left_EyeLine = loadImage('https://i.postimg.cc/vmSDv2SD/Filter-Eye-Left.png');
    right_EyeLine = loadImage('https://i.postimg.cc/RFHCLSHb/Filter-Eye-Right.png');
}

function setup(){
    canvas = createCanvas(400, 400);

    video = createCapture(VIDEO);
    video.size(400, 400);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

filter_item = document.getElementById('filter_name').innerHTML;

function modelLoaded(){
    console.log('PoseNet is initialized!');
}

//Navigation Buttons
var images = [
    "Filter-Moustache.png",
    "Filter-Lips.png",
    "Filter-Wrist.png",
    "Filter-Eye-Right.png"
];
var i = 0;

var names = [
    "Moustache",
    "Lipstick",
    "Bangles",
    "Eye Liner"
];
var j = 0;

function next(){
    i++;
    if (i == 4){
        i = 0;
    }

    j++
    if (j == 4){
        j = 0;
    }
    
    document.getElementById("filter_img").src = images[i];
    document.getElementById("filter_name").innerHTML = names[j];

    filter_item = document.getElementById('filter_name').innerHTML;
}
function prev(){
    if (i == 0){
        i = 4;
    }
    i = i - 1;

    if (j == 0){
        j = 4;
    }
    j = j - 1;

    document.getElementById("filter_img").src = images[i];
    document.getElementById("filter_name").innerHTML = names[j];

    filter_item = document.getElementById('filter_name').innerHTML;
}
//Navigation Buttons

function gotPoses(results){
    if (results.length > 0){
        console.log('Filter = '+filter_item);
        if (filter_item == "Moustache"){
            itemX_Left = 0;
            itemY_Left = 0;
            itemX_Right = 0;
            itemY_Right = 0;

            itemX = results[0].pose.nose.x - 45;
            itemY = results[0].pose.nose.y;

            console.log(filter_item+' X - '+itemX);
            console.log(filter_item+' Y - '+itemY);
            console.log(" ");
        }
        
        if (filter_item == "Lipstick"){
            itemX_Left = 0;
            itemY_Left = 0;
            itemX_Right = 0;
            itemY_Right = 0;
            
            itemX = results[0].pose.nose.x - 25;
            itemY = results[0].pose.nose.y + 10;

            console.log(filter_item+' X - '+itemX);
            console.log(filter_item+' Y - '+itemY);
            console.log(" ");
        }
        
        if (filter_item == "Bangles"){
            itemX = 0;
            itemY = 0;

            itemX_Left = results[0].pose.leftWrist.x;
            itemY_Left = results[0].pose.leftWrist.y;
            itemX_Right = results[0].pose.rightWrist.x;
            itemY_Right = results[0].pose.rightWrist.y;

            console.log(filter_item+' (Left) X - '+itemX_Left);
            console.log(filter_item+' (Left) Y - '+itemY_Left);
            console.log(filter_item+' (Right) X - '+itemX_Right);
            console.log(filter_item+' (Right) Y - '+itemY_Right);
            console.log(" ");
        }

        if (filter_item == "Eye Liner"){
            itemX = 0;
            itemY = 0;

            itemX_Left = results[0].pose.leftEye.x - 20;
            itemY_Left = results[0].pose.leftEye.y - 10;
            itemX_Right = results[0].pose.rightEye.x - 20;
            itemY_Right = results[0].pose.rightEye.y - 10;

            console.log(filter_item+' (Left) X - '+itemX_Left);
            console.log(filter_item+' (Left) Y - '+itemY_Left);
            console.log(filter_item+' (Right) X - '+itemX_Right);
            console.log(filter_item+' (Right) Y - '+itemY_Right);
            console.log(" ");
        }
    }
}

function draw(){
    image(video, 0, 0, 400, 400);

    if (filter_item == "Moustache"){
        image(moustache, itemX, itemY, 80, 35);
    }
    if (filter_item == "Lipstick"){
        image(lipstick, itemX, itemY, 50, 35);
    }
    if (filter_item == "Bangles"){
        image(bangle, itemX_Left, itemY_Left, 75, 40);
        image(bangle, itemX_Right, itemY_Right, 75, 40);
    }
    if (filter_item == "Eye Liner"){
        image(right_EyeLine, itemX_Left, itemY_Left, 40, 20);
        image(left_EyeLine, itemX_Right, itemY_Right, 40, 20);
    }
}

function takeSnapshot(){
    save("My-Filter-Image.png");
}