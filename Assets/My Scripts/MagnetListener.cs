using UnityEngine;
using System.Collections;

public class MagnetListener : MonoBehaviour {

	void OnEnable(){
		MagnetSensor.OnCardboardTrigger += dostuff;
	}

	void OnDisable(){
		MagnetSensor.OnCardboardTrigger -= dostuff;
	}

	void Update(){

		if (Input.GetKeyDown (KeyCode.Space)) dostuff ();

		int i = 0;
		while (i < Input.touchCount) {
			if (Input.GetTouch(i).phase == TouchPhase.Began)
				dostuff();
			++i;
		}
	}


	void dostuff(){
		string temp = WhatCameraPoints.cameraPoint;
		Handheld.Vibrate();

		if (Application.loadedLevelName == "MainMenu3Scene") {
						if (temp == "Picture1") {
								Application.LoadLevel ("TutorialScene");
						} else if (temp == "Picture2") {
								Application.LoadLevel ("MovieScene");
						} else if (temp == "Picture3") {
								Application.LoadLevel ("TourSelectScene");
						} else if (temp == "Picture4") {
								Application.LoadLevel ("SettingsScene");
						} else if (temp == "Picture5") {
								Application.LoadLevel ("CreditsScene");
						} else if (temp == "Picture6") {
								Application.LoadLevel ("ARprepareScene");
						}
		} else if (Application.loadedLevelName == "TourSelectScene") {

						//TOUR SELECTION
						if (temp == "Picture1") {
								Application.LoadLevel ("UndistortedSphere2");
								PlayerPrefs.SetString ("What", "Sphere1");
						} else if (temp == "Picture2") {
								Application.LoadLevel ("UndistortedSphere2");
								PlayerPrefs.SetString ("What", "Sphere4");
						} else if (temp == "Picture3") {
								Application.LoadLevel ("UndistortedSphere2");
								PlayerPrefs.SetString ("What", "Sphere3");
						}
		} else if (Application.loadedLevelName == "SettingsScene") {

						//SETTINGS
						if (temp == "Picture1") {
								PlayerPrefs.SetInt ("Language", 0);
								Application.LoadLevel ("MainMenu3Scene");
						} else if (temp == "Picture2") {
								PlayerPrefs.SetInt ("Language", 1);
								Application.LoadLevel ("MainMenu3Scene");
						} else if (temp == "Picture3") {
								if(PlayerPrefs.GetInt("Muted") == 0) PlayerPrefs.SetInt("Muted",1);
								else PlayerPrefs.SetInt("Muted",0);

								Application.LoadLevel("MainMenu3Scene");
						}
		}
	}



	
}
