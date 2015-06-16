#pragma strict

public static var cameraPoint : String;
private var lastSeen : String;
private var timeSeen : float;
var delay : float;
var circle : Texture2D;

private var PosX : float;
private var PosY : float;
private var SizeX : float;
private var SizeY : float;

private var PosXbackup : float;
private var PosYbackup : float;
private var SizeXbackup : float;
private var SizeYbackup : float;

function Start () {
	delay = 1.3; 
	lastSeen = "null";
	timeSeen=Time.time;
	
	SizeXbackup = SizeX = Screen.width/10;
	SizeYbackup = SizeY = SizeX;
	PosXbackup = PosX = Screen.width/4-SizeX/2;
	PosYbackup = PosY = Screen.height/2-SizeY/2;
	
 	cameraPoint = "null";
 	Screen.sleepTimeout = SleepTimeout.NeverSleep; 
}

function Update ()
{
	var hit : RaycastHit;
	var rayLine = new Ray(transform.position ,transform.TransformDirection(Vector3.forward));
	
		if (Physics.Raycast (rayLine, hit))
		{
			//if(hit.collider.tag != "Untagged") Debug.Log(hit.collider.tag);
			cameraPoint = hit.collider.tag;
			
			if(cameraPoint == lastSeen)
			{
				//Debug.Log("Keep looking "+cameraPoint);
				if(Time.time - timeSeen > delay)
				{
					Debug.Log("SELECTED "+cameraPoint);
					SizeX = SizeXbackup;
					SizeY = SizeYbackup;
					PosX = PosXbackup;
					PosY = PosYbackup;
				}
				else
				{
					SizeX=(1-(Time.time - timeSeen)/delay)*SizeXbackup;
					SizeY=SizeX;
					PosX=PosXbackup+((Time.time - timeSeen)/delay*SizeXbackup)/2;
					PosY=PosYbackup+((Time.time - timeSeen)/delay*SizeYbackup)/2;
					Debug.Log("Size : "+SizeX);
					//PosY--;
					//Debug.Log("LOOKING AT "+cameraPoint+" at "+Time.time);
				}
			}
			else
			{
			
				SizeX = SizeXbackup;
				SizeY = SizeYbackup;
				PosX = PosXbackup;
				PosY = PosYbackup;
				lastSeen = cameraPoint;
				timeSeen = Time.time;
				//Debug.Log("Looked else! at "+timeSeen);
			}
			
			
		}
		else
		{
			
			cameraPoint = "null";
			SizeX = SizeXbackup;
			SizeY = SizeYbackup;
			PosX = PosXbackup;
			PosY = PosYbackup;
			lastSeen = cameraPoint;
			timeSeen = Time.time;
		}
				
}

function OnGUI(){
	
	GUI.Label(Rect(PosX,PosY,SizeX,SizeY),circle);
	GUI.Label(Rect(PosX+Screen.width/2,PosY,SizeX,SizeY),circle);
	


}
