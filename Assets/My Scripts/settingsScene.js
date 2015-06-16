#pragma strict

var angle_field : float;
var distance : float;
var lightRange : int;
var arrows : int;

var Active_Icons : Texture2D[];
var Idle_Icons : Texture2D[];
var Arrow_Left : Texture2D;
var Arrow_Right : Texture2D;
var muted : Texture2D;
var unmuted : Texture2D;

var Icon_Text_English : String[];
var Icon_Text_Greek : String[];
var English_Font : Font;
var Greek_Font : Font;

var iconShader : Shader;

private var theta : float;
private var i : int;
private var x : float;
private var z : float;
private var ray : String;
private var plane : GameObject[];
private var sc : Vector3;
private var offset : Vector3;



function Start () {

	if(PlayerPrefs.GetInt("Muted") == 0)
	{
		Active_Icons[2] = unmuted;
		Idle_Icons[2] = unmuted;
		Icon_Text_English[2] = "Mute";
		Icon_Text_Greek[2] = "Σιγαση";
	}
	else
	{
		Active_Icons[2] = muted;
		Idle_Icons[2] = muted;
		Icon_Text_English[2] = "Unmute";
		Icon_Text_Greek[2] = "κατάργηση σίγασης";
	}


	var objects : int = Active_Icons.Length;
	plane = new GameObject[objects];
	
	var lightGameObject : GameObject = new GameObject("The Light");
	lightGameObject.AddComponent(Light);
	lightGameObject.light.color = Color.white;
	lightGameObject.transform.position = Vector3(0, 0, 0);
	lightGameObject.light.range = lightRange;
	
	offset = new Vector3(0.25,0,0.25);

	for(i=0; i<objects; i++)
	{
		theta = i*angle_field/(objects-1) - angle_field/2;
		
		z = distance*Mathf.Cos(theta*Mathf.Deg2Rad);
		x = distance*Mathf.Sin(theta*Mathf.Deg2Rad);
		//Debug.Log("Theta : "+theta+" z : "+z+" x : "+x);
		
		//Dimiourgo To Plane
		plane[i] = GameObject.CreatePrimitive(PrimitiveType.Plane);
		plane[i].transform.position = new Vector3(x,0,z);
		plane[i].transform.Rotate(90,180+theta,0);
		plane[i].tag = "Picture"+(i+1);
		plane[i].renderer.material.shader = iconShader;//Shader.Find("Transparent/Parallax Diffuse");
		plane[i].renderer.material.mainTexture = Idle_Icons[i];
		
		//Dimiourgo To 3D Text
		var theText = new GameObject();
		theText.tag = "Text"+(i+1);
		theText.transform.position = new Vector3(x,-7,z);
		theText.transform.Rotate(0,theta,0);
     	theText.AddComponent("TextMesh");
   
     	if(PlayerPrefs.GetInt("Language") == 0)
     	{
     		theText.GetComponent(TextMesh).text = Icon_Text_English[i];
     		theText.GetComponent(TextMesh).font = English_Font;
     		theText.renderer.material = English_Font.material;
     	}
     	else if(PlayerPrefs.GetInt("Language") == 1)
     	{
     		theText.GetComponent(TextMesh).text = Icon_Text_Greek[i];
     		theText.GetComponent(TextMesh).font = Greek_Font;
     		theText.renderer.material = Greek_Font.material;
	    }
	    theText.GetComponent(TextMesh).characterSize = 0.3;
     	theText.GetComponent(TextMesh).fontSize = 80;
     	theText.GetComponent(TextMesh).anchor = TextAnchor.MiddleCenter;
	    theText.transform.parent = plane[i].transform;
	    
	    sc = plane[i].transform.localScale;
	}
	
	for(i=0; i<arrows; i++)
	{
		theta = (i+1)*(360 - angle_field)/(arrows+1)+angle_field/2;
		
		z = distance*Mathf.Cos(theta*Mathf.Deg2Rad);
		x = distance*Mathf.Sin(theta*Mathf.Deg2Rad);
		//Debug.Log("Theta : "+theta+" z : "+z+" x : "+x);
		
		//Dimiourgo To Plane
		var arrow = GameObject.CreatePrimitive(PrimitiveType.Plane);
		Destroy(arrow.collider);
		arrow.transform.position = new Vector3(x,0,z);
		arrow.transform.Rotate(90,180+theta,0);
		arrow.renderer.material.shader = iconShader;
		if(x>0) arrow.renderer.material.mainTexture = Arrow_Left;
		else arrow.renderer.material.mainTexture = Arrow_Right;
	
	}

}

function Update () {


	ray = WhatCameraPoints.cameraPoint;
	if(ray != "null")
	{
		var integer : int = ray[7];
        integer -=48;
        
		var curObject = GameObject.FindGameObjectWithTag(ray);
		curObject.renderer.material.mainTexture = Active_Icons[integer-1];
		
		if(curObject.transform.localScale.x <= (sc+offset).x)curObject.transform.localScale += Vector3(0.1,0,0.1);
		var text = GameObject.FindGameObjectWithTag("Text"+(integer)).GetComponent(TextMesh);
		text.renderer.material.color = Color.green;
	}
	else
	{
		var i : int;
		for(i=0; i<Active_Icons.Length; i++)
		{
			var obj = GameObject.FindGameObjectWithTag("Picture"+(i+1));
			var text1 = GameObject.FindGameObjectWithTag("Text"+(i+1)).GetComponent(TextMesh);
			text1.renderer.material.color = Color.white;
			
			obj.renderer.material.mainTexture = Idle_Icons[i];
			if(obj.transform.localScale.x >= sc.x)obj.transform.localScale -= Vector3(0.1,0,0.1);						
		}
	}
	




}