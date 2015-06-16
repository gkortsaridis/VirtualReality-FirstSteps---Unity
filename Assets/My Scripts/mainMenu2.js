#pragma strict

private var ray : String;

//Picture GameObjects
var picture1 : GameObject;
var picture2 : GameObject;
var picture3 : GameObject;
var picture4 : GameObject;
var picture5 : GameObject;


//Idle Textures
var idle_tutorial : Texture;
var idle_video : Texture;
var idle_virtualTour : Texture;
var idle_settings : Texture;
var idle_credits : Texture;

//Active Textures
var active_tutorial : Texture;
var active_video : Texture;
var active_virtualTour : Texture;
var active_settings : Texture;
var active_credits : Texture; 

var offset : float;
private var starting_pos : float;

function Start(){
	starting_pos = picture1.transform.position.z;

}

function Update () {

	ray = WhatCameraPoints.cameraPoint;
	//Debug.Log(ray);
	
	//Ola ta antikeimena ksekinane me thesi Z = 20 (Opote auksanontai mexri na ftasoun pali piso sta 20)
	//Kanoun Zoom gia 10. Opote meionontai mexri na einai megalitera tou 20-10
	
	
	if(ray == "Tutorial")
	{
		picture1.renderer.material.mainTexture = active_tutorial;
		picture2.renderer.material.mainTexture = idle_video;
		picture3.renderer.material.mainTexture = idle_virtualTour;
		picture4.renderer.material.mainTexture = idle_settings;
		picture5.renderer.material.mainTexture = idle_credits;
	
		if(picture1.transform.position.z > offset)picture1.transform.position = new Vector3(picture1.transform.position.x , picture1.transform.position.y , picture1.transform.position.z-1);
		if(picture2.transform.position.z <= starting_pos)picture2.transform.position = new Vector3(picture2.transform.position.x , picture2.transform.position.y , picture2.transform.position.z+1);
		if(picture3.transform.position.z <= starting_pos)picture3.transform.position = new Vector3(picture3.transform.position.x , picture3.transform.position.y , picture3.transform.position.z+1);
		if(picture4.transform.position.z <= starting_pos)picture4.transform.position = new Vector3(picture4.transform.position.x , picture4.transform.position.y , picture4.transform.position.z+1);
		if(picture5.transform.position.z <= starting_pos)picture5.transform.position = new Vector3(picture5.transform.position.x , picture5.transform.position.y , picture5.transform.position.z+1);
		
	}
	else if(ray == "Video")
	{
		picture1.renderer.material.mainTexture = idle_tutorial;
		picture2.renderer.material.mainTexture = active_video;
		picture3.renderer.material.mainTexture = idle_virtualTour;
		picture4.renderer.material.mainTexture = idle_settings;
		picture5.renderer.material.mainTexture = idle_credits;
		
		if(picture1.transform.position.z <= starting_pos)picture1.transform.position = new Vector3(picture1.transform.position.x , picture1.transform.position.y , picture1.transform.position.z+1);
		if(picture2.transform.position.z > offset)picture2.transform.position = new Vector3(picture2.transform.position.x , picture2.transform.position.y , picture2.transform.position.z-1);
		if(picture3.transform.position.z <= starting_pos)picture3.transform.position = new Vector3(picture3.transform.position.x , picture3.transform.position.y , picture3.transform.position.z+1);
		if(picture4.transform.position.z <= starting_pos)picture4.transform.position = new Vector3(picture4.transform.position.x , picture4.transform.position.y , picture4.transform.position.z+1);
		if(picture5.transform.position.z <= starting_pos)picture5.transform.position = new Vector3(picture5.transform.position.x , picture5.transform.position.y , picture5.transform.position.z+1);
		
	}
	else if(ray == "VirtualTour")
	{
		picture1.renderer.material.mainTexture = idle_tutorial;
		picture2.renderer.material.mainTexture = idle_video;
		picture3.renderer.material.mainTexture = active_virtualTour;
		picture4.renderer.material.mainTexture = idle_settings;
		picture5.renderer.material.mainTexture = idle_credits;
		
		if(picture1.transform.position.z <= starting_pos)picture1.transform.position = new Vector3(picture1.transform.position.x , picture1.transform.position.y , picture1.transform.position.z+1);
		if(picture2.transform.position.z <= starting_pos)picture2.transform.position = new Vector3(picture2.transform.position.x , picture2.transform.position.y , picture2.transform.position.z+1);
		if(picture3.transform.position.z > offset)picture3.transform.position = new Vector3(picture3.transform.position.x , picture3.transform.position.y , picture3.transform.position.z-1);
		if(picture4.transform.position.z <= starting_pos)picture4.transform.position = new Vector3(picture4.transform.position.x , picture4.transform.position.y , picture4.transform.position.z+1);
		if(picture5.transform.position.z <= starting_pos)picture5.transform.position = new Vector3(picture5.transform.position.x , picture5.transform.position.y , picture5.transform.position.z+1);
	}
	else if(ray == "Settings")
	{
		picture1.renderer.material.mainTexture = idle_tutorial;
		picture2.renderer.material.mainTexture = idle_video;
		picture3.renderer.material.mainTexture = idle_virtualTour;
		picture4.renderer.material.mainTexture = active_settings;
		picture5.renderer.material.mainTexture = idle_credits;	
		
		if(picture1.transform.position.z <= starting_pos)picture1.transform.position = new Vector3(picture1.transform.position.x , picture1.transform.position.y , picture1.transform.position.z+1);
		if(picture2.transform.position.z <= starting_pos)picture2.transform.position = new Vector3(picture2.transform.position.x , picture2.transform.position.y , picture2.transform.position.z+1);
		if(picture3.transform.position.z <= starting_pos)picture3.transform.position = new Vector3(picture3.transform.position.x , picture3.transform.position.y , picture3.transform.position.z+1);
		if(picture4.transform.position.z > offset)picture4.transform.position = new Vector3(picture4.transform.position.x , picture4.transform.position.y , picture4.transform.position.z-1);
		if(picture5.transform.position.z <= starting_pos)picture5.transform.position = new Vector3(picture5.transform.position.x , picture5.transform.position.y , picture5.transform.position.z+1);
		
		
	}
	else if(ray == "Credits")
	{
		picture1.renderer.material.mainTexture = idle_tutorial;
		picture2.renderer.material.mainTexture = idle_video;
		picture3.renderer.material.mainTexture = idle_virtualTour;
		picture4.renderer.material.mainTexture = idle_settings;
		picture5.renderer.material.mainTexture = active_credits;
		
		if(picture1.transform.position.z <= starting_pos)picture1.transform.position = new Vector3(picture1.transform.position.x , picture1.transform.position.y , picture1.transform.position.z+1);
		if(picture2.transform.position.z <= starting_pos)picture2.transform.position = new Vector3(picture2.transform.position.x , picture2.transform.position.y , picture2.transform.position.z+1);
		if(picture3.transform.position.z <= starting_pos)picture3.transform.position = new Vector3(picture3.transform.position.x , picture3.transform.position.y , picture3.transform.position.z+1);
		if(picture4.transform.position.z <= starting_pos)picture4.transform.position = new Vector3(picture4.transform.position.x , picture4.transform.position.y , picture4.transform.position.z+1);
		if(picture5.transform.position.z > offset)picture5.transform.position = new Vector3(picture5.transform.position.x , picture5.transform.position.y , picture5.transform.position.z-1);
		
		
	}
	else
	{
		picture1.renderer.material.mainTexture = idle_tutorial;
		picture2.renderer.material.mainTexture = idle_video;
		picture3.renderer.material.mainTexture = idle_virtualTour;
		picture4.renderer.material.mainTexture = idle_settings;
		picture5.renderer.material.mainTexture = idle_credits;	
		
		if(picture1.transform.position.z <= starting_pos)picture1.transform.position = new Vector3(picture1.transform.position.x , picture1.transform.position.y , picture1.transform.position.z+1);
		if(picture2.transform.position.z <= starting_pos)picture2.transform.position = new Vector3(picture2.transform.position.x , picture2.transform.position.y , picture2.transform.position.z+1);
		if(picture3.transform.position.z <= starting_pos)picture3.transform.position = new Vector3(picture3.transform.position.x , picture3.transform.position.y , picture3.transform.position.z+1);
		if(picture4.transform.position.z <= starting_pos)picture4.transform.position = new Vector3(picture4.transform.position.x , picture4.transform.position.y , picture4.transform.position.z+1);
		if(picture5.transform.position.z <= starting_pos)picture5.transform.position = new Vector3(picture5.transform.position.x , picture5.transform.position.y , picture5.transform.position.z+1);
		
	
	}
	

}