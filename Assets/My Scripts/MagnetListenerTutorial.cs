using UnityEngine;
using System.Collections;

public class MagnetListenerTutorial : MonoBehaviour {

	
	void OnEnable(){
		MagnetSensor.OnCardboardTrigger += changeGif;
	}
	
	void OnDisable(){
		MagnetSensor.OnCardboardTrigger -= changeGif;
	}
	
	void Update(){
		
		if (Input.GetKeyDown (KeyCode.Space)) changeGif();
		
		int i = 0;
		while (i < Input.touchCount) {
			if (Input.GetTouch(i).phase == TouchPhase.Began)
				changeGif();
			++i;
		}
	}
	
	
	void changeGif()
	{
		Handheld.Vibrate ();
		int x = playGif.x;

		if(x < 3) playGif.x++;
	}
}
