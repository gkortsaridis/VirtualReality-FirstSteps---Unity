#pragma strict

function Start () {

}

function Update () {
	
	var x = Input.acceleration.x;
	if(Application.loadedLevelName == "UndistortedSphere2")
	{
		if(x > 1.0f || Input.GetKeyDown(KeyCode.Escape))
		{
			Handheld.Vibrate();
			Application.LoadLevel("TourSelectScene");
		}
	}
	else
	{
		if(x > 1.0f || Input.GetKeyDown(KeyCode.Escape))
		{
			Handheld.Vibrate();
			Application.LoadLevel("MainMenu3Scene");
		}
	}
}