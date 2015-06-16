#pragma strict

private var what : String;
private var style : GUIStyle;
var frame : Texture;
var sp1 : Texture;
var sp2 : Texture;
var sp3 : Texture;
//var sp4 : Texture;



function Start () {

	what = PlayerPrefs.GetString("What");
	if(what == "Sphere1") renderer.material.mainTexture = sp1;
	else if(what == "Sphere2") renderer.material.mainTexture = sp2;
	else if(what == "Sphere3") renderer.material.mainTexture = sp3;
	//else if(what == "Sphere4") renderer.material.mainTexture = sp4;
	
	style = new GUIStyle();
	style.normal.background = frame;
}

function OnGUI(){
	GUI.Label(Rect(0,0,Screen.width,Screen.height),"",style);
}