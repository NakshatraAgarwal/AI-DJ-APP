scoreLeftWrist = 0;
leftwristx = 0;
leftwristy = 0;
rightwristx = 0;
rightwristy = 0;
song1 = ""
song2 = ""
song_status = ""
scoreRightWrist = 0;

function preload() {
    song1 = loadSound("Music1.mp3");
    song2 = loadSound("Music2.mp3");
}

function setup() {

    canvas = createCanvas(600, 500);
    video = createCapture(VIDEO);
    canvas.center();
    video.hide();

    poseNet = ml5.poseNet(video, modelloaded);
    poseNet.on('pose', gotposes);

}

function draw() {


    image(video, 0, 0, 600, 500);
    song_status = song1.isPlaying();
    fill('red');
    stroke('red');

    if (scoreLeftWrist > 0.1) {

        circle(leftwristx, leftwristy, 20);
        song2.stop();

        if (song_status == false) {

            song1.play();
            document.getElementById('song_name').innerHTML = 'Song 1 is playing';
        }
    }
    song2_status = song2.isPlaying();
    if (scoreRightWrist > 0.1) {

        circle(rightwristx, rightwristy, 20);
        song1.stop();

        if (song2_status == false) {

            song2.play();
            document.getElementById('song_name').innerHTML = 'Song 2 is playing';
        }
    }
}

function modelloaded() {

    console.log('model is loaded');

}

function gotposes(results) {

    console.log(results);

    if (results.length > 0) {

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("score of left wrist = " + scoreLeftWrist);
        console.log("score of right wrist = " + scoreRightWrist);

        leftwristx = results[0].pose.leftWrist.x;
        leftwristy = results[0].pose.leftWrist.y;
        rightwristx = results[0].pose.rightWrist.x;
        rightwristy = results[0].pose.rightWrist.y;

        console.log('leftWrist X = ' + leftwristx + 'leftWrist Y = ' + leftwristy);
        console.log('rightWrist X = ' + rightwristx + 'rightWrist Y = ' + rightwristy);
    }

}