window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var once = player.once;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
var update = player.update;
var pointerX = player.pointerX;
var pointerY = player.pointerY;
var showPointer = player.showPointer;
var hidePointer = player.hidePointer;
var slideWidth = player.slideWidth;
var slideHeight = player.slideHeight;
window.Script1 = function()
{
  // 1. Get the variables from Storyline
var player = GetPlayer();
var name = player.GetVar("UserName");
var animal = player.GetVar("UserSelection");

// 2. Determine the "Fact" based on the animal chosen
var animalFact = "";
if (animal == "Bear") {
    animalFact = "Bears have an incredible sense of smell, even better than a dog's!";
} else if (animal == "Shark") {
    animalFact = "Sharks do not have bones; their skeletons are made of cartilage!";
} else if (animal == "Whale") {
    animalFact = "The blue whale's heart is the size of a bumper car!";
}

// 3. Create the script for the AI Avatar
var fullScript = "Hello " + name + "! Did you know that " + animalFact;

// 4. Call the HeyGen API (Simplified Logic)
// Note: You will replace 'YOUR_API_KEY' with your actual key
fetch('https://api.heygen.com/v1/video.generate', {
    method: 'POST',
    headers: {
        'X-Api-Key': 'sk_V2_hgu_kPJnErnBMLK_2JTWS2Ejm8bL93efVj4BY2JfFNcyvJvp',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "video_setting": {
            "ratio": "16:9"
        },
        "avatar_id": "b6c94c07-e4e5-483e-8bec-e838d5910b7d", // You can find IDs in HeyGen
        "input_text": fullScript
    })
})
.then(response => response.json())
.then(data => {
    // This tells Storyline where to show the video
    var videoUrl = data.data.video_url;
    document.querySelector('[acc-name="videoContainer"]').innerHTML = 
    `<video width="100%" height="100%" controls autoplay>
        <source src="${videoUrl}" type="video/mp4">
    </video>`;
})
.catch(error => console.error('Error:', error));
}

};
