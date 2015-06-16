private var ray : String;

//Picture GameObjects
var picture1 : GameObject;
var picture2 : GameObject;
var picture3 : GameObject;
var picture4 : GameObject;
var picture5 : GameObject;
var picture6 : GameObject;

private var text1 : TextMesh;
private var text2 : TextMesh;
private var text3 : TextMesh;
private var text4 : TextMesh;
private var text5 : TextMesh;
private var text6 : TextMesh;

//Idle Textures
var idle_tutorial : Texture;
var idle_video : Texture;
var idle_virtualTour : Texture;
var idle_settings : Texture;
var idle_credits : Texture;
var idle_ar : Texture;

//Active Textures
var active_tutorial : Texture;
var active_video : Texture;
var active_virtualTour : Texture;
var active_settings : Texture;
var active_credits : Texture; 
var active_ar : Texture;

private var sc : Vector3;
var offset : Vector3;

var englishFont : Font;
var greekFont : Font;

function Start(){

	//Pairno Arxiko Scale enos antikeimenou, gia refference stin sinexeia
	sc = picture1.transform.localScale;
	offset = new Vector3(0.25,0,0.25);
	
	text1 = GameObject.Find("/Picture1/Plane1/Text1").GetComponent(TextMesh);
	text2 = GameObject.Find("/Picture2/Plane2/Text2").GetComponent(TextMesh);
	text3 = GameObject.Find("/Picture3/Plane3/Text3").GetComponent(TextMesh);
	text4 = GameObject.Find("/Picture4/Plane4/Text4").GetComponent(TextMesh);
	text5 = GameObject.Find("/Picture5/Plane5/Text5").GetComponent(TextMesh);	
	text6 = GameObject.Find("/Picture6/Plane6/Text6").GetComponent(TextMesh);

	if(PlayerPrefs.GetInt("Language") == 0)
	{
		text1.font = text2.font = text3.font = text4.font = text5.font = englishFont;
		text1.text = "Tutorial";
		text2.text = "Video";	
		text3.text = "Virtual Tour";	
		text4.text = "Settings";	
		text5.text = "Credits";	
		text6.text = "Augmented Reality";
		//Debug.Log(text6.renderer.bounds.size);
	}
	else if(PlayerPrefs.GetInt("Language") == 1)
	{
		//text1.font = text2.font = text3.font = text4.font = text5.font = greekFont;
		text1.text = "Οδηγος";
		text2.text = "Βιντεο";
		text3.text = "Εικονικη Ξεναγηση";	
		text4.text = "Ρυθμισεις";
		text5.text = "Παραγωντες";		
		text6.text = "Εικονικη Πραγματικοτητα";	
	}
}

function Update () {

	ray = WhatCameraPoints.cameraPoint;
	
	if(ray == "Tutorial")
	{
		picture1.renderer.material.mainTexture = active_tutorial;
		picture2.renderer.material.mainTexture = idle_video;
		picture3.renderer.material.mainTexture = idle_virtualTour;
		picture4.renderer.material.mainTexture = idle_settings;
		picture5.renderer.material.mainTexture = idle_credits;
		picture6.renderer.material.mainTexture = idle_ar;
		
		text1.renderer.material.color = Color.green;
		text2.renderer.material.color = Color.white;
		text3.renderer.material.color = Color.white;
		text4.renderer.material.color = Color.white;
		text5.renderer.material.color = Color.white;
		text6.renderer.material.color = Color.white;
		
		if(picture1.transform.localScale.x <= (sc+offset).x)picture1.transform.localScale += Vector3(0.1,0,0.1);
		if(picture2.transform.localScale.x >= sc.x)picture2.transform.localScale -= Vector3(0.1,0,0.1);
		if(picture3.transform.localScale.x >= sc.x)picture3.transform.localScale -= Vector3(0.1,0,0.1);
		if(picture4.transform.localScale.x >= sc.x)picture4.transform.localScale -= Vector3(0.1,0,0.1);
		if(picture5.transform.localScale.x >= sc.x)picture5.transform.localScale -= Vector3(0.1,0,0.1);
		if(picture6.transform.localScale.x >= sc.x)picture6.transform.localScale -= Vector3(0.1,0,0.1);
	
	}
	else if(ray == "Video")
	{
		picture1.renderer.material.mainTexture = idle_tutorial;
		picture2.renderer.material.mainTexture = active_video;
		picture3.renderer.material.mainTexture = idle_virtualTour;
		picture4.renderer.material.mainTexture = idle_settings;
		picture5.renderer.material.mainTexture = idle_credits;
		picture6.renderer.material.mainTexture = idle_ar;
		
		
		text1.renderer.material.color = Color.white;
		text2.renderer.material.color = Color.green;
		text3.renderer.material.color = Color.white;
		text4.renderer.material.color = Color.white;
		text5.renderer.material.color = Color.white;
		text6.renderer.material.color = Color.white;
		
		if(picture1.transform.localScale.x >= sc.x)picture1.transform.localScale -= Vector3(0.1,0,0.1);
		if(picture2.transform.localScale.x <= (sc+offset).x)picture2.transform.localScale += Vector3(0.1,0,0.1);
		if(picture3.transform.localScale.x >= sc.x)picture3.transform.localScale -= Vector3(0.1,0,0.1);
		if(picture4.transform.localScale.x >= sc.x)picture4.transform.localScale -= Vector3(0.1,0,0.1);
		if(picture5.transform.localScale.x >= sc.x)picture5.transform.localScale -= Vector3(0.1,0,0.1);
		if(picture6.transform.localScale.x >= sc.x)picture6.transform.localScale -= Vector3(0.1,0,0.1);
	}
	else if(ray == "VirtualTour")
	{
		picture1.renderer.material.mainTexture = idle_tutorial;
		picture2.renderer.material.mainTexture = idle_video;
		picture3.renderer.material.mainTexture = active_virtualTour;
		picture4.renderer.material.mainTexture = idle_settings;
		picture5.renderer.material.mainTexture = idle_credits;
		picture6.renderer.material.mainTexture = idle_ar;
		
		
		text1.renderer.material.color = Color.white;
		text2.renderer.material.color = Color.white;
		text3.renderer.material.color = Color.green;
		text4.renderer.material.color = Color.white;
		text5.renderer.material.color = Color.white;
		text6.renderer.material.color = Color.white;
		
		if(picture1.transform.localScale.x >= sc.x)picture1.transform.localScale -= Vector3(0.1,0,0.1);		
		if(picture2.transform.localScale.x >= sc.x)picture2.transform.localScale -= Vector3(0.1,0,0.1);
		if(picture3.transform.localScale.x <= (sc+offset).x)picture3.transform.localScale += Vector3(0.1,0,0.1);
		if(picture4.transform.localScale.x >= sc.x)picture4.transform.localScale -= Vector3(0.1,0,0.1);
		if(picture5.transform.localScale.x >= sc.x)picture5.transform.localScale -= Vector3(0.1,0,0.1);
		if(picture6.transform.localScale.x >= sc.x)picture6.transform.localScale -= Vector3(0.1,0,0.1);
	}
	else if(ray == "Settings")
	{
		picture1.renderer.material.mainTexture = idle_tutorial;
		picture2.renderer.material.mainTexture = idle_video;
		picture3.renderer.material.mainTexture = idle_virtualTour;
		picture4.renderer.material.mainTexture = active_settings;
		picture5.renderer.material.mainTexture = idle_credits;	
		picture6.renderer.material.mainTexture = idle_ar;	
		
		
		text1.renderer.material.color = Color.white;
		text2.renderer.material.color = Color.white;
		text3.renderer.material.color = Color.white;
		text4.renderer.material.color = Color.green;
		text5.renderer.material.color = Color.white;
		text6.renderer.material.color = Color.white;
	
	
		if(picture1.transform.localScale.x >= sc.x)picture1.transform.localScale -= Vector3(0.1,0,0.1);		
		if(picture2.transform.localScale.x >= sc.x)picture2.transform.localScale -= Vector3(0.1,0,0.1);
		if(picture3.transform.localScale.x >= sc.x)picture3.transform.localScale -= Vector3(0.1,0,0.1);
		if(picture4.transform.localScale.x <= (sc+offset).x)picture4.transform.localScale += Vector3(0.1,0,0.1);
		if(picture5.transform.localScale.x >= sc.x)picture5.transform.localScale -= Vector3(0.1,0,0.1);
		if(picture6.transform.localScale.x >= sc.x)picture6.transform.localScale -= Vector3(0.1,0,0.1);	
		
	}
	else if(ray == "Credits")
	{
		picture1.renderer.material.mainTexture = idle_tutorial;
		picture2.renderer.material.mainTexture = idle_video;
		picture3.renderer.material.mainTexture = idle_virtualTour;
		picture4.renderer.material.mainTexture = idle_settings;
		picture5.renderer.material.mainTexture = active_credits;
		picture6.renderer.material.mainTexture = idle_ar;
		
		text1.renderer.material.color = Color.white;
		text2.renderer.material.color = Color.white;
		text3.renderer.material.color = Color.white;
		text4.renderer.material.color = Color.white;
		text5.renderer.material.color = Color.green;
		text6.renderer.material.color = Color.white;

		if(picture1.transform.localScale.x >= sc.x)picture1.transform.localScale -= Vector3(0.1,0,0.1);		
		if(picture2.transform.localScale.x >= sc.x)picture2.transform.localScale -= Vector3(0.1,0,0.1);
		if(picture3.transform.localScale.x >= sc.x)picture3.transform.localScale -= Vector3(0.1,0,0.1);
		if(picture4.transform.localScale.x >= sc.x)picture4.transform.localScale -= Vector3(0.1,0,0.1);		
		if(picture5.transform.localScale.x <= (sc+offset).x)picture5.transform.localScale += Vector3(0.1,0,0.1);
		if(picture6.transform.localScale.x >= sc.x)picture6.transform.localScale -= Vector3(0.1,0,0.1);	
	}
	else if(ray == "AugmentedReality")
	{
		picture1.renderer.material.mainTexture = idle_tutorial;
		picture2.renderer.material.mainTexture = idle_video;
		picture3.renderer.material.mainTexture = idle_virtualTour;
		picture4.renderer.material.mainTexture = idle_settings;
		picture5.renderer.material.mainTexture = idle_credits;
		picture6.renderer.material.mainTexture = active_ar;
		
		text1.renderer.material.color = Color.white;
		text2.renderer.material.color = Color.white;
		text3.renderer.material.color = Color.white;
		text4.renderer.material.color = Color.white;
		text5.renderer.material.color = Color.white;
		text6.renderer.material.color = Color.green;

		if(picture1.transform.localScale.x >= sc.x)picture1.transform.localScale -= Vector3(0.1,0,0.1);		
		if(picture2.transform.localScale.x >= sc.x)picture2.transform.localScale -= Vector3(0.1,0,0.1);
		if(picture3.transform.localScale.x >= sc.x)picture3.transform.localScale -= Vector3(0.1,0,0.1);
		if(picture4.transform.localScale.x >= sc.x)picture4.transform.localScale -= Vector3(0.1,0,0.1);	
		if(picture5.transform.localScale.x >= sc.x)picture5.transform.localScale -= Vector3(0.1,0,0.1);	
		if(picture6.transform.localScale.x <= (sc+offset).x)picture6.transform.localScale += Vector3(0.1,0,0.1);
			
	}
	else
	{
		picture1.renderer.material.mainTexture = idle_tutorial;
		picture2.renderer.material.mainTexture = idle_video;
		picture3.renderer.material.mainTexture = idle_virtualTour;
		picture4.renderer.material.mainTexture = idle_settings;
		picture5.renderer.material.mainTexture = idle_credits;	
		picture6.renderer.material.mainTexture = idle_ar;
		
		text1.renderer.material.color = Color.white;
		text2.renderer.material.color = Color.white;
		text3.renderer.material.color = Color.white;
		text4.renderer.material.color = Color.white;
		text5.renderer.material.color = Color.white;
		text6.renderer.material.color = Color.white;
		
		if(picture1.transform.localScale.x >= sc.x)picture1.transform.localScale -= Vector3(0.1,0,0.1);		
		if(picture2.transform.localScale.x >= sc.x)picture2.transform.localScale -= Vector3(0.1,0,0.1);
		if(picture3.transform.localScale.x >= sc.x)picture3.transform.localScale -= Vector3(0.1,0,0.1);
		if(picture4.transform.localScale.x >= sc.x)picture4.transform.localScale -= Vector3(0.1,0,0.1);
		if(picture5.transform.localScale.x >= sc.x)picture5.transform.localScale -= Vector3(0.1,0,0.1);	
		if(picture6.transform.localScale.x >= sc.x)picture6.transform.localScale -= Vector3(0.1,0,0.1);		
	}

}