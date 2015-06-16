var Back2MainMenu : Texture[];
var Magnet : Texture[];
var Zoom : Texture[];

var framesPerSecond = 5;
public static var x : int = 1; 
var font : Font;
 
private var GifSizeX :int;
private var GifSizeY : int;
private var lGifPosX : int;
private var rGifPosX : int;
private var GifPosY : int; 
 
function Start()
{
	x = 1;
	
	GifSizeX = Screen.width/2;
	GifSizeY = Screen.height/3;
	lGifPosX = 0;
	rGifPosX = lGifPosX + Screen.width/2;
	GifPosY = Screen.height/2.5;
}  
    
function Update()
{
	var index : int;
	if(x==1)
	{
 
		index = (Time.time * framesPerSecond) % Magnet.Length;
		renderer.material.mainTexture = Magnet[index];
	}
	else if(x==2)
	{
		index = (Time.time * framesPerSecond) % Zoom.Length;
    	renderer.material.mainTexture = Zoom[index];
	}
	else if(x==3)
	{
		index = (Time.time * framesPerSecond) % Back2MainMenu.Length;
		renderer.material.mainTexture = Back2MainMenu[index];
		
	}
}

function OnGUI(){
	
	GUI.skin.label.font = font;
	GUI.skin.label.fontSize = Screen.width/100;
	GUI.skin.label.alignment = TextAnchor.MiddleCenter;	
	
	if(x ==1)
	{
		if(PlayerPrefs.GetInt("Language") == 0)
		{	
			GUI.Label(Rect(lGifPosX,GifPosY,GifSizeX,GifSizeY),"Pull and release Magnet,\nto Click");
			GUI.Label(Rect(rGifPosX,GifPosY,GifSizeX,GifSizeY),"Pull and release Magnet,\nto Click");
		}
		else if(PlayerPrefs.GetInt("Language") == 1)
		{	
			GUI.Label(Rect(lGifPosX,GifPosY,GifSizeX,GifSizeY),"Κουνηστε τον μαγνητη,\nγια να κανετε κλικ");
			GUI.Label(Rect(rGifPosX,GifPosY,GifSizeX,GifSizeY),"Κουνηστε τον μαγνητη,\nγια να κανετε κλικ");
		}
	}
	else if(x ==2)
	{
		if(PlayerPrefs.GetInt("Language") == 0)
		{
			GUI.Label(Rect(lGifPosX,GifPosY,GifSizeX,GifSizeY),"While viewing photo\nYou can zoom in and out by\ntilting your head");
			GUI.Label(Rect(rGifPosX,GifPosY,GifSizeX,GifSizeY),"While viewing photo\nYou can zoom in and out by\ntilting your head");
		}
		else if(PlayerPrefs.GetInt("Language") == 1)
		{	
			GUI.Label(Rect(lGifPosX,GifPosY,GifSizeX,GifSizeY),"Οσο βλεπετε φωτοσφαιρες\nμπορειτε να κανετε zoom in και zoom out \nγερνοντας το κεφαλι σας");
			GUI.Label(Rect(rGifPosX,GifPosY,GifSizeX,GifSizeY),"Οσο βλεπετε φωτοσφαιρες\nμπορειτε να κανετε zoom in και zoom out \nγερνοντας το κεφαλι σας");
		}
	}
	else if(x ==3)
	{
		if(PlayerPrefs.GetInt("Language") == 0)
		{
			GUI.Label(Rect(lGifPosX,GifPosY,GifSizeX,GifSizeY),"Vertical Tilt,\nto go back to\nmain menu");
			GUI.Label(Rect(rGifPosX,GifPosY,GifSizeX,GifSizeY),"Vertical Tilt,\nto go back to\nmain menu");
		}
		else if(PlayerPrefs.GetInt("Language") == 1)
		{	
			GUI.Label(Rect(lGifPosX,GifPosY,GifSizeX,GifSizeY),"Γυρτε καθετα την συσκευη\nγια να επιστρεψετε στο αρχικο μενου");
			GUI.Label(Rect(rGifPosX,GifPosY,GifSizeX,GifSizeY),"Γυρτε καθετα την συσκευη\nγια να επιστρεψετε στο αρχικο μενου");
		}
	}
}




