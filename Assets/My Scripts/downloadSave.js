#pragma strict
import System.IO;

private var url = "http://83.212.122.78/pano8.jpg";
private var fileName : String;

function Start(){	
			
	var www : WWW = new WWW (url);
	var progress1 = www;
	
    Debug.Log(progress1.progress);
         
    while (!progress1.isDone)
    {
    Debug.Log(progress1.progress*100);
    yield;
    }
         
     renderer.material.mainTexture = www.texture;    
         
     
     print(" progress1.bytes.length = "+progress1.bytes.length);
      
         
     fileName = Application.dataPath + "/Resources/" + "testimage.jpg";           
     System.IO.File.WriteAllBytes(fileName, progress1.bytes);
         
     Debug.Log("Cache saved: " + fileName); 
     print("file download is done");
         
     yield WaitForEndOfFrame();
         
     if (System.IO.File.Exists(Application.dataPath + "/Resources/testimage.jpg"))
     { 
     	print(" file does exist"); 
     } 
     else 
     {
     	print(" file does not exist");
     }
}