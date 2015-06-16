private var ray : String;

//Picture GameObjects
var picture1 : GameObject;
var picture2 : GameObject;
var picture3 : GameObject;

private var text1 : GameObject;
private var text2 : GameObject;
private var text3 : GameObject;


//Idle Textures
var idle_Acropolis : Texture;
var idle_Delfoi : Texture;
var idle_Festos : Texture;

//Active Textures
var active_Acropolis : Texture;
var active_Delfoi : Texture;
var active_Festos : Texture;

private var sc : Vector3;
var offset : Vector3;

function Start(){

	sc = picture1.transform.localScale;
	offset = new Vector3(0.25,0,0.25);
	
	text1 = GameObject.Find("/Picture1/Plane1/Text1");
	text2 = GameObject.Find("/Picture2/Plane2/Text2");
	text3 = GameObject.Find("/Picture3/Plane3/Text3");

}

function Update () {

	ray = WhatCameraPoints.cameraPoint;
	
	if(ray == "Acropolis")
	{
		picture1.renderer.material.mainTexture = active_Acropolis;
		picture2.renderer.material.mainTexture = idle_Delfoi;
		picture3.renderer.material.mainTexture = idle_Festos;
		
		text1.renderer.material.color = Color.green;
		text2.renderer.material.color = Color.white;
		text3.renderer.material.color = Color.white;
		
		if(picture1.transform.localScale.x <= (sc+offset).x)picture1.transform.localScale += Vector3(0.1,0,0.1);
		if(picture2.transform.localScale.x >= sc.x)picture2.transform.localScale -= Vector3(0.1,0,0.1);
		if(picture3.transform.localScale.x >= sc.x)picture3.transform.localScale -= Vector3(0.1,0,0.1);
	
	}
	else if(ray == "Delfoi")
	{
		picture1.renderer.material.mainTexture = idle_Acropolis;
		picture2.renderer.material.mainTexture = active_Delfoi;
		picture3.renderer.material.mainTexture = idle_Festos;
		
		text1.renderer.material.color = Color.white;
		text2.renderer.material.color = Color.green;
		text3.renderer.material.color = Color.white;

		if(picture1.transform.localScale.x >= sc.x)picture1.transform.localScale -= Vector3(0.1,0,0.1);
		if(picture2.transform.localScale.x <= (sc+offset).x)picture2.transform.localScale += Vector3(0.1,0,0.1);
		if(picture3.transform.localScale.x >= sc.x)picture3.transform.localScale -= Vector3(0.1,0,0.1);
	}
	else if(ray == "Faistos")
	{
		picture1.renderer.material.mainTexture = idle_Acropolis;
		picture2.renderer.material.mainTexture = idle_Delfoi;
		picture3.renderer.material.mainTexture = active_Festos;
		
		text1.renderer.material.color = Color.white;
		text2.renderer.material.color = Color.white;
		text3.renderer.material.color = Color.green;

		if(picture1.transform.localScale.x >= sc.x)picture1.transform.localScale -= Vector3(0.1,0,0.1);		
		if(picture2.transform.localScale.x >= sc.x)picture2.transform.localScale -= Vector3(0.1,0,0.1);
		if(picture3.transform.localScale.x <= (sc+offset).x)picture3.transform.localScale += Vector3(0.1,0,0.1);
	}
	else
	{
		picture1.renderer.material.mainTexture = idle_Acropolis;
		picture2.renderer.material.mainTexture = idle_Delfoi;
		picture3.renderer.material.mainTexture = idle_Festos;
		
		text1.renderer.material.color = Color.white;
		text2.renderer.material.color = Color.white;
		text3.renderer.material.color = Color.white;
		
		if(picture1.transform.localScale.x >= sc.x)picture1.transform.localScale -= Vector3(0.1,0,0.1);		
		if(picture2.transform.localScale.x >= sc.x)picture2.transform.localScale -= Vector3(0.1,0,0.1);
		if(picture3.transform.localScale.x >= sc.x)picture3.transform.localScale -= Vector3(0.1,0,0.1);
	}

}