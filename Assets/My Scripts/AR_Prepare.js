#pragma strict

var text : TextMesh;
var waitTime : float;

function Start () {
	waitTime = 5;

	text = this.GetComponent(TextMesh);
	text.characterSize = 0.3;
	text.fontSize = 40;
	text.text = "Please\nREMOVE YOUR DEVICE\nfrom Cardboard";
}

function Update()
{
	waitTime -= Time.deltaTime;
	
	var minutes : int = waitTime / 60;
    var seconds : int = waitTime % 60;
    var fraction : int = (waitTime * 100) % 100;

   	if(waitTime>0)text.text = String.Format ("Please\nREMOVE YOUR DEVICE\nfrom Cardboard\nand wait for\n{0:00}:{1:00}:{2:00}", minutes, seconds, fraction); 	
   	else Application.LoadLevel("augmentedReality");

}
