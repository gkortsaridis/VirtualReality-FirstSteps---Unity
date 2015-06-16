#pragma strict

private var lSizeX : int;
private var lSizeY : int;
private var lPosX : int;
private var lPosY : int;

private var rSizeX : int;
private var rSizeY : int;
private var rPosX : int;
private var rPosY : int;

private var style : GUIStyle;
var creditsPic : Texture;

function Start () {

	//this.guiText.fontSize = Screen.width/120;
	//this.guiText.color = Color.green;
	//this.guiText.text = "CREDITS\n\nDeveloped by\nGeorge Kortsaridis\n\nConcept by\nKostantinos Stefanidis\nProject Manager\nKostantinos Stefanidis\n\nSpecial thanks to\nGDG Thessaloniki\nAdditional thanks especially to\nPanayiotis Tzinis\n\nBased on\nGoogle's©  Project Cardboard";
	style = new GUIStyle();	
	style.richText = true;	
	style.fontSize = Screen.width/120;
	style.normal.textColor = Color.white;
	style.alignment = TextAnchor.MiddleCenter;
	
	lSizeX = rSizeX = Screen.width/2;
	lSizeY = rSizeY = Screen.height;
	lPosX = 0;
	rPosX = Screen.width/2;
	lPosY = rPosY =  0;
	style.normal.background = creditsPic;
	
}

function OnGUI(){

	GUI.Label(Rect(lPosX,lPosY,lSizeX,lSizeY),"",style);
	GUI.Label(Rect(rPosX,rPosY,rSizeX,rSizeY),"",style);	
//	GUI.Label(Rect(lPosX,lPosY,lSizeX,lSizeY),"CREDITS\n\nDeveloped by\n<color=red>George Kortsaridis</color>\n\nConcept by\n<color=red>Kostantinos Stefanidis</color>\nProject Manager\n<color=red>Kostantinos Stefanidis</color>\n\nSpecial thanks to\n<color=red>GDG Thessaloniki</color>\nAdditional thanks especially to\n<color=red>Panayiotis Tzinis</color>\n\nBased on\nGoogle's©  Project Cardboard",style);
//	GUI.Label(Rect(rPosX,rPosY,rSizeX,rSizeY),"CREDITS\n\nDeveloped by\n<color=red>George Kortsaridis</color>\n\nConcept by\n<color=red>Kostantinos Stefanidis</color>\nProject Manager\n<color=red>Kostantinos Stefanidis</color>\n\nSpecial thanks to\n<color=red>GDG Thessaloniki</color>\nAdditional thanks especially to\n<color=red>Panayiotis Tzinis</color>\n\nBased on\nGoogle's©  Project Cardboard",style);
	
}